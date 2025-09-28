import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure, adminProcedure } from "../trpc";

// Input validation schemas
const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  sku: z.string().optional(),
  basePrice: z.number().min(0, "Price must be positive"),
  salePrice: z.number().min(0).optional(),
  costPrice: z.number().min(0).optional(),
  stockQuantity: z.number().int().min(0).default(0),
  lowStockThreshold: z.number().int().min(0).default(5),
  trackInventory: z.boolean().default(true),
  allowBackorder: z.boolean().default(false),
  weight: z.number().min(0).optional(),
  dimensions: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "ACTIVE", "INACTIVE", "ARCHIVED"]).default("DRAFT"),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  categoryIds: z.array(z.string()).default([]),
});

const updateProductSchema = createProductSchema.partial().extend({
  id: z.string(),
});

const productListSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  categoryId: z.string().optional(),
  status: z.enum(["DRAFT", "ACTIVE", "INACTIVE", "ARCHIVED"]).optional(),
  isFeatured: z.boolean().optional(),
  sortBy: z
    .enum(["name", "price", "createdAt", "updatedAt"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const productsRouter: any = createTRPCRouter({
  // Get all products with filtering and pagination
  list: publicProcedure
    .input(productListSchema)
    .query(async ({ ctx, input }) => {
      const {
        page,
        limit,
        search,
        categoryId,
        status,
        isFeatured,
        sortBy,
        sortOrder,
      } = input;

      const offset = (page - 1) * limit;

      // Build where clause
      const where: any = {};

      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { sku: { contains: search, mode: "insensitive" } },
        ];
      }

      if (status) {
        where.status = status;
      }

      if (isFeatured !== undefined) {
        where.isFeatured = isFeatured;
      }

      if (categoryId) {
        where.productCategories = {
          some: {
            categoryId: categoryId,
          },
        };
      }

      // Build order by clause
      const orderBy: any = {};
      if (sortBy === "price") {
        orderBy.basePrice = sortOrder;
      } else {
        orderBy[sortBy] = sortOrder;
      }

      try {
        const [products, total] = await Promise.all([
          ctx.prisma.product.findMany({
            where,
            include: {
              images: {
                where: { isActive: true },
                orderBy: { sortOrder: "asc" },
                take: 1,
              },
              productCategories: {
                include: {
                  category: {
                    select: {
                      id: true,
                      name: true,
                      slug: true,
                    },
                  },
                },
              },
              variants: {
                where: { isActive: true },
                select: {
                  id: true,
                  price: true,
                  stockQuantity: true,
                },
              },
            },
            skip: offset,
            take: limit,
            orderBy,
          }),
          ctx.prisma.product.count({ where }),
        ]);

        return {
          products,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch products",
          cause: error,
        });
      }
    }),

  // Get product by ID
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const product = await ctx.prisma.product.findUnique({
          where: { id: input.id },
          include: {
            images: {
              where: { isActive: true },
              orderBy: { sortOrder: "asc" },
            },
            variants: {
              where: { isActive: true },
              orderBy: { name: "asc" },
            },
            productCategories: {
              include: {
                category: true,
              },
            },
          },
        });

        if (!product) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Product not found",
          });
        }

        return product;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch product",
          cause: error,
        });
      }
    }),

  // Get product by slug
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const product = await ctx.prisma.product.findUnique({
          where: { slug: input.slug },
          include: {
            images: {
              where: { isActive: true },
              orderBy: { sortOrder: "asc" },
            },
            variants: {
              where: { isActive: true },
              orderBy: { name: "asc" },
            },
            productCategories: {
              include: {
                category: true,
              },
            },
          },
        });

        if (!product) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Product not found",
          });
        }

        return product;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch product",
          cause: error,
        });
      }
    }),

  // Create new product (Admin only)
  create: adminProcedure
    .input(createProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { categoryIds, ...productData } = input;

      try {
        // Check if slug is unique
        const existingProduct = await ctx.prisma.product.findUnique({
          where: { slug: input.slug },
        });

        if (existingProduct) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "A product with this slug already exists",
          });
        }

        // Create product with categories
        const product = await ctx.prisma.product.create({
          data: {
            name: productData.name,
            slug: productData.slug,
            description: productData.description || null,
            shortDescription: productData.shortDescription || null,
            sku: productData.sku || null,
            basePrice: productData.basePrice,
            salePrice: productData.salePrice || null,
            costPrice: productData.costPrice || null,
            stockQuantity: productData.stockQuantity,
            lowStockThreshold: productData.lowStockThreshold,
            trackInventory: productData.trackInventory,
            allowBackorder: productData.allowBackorder,
            weight: productData.weight || null,
            dimensions: productData.dimensions || null,
            seoTitle: productData.seoTitle || null,
            seoDescription: productData.seoDescription || null,
            tags: productData.tags,
            status: productData.status,
            isActive: productData.isActive,
            isFeatured: productData.isFeatured,
            publishedAt: productData.status === "ACTIVE" ? new Date() : null,
            productCategories: {
              create: categoryIds.map((categoryId) => ({
                categoryId,
              })),
            },
          },
          include: {
            productCategories: {
              include: {
                category: true,
              },
            },
          },
        });

        return product;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create product",
          cause: error,
        });
      }
    }),

  // Update product (Admin only)
  update: adminProcedure
    .input(updateProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, categoryIds, ...productData } = input;

      try {
        // Check if product exists
        const existingProduct = await ctx.prisma.product.findUnique({
          where: { id },
        });

        if (!existingProduct) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Product not found",
          });
        }

        // Check slug uniqueness if slug is being updated
        if (input.slug && input.slug !== existingProduct.slug) {
          const slugExists = await ctx.prisma.product.findUnique({
            where: { slug: input.slug },
          });

          if (slugExists) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "A product with this slug already exists",
            });
          }
        }

        // Update product
        const updateData: any = {
          ...productData,
        };

        // Set publishedAt if status is changing to ACTIVE
        if (input.status === "ACTIVE" && existingProduct.status !== "ACTIVE") {
          updateData.publishedAt = new Date();
        }

        const product = await ctx.prisma.product.update({
          where: { id },
          data: updateData,
          include: {
            productCategories: {
              include: {
                category: true,
              },
            },
          },
        });

        // Update categories if provided
        if (categoryIds !== undefined) {
          // Remove existing categories
          await ctx.prisma.productCategory.deleteMany({
            where: { productId: id },
          });

          // Add new categories
          if (categoryIds.length > 0) {
            await ctx.prisma.productCategory.createMany({
              data: categoryIds.map((categoryId) => ({
                productId: id,
                categoryId,
              })),
            });
          }
        }

        return product;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update product",
          cause: error,
        });
      }
    }),

  // Delete product (Admin only)
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const product = await ctx.prisma.product.findUnique({
          where: { id: input.id },
        });

        if (!product) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Product not found",
          });
        }

        await ctx.prisma.product.delete({
          where: { id: input.id },
        });

        return { success: true };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete product",
          cause: error,
        });
      }
    }),

  // Toggle product featured status (Admin only)
  toggleFeatured: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const product = await ctx.prisma.product.findUnique({
          where: { id: input.id },
        });

        if (!product) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Product not found",
          });
        }

        const updatedProduct = await ctx.prisma.product.update({
          where: { id: input.id },
          data: { isFeatured: !product.isFeatured },
        });

        return updatedProduct;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to toggle featured status",
          cause: error,
        });
      }
    }),
});
