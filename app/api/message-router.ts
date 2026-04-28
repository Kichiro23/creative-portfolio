import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { messages } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const messageRouter = createRouter({
  list: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(messages).orderBy(desc(messages.createdAt));
  }),

  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email().max(320),
        subject: z.string().max(255).optional(),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input }: { input: { name: string; email: string; subject?: string; content: string } }) => {
      const db = getDb();
      const result = await db.insert(messages).values(input);
      return { success: true, insertId: Number(result[0].insertId) };
    }),

  markRead: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }: { input: { id: number } }) => {
      const db = getDb();
      await db
        .update(messages)
        .set({ read: "true" })
        .where(eq(messages.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }: { input: { id: number } }) => {
      const db = getDb();
      await db.delete(messages).where(eq(messages.id, input.id));
      return { success: true };
    }),

  unreadCount: adminQuery.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(messages)
      .where(eq(messages.read, "false"));
    return result.length;
  }),
});
