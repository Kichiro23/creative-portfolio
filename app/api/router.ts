import { authRouter } from "./auth-router";
import { projectRouter } from "./project-router";
import { messageRouter } from "./message-router";
import { portfolioRouter } from "./portfolio-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  project: projectRouter,
  message: messageRouter,
  portfolio: portfolioRouter,
});

export type AppRouter = typeof appRouter;
