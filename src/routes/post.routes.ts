import { Elysia, t } from "elysia";
import { createPost } from "../services/post.services";
import { allPost } from "../services/post.services";
import { showPost } from "../services/post.services";

const routes = new Elysia({ prefix: "/post" })
  .post("/create", ({ body, set }) => createPost(body, set), {
    body: t.Object({
      title: t.String({ description: "Post title" }),
      author: t.String({ description: "Post author" }),
      text: t.String({ description: "Post text | content" }),
    }),
  })
  .get("/", allPost())
  .get("/show/:slug", ({ params: { slug }, set }) => showPost(slug, set), {
    params: t.Object({
      slug: t.String({ description: "Post UUID" }),
    }),
  });

export default routes;
