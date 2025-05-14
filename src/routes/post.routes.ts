import { Elysia, t } from "elysia";
import { createPost } from "../services/post.services";
import { allPost } from "../services/post.services";
import { showPost } from "../services/post.services";

const routes = new Elysia({ prefix: "/post" })
  .post("/create", ({ body, set }) => createPost(body, set), {
    body: t.Object({
      title: t.String({ description: "Post Title" }),
      author: t.String({ description: "Post Author" }),
      text: t.String({ description: "Post Text | Content" }),
    }),
  })
  .get("/", allPost())
  .get("/show/:slug", ({ params: { slug }, set }) => showPost(slug, set), {
    params: t.Object({
      slug: t.String({ description: "Post Slug" }),
    }),
  });

export default routes;
