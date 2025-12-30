import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;

// we can't directly talk to database, don't have access globally. we need to use in every route / use middleware

// ts doesn't talk to wrangler.toml files

// Publish to npm
/* 1. npm login
2. npm publish change in package.json -> main: "dist/index.js", tsc -b, .npmignore npm publish
If i found any error while publishing, npm config set //registry.npmjs.org/:_authToken=<your token>
*/
// Scoped package -> npm publish --access public

// src folder in .npmignore doesn't need to reach the npm we have dist folder present which contains all js files

// hashed passwords, pagination
// git push origin2 Head
