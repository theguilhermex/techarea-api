import { Elysia } from "elysia";

const app = new Elysia().listen(3000, () => {
  console.log("Ouvindo");
});

import postRouter from "./routes/post.routes";

app.use(postRouter);

export default app;
