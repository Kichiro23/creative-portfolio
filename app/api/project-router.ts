import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { projects } from "@db/schema";
import { eq, asc } from "drizzle-orm";

export const projectRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(projects).orderBy(asc(projects.order));
  }),

  featured: publicQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(projects)
      .where(eq(projects.featured, "true"))
      .orderBy(asc(projects.order));
  }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }: { input: { slug: string } }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(projects)
        .where(eq(projects.slug, input.slug))
        .limit(1);
      return result[0] ?? null;
    }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        slug: z.string().min(1).max(255),
        description: z.string().optional(),
        longDescription: z.string().optional(),
        image: z.string().optional(),
        techStack: z.string().optional(),
        liveUrl: z.string().optional(),
        repoUrl: z.string().optional(),
        featured: z.enum(["true", "false"]).default("false"),
        order: z.number().optional(),
      })
    )
    .mutation(async ({ input }: { input: Record<string, unknown> }) => {
      const db = getDb();
      const result = await db.insert(projects).values(input as typeof projects.$inferInsert);
      return { success: true, insertId: Number(result[0].insertId) };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).max(255).optional(),
        slug: z.string().min(1).max(255).optional(),
        description: z.string().optional(),
        longDescription: z.string().optional(),
        image: z.string().optional(),
        techStack: z.string().optional(),
        liveUrl: z.string().optional(),
        repoUrl: z.string().optional(),
        featured: z.enum(["true", "false"]).optional(),
        order: z.number().optional(),
      })
    )
    .mutation(async ({ input }: { input: { id: number } & Record<string, unknown> }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(projects).set(data as typeof projects.$inferInsert).where(eq(projects.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }: { input: { id: number } }) => {
      const db = getDb();
      await db.delete(projects).where(eq(projects.id, input.id));
      return { success: true };
    }),
});
