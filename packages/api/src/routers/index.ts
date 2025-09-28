import { createTRPCRouter } from "../trpc";
import { productsRouter } from "./products";
import { categoriesRouter } from "./categories";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter: any = createTRPCRouter({
  products: productsRouter,
  categories: categoriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
