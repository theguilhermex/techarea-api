import type { Context } from "elysia";
import type { QuerySnapshot, DocumentData } from "firebase-admin/firestore";
import { db } from "../database/firebase";
import { randomUUID } from "node:crypto";
import { validate as isValidUUID } from "uuid";
import { validatePostData } from "./concerns/post.concerns";
import { slugify } from "../utils/slugify";
async function createPost(
  body: Context["body"],
  set: Context["set"]
): Promise<Object> {
  const { error, value } = validatePostData.validate(body);
  const { title, author, text } = value;
  if (error) {
    set.status = 500;
    return {
      msg: "Erro com os parametros",
      error: error,
    };
  }
  try {
    const newPost = await db.collection("posts").add({
      title,
      author,
      text,
      slug: slugify(title),
      post_id: randomUUID(),
    });
    return { msg: `Post adicionado com sucesso`, firebase_id: newPost.id };
  } catch (err) {
    return { msg: "Erro encontrado", error: err };
  }
}

async function allPost(): Promise<object> {
  try {
    const colSnapshot = await db.collection("posts").get();
    const docData = colSnapshot.docs.map((doc) => doc.data());
    return docData;
  } catch (err) {
    return {
      error: err,
    };
  }
}

async function showPost(slug: String, set: Context["set"]): Promise<object> {
  const colSnapshot: QuerySnapshot<DocumentData> = await db
    .collection("posts")
    .where("slug", "==", slugify(slug))
    .get();

  if (colSnapshot.empty) {
    set.status = 404;
    return {
      msg: "Post não encontrado",
      status_code: set.status,
    };
  }

  const docData = colSnapshot.docs.map((doc) => doc.data());
  return docData;
}

export { createPost, allPost, showPost };
