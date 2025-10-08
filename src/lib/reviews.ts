import { db } from '@/lib/db';

/**
 * Get reviews for a product (public - only approved)
 */
export async function getProductReviews(productId: string, options: {
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'rating';
  order?: 'asc' | 'desc';
} = {}) {
  const { limit = 10, offset = 0, orderBy = 'createdAt', order = 'desc' } = options;

  const [reviews, total] = await Promise.all([
    db.review.findMany({
      where: {
        productId,
        status: 'approved',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { [orderBy]: order },
      skip: offset,
      take: limit,
    }),
    db.review.count({
      where: {
        productId,
        status: 'approved',
      },
    }),
  ]);

  // Calculate average rating
  const ratings = reviews.map(r => r.rating);
  const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

  return {
    reviews,
    total,
    averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    ratingCounts: {
      1: ratings.filter(r => r === 1).length,
      2: ratings.filter(r => r === 2).length,
      3: ratings.filter(r => r === 3).length,
      4: ratings.filter(r => r === 4).length,
      5: ratings.filter(r => r === 5).length,
    },
    limit,
    offset,
  };
}

/**
 * Get all reviews for admin
 */
export async function getAllReviews(options: {
  productId?: string;
  status?: 'pending' | 'approved' | 'rejected' | 'all';
  rating?: number;
  search?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'rating' | 'status';
  order?: 'asc' | 'desc';
} = {}) {
  const {
    productId,
    status = 'all',
    rating,
    search = '',
    limit = 20,
    offset = 0,
    orderBy = 'createdAt',
    order = 'desc',
  } = options;

  const where: Record<string, unknown> = {
    ...(productId ? { productId } : {}),
    ...(status !== 'all' ? { status } : {}),
    ...(rating ? { rating } : {}),
    ...(search ? {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { comment: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { product: { name: { contains: search, mode: 'insensitive' } } },
      ],
    } : {}),
  };

  const [reviews, total] = await Promise.all([
    db.review.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { [orderBy]: order },
      skip: offset,
      take: limit,
    }),
    db.review.count({ where }),
  ]);

  return {
    reviews,
    total,
    limit,
    offset,
  };
}

/**
 * Create a new review
 */
export async function createReview(data: {
  productId: string;
  userId?: string;
  rating: number;
  title?: string;
  comment: string;
  isVerifiedPurchase?: boolean;
}) {
  // Verify product exists
  const product = await db.product.findUnique({
    where: { id: data.productId },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  return db.review.create({
    data: {
      ...data,
      status: 'pending', // All new reviews start as pending
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}

/**
 * Update a review (admin only)
 */
export async function updateReview(
  id: string,
  data: {
    rating?: number;
    title?: string;
    comment?: string;
    status?: 'pending' | 'approved' | 'rejected';
    isVerifiedPurchase?: boolean;
  }
) {
  return db.review.update({
    where: { id },
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}

/**
 * Delete a review
 */
export async function deleteReview(id: string) {
  return db.review.delete({
    where: { id },
  });
}

/**
 * Get a single review by ID
 */
export async function getReviewById(id: string) {
  return db.review.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}