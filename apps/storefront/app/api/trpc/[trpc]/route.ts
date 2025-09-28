// Temporarily disabled for Phase 2.1 quality gates
// Will be re-enabled in Phase 2.2 with proper tRPC client integration

export function GET() {
  return new Response("tRPC API will be available in Phase 2.2", {
    status: 503,
    headers: { "Content-Type": "text/plain" },
  });
}

export function POST() {
  return new Response("tRPC API will be available in Phase 2.2", {
    status: 503,
    headers: { "Content-Type": "text/plain" },
  });
}
