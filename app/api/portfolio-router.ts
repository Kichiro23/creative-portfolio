import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { skills, experiences } from "@db/schema";
import { asc } from "drizzle-orm";

export const portfolioRouter = createRouter({
  skills: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(skills).orderBy(asc(skills.order));
  }),

  experiences: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(experiences).orderBy(asc(experiences.order));
  }),
});
