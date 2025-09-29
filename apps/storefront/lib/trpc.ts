/* eslint-disable @typescript-eslint/no-unused-vars */
// tRPC client for Phase 2.2 - Cart & Orders functionality
// Note: Using simplified implementation to avoid version compatibility issues
// Full tRPC integration will be refined in quality gates phase

export const trpc = {
  cart: {
    getCart: {
      useQuery: (_input?: unknown, _options?: unknown) => ({
        data: {
          success: true,
          data: {
            itemCount: 0,
            subtotal: 0,
            items: [],
          },
        },
        refetch: () => Promise.resolve(),
        isLoading: false,
      }),
    },
    updateCartItem: {
      useMutation: (_options?: unknown) => ({
        mutate: (
          variables: unknown,
          opts?: { onSuccess?: () => void; onSettled?: () => void },
        ) => {
          console.warn("Mock updateCartItem:", variables);
          opts?.onSuccess?.();
        },
        isLoading: false,
      }),
    },
    removeFromCart: {
      useMutation: (_options?: unknown) => ({
        mutate: (
          variables: unknown,
          opts?: { onSuccess?: () => void; onSettled?: () => void },
        ) => {
          console.warn("Mock removeFromCart:", variables);
          opts?.onSuccess?.();
        },
        isLoading: false,
      }),
    },
    clearCart: {
      useMutation: (_options?: unknown) => ({
        mutate: (
          _variables?: unknown,
          opts?: { onSuccess?: () => void; onSettled?: () => void },
        ) => {
          console.warn("Mock clearCart");
          opts?.onSuccess?.();
        },
        isLoading: false,
      }),
    },
  },
  orders: {
    create: {
      useMutation: (_options?: unknown) => ({
        mutate: (
          variables: unknown,
          opts?: {
            onSuccess?: (data: unknown) => void;
            onSettled?: () => void;
          },
        ) => {
          console.warn("Mock createOrder:", variables);
          opts?.onSuccess?.({
            success: true,
            data: {
              orderId: "mock-order-id",
              orderNumber: "ORD-12345678-001",
              totalAmount: 99.99,
              status: "PENDING",
            },
          });
        },
        isLoading: false,
      }),
    },
    getUserOrders: {
      useQuery: (_input?: unknown, _options?: unknown) => ({
        data: {
          success: true,
          data: {
            orders: [],
            pagination: { page: 1, limit: 10, total: 0, pages: 0 },
          },
        },
        refetch: () => Promise.resolve(),
        isLoading: false,
      }),
    },
    getById: {
      useQuery: (_input?: unknown, _options?: unknown) => ({
        data: null,
        refetch: () => Promise.resolve(),
        isLoading: false,
      }),
    },
    cancel: {
      useMutation: (_options?: unknown) => ({
        mutate: (
          variables: unknown,
          opts?: { onSuccess?: () => void; onSettled?: () => void },
        ) => {
          console.warn("Mock cancelOrder:", variables);
          opts?.onSuccess?.();
        },
        isLoading: false,
      }),
    },
  },
};

export const trpcClient = null;
