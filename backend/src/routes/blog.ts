import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@backb1ter/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: { userId: string };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  try {
    const user = (await verify(authHeader, c.env.JWT_SECRET)) as {
      id: string;
    };
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }
  } catch (error) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  body.authorId = userId;
  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  return c.json({ id: post.id });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({ id: post.id });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      content: true,
      title: true,
      authorId: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json(blogs);
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        content: true,
        title: true,
        authorId: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json(blog);
  } catch (error) {
    c.status(411);
    return c.json({ error: "post not found" });
  }
});
