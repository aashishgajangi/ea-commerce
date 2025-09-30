import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createTRPCContext } from "@repo/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

const handler = async (req: Request) => {
  // Get session from NextAuth
  const session = await getServerSession(authOptions);

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ session }),
    ...(process.env.NODE_ENV === "development" && {
      onError: ({ path, error }) => {
        console.error(
          `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
        );
      },
    }),
  });
};

export { handler as GET, handler as POST };
