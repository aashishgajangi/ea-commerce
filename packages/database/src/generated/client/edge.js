Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
} = require("./runtime/edge.js");

const Prisma = {};

exports.Prisma = Prisma;
exports.$Enums = {};

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
};

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
Prisma.PrismaClientValidationError = PrismaClientValidationError;
Prisma.NotFoundError = NotFoundError;
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag;
Prisma.empty = empty;
Prisma.join = join;
Prisma.raw = raw;
Prisma.validator = Public.validator;

/**
 * Extensions
 */
Prisma.getExtensionContext = Extensions.getExtensionContext;
Prisma.defineExtension = Extensions.defineExtension;

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull,
};

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable",
});

exports.Prisma.UserScalarFieldEnum = {
  id: "id",
  email: "email",
  emailVerified: "emailVerified",
  name: "name",
  image: "image",
  password: "password",
  role: "role",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.AccountScalarFieldEnum = {
  id: "id",
  userId: "userId",
  type: "type",
  provider: "provider",
  providerAccountId: "providerAccountId",
  refresh_token: "refresh_token",
  access_token: "access_token",
  expires_at: "expires_at",
  token_type: "token_type",
  scope: "scope",
  id_token: "id_token",
  session_state: "session_state",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.SessionScalarFieldEnum = {
  id: "id",
  sessionToken: "sessionToken",
  userId: "userId",
  expires: "expires",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: "identifier",
  token: "token",
  expires: "expires",
  createdAt: "createdAt",
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  description: "description",
  image: "image",
  parentId: "parentId",
  isActive: "isActive",
  sortOrder: "sortOrder",
  seoTitle: "seoTitle",
  seoDescription: "seoDescription",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.ProductScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  description: "description",
  shortDescription: "shortDescription",
  sku: "sku",
  basePrice: "basePrice",
  salePrice: "salePrice",
  costPrice: "costPrice",
  stockQuantity: "stockQuantity",
  lowStockThreshold: "lowStockThreshold",
  trackInventory: "trackInventory",
  allowBackorder: "allowBackorder",
  weight: "weight",
  dimensions: "dimensions",
  seoTitle: "seoTitle",
  seoDescription: "seoDescription",
  tags: "tags",
  status: "status",
  isActive: "isActive",
  isFeatured: "isFeatured",
  publishedAt: "publishedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.ProductVariantScalarFieldEnum = {
  id: "id",
  productId: "productId",
  sku: "sku",
  name: "name",
  price: "price",
  compareAtPrice: "compareAtPrice",
  costPrice: "costPrice",
  stockQuantity: "stockQuantity",
  attributes: "attributes",
  weight: "weight",
  barcode: "barcode",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.ProductImageScalarFieldEnum = {
  id: "id",
  productId: "productId",
  url: "url",
  altText: "altText",
  caption: "caption",
  width: "width",
  height: "height",
  size: "size",
  sortOrder: "sortOrder",
  imageType: "imageType",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.ProductCategoryScalarFieldEnum = {
  id: "id",
  productId: "productId",
  categoryId: "categoryId",
  createdAt: "createdAt",
};

exports.Prisma.CartItemScalarFieldEnum = {
  id: "id",
  userId: "userId",
  productId: "productId",
  quantity: "quantity",
  unitPrice: "unitPrice",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.OrderScalarFieldEnum = {
  id: "id",
  userId: "userId",
  orderNumber: "orderNumber",
  subtotal: "subtotal",
  taxAmount: "taxAmount",
  shippingCost: "shippingCost",
  discountAmount: "discountAmount",
  totalAmount: "totalAmount",
  status: "status",
  paymentStatus: "paymentStatus",
  customerEmail: "customerEmail",
  shippingAddress: "shippingAddress",
  billingAddress: "billingAddress",
  paymentMethod: "paymentMethod",
  paymentIntentId: "paymentIntentId",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  productId: "productId",
  productName: "productName",
  productSku: "productSku",
  quantity: "quantity",
  unitPrice: "unitPrice",
  totalPrice: "totalPrice",
  createdAt: "createdAt",
};

exports.Prisma.ReferralScalarFieldEnum = {
  id: "id",
  referrerId: "referrerId",
  referredId: "referredId",
  referralCode: "referralCode",
  email: "email",
  status: "status",
  commissionRate: "commissionRate",
  commissionEarned: "commissionEarned",
  clickCount: "clickCount",
  conversionAt: "conversionAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.SortOrder = {
  asc: "asc",
  desc: "desc",
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull,
};

exports.Prisma.QueryMode = {
  default: "default",
  insensitive: "insensitive",
};

exports.Prisma.NullsOrder = {
  first: "first",
  last: "last",
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull,
};
exports.ProductStatus = exports.$Enums.ProductStatus = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  ARCHIVED: "ARCHIVED",
};

exports.ImageType = exports.$Enums.ImageType = {
  THUMBNAIL: "THUMBNAIL",
  GALLERY: "GALLERY",
  HERO: "HERO",
  VARIANT: "VARIANT",
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
  PARTIALLY_REFUNDED: "PARTIALLY_REFUNDED",
};

exports.ReferralStatus = exports.$Enums.ReferralStatus = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  CONVERTED: "CONVERTED",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED",
};

exports.Prisma.ModelName = {
  User: "User",
  Account: "Account",
  Session: "Session",
  VerificationToken: "VerificationToken",
  Category: "Category",
  Product: "Product",
  ProductVariant: "ProductVariant",
  ProductImage: "ProductImage",
  ProductCategory: "ProductCategory",
  CartItem: "CartItem",
  Order: "Order",
  OrderItem: "OrderItem",
  Referral: "Referral",
};
/**
 * Create the Client
 */
const config = {
  generator: {
    name: "client",
    provider: {
      fromEnvVar: null,
      value: "prisma-client-js",
    },
    output: {
      value:
        "/home/aashish/www/code/ea-commerce/packages/database/src/generated/client",
      fromEnvVar: null,
    },
    config: {
      engineType: "library",
    },
    binaryTargets: [
      {
        fromEnvVar: null,
        value: "debian-openssl-3.0.x",
        native: true,
      },
    ],
    previewFeatures: [],
    sourceFilePath:
      "/home/aashish/www/code/ea-commerce/packages/database/prisma/schema.prisma",
    isCustomOutput: true,
  },
  relativeEnvPaths: {
    rootEnvPath: null,
  },
  relativePath: "../../../prisma",
  clientVersion: "5.22.0",
  engineVersion: "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  datasourceNames: ["db"],
  activeProvider: "postgresql",
  postinstall: false,
  inlineDatasources: {
    db: {
      url: {
        fromEnvVar: "DATABASE_URL",
        value: null,
      },
    },
  },
  inlineSchema:
    '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider = "prisma-client-js"\n  output   = "../src/generated/client"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nmodel User {\n  id            String    @id @default(cuid())\n  email         String    @unique\n  emailVerified DateTime? @map("email_verified")\n  name          String?\n  image         String?\n  password      String?\n  role          String    @default("USER")\n  createdAt     DateTime  @default(now()) @map("created_at")\n  updatedAt     DateTime  @updatedAt @map("updated_at")\n\n  // Auth.js required relations\n  accounts Account[]\n  sessions Session[]\n\n  // E-commerce relations\n  orders            Order[]\n  cartItems         CartItem[]\n  referralsGiven    Referral[] @relation("UserReferrals")\n  referralsReceived Referral[] @relation("UserReferred")\n\n  @@map("users")\n}\n\nmodel Account {\n  id                String   @id @default(cuid())\n  userId            String   @map("user_id")\n  type              String\n  provider          String\n  providerAccountId String   @map("provider_account_id")\n  refresh_token     String?\n  access_token      String?\n  expires_at        Int?\n  token_type        String?\n  scope             String?\n  id_token          String?\n  session_state     String?\n  createdAt         DateTime @default(now()) @map("created_at")\n  updatedAt         DateTime @updatedAt @map("updated_at")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([provider, providerAccountId])\n  @@map("accounts")\n}\n\nmodel Session {\n  id           String   @id @default(cuid())\n  sessionToken String   @unique @map("session_token")\n  userId       String   @map("user_id")\n  expires      DateTime\n  createdAt    DateTime @default(now()) @map("created_at")\n  updatedAt    DateTime @updatedAt @map("updated_at")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map("sessions")\n}\n\nmodel VerificationToken {\n  identifier String\n  token      String   @unique\n  expires    DateTime\n  createdAt  DateTime @default(now()) @map("created_at")\n\n  @@unique([identifier, token])\n  @@map("verification_tokens")\n}\n\n// ================================\n// PRODUCT MANAGEMENT MODELS\n// ================================\n\nmodel Category {\n  id             String   @id @default(cuid())\n  name           String\n  slug           String   @unique\n  description    String?  @db.Text\n  image          String?\n  parentId       String?  @map("parent_id")\n  isActive       Boolean  @default(true) @map("is_active")\n  sortOrder      Int      @default(0) @map("sort_order")\n  seoTitle       String?  @map("seo_title")\n  seoDescription String?  @map("seo_description")\n  createdAt      DateTime @default(now()) @map("created_at")\n  updatedAt      DateTime @updatedAt @map("updated_at")\n\n  // Hierarchical relations\n  parent   Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])\n  children Category[] @relation("CategoryHierarchy")\n\n  // Product relations\n  productCategories ProductCategory[]\n\n  @@index([parentId])\n  @@index([slug])\n  @@index([isActive])\n  @@map("categories")\n}\n\nmodel Product {\n  id               String  @id @default(cuid())\n  name             String\n  slug             String  @unique\n  description      String? @db.Text\n  shortDescription String? @map("short_description") @db.Text\n  sku              String? @unique\n\n  // Pricing\n  basePrice Decimal  @map("base_price") @db.Decimal(10, 2)\n  salePrice Decimal? @map("sale_price") @db.Decimal(10, 2)\n  costPrice Decimal? @map("cost_price") @db.Decimal(10, 2)\n\n  // Inventory\n  stockQuantity     Int     @default(0) @map("stock_quantity")\n  lowStockThreshold Int     @default(5) @map("low_stock_threshold")\n  trackInventory    Boolean @default(true) @map("track_inventory")\n  allowBackorder    Boolean @default(false) @map("allow_backorder")\n\n  // Product attributes\n  weight     Decimal? @db.Decimal(8, 3)\n  dimensions String? // JSON: {length, width, height}\n\n  // SEO & Marketing\n  seoTitle       String?  @map("seo_title")\n  seoDescription String?  @map("seo_description")\n  tags           String[] // Array of tags for search\n\n  // Status & Visibility\n  status      ProductStatus @default(DRAFT)\n  isActive    Boolean       @default(true) @map("is_active")\n  isFeatured  Boolean       @default(false) @map("is_featured")\n  publishedAt DateTime?     @map("published_at")\n\n  // Timestamps\n  createdAt DateTime @default(now()) @map("created_at")\n  updatedAt DateTime @updatedAt @map("updated_at")\n\n  // Relations\n  variants          ProductVariant[]\n  images            ProductImage[]\n  productCategories ProductCategory[]\n  cartItems         CartItem[]\n  orderItems        OrderItem[]\n\n  @@index([slug])\n  @@index([status])\n  @@index([isActive])\n  @@index([isFeatured])\n  @@index([basePrice])\n  @@index([createdAt])\n  @@map("products")\n}\n\nmodel ProductVariant {\n  id        String @id @default(cuid())\n  productId String @map("product_id")\n\n  // Variant identification\n  sku  String  @unique\n  name String? // e.g., "Red - Large"\n\n  // Variant-specific pricing\n  price          Decimal  @db.Decimal(10, 2)\n  compareAtPrice Decimal? @map("compare_at_price") @db.Decimal(10, 2)\n  costPrice      Decimal? @map("cost_price") @db.Decimal(10, 2)\n\n  // Inventory for this variant\n  stockQuantity Int @default(0) @map("stock_quantity")\n\n  // Variant attributes (JSON)\n  attributes Json // e.g., {"color": "red", "size": "large"}\n\n  // Physical attributes\n  weight  Decimal? @db.Decimal(8, 3)\n  barcode String?  @unique\n\n  // Status\n  isActive  Boolean  @default(true) @map("is_active")\n  createdAt DateTime @default(now()) @map("created_at")\n  updatedAt DateTime @updatedAt @map("updated_at")\n\n  // Relations\n  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  @@index([productId])\n  @@index([sku])\n  @@index([isActive])\n  @@map("product_variants")\n}\n\nmodel ProductImage {\n  id        String @id @default(cuid())\n  productId String @map("product_id")\n\n  url     String\n  altText String? @map("alt_text")\n  caption String?\n\n  // Image properties\n  width  Int?\n  height Int?\n  size   Int? // File size in bytes\n\n  // Organization\n  sortOrder Int       @default(0) @map("sort_order")\n  imageType ImageType @default(GALLERY) @map("image_type")\n\n  // Status\n  isActive  Boolean  @default(true) @map("is_active")\n  createdAt DateTime @default(now()) @map("created_at")\n  updatedAt DateTime @updatedAt @map("updated_at")\n\n  // Relations\n  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  @@index([productId])\n  @@index([imageType])\n  @@index([sortOrder])\n  @@map("product_images")\n}\n\n// Junction table for many-to-many relationship\nmodel ProductCategory {\n  id         String @id @default(cuid())\n  productId  String @map("product_id")\n  categoryId String @map("category_id")\n\n  createdAt DateTime @default(now()) @map("created_at")\n\n  // Relations\n  product  Product  @relation(fields: [productId], references: [id], onDelete: Cascade)\n  category Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)\n\n  @@unique([productId, categoryId])\n  @@index([productId])\n  @@index([categoryId])\n  @@map("product_categories")\n}\n\n// ================================\n// SHOPPING & ORDERS (Phase 2.2)\n// ================================\n\nmodel CartItem {\n  id        String @id @default(cuid())\n  userId    String @map("user_id")\n  productId String @map("product_id")\n\n  quantity  Int\n  unitPrice Decimal @map("unit_price") @db.Decimal(10, 2)\n\n  createdAt DateTime @default(now()) @map("created_at")\n  updatedAt DateTime @updatedAt @map("updated_at")\n\n  // Relations\n  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, productId])\n  @@index([userId])\n  @@index([productId])\n  @@map("cart_items")\n}\n\nmodel Order {\n  id          String @id @default(cuid())\n  userId      String @map("user_id")\n  orderNumber String @unique @map("order_number")\n\n  // Order totals\n  subtotal       Decimal @db.Decimal(10, 2)\n  taxAmount      Decimal @default(0) @map("tax_amount") @db.Decimal(10, 2)\n  shippingCost   Decimal @default(0) @map("shipping_cost") @db.Decimal(10, 2)\n  discountAmount Decimal @default(0) @map("discount_amount") @db.Decimal(10, 2)\n  totalAmount    Decimal @map("total_amount") @db.Decimal(10, 2)\n\n  // Order status\n  status        OrderStatus   @default(PENDING)\n  paymentStatus PaymentStatus @default(PENDING) @map("payment_status")\n\n  // Customer info (snapshot at time of order)\n  customerEmail   String @map("customer_email")\n  shippingAddress Json   @map("shipping_address")\n  billingAddress  Json   @map("billing_address")\n\n  // Payment info\n  paymentMethod   String? @map("payment_method")\n  paymentIntentId String? @map("payment_intent_id")\n\n  // Timestamps\n  createdAt DateTime @default(now()) @map("created_at")\n  updatedAt DateTime @updatedAt @map("updated_at")\n\n  // Relations\n  user       User        @relation(fields: [userId], references: [id])\n  orderItems OrderItem[]\n\n  @@index([userId])\n  @@index([orderNumber])\n  @@index([status])\n  @@index([createdAt])\n  @@map("orders")\n}\n\nmodel OrderItem {\n  id        String @id @default(cuid())\n  orderId   String @map("order_id")\n  productId String @map("product_id")\n\n  // Item details (snapshot at time of order)\n  productName String  @map("product_name")\n  productSku  String? @map("product_sku")\n\n  quantity   Int\n  unitPrice  Decimal @map("unit_price") @db.Decimal(10, 2)\n  totalPrice Decimal @map("total_price") @db.Decimal(10, 2)\n\n  createdAt DateTime @default(now()) @map("created_at")\n\n  // Relations\n  order   Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  product Product @relation(fields: [productId], references: [id])\n\n  @@index([orderId])\n  @@index([productId])\n  @@map("order_items")\n}\n\n// ================================\n// REFERRALS (Phase 4.1)\n// ================================\n\nmodel Referral {\n  id         String  @id @default(cuid())\n  referrerId String  @map("referrer_id")\n  referredId String? @map("referred_id")\n\n  referralCode String  @unique @map("referral_code")\n  email        String? // Email of person being referred\n\n  status ReferralStatus @default(PENDING)\n\n  // Commission details\n  commissionRate   Decimal @default(0) @map("commission_rate") @db.Decimal(5, 4) // e.g., 0.0500 = 5%\n  commissionEarned Decimal @default(0) @map("commission_earned") @db.Decimal(10, 2)\n\n  // Tracking\n  clickCount   Int       @default(0) @map("click_count")\n  conversionAt DateTime? @map("conversion_at")\n\n  createdAt DateTime @default(now()) @map("created_at")\n  updatedAt DateTime @updatedAt @map("updated_at")\n\n  // Relations\n  referrer User  @relation("UserReferrals", fields: [referrerId], references: [id])\n  referred User? @relation("UserReferred", fields: [referredId], references: [id])\n\n  @@index([referrerId])\n  @@index([referralCode])\n  @@index([status])\n  @@map("referrals")\n}\n\n// ================================\n// ENUMS\n// ================================\n\nenum ProductStatus {\n  DRAFT\n  ACTIVE\n  INACTIVE\n  ARCHIVED\n}\n\nenum ImageType {\n  THUMBNAIL\n  GALLERY\n  HERO\n  VARIANT\n}\n\nenum OrderStatus {\n  PENDING\n  CONFIRMED\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n  REFUNDED\n}\n\nenum PaymentStatus {\n  PENDING\n  PAID\n  FAILED\n  REFUNDED\n  PARTIALLY_REFUNDED\n}\n\nenum ReferralStatus {\n  PENDING\n  ACTIVE\n  CONVERTED\n  EXPIRED\n  CANCELLED\n}\n',
  inlineSchemaHash:
    "362fc7b8943ebf302b32fc239f24a157a365e7ed8edc23caa1c2b4b4f2b2df5e",
  copyEngine: true,
};
config.dirname = "/";

config.runtimeDataModel = JSON.parse(
  '{"models":{"User":{"dbName":"users","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"emailVerified","dbName":"email_verified","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"image","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"password","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"role","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"USER","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"accounts","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Account","relationName":"AccountToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"sessions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Session","relationName":"SessionToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"orders","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Order","relationName":"OrderToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"cartItems","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CartItem","relationName":"CartItemToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"referralsGiven","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Referral","relationName":"UserReferrals","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"referralsReceived","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Referral","relationName":"UserReferred","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Account":{"dbName":"accounts","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","dbName":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"provider","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"providerAccountId","dbName":"provider_account_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"refresh_token","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"access_token","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"expires_at","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"token_type","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"scope","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"id_token","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"session_state","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"AccountToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["provider","providerAccountId"]],"uniqueIndexes":[{"name":null,"fields":["provider","providerAccountId"]}],"isGenerated":false},"Session":{"dbName":"sessions","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"sessionToken","dbName":"session_token","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"userId","dbName":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"expires","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"SessionToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"VerificationToken":{"dbName":"verification_tokens","fields":[{"name":"identifier","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"token","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"expires","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["identifier","token"]],"uniqueIndexes":[{"name":null,"fields":["identifier","token"]}],"isGenerated":false},"Category":{"dbName":"categories","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"slug","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"image","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"parentId","dbName":"parent_id","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"isActive","dbName":"is_active","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"sortOrder","dbName":"sort_order","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"seoTitle","dbName":"seo_title","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"seoDescription","dbName":"seo_description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"parent","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Category","relationName":"CategoryHierarchy","relationFromFields":["parentId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"children","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Category","relationName":"CategoryHierarchy","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"productCategories","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ProductCategory","relationName":"CategoryToProductCategory","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Product":{"dbName":"products","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"slug","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"shortDescription","dbName":"short_description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"sku","kind":"scalar","isList":false,"isRequired":false,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"basePrice","dbName":"base_price","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"salePrice","dbName":"sale_price","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"costPrice","dbName":"cost_price","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"stockQuantity","dbName":"stock_quantity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"lowStockThreshold","dbName":"low_stock_threshold","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":5,"isGenerated":false,"isUpdatedAt":false},{"name":"trackInventory","dbName":"track_inventory","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"allowBackorder","dbName":"allow_backorder","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"weight","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"dimensions","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"seoTitle","dbName":"seo_title","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"seoDescription","dbName":"seo_description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"tags","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ProductStatus","default":"DRAFT","isGenerated":false,"isUpdatedAt":false},{"name":"isActive","dbName":"is_active","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"isFeatured","dbName":"is_featured","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"publishedAt","dbName":"published_at","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"variants","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ProductVariant","relationName":"ProductToProductVariant","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"images","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ProductImage","relationName":"ProductToProductImage","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"productCategories","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ProductCategory","relationName":"ProductToProductCategory","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"cartItems","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CartItem","relationName":"CartItemToProduct","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"orderItems","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"OrderItem","relationName":"OrderItemToProduct","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"ProductVariant":{"dbName":"product_variants","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"productId","dbName":"product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"sku","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"price","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"compareAtPrice","dbName":"compare_at_price","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"costPrice","dbName":"cost_price","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"stockQuantity","dbName":"stock_quantity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"attributes","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"weight","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"barcode","kind":"scalar","isList":false,"isRequired":false,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"isActive","dbName":"is_active","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"product","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","relationName":"ProductToProductVariant","relationFromFields":["productId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"ProductImage":{"dbName":"product_images","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"productId","dbName":"product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"url","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"altText","dbName":"alt_text","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"caption","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"width","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"height","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"size","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"sortOrder","dbName":"sort_order","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"imageType","dbName":"image_type","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ImageType","default":"GALLERY","isGenerated":false,"isUpdatedAt":false},{"name":"isActive","dbName":"is_active","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"product","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","relationName":"ProductToProductImage","relationFromFields":["productId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"ProductCategory":{"dbName":"product_categories","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"productId","dbName":"product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"categoryId","dbName":"category_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"product","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","relationName":"ProductToProductCategory","relationFromFields":["productId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"category","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Category","relationName":"CategoryToProductCategory","relationFromFields":["categoryId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["productId","categoryId"]],"uniqueIndexes":[{"name":null,"fields":["productId","categoryId"]}],"isGenerated":false},"CartItem":{"dbName":"cart_items","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","dbName":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"productId","dbName":"product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"quantity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"unitPrice","dbName":"unit_price","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"CartItemToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"product","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","relationName":"CartItemToProduct","relationFromFields":["productId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["userId","productId"]],"uniqueIndexes":[{"name":null,"fields":["userId","productId"]}],"isGenerated":false},"Order":{"dbName":"orders","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","dbName":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"orderNumber","dbName":"order_number","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"subtotal","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"taxAmount","dbName":"tax_amount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Decimal","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"shippingCost","dbName":"shipping_cost","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Decimal","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"discountAmount","dbName":"discount_amount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Decimal","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"totalAmount","dbName":"total_amount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"OrderStatus","default":"PENDING","isGenerated":false,"isUpdatedAt":false},{"name":"paymentStatus","dbName":"payment_status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"PaymentStatus","default":"PENDING","isGenerated":false,"isUpdatedAt":false},{"name":"customerEmail","dbName":"customer_email","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"shippingAddress","dbName":"shipping_address","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"billingAddress","dbName":"billing_address","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"paymentMethod","dbName":"payment_method","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"paymentIntentId","dbName":"payment_intent_id","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"OrderToUser","relationFromFields":["userId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"orderItems","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"OrderItem","relationName":"OrderToOrderItem","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"OrderItem":{"dbName":"order_items","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"orderId","dbName":"order_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"productId","dbName":"product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"productName","dbName":"product_name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"productSku","dbName":"product_sku","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"quantity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"unitPrice","dbName":"unit_price","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"totalPrice","dbName":"total_price","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"order","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Order","relationName":"OrderToOrderItem","relationFromFields":["orderId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"product","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","relationName":"OrderItemToProduct","relationFromFields":["productId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Referral":{"dbName":"referrals","fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"referrerId","dbName":"referrer_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"referredId","dbName":"referred_id","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"referralCode","dbName":"referral_code","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ReferralStatus","default":"PENDING","isGenerated":false,"isUpdatedAt":false},{"name":"commissionRate","dbName":"commission_rate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Decimal","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"commissionEarned","dbName":"commission_earned","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Decimal","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"clickCount","dbName":"click_count","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"conversionAt","dbName":"conversion_at","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"referrer","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"UserReferrals","relationFromFields":["referrerId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"referred","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"UserReferred","relationFromFields":["referredId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{"ProductStatus":{"values":[{"name":"DRAFT","dbName":null},{"name":"ACTIVE","dbName":null},{"name":"INACTIVE","dbName":null},{"name":"ARCHIVED","dbName":null}],"dbName":null},"ImageType":{"values":[{"name":"THUMBNAIL","dbName":null},{"name":"GALLERY","dbName":null},{"name":"HERO","dbName":null},{"name":"VARIANT","dbName":null}],"dbName":null},"OrderStatus":{"values":[{"name":"PENDING","dbName":null},{"name":"CONFIRMED","dbName":null},{"name":"PROCESSING","dbName":null},{"name":"SHIPPED","dbName":null},{"name":"DELIVERED","dbName":null},{"name":"CANCELLED","dbName":null},{"name":"REFUNDED","dbName":null}],"dbName":null},"PaymentStatus":{"values":[{"name":"PENDING","dbName":null},{"name":"PAID","dbName":null},{"name":"FAILED","dbName":null},{"name":"REFUNDED","dbName":null},{"name":"PARTIALLY_REFUNDED","dbName":null}],"dbName":null},"ReferralStatus":{"values":[{"name":"PENDING","dbName":null},{"name":"ACTIVE","dbName":null},{"name":"CONVERTED","dbName":null},{"name":"EXPIRED","dbName":null},{"name":"CANCELLED","dbName":null}],"dbName":null}},"types":{}}',
);
defineDmmfProperty(exports.Prisma, config.runtimeDataModel);
config.engineWasm = undefined;

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL:
      (typeof globalThis !== "undefined" && globalThis["DATABASE_URL"]) ||
      (typeof process !== "undefined" &&
        process.env &&
        process.env.DATABASE_URL) ||
      undefined,
  },
});

if (
  (typeof globalThis !== "undefined" && globalThis["DEBUG"]) ||
  (typeof process !== "undefined" && process.env && process.env.DEBUG) ||
  undefined
) {
  Debug.enable(
    (typeof globalThis !== "undefined" && globalThis["DEBUG"]) ||
      (typeof process !== "undefined" && process.env && process.env.DEBUG) ||
      undefined,
  );
}

const PrismaClient = getPrismaClient(config);
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);
