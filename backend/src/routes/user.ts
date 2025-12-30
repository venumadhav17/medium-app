import { Hono } from "hono";

import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { PrismaClient } from "../generated/prisma/edge";
import { signinInput, signupInput } from "@kvm17/mediumapp-common";

export const userRouter = new Hono<{
  Bindings: {
    PRISMA_DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    });
  }
  const prisma = new PrismaClient({
    accelerateUrl: c.env.PRISMA_DATABASE_URL
  }).$extends(withAccelerate());

  try {
    // duplicate email rectify if user already present using prisma.user.find
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name
      }
    });
    // authentication part
    const jwt = await sign(
      {
        id: user.id
      },
      c.env.JWT_SECRET
    );
    return c.text(jwt);
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.text("Something went wrong");
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    });
  }
  const prisma = new PrismaClient({
    accelerateUrl: c.env.PRISMA_DATABASE_URL
  }).$extends(withAccelerate());

  try {
    // duplicate email rectify if user already present using prisma.user.find
    const user = await prisma.user.findFirst({
      // findOne
      where: {
        username: body.username,
        password: body.password
      }
    });
    if (!user) {
      c.status(403); // unauthorized
      return c.text("User doesn't exist");
    }
    // authentication part
    const jwt = await sign(
      {
        id: user.id
      },
      c.env.JWT_SECRET
    );
    return c.text(jwt);
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.text("Something went wrong");
  }
});
