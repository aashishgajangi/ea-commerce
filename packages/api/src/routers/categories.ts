import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure, adminProcedure } from "../trpc";

// Input validation schemas
const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.string(),
});

const categoryListSchema = z.object({
  parentId: z.string().optional(),
  includeInactive: z.boolean().default(false),
  includeProductCount: z.boolean().default(false),
});

export const categoriesRouter: any = createTRPCRouter({
  // Get all categories (with hierarchical structure)
  list: publicProcedure
    .input(categoryListSchema)
    .query(async ({ ctx, input }) => {
      const { parentId, includeInactive, includeProductCount } = input;

      const where: any = {};

      if (parentId !== undefined) {
        where.parentId = parentId;
      }

      if (!includeInactive) {
        where.isActive = true;
      }

      try {
        const categories = await ctx.prisma.category.findMany({
          where,
          include: {
            children: {
              where: includeInactive ? {} : { isActive: true },
              orderBy: { sortOrder: "asc" },
            },
            parent: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            ...(includeProductCount && {
              productCategories: {
                select: { productId: true },
              },
            }),
          },
          orderBy: { sortOrder: "asc" },
        });

        // Add product count if requested
        const categoriesWithCount = includeProductCount
          ? categories.map((category) => ({
              ...category,
              productCount: (category as any).productCategories?.length || 0,
              productCategories: undefined, // Remove from response
            }))
          : categories;

        return categoriesWithCount;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch categories",
          cause: error,
        });
      }
    }),

  // Get category tree (all levels)
  tree: publicProcedure
    .input(
      z.object({
        includeInactive: z.boolean().default(false),
        includeProductCount: z.boolean().default(false),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { includeInactive, includeProductCount } = input;

      try {
        // Get all root categories (no parent)
        const rootCategories = await ctx.prisma.category.findMany({
          where: {
            parentId: null,
            ...(includeInactive ? {} : { isActive: true }),
          },
          include: {
            children: {
              where: includeInactive ? {} : { isActive: true },
              include: {
                children: {
                  where: includeInactive ? {} : { isActive: true },
                  orderBy: { sortOrder: "asc" },
                },
              },
              orderBy: { sortOrder: "asc" },
            },
            ...(includeProductCount && {
              productCategories: {
                select: { productId: true },
              },
            }),
          },
          orderBy: { sortOrder: "asc" },
        });

        // Add product count recursively if requested
        const addProductCount = (categories: any[]): any[] => {
          return categories.map((category) => ({
            ...category,
            productCount: includeProductCount
              ? category.productCategories?.length || 0
              : undefined,
            children: category.children
              ? addProductCount(category.children)
              : [],
            productCategories: undefined, // Remove from response
          }));
        };

        return includeProductCount
          ? addProductCount(rootCategories)
          : rootCategories;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch category tree",
          cause: error,
        });
      }
    }),

  // Get category by ID
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const category = await ctx.prisma.category.findUnique({
          where: { id: input.id },
          include: {
            parent: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            children: {
              where: { isActive: true },
              orderBy: { sortOrder: "asc" },
            },
            productCategories: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                    basePrice: true,
                    isActive: true,
                  },
                },
              },
            },
          },
        });

        if (!category) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Category not found",
          });
        }

        return category;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch category",
          cause: error,
        });
      }
    }),

  // Get category by slug
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const category = await ctx.prisma.category.findUnique({
          where: { slug: input.slug },
          include: {
            parent: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            children: {
              where: { isActive: true },
              orderBy: { sortOrder: "asc" },
            },
            productCategories: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                    basePrice: true,
                    isActive: true,
                  },
                },
              },
            },
          },
        });

        if (!category) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Category not found",
          });
        }

        return category;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch category",
          cause: error,
        });
      }
    }),

  // Create new category (Admin only)
  create: adminProcedure
    .input(createCategorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if slug is unique
        const existingCategory = await ctx.prisma.category.findUnique({
          where: { slug: input.slug },
        });

        if (existingCategory) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "A category with this slug already exists",
          });
        }

        // If parentId is provided, check if parent exists
        if (input.parentId) {
          const parentCategory = await ctx.prisma.category.findUnique({
            where: { id: input.parentId },
          });

          if (!parentCategory) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Parent category not found",
            });
          }
        }

        const category = await ctx.prisma.category.create({
          data: {
            name: input.name,
            slug: input.slug,
            description: input.description || null,
            image: input.image || null,
            parentId: input.parentId || null,
            isActive: input.isActive,
            sortOrder: input.sortOrder,
            seoTitle: input.seoTitle || null,
            seoDescription: input.seoDescription || null,
          },
          include: {
            parent: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            children: true,
          },
        });

        return category;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create category",
          cause: error,
        });
      }
    }),

  // Update category (Admin only)
  update: adminProcedure
    .input(updateCategorySchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      try {
        // Check if category exists
        const existingCategory = await ctx.prisma.category.findUnique({
          where: { id },
        });

        if (!existingCategory) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Category not found",
          });
        }

        // Check slug uniqueness if slug is being updated
        if (input.slug && input.slug !== existingCategory.slug) {
          const slugExists = await ctx.prisma.category.findUnique({
            where: { slug: input.slug },
          });

          if (slugExists) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "A category with this slug already exists",
            });
          }
        }

        // If parentId is being changed, validate it
        if (
          input.parentId !== undefined &&
          input.parentId !== existingCategory.parentId
        ) {
          if (input.parentId) {
            // Check if parent exists
            const parentCategory = await ctx.prisma.category.findUnique({
              where: { id: input.parentId },
            });

            if (!parentCategory) {
              throw new TRPCError({
                code: "NOT_FOUND",
                message: "Parent category not found",
              });
            }

            // Prevent circular references
            if (input.parentId === id) {
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Category cannot be its own parent",
              });
            }

            // Check if the category being set as parent is a child of current category
            const isChildOfCurrent = await checkIfChildCategory(
              ctx.prisma,
              id,
              input.parentId,
            );
            if (isChildOfCurrent) {
              throw new TRPCError({
                code: "BAD_REQUEST",
                message:
                  "Cannot set a child category as parent (circular reference)",
              });
            }
          }
        }

        const updatePayload: any = {};
        if (updateData.name !== undefined) updatePayload.name = updateData.name;
        if (updateData.slug !== undefined) updatePayload.slug = updateData.slug;
        if (updateData.description !== undefined)
          updatePayload.description = updateData.description || null;
        if (updateData.image !== undefined)
          updatePayload.image = updateData.image || null;
        if (updateData.parentId !== undefined)
          updatePayload.parentId = updateData.parentId || null;
        if (updateData.isActive !== undefined)
          updatePayload.isActive = updateData.isActive;
        if (updateData.sortOrder !== undefined)
          updatePayload.sortOrder = updateData.sortOrder;
        if (updateData.seoTitle !== undefined)
          updatePayload.seoTitle = updateData.seoTitle || null;
        if (updateData.seoDescription !== undefined)
          updatePayload.seoDescription = updateData.seoDescription || null;

        const category = await ctx.prisma.category.update({
          where: { id },
          data: updatePayload,
          include: {
            parent: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            children: true,
          },
        });

        return category;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update category",
          cause: error,
        });
      }
    }),

  // Delete category (Admin only)
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const category = await ctx.prisma.category.findUnique({
          where: { id: input.id },
          include: {
            children: true,
            productCategories: true,
          },
        });

        if (!category) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Category not found",
          });
        }

        // Check if category has children
        if (category.children.length > 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Cannot delete category that has child categories. Please delete or move child categories first.",
          });
        }

        // Check if category has products
        if (category.productCategories.length > 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Cannot delete category that has products. Please move products to another category first.",
          });
        }

        await ctx.prisma.category.delete({
          where: { id: input.id },
        });

        return { success: true };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete category",
          cause: error,
        });
      }
    }),

  // Reorder categories (Admin only)
  reorder: adminProcedure
    .input(
      z.object({
        categoryIds: z.array(z.string()),
        parentId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { categoryIds, parentId } = input;

      try {
        // Update sort order for each category
        const updatePromises = categoryIds.map((categoryId, index) =>
          ctx.prisma.category.update({
            where: { id: categoryId },
            data: { sortOrder: index },
          }),
        );

        await Promise.all(updatePromises);

        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to reorder categories",
          cause: error,
        });
      }
    }),
});

// Helper function to check if a category is a child of another category (prevents circular references)
async function checkIfChildCategory(
  prisma: any,
  parentCategoryId: string,
  potentialChildId: string,
): Promise<boolean> {
  const children = await prisma.category.findMany({
    where: { parentId: parentCategoryId },
    select: { id: true },
  });

  for (const child of children) {
    if (child.id === potentialChildId) {
      return true;
    }
    // Recursively check if potentialChildId is a child of this child
    if (await checkIfChildCategory(prisma, child.id, potentialChildId)) {
      return true;
    }
  }

  return false;
}
