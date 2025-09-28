import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Home from "../app/page";

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(() => ({
    data: null,
    status: "loading",
  })),
  signOut: vi.fn(),
}));

describe("Home Page", () => {
  it("renders without crashing", () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
  });
});
