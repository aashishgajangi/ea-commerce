/**
 * Client
 **/

import * as runtime from "./runtime/library.js";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Account
 *
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>;
/**
 * Model Session
 *
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>;
/**
 * Model VerificationToken
 *
 */
export type VerificationToken =
  $Result.DefaultSelection<Prisma.$VerificationTokenPayload>;
/**
 * Model Category
 *
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>;
/**
 * Model Product
 *
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>;
/**
 * Model ProductVariant
 *
 */
export type ProductVariant =
  $Result.DefaultSelection<Prisma.$ProductVariantPayload>;
/**
 * Model ProductImage
 *
 */
export type ProductImage =
  $Result.DefaultSelection<Prisma.$ProductImagePayload>;
/**
 * Model ProductCategory
 *
 */
export type ProductCategory =
  $Result.DefaultSelection<Prisma.$ProductCategoryPayload>;
/**
 * Model CartItem
 *
 */
export type CartItem = $Result.DefaultSelection<Prisma.$CartItemPayload>;
/**
 * Model Order
 *
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>;
/**
 * Model OrderItem
 *
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>;
/**
 * Model Referral
 *
 */
export type Referral = $Result.DefaultSelection<Prisma.$ReferralPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const ProductStatus: {
    DRAFT: "DRAFT";
    ACTIVE: "ACTIVE";
    INACTIVE: "INACTIVE";
    ARCHIVED: "ARCHIVED";
  };

  export type ProductStatus =
    (typeof ProductStatus)[keyof typeof ProductStatus];

  export const ImageType: {
    THUMBNAIL: "THUMBNAIL";
    GALLERY: "GALLERY";
    HERO: "HERO";
    VARIANT: "VARIANT";
  };

  export type ImageType = (typeof ImageType)[keyof typeof ImageType];

  export const OrderStatus: {
    PENDING: "PENDING";
    CONFIRMED: "CONFIRMED";
    PROCESSING: "PROCESSING";
    SHIPPED: "SHIPPED";
    DELIVERED: "DELIVERED";
    CANCELLED: "CANCELLED";
    REFUNDED: "REFUNDED";
  };

  export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

  export const PaymentStatus: {
    PENDING: "PENDING";
    PAID: "PAID";
    FAILED: "FAILED";
    REFUNDED: "REFUNDED";
    PARTIALLY_REFUNDED: "PARTIALLY_REFUNDED";
  };

  export type PaymentStatus =
    (typeof PaymentStatus)[keyof typeof PaymentStatus];

  export const ReferralStatus: {
    PENDING: "PENDING";
    ACTIVE: "ACTIVE";
    CONVERTED: "CONVERTED";
    EXPIRED: "EXPIRED";
    CANCELLED: "CANCELLED";
  };

  export type ReferralStatus =
    (typeof ReferralStatus)[keyof typeof ReferralStatus];
}

export type ProductStatus = $Enums.ProductStatus;

export const ProductStatus: typeof $Enums.ProductStatus;

export type ImageType = $Enums.ImageType;

export const ImageType: typeof $Enums.ImageType;

export type OrderStatus = $Enums.OrderStatus;

export const OrderStatus: typeof $Enums.OrderStatus;

export type PaymentStatus = $Enums.PaymentStatus;

export const PaymentStatus: typeof $Enums.PaymentStatus;

export type ReferralStatus = $Enums.ReferralStatus;

export const ReferralStatus: typeof $Enums.ReferralStatus;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = "log" extends keyof ClientOptions
    ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions["log"]>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   */
  get account(): Prisma.AccountDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more VerificationTokens
   * const verificationTokens = await prisma.verificationToken.findMany()
   * ```
   */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Categories
   * const categories = await prisma.category.findMany()
   * ```
   */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Products
   * const products = await prisma.product.findMany()
   * ```
   */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.productVariant`: Exposes CRUD operations for the **ProductVariant** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ProductVariants
   * const productVariants = await prisma.productVariant.findMany()
   * ```
   */
  get productVariant(): Prisma.ProductVariantDelegate<ExtArgs>;

  /**
   * `prisma.productImage`: Exposes CRUD operations for the **ProductImage** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ProductImages
   * const productImages = await prisma.productImage.findMany()
   * ```
   */
  get productImage(): Prisma.ProductImageDelegate<ExtArgs>;

  /**
   * `prisma.productCategory`: Exposes CRUD operations for the **ProductCategory** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ProductCategories
   * const productCategories = await prisma.productCategory.findMany()
   * ```
   */
  get productCategory(): Prisma.ProductCategoryDelegate<ExtArgs>;

  /**
   * `prisma.cartItem`: Exposes CRUD operations for the **CartItem** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more CartItems
   * const cartItems = await prisma.cartItem.findMany()
   * ```
   */
  get cartItem(): Prisma.CartItemDelegate<ExtArgs>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Orders
   * const orders = await prisma.order.findMany()
   * ```
   */
  get order(): Prisma.OrderDelegate<ExtArgs>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more OrderItems
   * const orderItems = await prisma.orderItem.findMany()
   * ```
   */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs>;

  /**
   * `prisma.referral`: Exposes CRUD operations for the **Referral** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Referrals
   * const referrals = await prisma.referral.findMany()
   * ```
   */
  get referral(): Prisma.ReferralDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;
  export import NotFoundError = runtime.NotFoundError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
      ? "Please either choose `select` or `omit`."
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? K : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: "User";
    Account: "Account";
    Session: "Session";
    VerificationToken: "VerificationToken";
    Category: "Category";
    Product: "Product";
    ProductVariant: "ProductVariant";
    ProductImage: "ProductImage";
    ProductCategory: "ProductCategory";
    CartItem: "CartItem";
    Order: "Order";
    OrderItem: "OrderItem";
    Referral: "Referral";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs; clientOptions: PrismaClientOptions },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<
      this["params"]["extArgs"],
      this["params"]["clientOptions"]
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    ClientOptions = {},
  > = {
    meta: {
      modelProps:
        | "user"
        | "account"
        | "session"
        | "verificationToken"
        | "category"
        | "product"
        | "productVariant"
        | "productImage"
        | "productCategory"
        | "cartItem"
        | "order"
        | "orderItem"
        | "referral";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>;
        fields: Prisma.AccountFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAccount>;
          };
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AccountGroupByOutputType>[];
          };
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>;
            result: $Utils.Optional<AccountCountAggregateOutputType> | number;
          };
        };
      };
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>;
        fields: Prisma.SessionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSession>;
          };
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SessionGroupByOutputType>[];
          };
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>;
            result: $Utils.Optional<SessionCountAggregateOutputType> | number;
          };
        };
      };
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>;
        fields: Prisma.VerificationTokenFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
          };
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
          };
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateVerificationToken>;
          };
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>;
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[];
          };
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<VerificationTokenCountAggregateOutputType>
              | number;
          };
        };
      };
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>;
        fields: Prisma.CategoryFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[];
          };
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[];
          };
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>;
          };
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateCategory>;
          };
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>;
            result: $Utils.Optional<CategoryGroupByOutputType>[];
          };
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>;
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number;
          };
        };
      };
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>;
        fields: Prisma.ProductFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[];
          };
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[];
          };
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateProduct>;
          };
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ProductGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>;
            result: $Utils.Optional<ProductCountAggregateOutputType> | number;
          };
        };
      };
      ProductVariant: {
        payload: Prisma.$ProductVariantPayload<ExtArgs>;
        fields: Prisma.ProductVariantFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProductVariantFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProductVariantFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
          };
          findFirst: {
            args: Prisma.ProductVariantFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProductVariantFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
          };
          findMany: {
            args: Prisma.ProductVariantFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[];
          };
          create: {
            args: Prisma.ProductVariantCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
          };
          createMany: {
            args: Prisma.ProductVariantCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ProductVariantCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[];
          };
          delete: {
            args: Prisma.ProductVariantDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
          };
          update: {
            args: Prisma.ProductVariantUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
          };
          deleteMany: {
            args: Prisma.ProductVariantDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ProductVariantUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.ProductVariantUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
          };
          aggregate: {
            args: Prisma.ProductVariantAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateProductVariant>;
          };
          groupBy: {
            args: Prisma.ProductVariantGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ProductVariantGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProductVariantCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<ProductVariantCountAggregateOutputType>
              | number;
          };
        };
      };
      ProductImage: {
        payload: Prisma.$ProductImagePayload<ExtArgs>;
        fields: Prisma.ProductImageFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProductImageFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProductImageFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>;
          };
          findFirst: {
            args: Prisma.ProductImageFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProductImageFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>;
          };
          findMany: {
            args: Prisma.ProductImageFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[];
          };
          create: {
            args: Prisma.ProductImageCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>;
          };
          createMany: {
            args: Prisma.ProductImageCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ProductImageCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[];
          };
          delete: {
            args: Prisma.ProductImageDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>;
          };
          update: {
            args: Prisma.ProductImageUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>;
          };
          deleteMany: {
            args: Prisma.ProductImageDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ProductImageUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.ProductImageUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>;
          };
          aggregate: {
            args: Prisma.ProductImageAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateProductImage>;
          };
          groupBy: {
            args: Prisma.ProductImageGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ProductImageGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProductImageCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<ProductImageCountAggregateOutputType>
              | number;
          };
        };
      };
      ProductCategory: {
        payload: Prisma.$ProductCategoryPayload<ExtArgs>;
        fields: Prisma.ProductCategoryFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProductCategoryFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProductCategoryFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>;
          };
          findFirst: {
            args: Prisma.ProductCategoryFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProductCategoryFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>;
          };
          findMany: {
            args: Prisma.ProductCategoryFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>[];
          };
          create: {
            args: Prisma.ProductCategoryCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>;
          };
          createMany: {
            args: Prisma.ProductCategoryCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ProductCategoryCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>[];
          };
          delete: {
            args: Prisma.ProductCategoryDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>;
          };
          update: {
            args: Prisma.ProductCategoryUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>;
          };
          deleteMany: {
            args: Prisma.ProductCategoryDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ProductCategoryUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.ProductCategoryUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductCategoryPayload>;
          };
          aggregate: {
            args: Prisma.ProductCategoryAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateProductCategory>;
          };
          groupBy: {
            args: Prisma.ProductCategoryGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ProductCategoryGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProductCategoryCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<ProductCategoryCountAggregateOutputType>
              | number;
          };
        };
      };
      CartItem: {
        payload: Prisma.$CartItemPayload<ExtArgs>;
        fields: Prisma.CartItemFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CartItemFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CartItemFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>;
          };
          findFirst: {
            args: Prisma.CartItemFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CartItemFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>;
          };
          findMany: {
            args: Prisma.CartItemFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>[];
          };
          create: {
            args: Prisma.CartItemCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>;
          };
          createMany: {
            args: Prisma.CartItemCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.CartItemCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>[];
          };
          delete: {
            args: Prisma.CartItemDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>;
          };
          update: {
            args: Prisma.CartItemUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>;
          };
          deleteMany: {
            args: Prisma.CartItemDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CartItemUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.CartItemUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>;
          };
          aggregate: {
            args: Prisma.CartItemAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateCartItem>;
          };
          groupBy: {
            args: Prisma.CartItemGroupByArgs<ExtArgs>;
            result: $Utils.Optional<CartItemGroupByOutputType>[];
          };
          count: {
            args: Prisma.CartItemCountArgs<ExtArgs>;
            result: $Utils.Optional<CartItemCountAggregateOutputType> | number;
          };
        };
      };
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>;
        fields: Prisma.OrderFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[];
          };
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[];
          };
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateOrder>;
          };
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>;
            result: $Utils.Optional<OrderGroupByOutputType>[];
          };
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>;
            result: $Utils.Optional<OrderCountAggregateOutputType> | number;
          };
        };
      };
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>;
        fields: Prisma.OrderItemFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
          };
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
          };
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateOrderItem>;
          };
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>;
            result: $Utils.Optional<OrderItemGroupByOutputType>[];
          };
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>;
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number;
          };
        };
      };
      Referral: {
        payload: Prisma.$ReferralPayload<ExtArgs>;
        fields: Prisma.ReferralFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ReferralFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ReferralFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>;
          };
          findFirst: {
            args: Prisma.ReferralFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ReferralFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>;
          };
          findMany: {
            args: Prisma.ReferralFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>[];
          };
          create: {
            args: Prisma.ReferralCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>;
          };
          createMany: {
            args: Prisma.ReferralCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ReferralCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>[];
          };
          delete: {
            args: Prisma.ReferralDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>;
          };
          update: {
            args: Prisma.ReferralUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>;
          };
          deleteMany: {
            args: Prisma.ReferralDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ReferralUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.ReferralUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReferralPayload>;
          };
          aggregate: {
            args: Prisma.ReferralAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateReferral>;
          };
          groupBy: {
            args: Prisma.ReferralGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ReferralGroupByOutputType>[];
          };
          count: {
            args: Prisma.ReferralCountArgs<ExtArgs>;
            result: $Utils.Optional<ReferralCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    "define",
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
  }

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T["emit"] extends "event"
        ? T["level"]
        : never
      : never;
  export type GetEvents<T extends any> =
    T extends Array<LogLevel | LogDefinition>
      ?
          | GetLogType<T[0]>
          | GetLogType<T[1]>
          | GetLogType<T[2]>
          | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number;
    sessions: number;
    orders: number;
    cartItems: number;
    referralsGiven: number;
    referralsReceived: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs;
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
    orders?: boolean | UserCountOutputTypeCountOrdersArgs;
    cartItems?: boolean | UserCountOutputTypeCountCartItemsArgs;
    referralsGiven?: boolean | UserCountOutputTypeCountReferralsGivenArgs;
    referralsReceived?: boolean | UserCountOutputTypeCountReferralsReceivedArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AccountWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCartItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CartItemWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReferralsGivenArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ReferralWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReferralsReceivedArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ReferralWhereInput;
  };

  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    children: number;
    productCategories: number;
  };

  export type CategoryCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    children?: boolean | CategoryCountOutputTypeCountChildrenArgs;
    productCategories?:
      | boolean
      | CategoryCountOutputTypeCountProductCategoriesArgs;
  };

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountChildrenArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CategoryWhereInput;
  };

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductCategoriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductCategoryWhereInput;
  };

  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    variants: number;
    images: number;
    productCategories: number;
    cartItems: number;
    orderItems: number;
  };

  export type ProductCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    variants?: boolean | ProductCountOutputTypeCountVariantsArgs;
    images?: boolean | ProductCountOutputTypeCountImagesArgs;
    productCategories?:
      | boolean
      | ProductCountOutputTypeCountProductCategoriesArgs;
    cartItems?: boolean | ProductCountOutputTypeCountCartItemsArgs;
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs;
  };

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountVariantsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductVariantWhereInput;
  };

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountImagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductImageWhereInput;
  };

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountProductCategoriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductCategoryWhereInput;
  };

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountCartItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CartItemWhereInput;
  };

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderItemWhereInput;
  };

  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    orderItems: number;
  };

  export type OrderCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    orderItems?: boolean | OrderCountOutputTypeCountOrderItemsArgs;
  };

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountOrderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderItemWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    emailVerified: Date | null;
    name: string | null;
    image: string | null;
    password: string | null;
    role: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    emailVerified: Date | null;
    name: string | null;
    image: string | null;
    password: string | null;
    role: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    emailVerified: number;
    name: number;
    image: number;
    password: number;
    role: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    emailVerified?: true;
    name?: true;
    image?: true;
    password?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    emailVerified?: true;
    name?: true;
    image?: true;
    password?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    emailVerified?: true;
    name?: true;
    image?: true;
    password?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    email: string;
    emailVerified: Date | null;
    name: string | null;
    image: string | null;
    password: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      emailVerified?: boolean;
      name?: boolean;
      image?: boolean;
      password?: boolean;
      role?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      accounts?: boolean | User$accountsArgs<ExtArgs>;
      sessions?: boolean | User$sessionsArgs<ExtArgs>;
      orders?: boolean | User$ordersArgs<ExtArgs>;
      cartItems?: boolean | User$cartItemsArgs<ExtArgs>;
      referralsGiven?: boolean | User$referralsGivenArgs<ExtArgs>;
      referralsReceived?: boolean | User$referralsReceivedArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      emailVerified?: boolean;
      name?: boolean;
      image?: boolean;
      password?: boolean;
      role?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    emailVerified?: boolean;
    name?: boolean;
    image?: boolean;
    password?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    accounts?: boolean | User$accountsArgs<ExtArgs>;
    sessions?: boolean | User$sessionsArgs<ExtArgs>;
    orders?: boolean | User$ordersArgs<ExtArgs>;
    cartItems?: boolean | User$cartItemsArgs<ExtArgs>;
    referralsGiven?: boolean | User$referralsGivenArgs<ExtArgs>;
    referralsReceived?: boolean | User$referralsReceivedArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "User";
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[];
      sessions: Prisma.$SessionPayload<ExtArgs>[];
      orders: Prisma.$OrderPayload<ExtArgs>[];
      cartItems: Prisma.$CartItemPayload<ExtArgs>[];
      referralsGiven: Prisma.$ReferralPayload<ExtArgs>[];
      referralsReceived: Prisma.$ReferralPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        email: string;
        emailVerified: Date | null;
        name: string | null;
        image: string | null;
        password: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["user"]
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
    $Result.GetResult<Prisma.$UserPayload, S>;

  type UserCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, "select" | "include" | "distinct"> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["User"];
      meta: { name: "User" };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs["orderBy"] }
        : { orderBy?: UserGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$accountsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany"> | Null
    >;
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$sessionsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null
    >;
    orders<T extends User$ordersArgs<ExtArgs> = {}>(
      args?: Subset<T, User$ordersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany"> | Null
    >;
    cartItems<T extends User$cartItemsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$cartItemsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany"> | Null
    >;
    referralsGiven<T extends User$referralsGivenArgs<ExtArgs> = {}>(
      args?: Subset<T, User$referralsGivenArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findMany"> | Null
    >;
    referralsReceived<T extends User$referralsReceivedArgs<ExtArgs> = {}>(
      args?: Subset<T, User$referralsReceivedArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findMany"> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", "String">;
    readonly email: FieldRef<"User", "String">;
    readonly emailVerified: FieldRef<"User", "DateTime">;
    readonly name: FieldRef<"User", "String">;
    readonly image: FieldRef<"User", "String">;
    readonly password: FieldRef<"User", "String">;
    readonly role: FieldRef<"User", "String">;
    readonly createdAt: FieldRef<"User", "DateTime">;
    readonly updatedAt: FieldRef<"User", "DateTime">;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
  };

  /**
   * User.accounts
   */
  export type User$accountsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    where?: AccountWhereInput;
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    cursor?: AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * User.sessions
   */
  export type User$sessionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    where?: SessionWhereInput;
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    cursor?: SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * User.orders
   */
  export type User$ordersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    where?: OrderWhereInput;
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    cursor?: OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * User.cartItems
   */
  export type User$cartItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null;
    where?: CartItemWhereInput;
    orderBy?:
      | CartItemOrderByWithRelationInput
      | CartItemOrderByWithRelationInput[];
    cursor?: CartItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[];
  };

  /**
   * User.referralsGiven
   */
  export type User$referralsGivenArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null;
    where?: ReferralWhereInput;
    orderBy?:
      | ReferralOrderByWithRelationInput
      | ReferralOrderByWithRelationInput[];
    cursor?: ReferralWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[];
  };

  /**
   * User.referralsReceived
   */
  export type User$referralsReceivedArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null;
    where?: ReferralWhereInput;
    orderBy?:
      | ReferralOrderByWithRelationInput
      | ReferralOrderByWithRelationInput[];
    cursor?: ReferralWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null;
    _avg: AccountAvgAggregateOutputType | null;
    _sum: AccountSumAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
  };

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null;
  };

  export type AccountSumAggregateOutputType = {
    expires_at: number | null;
  };

  export type AccountMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: string | null;
    provider: string | null;
    providerAccountId: string | null;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AccountMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: string | null;
    provider: string | null;
    providerAccountId: string | null;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AccountCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    provider: number;
    providerAccountId: number;
    refresh_token: number;
    access_token: number;
    expires_at: number;
    token_type: number;
    scope: number;
    id_token: number;
    session_state: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type AccountAvgAggregateInputType = {
    expires_at?: true;
  };

  export type AccountSumAggregateInputType = {
    expires_at?: true;
  };

  export type AccountMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    provider?: true;
    providerAccountId?: true;
    refresh_token?: true;
    access_token?: true;
    expires_at?: true;
    token_type?: true;
    scope?: true;
    id_token?: true;
    session_state?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AccountMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    provider?: true;
    providerAccountId?: true;
    refresh_token?: true;
    access_token?: true;
    expires_at?: true;
    token_type?: true;
    scope?: true;
    id_token?: true;
    session_state?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AccountCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    provider?: true;
    providerAccountId?: true;
    refresh_token?: true;
    access_token?: true;
    expires_at?: true;
    token_type?: true;
    scope?: true;
    id_token?: true;
    session_state?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type AccountAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Accounts
     **/
    _count?: true | AccountCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: AccountAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: AccountSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AccountMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AccountMaxAggregateInputType;
  };

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
    [P in keyof T & keyof AggregateAccount]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>;
  };

  export type AccountGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AccountWhereInput;
    orderBy?:
      | AccountOrderByWithAggregationInput
      | AccountOrderByWithAggregationInput[];
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum;
    having?: AccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AccountCountAggregateInputType | true;
    _avg?: AccountAvgAggregateInputType;
    _sum?: AccountSumAggregateInputType;
    _min?: AccountMinAggregateInputType;
    _max?: AccountMaxAggregateInputType;
  };

  export type AccountGroupByOutputType = {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AccountCountAggregateOutputType | null;
    _avg: AccountAvgAggregateOutputType | null;
    _sum: AccountSumAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
  };

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<AccountGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof AccountGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>;
        }
      >
    >;

  export type AccountSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      type?: boolean;
      provider?: boolean;
      providerAccountId?: boolean;
      refresh_token?: boolean;
      access_token?: boolean;
      expires_at?: boolean;
      token_type?: boolean;
      scope?: boolean;
      id_token?: boolean;
      session_state?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["account"]
  >;

  export type AccountSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      type?: boolean;
      provider?: boolean;
      providerAccountId?: boolean;
      refresh_token?: boolean;
      access_token?: boolean;
      expires_at?: boolean;
      token_type?: boolean;
      scope?: boolean;
      id_token?: boolean;
      session_state?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["account"]
  >;

  export type AccountSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    provider?: boolean;
    providerAccountId?: boolean;
    refresh_token?: boolean;
    access_token?: boolean;
    expires_at?: boolean;
    token_type?: boolean;
    scope?: boolean;
    id_token?: boolean;
    session_state?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type AccountInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AccountIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $AccountPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Account";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        type: string;
        provider: string;
        providerAccountId: string;
        refresh_token: string | null;
        access_token: string | null;
        expires_at: number | null;
        token_type: string | null;
        scope: string | null;
        id_token: string | null;
        session_state: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["account"]
    >;
    composites: {};
  };

  type AccountGetPayload<
    S extends boolean | null | undefined | AccountDefaultArgs,
  > = $Result.GetResult<Prisma.$AccountPayload, S>;

  type AccountCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<AccountFindManyArgs, "select" | "include" | "distinct"> & {
    select?: AccountCountAggregateInputType | true;
  };

  export interface AccountDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Account"];
      meta: { name: "Account" };
    };
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(
      args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(
      args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     *
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AccountFindManyArgs>(
      args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     *
     */
    create<T extends AccountCreateArgs>(
      args: SelectSubset<T, AccountCreateArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AccountCreateManyArgs>(
      args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     *
     */
    delete<T extends AccountDeleteArgs>(
      args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AccountUpdateArgs>(
      args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AccountDeleteManyArgs>(
      args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AccountUpdateManyArgs>(
      args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(
      args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
     **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], AccountCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AccountAggregateArgs>(
      args: Subset<T, AccountAggregateArgs>,
    ): Prisma.PrismaPromise<GetAccountAggregateType<T>>;

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs["orderBy"] }
        : { orderBy?: AccountGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetAccountGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Account model
     */
    readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", "String">;
    readonly userId: FieldRef<"Account", "String">;
    readonly type: FieldRef<"Account", "String">;
    readonly provider: FieldRef<"Account", "String">;
    readonly providerAccountId: FieldRef<"Account", "String">;
    readonly refresh_token: FieldRef<"Account", "String">;
    readonly access_token: FieldRef<"Account", "String">;
    readonly expires_at: FieldRef<"Account", "Int">;
    readonly token_type: FieldRef<"Account", "String">;
    readonly scope: FieldRef<"Account", "String">;
    readonly id_token: FieldRef<"Account", "String">;
    readonly session_state: FieldRef<"Account", "String">;
    readonly createdAt: FieldRef<"Account", "DateTime">;
    readonly updatedAt: FieldRef<"Account", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account create
   */
  export type AccountCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
  };

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Account update
   */
  export type AccountUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>;
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput;
  };

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput;
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
  };

  /**
   * Account delete
   */
  export type AccountDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput;
  };

  /**
   * Account without action
   */
  export type AccountDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
  };

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  export type SessionMinAggregateOutputType = {
    id: string | null;
    sessionToken: string | null;
    userId: string | null;
    expires: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SessionMaxAggregateOutputType = {
    id: string | null;
    sessionToken: string | null;
    userId: string | null;
    expires: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SessionCountAggregateOutputType = {
    id: number;
    sessionToken: number;
    userId: number;
    expires: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type SessionMinAggregateInputType = {
    id?: true;
    sessionToken?: true;
    userId?: true;
    expires?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SessionMaxAggregateInputType = {
    id?: true;
    sessionToken?: true;
    userId?: true;
    expires?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SessionCountAggregateInputType = {
    id?: true;
    sessionToken?: true;
    userId?: true;
    expires?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type SessionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Sessions
     **/
    _count?: true | SessionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SessionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SessionMaxAggregateInputType;
  };

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
    [P in keyof T & keyof AggregateSession]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>;
  };

  export type SessionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
    orderBy?:
      | SessionOrderByWithAggregationInput
      | SessionOrderByWithAggregationInput[];
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum;
    having?: SessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SessionCountAggregateInputType | true;
    _min?: SessionMinAggregateInputType;
    _max?: SessionMaxAggregateInputType;
  };

  export type SessionGroupByOutputType = {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<SessionGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof SessionGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>;
        }
      >
    >;

  export type SessionSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sessionToken?: boolean;
      userId?: boolean;
      expires?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["session"]
  >;

  export type SessionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sessionToken?: boolean;
      userId?: boolean;
      expires?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["session"]
  >;

  export type SessionSelectScalar = {
    id?: boolean;
    sessionToken?: boolean;
    userId?: boolean;
    expires?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type SessionInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SessionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $SessionPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Session";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        sessionToken: string;
        userId: string;
        expires: Date;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["session"]
    >;
    composites: {};
  };

  type SessionGetPayload<
    S extends boolean | null | undefined | SessionDefaultArgs,
  > = $Result.GetResult<Prisma.$SessionPayload, S>;

  type SessionCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<SessionFindManyArgs, "select" | "include" | "distinct"> & {
    select?: SessionCountAggregateInputType | true;
  };

  export interface SessionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Session"];
      meta: { name: "Session" };
    };
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(
      args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(
      args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     *
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     *
     */
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     *
     */
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
     **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], SessionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SessionAggregateArgs>(
      args: Subset<T, SessionAggregateArgs>,
    ): Prisma.PrismaPromise<GetSessionAggregateType<T>>;

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs["orderBy"] }
        : { orderBy?: SessionGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetSessionGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Session model
     */
    readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", "String">;
    readonly sessionToken: FieldRef<"Session", "String">;
    readonly userId: FieldRef<"Session", "String">;
    readonly expires: FieldRef<"Session", "DateTime">;
    readonly createdAt: FieldRef<"Session", "DateTime">;
    readonly updatedAt: FieldRef<"Session", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session create
   */
  export type SessionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
  };

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Session update
   */
  export type SessionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
  };

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput;
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
  };

  /**
   * Session delete
   */
  export type SessionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput;
  };

  /**
   * Session without action
   */
  export type SessionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
  };

  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null;
    _min: VerificationTokenMinAggregateOutputType | null;
    _max: VerificationTokenMaxAggregateOutputType | null;
  };

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null;
    token: string | null;
    expires: Date | null;
    createdAt: Date | null;
  };

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null;
    token: string | null;
    expires: Date | null;
    createdAt: Date | null;
  };

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number;
    token: number;
    expires: number;
    createdAt: number;
    _all: number;
  };

  export type VerificationTokenMinAggregateInputType = {
    identifier?: true;
    token?: true;
    expires?: true;
    createdAt?: true;
  };

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true;
    token?: true;
    expires?: true;
    createdAt?: true;
  };

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true;
    token?: true;
    expires?: true;
    createdAt?: true;
    _all?: true;
  };

  export type VerificationTokenAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned VerificationTokens
     **/
    _count?: true | VerificationTokenCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: VerificationTokenMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: VerificationTokenMaxAggregateInputType;
  };

  export type GetVerificationTokenAggregateType<
    T extends VerificationTokenAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateVerificationToken]: P extends
      | "_count"
      | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>;
  };

  export type VerificationTokenGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: VerificationTokenWhereInput;
    orderBy?:
      | VerificationTokenOrderByWithAggregationInput
      | VerificationTokenOrderByWithAggregationInput[];
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum;
    having?: VerificationTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VerificationTokenCountAggregateInputType | true;
    _min?: VerificationTokenMinAggregateInputType;
    _max?: VerificationTokenMaxAggregateInputType;
  };

  export type VerificationTokenGroupByOutputType = {
    identifier: string;
    token: string;
    expires: Date;
    createdAt: Date;
    _count: VerificationTokenCountAggregateOutputType | null;
    _min: VerificationTokenMinAggregateOutputType | null;
    _max: VerificationTokenMaxAggregateOutputType | null;
  };

  type GetVerificationTokenGroupByPayload<
    T extends VerificationTokenGroupByArgs,
  > = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T["by"]> & {
        [P in keyof T &
          keyof VerificationTokenGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
          : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>;
      }
    >
  >;

  export type VerificationTokenSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      identifier?: boolean;
      token?: boolean;
      expires?: boolean;
      createdAt?: boolean;
    },
    ExtArgs["result"]["verificationToken"]
  >;

  export type VerificationTokenSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      identifier?: boolean;
      token?: boolean;
      expires?: boolean;
      createdAt?: boolean;
    },
    ExtArgs["result"]["verificationToken"]
  >;

  export type VerificationTokenSelectScalar = {
    identifier?: boolean;
    token?: boolean;
    expires?: boolean;
    createdAt?: boolean;
  };

  export type $VerificationTokenPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "VerificationToken";
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        identifier: string;
        token: string;
        expires: Date;
        createdAt: Date;
      },
      ExtArgs["result"]["verificationToken"]
    >;
    composites: {};
  };

  type VerificationTokenGetPayload<
    S extends boolean | null | undefined | VerificationTokenDefaultArgs,
  > = $Result.GetResult<Prisma.$VerificationTokenPayload, S>;

  type VerificationTokenCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<VerificationTokenFindManyArgs, "select" | "include" | "distinct"> & {
    select?: VerificationTokenCountAggregateInputType | true;
  };

  export interface VerificationTokenDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["VerificationToken"];
      meta: { name: "VerificationToken" };
    };
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(
      args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(
      args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(
      args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     *
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     *
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     *
     */
    findMany<T extends VerificationTokenFindManyArgs>(
      args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "findMany"
      >
    >;

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     *
     */
    create<T extends VerificationTokenCreateArgs>(
      args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VerificationTokenCreateManyArgs>(
      args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(
      args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     *
     */
    delete<T extends VerificationTokenDeleteArgs>(
      args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VerificationTokenUpdateArgs>(
      args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(
      args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(
      args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(
      args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
     **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<
              T["select"],
              VerificationTokenCountAggregateOutputType
            >
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends VerificationTokenAggregateArgs>(
      args: Subset<T, VerificationTokenAggregateArgs>,
    ): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>;

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs["orderBy"] }
        : { orderBy?: VerificationTokenGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetVerificationTokenGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the VerificationToken model
     */
    readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", "String">;
    readonly token: FieldRef<"VerificationToken", "String">;
    readonly expires: FieldRef<"VerificationToken", "DateTime">;
    readonly createdAt: FieldRef<"VerificationToken", "DateTime">;
  }

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?:
      | VerificationTokenScalarFieldEnum
      | VerificationTokenScalarFieldEnum[];
  };

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?:
      | VerificationTokenScalarFieldEnum
      | VerificationTokenScalarFieldEnum[];
  };

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    distinct?:
      | VerificationTokenScalarFieldEnum
      | VerificationTokenScalarFieldEnum[];
  };

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<
      VerificationTokenCreateInput,
      VerificationTokenUncheckedCreateInput
    >;
  };

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<
      VerificationTokenUpdateInput,
      VerificationTokenUncheckedUpdateInput
    >;
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<
      VerificationTokenUpdateManyMutationInput,
      VerificationTokenUncheckedUpdateManyInput
    >;
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput;
  };

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput;
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<
      VerificationTokenCreateInput,
      VerificationTokenUncheckedCreateInput
    >;
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<
      VerificationTokenUpdateInput,
      VerificationTokenUncheckedUpdateInput
    >;
  };

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput;
  };

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
  };

  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null;
    _avg: CategoryAvgAggregateOutputType | null;
    _sum: CategorySumAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
  };

  export type CategoryAvgAggregateOutputType = {
    sortOrder: number | null;
  };

  export type CategorySumAggregateOutputType = {
    sortOrder: number | null;
  };

  export type CategoryMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    description: string | null;
    image: string | null;
    parentId: string | null;
    isActive: boolean | null;
    sortOrder: number | null;
    seoTitle: string | null;
    seoDescription: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type CategoryMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    description: string | null;
    image: string | null;
    parentId: string | null;
    isActive: boolean | null;
    sortOrder: number | null;
    seoTitle: string | null;
    seoDescription: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type CategoryCountAggregateOutputType = {
    id: number;
    name: number;
    slug: number;
    description: number;
    image: number;
    parentId: number;
    isActive: number;
    sortOrder: number;
    seoTitle: number;
    seoDescription: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type CategoryAvgAggregateInputType = {
    sortOrder?: true;
  };

  export type CategorySumAggregateInputType = {
    sortOrder?: true;
  };

  export type CategoryMinAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    image?: true;
    parentId?: true;
    isActive?: true;
    sortOrder?: true;
    seoTitle?: true;
    seoDescription?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type CategoryMaxAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    image?: true;
    parentId?: true;
    isActive?: true;
    sortOrder?: true;
    seoTitle?: true;
    seoDescription?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type CategoryCountAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    image?: true;
    parentId?: true;
    isActive?: true;
    sortOrder?: true;
    seoTitle?: true;
    seoDescription?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type CategoryAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categories to fetch.
     */
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Categories
     **/
    _count?: true | CategoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: CategoryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: CategorySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: CategoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: CategoryMaxAggregateInputType;
  };

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateCategory]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>;
  };

  export type CategoryGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CategoryWhereInput;
    orderBy?:
      | CategoryOrderByWithAggregationInput
      | CategoryOrderByWithAggregationInput[];
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum;
    having?: CategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CategoryCountAggregateInputType | true;
    _avg?: CategoryAvgAggregateInputType;
    _sum?: CategorySumAggregateInputType;
    _min?: CategoryMinAggregateInputType;
    _max?: CategoryMaxAggregateInputType;
  };

  export type CategoryGroupByOutputType = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    parentId: string | null;
    isActive: boolean;
    sortOrder: number;
    seoTitle: string | null;
    seoDescription: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CategoryCountAggregateOutputType | null;
    _avg: CategoryAvgAggregateOutputType | null;
    _sum: CategorySumAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
  };

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<CategoryGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof CategoryGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>;
        }
      >
    >;

  export type CategorySelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      slug?: boolean;
      description?: boolean;
      image?: boolean;
      parentId?: boolean;
      isActive?: boolean;
      sortOrder?: boolean;
      seoTitle?: boolean;
      seoDescription?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      parent?: boolean | Category$parentArgs<ExtArgs>;
      children?: boolean | Category$childrenArgs<ExtArgs>;
      productCategories?: boolean | Category$productCategoriesArgs<ExtArgs>;
      _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["category"]
  >;

  export type CategorySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      slug?: boolean;
      description?: boolean;
      image?: boolean;
      parentId?: boolean;
      isActive?: boolean;
      sortOrder?: boolean;
      seoTitle?: boolean;
      seoDescription?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      parent?: boolean | Category$parentArgs<ExtArgs>;
    },
    ExtArgs["result"]["category"]
  >;

  export type CategorySelectScalar = {
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    description?: boolean;
    image?: boolean;
    parentId?: boolean;
    isActive?: boolean;
    sortOrder?: boolean;
    seoTitle?: boolean;
    seoDescription?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type CategoryInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    parent?: boolean | Category$parentArgs<ExtArgs>;
    children?: boolean | Category$childrenArgs<ExtArgs>;
    productCategories?: boolean | Category$productCategoriesArgs<ExtArgs>;
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type CategoryIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    parent?: boolean | Category$parentArgs<ExtArgs>;
  };

  export type $CategoryPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Category";
    objects: {
      parent: Prisma.$CategoryPayload<ExtArgs> | null;
      children: Prisma.$CategoryPayload<ExtArgs>[];
      productCategories: Prisma.$ProductCategoryPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        image: string | null;
        parentId: string | null;
        isActive: boolean;
        sortOrder: number;
        seoTitle: string | null;
        seoDescription: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["category"]
    >;
    composites: {};
  };

  type CategoryGetPayload<
    S extends boolean | null | undefined | CategoryDefaultArgs,
  > = $Result.GetResult<Prisma.$CategoryPayload, S>;

  type CategoryCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<CategoryFindManyArgs, "select" | "include" | "distinct"> & {
    select?: CategoryCountAggregateInputType | true;
  };

  export interface CategoryDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Category"];
      meta: { name: "Category" };
    };
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(
      args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(
      args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(
      args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     *
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CategoryFindManyArgs>(
      args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     *
     */
    create<T extends CategoryCreateArgs>(
      args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CategoryCreateManyArgs>(
      args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(
      args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     *
     */
    delete<T extends CategoryDeleteArgs>(
      args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CategoryUpdateArgs>(
      args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CategoryDeleteManyArgs>(
      args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CategoryUpdateManyArgs>(
      args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(
      args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
     **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], CategoryCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends CategoryAggregateArgs>(
      args: Subset<T, CategoryAggregateArgs>,
    ): Prisma.PrismaPromise<GetCategoryAggregateType<T>>;

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs["orderBy"] }
        : { orderBy?: CategoryGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetCategoryGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Category model
     */
    readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    parent<T extends Category$parentArgs<ExtArgs> = {}>(
      args?: Subset<T, Category$parentArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      $Result.GetResult<
        Prisma.$CategoryPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      > | null,
      null,
      ExtArgs
    >;
    children<T extends Category$childrenArgs<ExtArgs> = {}>(
      args?: Subset<T, Category$childrenArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany"> | Null
    >;
    productCategories<T extends Category$productCategoriesArgs<ExtArgs> = {}>(
      args?: Subset<T, Category$productCategoriesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ProductCategoryPayload<ExtArgs>,
          T,
          "findMany"
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", "String">;
    readonly name: FieldRef<"Category", "String">;
    readonly slug: FieldRef<"Category", "String">;
    readonly description: FieldRef<"Category", "String">;
    readonly image: FieldRef<"Category", "String">;
    readonly parentId: FieldRef<"Category", "String">;
    readonly isActive: FieldRef<"Category", "Boolean">;
    readonly sortOrder: FieldRef<"Category", "Int">;
    readonly seoTitle: FieldRef<"Category", "String">;
    readonly seoDescription: FieldRef<"Category", "String">;
    readonly createdAt: FieldRef<"Category", "DateTime">;
    readonly updatedAt: FieldRef<"Category", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput;
  };

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput;
  };

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categories to fetch.
     */
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[];
  };

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categories to fetch.
     */
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[];
  };

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Categories to fetch.
     */
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Categories.
     */
    skip?: number;
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[];
  };

  /**
   * Category create
   */
  export type CategoryCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>;
  };

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Category update
   */
  export type CategoryUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>;
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput;
  };

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Categories.
     */
    data: XOR<
      CategoryUpdateManyMutationInput,
      CategoryUncheckedUpdateManyInput
    >;
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput;
  };

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput;
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>;
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>;
  };

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput;
  };

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput;
  };

  /**
   * Category.parent
   */
  export type Category$parentArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    where?: CategoryWhereInput;
  };

  /**
   * Category.children
   */
  export type Category$childrenArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
    where?: CategoryWhereInput;
    orderBy?:
      | CategoryOrderByWithRelationInput
      | CategoryOrderByWithRelationInput[];
    cursor?: CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[];
  };

  /**
   * Category.productCategories
   */
  export type Category$productCategoriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null;
    where?: ProductCategoryWhereInput;
    orderBy?:
      | ProductCategoryOrderByWithRelationInput
      | ProductCategoryOrderByWithRelationInput[];
    cursor?: ProductCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?:
      | ProductCategoryScalarFieldEnum
      | ProductCategoryScalarFieldEnum[];
  };

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null;
  };

  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
  };

  export type ProductAvgAggregateOutputType = {
    basePrice: Decimal | null;
    salePrice: Decimal | null;
    costPrice: Decimal | null;
    stockQuantity: number | null;
    lowStockThreshold: number | null;
    weight: Decimal | null;
  };

  export type ProductSumAggregateOutputType = {
    basePrice: Decimal | null;
    salePrice: Decimal | null;
    costPrice: Decimal | null;
    stockQuantity: number | null;
    lowStockThreshold: number | null;
    weight: Decimal | null;
  };

  export type ProductMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    description: string | null;
    shortDescription: string | null;
    sku: string | null;
    basePrice: Decimal | null;
    salePrice: Decimal | null;
    costPrice: Decimal | null;
    stockQuantity: number | null;
    lowStockThreshold: number | null;
    trackInventory: boolean | null;
    allowBackorder: boolean | null;
    weight: Decimal | null;
    dimensions: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    status: $Enums.ProductStatus | null;
    isActive: boolean | null;
    isFeatured: boolean | null;
    publishedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ProductMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    description: string | null;
    shortDescription: string | null;
    sku: string | null;
    basePrice: Decimal | null;
    salePrice: Decimal | null;
    costPrice: Decimal | null;
    stockQuantity: number | null;
    lowStockThreshold: number | null;
    trackInventory: boolean | null;
    allowBackorder: boolean | null;
    weight: Decimal | null;
    dimensions: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    status: $Enums.ProductStatus | null;
    isActive: boolean | null;
    isFeatured: boolean | null;
    publishedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ProductCountAggregateOutputType = {
    id: number;
    name: number;
    slug: number;
    description: number;
    shortDescription: number;
    sku: number;
    basePrice: number;
    salePrice: number;
    costPrice: number;
    stockQuantity: number;
    lowStockThreshold: number;
    trackInventory: number;
    allowBackorder: number;
    weight: number;
    dimensions: number;
    seoTitle: number;
    seoDescription: number;
    tags: number;
    status: number;
    isActive: number;
    isFeatured: number;
    publishedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ProductAvgAggregateInputType = {
    basePrice?: true;
    salePrice?: true;
    costPrice?: true;
    stockQuantity?: true;
    lowStockThreshold?: true;
    weight?: true;
  };

  export type ProductSumAggregateInputType = {
    basePrice?: true;
    salePrice?: true;
    costPrice?: true;
    stockQuantity?: true;
    lowStockThreshold?: true;
    weight?: true;
  };

  export type ProductMinAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    shortDescription?: true;
    sku?: true;
    basePrice?: true;
    salePrice?: true;
    costPrice?: true;
    stockQuantity?: true;
    lowStockThreshold?: true;
    trackInventory?: true;
    allowBackorder?: true;
    weight?: true;
    dimensions?: true;
    seoTitle?: true;
    seoDescription?: true;
    status?: true;
    isActive?: true;
    isFeatured?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ProductMaxAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    shortDescription?: true;
    sku?: true;
    basePrice?: true;
    salePrice?: true;
    costPrice?: true;
    stockQuantity?: true;
    lowStockThreshold?: true;
    trackInventory?: true;
    allowBackorder?: true;
    weight?: true;
    dimensions?: true;
    seoTitle?: true;
    seoDescription?: true;
    status?: true;
    isActive?: true;
    isFeatured?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ProductCountAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    shortDescription?: true;
    sku?: true;
    basePrice?: true;
    salePrice?: true;
    costPrice?: true;
    stockQuantity?: true;
    lowStockThreshold?: true;
    trackInventory?: true;
    allowBackorder?: true;
    weight?: true;
    dimensions?: true;
    seoTitle?: true;
    seoDescription?: true;
    tags?: true;
    status?: true;
    isActive?: true;
    isFeatured?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ProductAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Products
     **/
    _count?: true | ProductCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ProductAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ProductSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProductMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProductMaxAggregateInputType;
  };

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
    [P in keyof T & keyof AggregateProduct]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>;
  };

  export type ProductGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductWhereInput;
    orderBy?:
      | ProductOrderByWithAggregationInput
      | ProductOrderByWithAggregationInput[];
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum;
    having?: ProductScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductCountAggregateInputType | true;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
  };

  export type ProductGroupByOutputType = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    shortDescription: string | null;
    sku: string | null;
    basePrice: Decimal;
    salePrice: Decimal | null;
    costPrice: Decimal | null;
    stockQuantity: number;
    lowStockThreshold: number;
    trackInventory: boolean;
    allowBackorder: boolean;
    weight: Decimal | null;
    dimensions: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    tags: string[];
    status: $Enums.ProductStatus;
    isActive: boolean;
    isFeatured: boolean;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
  };

  type GetProductGroupByPayload<T extends ProductGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ProductGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof ProductGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>;
        }
      >
    >;

  export type ProductSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      slug?: boolean;
      description?: boolean;
      shortDescription?: boolean;
      sku?: boolean;
      basePrice?: boolean;
      salePrice?: boolean;
      costPrice?: boolean;
      stockQuantity?: boolean;
      lowStockThreshold?: boolean;
      trackInventory?: boolean;
      allowBackorder?: boolean;
      weight?: boolean;
      dimensions?: boolean;
      seoTitle?: boolean;
      seoDescription?: boolean;
      tags?: boolean;
      status?: boolean;
      isActive?: boolean;
      isFeatured?: boolean;
      publishedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      variants?: boolean | Product$variantsArgs<ExtArgs>;
      images?: boolean | Product$imagesArgs<ExtArgs>;
      productCategories?: boolean | Product$productCategoriesArgs<ExtArgs>;
      cartItems?: boolean | Product$cartItemsArgs<ExtArgs>;
      orderItems?: boolean | Product$orderItemsArgs<ExtArgs>;
      _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["product"]
  >;

  export type ProductSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      slug?: boolean;
      description?: boolean;
      shortDescription?: boolean;
      sku?: boolean;
      basePrice?: boolean;
      salePrice?: boolean;
      costPrice?: boolean;
      stockQuantity?: boolean;
      lowStockThreshold?: boolean;
      trackInventory?: boolean;
      allowBackorder?: boolean;
      weight?: boolean;
      dimensions?: boolean;
      seoTitle?: boolean;
      seoDescription?: boolean;
      tags?: boolean;
      status?: boolean;
      isActive?: boolean;
      isFeatured?: boolean;
      publishedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["product"]
  >;

  export type ProductSelectScalar = {
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    description?: boolean;
    shortDescription?: boolean;
    sku?: boolean;
    basePrice?: boolean;
    salePrice?: boolean;
    costPrice?: boolean;
    stockQuantity?: boolean;
    lowStockThreshold?: boolean;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: boolean;
    dimensions?: boolean;
    seoTitle?: boolean;
    seoDescription?: boolean;
    tags?: boolean;
    status?: boolean;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ProductInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    variants?: boolean | Product$variantsArgs<ExtArgs>;
    images?: boolean | Product$imagesArgs<ExtArgs>;
    productCategories?: boolean | Product$productCategoriesArgs<ExtArgs>;
    cartItems?: boolean | Product$cartItemsArgs<ExtArgs>;
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>;
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ProductIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $ProductPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Product";
    objects: {
      variants: Prisma.$ProductVariantPayload<ExtArgs>[];
      images: Prisma.$ProductImagePayload<ExtArgs>[];
      productCategories: Prisma.$ProductCategoryPayload<ExtArgs>[];
      cartItems: Prisma.$CartItemPayload<ExtArgs>[];
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        shortDescription: string | null;
        sku: string | null;
        basePrice: Prisma.Decimal;
        salePrice: Prisma.Decimal | null;
        costPrice: Prisma.Decimal | null;
        stockQuantity: number;
        lowStockThreshold: number;
        trackInventory: boolean;
        allowBackorder: boolean;
        weight: Prisma.Decimal | null;
        dimensions: string | null;
        seoTitle: string | null;
        seoDescription: string | null;
        tags: string[];
        status: $Enums.ProductStatus;
        isActive: boolean;
        isFeatured: boolean;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["product"]
    >;
    composites: {};
  };

  type ProductGetPayload<
    S extends boolean | null | undefined | ProductDefaultArgs,
  > = $Result.GetResult<Prisma.$ProductPayload, S>;

  type ProductCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ProductFindManyArgs, "select" | "include" | "distinct"> & {
    select?: ProductCountAggregateInputType | true;
  };

  export interface ProductDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Product"];
      meta: { name: "Product" };
    };
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(
      args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(
      args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     *
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProductFindManyArgs>(
      args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     *
     */
    create<T extends ProductCreateArgs>(
      args: SelectSubset<T, ProductCreateArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductCreateManyArgs>(
      args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     *
     */
    delete<T extends ProductDeleteArgs>(
      args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductUpdateArgs>(
      args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductDeleteManyArgs>(
      args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductUpdateManyArgs>(
      args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(
      args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
     **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ProductCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProductAggregateArgs>(
      args: Subset<T, ProductAggregateArgs>,
    ): Prisma.PrismaPromise<GetProductAggregateType<T>>;

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs["orderBy"] }
        : { orderBy?: ProductGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetProductGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Product model
     */
    readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    variants<T extends Product$variantsArgs<ExtArgs> = {}>(
      args?: Subset<T, Product$variantsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany">
      | Null
    >;
    images<T extends Product$imagesArgs<ExtArgs> = {}>(
      args?: Subset<T, Product$imagesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany">
      | Null
    >;
    productCategories<T extends Product$productCategoriesArgs<ExtArgs> = {}>(
      args?: Subset<T, Product$productCategoriesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ProductCategoryPayload<ExtArgs>,
          T,
          "findMany"
        >
      | Null
    >;
    cartItems<T extends Product$cartItemsArgs<ExtArgs> = {}>(
      args?: Subset<T, Product$cartItemsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany"> | Null
    >;
    orderItems<T extends Product$orderItemsArgs<ExtArgs> = {}>(
      args?: Subset<T, Product$orderItemsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany"> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", "String">;
    readonly name: FieldRef<"Product", "String">;
    readonly slug: FieldRef<"Product", "String">;
    readonly description: FieldRef<"Product", "String">;
    readonly shortDescription: FieldRef<"Product", "String">;
    readonly sku: FieldRef<"Product", "String">;
    readonly basePrice: FieldRef<"Product", "Decimal">;
    readonly salePrice: FieldRef<"Product", "Decimal">;
    readonly costPrice: FieldRef<"Product", "Decimal">;
    readonly stockQuantity: FieldRef<"Product", "Int">;
    readonly lowStockThreshold: FieldRef<"Product", "Int">;
    readonly trackInventory: FieldRef<"Product", "Boolean">;
    readonly allowBackorder: FieldRef<"Product", "Boolean">;
    readonly weight: FieldRef<"Product", "Decimal">;
    readonly dimensions: FieldRef<"Product", "String">;
    readonly seoTitle: FieldRef<"Product", "String">;
    readonly seoDescription: FieldRef<"Product", "String">;
    readonly tags: FieldRef<"Product", "String[]">;
    readonly status: FieldRef<"Product", "ProductStatus">;
    readonly isActive: FieldRef<"Product", "Boolean">;
    readonly isFeatured: FieldRef<"Product", "Boolean">;
    readonly publishedAt: FieldRef<"Product", "DateTime">;
    readonly createdAt: FieldRef<"Product", "DateTime">;
    readonly updatedAt: FieldRef<"Product", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Product create
   */
  export type ProductCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>;
  };

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Product update
   */
  export type ProductUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>;
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>;
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput;
  };

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput;
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>;
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>;
  };

  /**
   * Product delete
   */
  export type ProductDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput;
  };

  /**
   * Product.variants
   */
  export type Product$variantsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    where?: ProductVariantWhereInput;
    orderBy?:
      | ProductVariantOrderByWithRelationInput
      | ProductVariantOrderByWithRelationInput[];
    cursor?: ProductVariantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[];
  };

  /**
   * Product.images
   */
  export type Product$imagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null;
    where?: ProductImageWhereInput;
    orderBy?:
      | ProductImageOrderByWithRelationInput
      | ProductImageOrderByWithRelationInput[];
    cursor?: ProductImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[];
  };

  /**
   * Product.productCategories
   */
  export type Product$productCategoriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null;
    where?: ProductCategoryWhereInput;
    orderBy?:
      | ProductCategoryOrderByWithRelationInput
      | ProductCategoryOrderByWithRelationInput[];
    cursor?: ProductCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?:
      | ProductCategoryScalarFieldEnum
      | ProductCategoryScalarFieldEnum[];
  };

  /**
   * Product.cartItems
   */
  export type Product$cartItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null;
    where?: CartItemWhereInput;
    orderBy?:
      | CartItemOrderByWithRelationInput
      | CartItemOrderByWithRelationInput[];
    cursor?: CartItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[];
  };

  /**
   * Product.orderItems
   */
  export type Product$orderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    where?: OrderItemWhereInput;
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    cursor?: OrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * Product without action
   */
  export type ProductDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
  };

  /**
   * Model ProductVariant
   */

  export type AggregateProductVariant = {
    _count: ProductVariantCountAggregateOutputType | null;
    _avg: ProductVariantAvgAggregateOutputType | null;
    _sum: ProductVariantSumAggregateOutputType | null;
    _min: ProductVariantMinAggregateOutputType | null;
    _max: ProductVariantMaxAggregateOutputType | null;
  };

  export type ProductVariantAvgAggregateOutputType = {
    price: Decimal | null;
    compareAtPrice: Decimal | null;
    costPrice: Decimal | null;
    stockQuantity: number | null;
    weight: Decimal | null;
  };

  export type ProductVariantSumAggregateOutputType = {
    price: Decimal | null;
    compareAtPrice: Decimal | null;
    costPrice: Decimal | null;
    stockQuantity: number | null;
    weight: Decimal | null;
  };

  export type ProductVariantMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    sku: string | null;
    name: string | null;
    price: Decimal | null;
    compareAtPrice: Decimal | null;
    costPrice: Decimal | null;
    stockQuantity: number | null;
    weight: Decimal | null;
    barcode: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ProductVariantMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    sku: string | null;
    name: string | null;
    price: Decimal | null;
    compareAtPrice: Decimal | null;
    costPrice: Decimal | null;
    stockQuantity: number | null;
    weight: Decimal | null;
    barcode: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ProductVariantCountAggregateOutputType = {
    id: number;
    productId: number;
    sku: number;
    name: number;
    price: number;
    compareAtPrice: number;
    costPrice: number;
    stockQuantity: number;
    attributes: number;
    weight: number;
    barcode: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ProductVariantAvgAggregateInputType = {
    price?: true;
    compareAtPrice?: true;
    costPrice?: true;
    stockQuantity?: true;
    weight?: true;
  };

  export type ProductVariantSumAggregateInputType = {
    price?: true;
    compareAtPrice?: true;
    costPrice?: true;
    stockQuantity?: true;
    weight?: true;
  };

  export type ProductVariantMinAggregateInputType = {
    id?: true;
    productId?: true;
    sku?: true;
    name?: true;
    price?: true;
    compareAtPrice?: true;
    costPrice?: true;
    stockQuantity?: true;
    weight?: true;
    barcode?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ProductVariantMaxAggregateInputType = {
    id?: true;
    productId?: true;
    sku?: true;
    name?: true;
    price?: true;
    compareAtPrice?: true;
    costPrice?: true;
    stockQuantity?: true;
    weight?: true;
    barcode?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ProductVariantCountAggregateInputType = {
    id?: true;
    productId?: true;
    sku?: true;
    name?: true;
    price?: true;
    compareAtPrice?: true;
    costPrice?: true;
    stockQuantity?: true;
    attributes?: true;
    weight?: true;
    barcode?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ProductVariantAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ProductVariant to aggregate.
     */
    where?: ProductVariantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?:
      | ProductVariantOrderByWithRelationInput
      | ProductVariantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProductVariantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductVariants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ProductVariants
     **/
    _count?: true | ProductVariantCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ProductVariantAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ProductVariantSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProductVariantMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProductVariantMaxAggregateInputType;
  };

  export type GetProductVariantAggregateType<
    T extends ProductVariantAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateProductVariant]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductVariant[P]>
      : GetScalarType<T[P], AggregateProductVariant[P]>;
  };

  export type ProductVariantGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductVariantWhereInput;
    orderBy?:
      | ProductVariantOrderByWithAggregationInput
      | ProductVariantOrderByWithAggregationInput[];
    by: ProductVariantScalarFieldEnum[] | ProductVariantScalarFieldEnum;
    having?: ProductVariantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductVariantCountAggregateInputType | true;
    _avg?: ProductVariantAvgAggregateInputType;
    _sum?: ProductVariantSumAggregateInputType;
    _min?: ProductVariantMinAggregateInputType;
    _max?: ProductVariantMaxAggregateInputType;
  };

  export type ProductVariantGroupByOutputType = {
    id: string;
    productId: string;
    sku: string;
    name: string | null;
    price: Decimal;
    compareAtPrice: Decimal | null;
    costPrice: Decimal | null;
    stockQuantity: number;
    attributes: JsonValue;
    weight: Decimal | null;
    barcode: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: ProductVariantCountAggregateOutputType | null;
    _avg: ProductVariantAvgAggregateOutputType | null;
    _sum: ProductVariantSumAggregateOutputType | null;
    _min: ProductVariantMinAggregateOutputType | null;
    _max: ProductVariantMaxAggregateOutputType | null;
  };

  type GetProductVariantGroupByPayload<T extends ProductVariantGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ProductVariantGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof ProductVariantGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>
            : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>;
        }
      >
    >;

  export type ProductVariantSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      productId?: boolean;
      sku?: boolean;
      name?: boolean;
      price?: boolean;
      compareAtPrice?: boolean;
      costPrice?: boolean;
      stockQuantity?: boolean;
      attributes?: boolean;
      weight?: boolean;
      barcode?: boolean;
      isActive?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["productVariant"]
  >;

  export type ProductVariantSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      productId?: boolean;
      sku?: boolean;
      name?: boolean;
      price?: boolean;
      compareAtPrice?: boolean;
      costPrice?: boolean;
      stockQuantity?: boolean;
      attributes?: boolean;
      weight?: boolean;
      barcode?: boolean;
      isActive?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["productVariant"]
  >;

  export type ProductVariantSelectScalar = {
    id?: boolean;
    productId?: boolean;
    sku?: boolean;
    name?: boolean;
    price?: boolean;
    compareAtPrice?: boolean;
    costPrice?: boolean;
    stockQuantity?: boolean;
    attributes?: boolean;
    weight?: boolean;
    barcode?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ProductVariantInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
  };
  export type ProductVariantIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
  };

  export type $ProductVariantPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "ProductVariant";
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        productId: string;
        sku: string;
        name: string | null;
        price: Prisma.Decimal;
        compareAtPrice: Prisma.Decimal | null;
        costPrice: Prisma.Decimal | null;
        stockQuantity: number;
        attributes: Prisma.JsonValue;
        weight: Prisma.Decimal | null;
        barcode: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["productVariant"]
    >;
    composites: {};
  };

  type ProductVariantGetPayload<
    S extends boolean | null | undefined | ProductVariantDefaultArgs,
  > = $Result.GetResult<Prisma.$ProductVariantPayload, S>;

  type ProductVariantCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ProductVariantFindManyArgs, "select" | "include" | "distinct"> & {
    select?: ProductVariantCountAggregateInputType | true;
  };

  export interface ProductVariantDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["ProductVariant"];
      meta: { name: "ProductVariant" };
    };
    /**
     * Find zero or one ProductVariant that matches the filter.
     * @param {ProductVariantFindUniqueArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductVariantFindUniqueArgs>(
      args: SelectSubset<T, ProductVariantFindUniqueArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one ProductVariant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductVariantFindUniqueOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductVariantFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ProductVariantFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first ProductVariant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductVariantFindFirstArgs>(
      args?: SelectSubset<T, ProductVariantFindFirstArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first ProductVariant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductVariantFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProductVariantFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more ProductVariants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductVariants
     * const productVariants = await prisma.productVariant.findMany()
     *
     * // Get first 10 ProductVariants
     * const productVariants = await prisma.productVariant.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProductVariantFindManyArgs>(
      args?: SelectSubset<T, ProductVariantFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a ProductVariant.
     * @param {ProductVariantCreateArgs} args - Arguments to create a ProductVariant.
     * @example
     * // Create one ProductVariant
     * const ProductVariant = await prisma.productVariant.create({
     *   data: {
     *     // ... data to create a ProductVariant
     *   }
     * })
     *
     */
    create<T extends ProductVariantCreateArgs>(
      args: SelectSubset<T, ProductVariantCreateArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many ProductVariants.
     * @param {ProductVariantCreateManyArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductVariantCreateManyArgs>(
      args?: SelectSubset<T, ProductVariantCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ProductVariants and returns the data saved in the database.
     * @param {ProductVariantCreateManyAndReturnArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ProductVariants and only return the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductVariantCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ProductVariantCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a ProductVariant.
     * @param {ProductVariantDeleteArgs} args - Arguments to delete one ProductVariant.
     * @example
     * // Delete one ProductVariant
     * const ProductVariant = await prisma.productVariant.delete({
     *   where: {
     *     // ... filter to delete one ProductVariant
     *   }
     * })
     *
     */
    delete<T extends ProductVariantDeleteArgs>(
      args: SelectSubset<T, ProductVariantDeleteArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one ProductVariant.
     * @param {ProductVariantUpdateArgs} args - Arguments to update one ProductVariant.
     * @example
     * // Update one ProductVariant
     * const productVariant = await prisma.productVariant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductVariantUpdateArgs>(
      args: SelectSubset<T, ProductVariantUpdateArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more ProductVariants.
     * @param {ProductVariantDeleteManyArgs} args - Arguments to filter ProductVariants to delete.
     * @example
     * // Delete a few ProductVariants
     * const { count } = await prisma.productVariant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductVariantDeleteManyArgs>(
      args?: SelectSubset<T, ProductVariantDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductVariants
     * const productVariant = await prisma.productVariant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductVariantUpdateManyArgs>(
      args: SelectSubset<T, ProductVariantUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one ProductVariant.
     * @param {ProductVariantUpsertArgs} args - Arguments to update or create a ProductVariant.
     * @example
     * // Update or create a ProductVariant
     * const productVariant = await prisma.productVariant.upsert({
     *   create: {
     *     // ... data to create a ProductVariant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductVariant we want to update
     *   }
     * })
     */
    upsert<T extends ProductVariantUpsertArgs>(
      args: SelectSubset<T, ProductVariantUpsertArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantCountArgs} args - Arguments to filter ProductVariants to count.
     * @example
     * // Count the number of ProductVariants
     * const count = await prisma.productVariant.count({
     *   where: {
     *     // ... the filter for the ProductVariants we want to count
     *   }
     * })
     **/
    count<T extends ProductVariantCountArgs>(
      args?: Subset<T, ProductVariantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ProductVariantCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProductVariantAggregateArgs>(
      args: Subset<T, ProductVariantAggregateArgs>,
    ): Prisma.PrismaPromise<GetProductVariantAggregateType<T>>;

    /**
     * Group by ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ProductVariantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductVariantGroupByArgs["orderBy"] }
        : { orderBy?: ProductVariantGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ProductVariantGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetProductVariantGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ProductVariant model
     */
    readonly fields: ProductVariantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductVariant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductVariantClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ProductDefaultArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      | $Result.GetResult<
          Prisma.$ProductPayload<ExtArgs>,
          T,
          "findUniqueOrThrow"
        >
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ProductVariant model
   */
  interface ProductVariantFieldRefs {
    readonly id: FieldRef<"ProductVariant", "String">;
    readonly productId: FieldRef<"ProductVariant", "String">;
    readonly sku: FieldRef<"ProductVariant", "String">;
    readonly name: FieldRef<"ProductVariant", "String">;
    readonly price: FieldRef<"ProductVariant", "Decimal">;
    readonly compareAtPrice: FieldRef<"ProductVariant", "Decimal">;
    readonly costPrice: FieldRef<"ProductVariant", "Decimal">;
    readonly stockQuantity: FieldRef<"ProductVariant", "Int">;
    readonly attributes: FieldRef<"ProductVariant", "Json">;
    readonly weight: FieldRef<"ProductVariant", "Decimal">;
    readonly barcode: FieldRef<"ProductVariant", "String">;
    readonly isActive: FieldRef<"ProductVariant", "Boolean">;
    readonly createdAt: FieldRef<"ProductVariant", "DateTime">;
    readonly updatedAt: FieldRef<"ProductVariant", "DateTime">;
  }

  // Custom InputTypes
  /**
   * ProductVariant findUnique
   */
  export type ProductVariantFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput;
  };

  /**
   * ProductVariant findUniqueOrThrow
   */
  export type ProductVariantFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput;
  };

  /**
   * ProductVariant findFirst
   */
  export type ProductVariantFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?:
      | ProductVariantOrderByWithRelationInput
      | ProductVariantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductVariants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[];
  };

  /**
   * ProductVariant findFirstOrThrow
   */
  export type ProductVariantFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?:
      | ProductVariantOrderByWithRelationInput
      | ProductVariantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductVariants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[];
  };

  /**
   * ProductVariant findMany
   */
  export type ProductVariantFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * Filter, which ProductVariants to fetch.
     */
    where?: ProductVariantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?:
      | ProductVariantOrderByWithRelationInput
      | ProductVariantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductVariants.
     */
    skip?: number;
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[];
  };

  /**
   * ProductVariant create
   */
  export type ProductVariantCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * The data needed to create a ProductVariant.
     */
    data: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>;
  };

  /**
   * ProductVariant createMany
   */
  export type ProductVariantCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ProductVariant createManyAndReturn
   */
  export type ProductVariantCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ProductVariant update
   */
  export type ProductVariantUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * The data needed to update a ProductVariant.
     */
    data: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>;
    /**
     * Choose, which ProductVariant to update.
     */
    where: ProductVariantWhereUniqueInput;
  };

  /**
   * ProductVariant updateMany
   */
  export type ProductVariantUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ProductVariants.
     */
    data: XOR<
      ProductVariantUpdateManyMutationInput,
      ProductVariantUncheckedUpdateManyInput
    >;
    /**
     * Filter which ProductVariants to update
     */
    where?: ProductVariantWhereInput;
  };

  /**
   * ProductVariant upsert
   */
  export type ProductVariantUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * The filter to search for the ProductVariant to update in case it exists.
     */
    where: ProductVariantWhereUniqueInput;
    /**
     * In case the ProductVariant found by the `where` argument doesn't exist, create a new ProductVariant with this data.
     */
    create: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>;
    /**
     * In case the ProductVariant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>;
  };

  /**
   * ProductVariant delete
   */
  export type ProductVariantDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * Filter which ProductVariant to delete.
     */
    where: ProductVariantWhereUniqueInput;
  };

  /**
   * ProductVariant deleteMany
   */
  export type ProductVariantDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ProductVariants to delete
     */
    where?: ProductVariantWhereInput;
  };

  /**
   * ProductVariant without action
   */
  export type ProductVariantDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
  };

  /**
   * Model ProductImage
   */

  export type AggregateProductImage = {
    _count: ProductImageCountAggregateOutputType | null;
    _avg: ProductImageAvgAggregateOutputType | null;
    _sum: ProductImageSumAggregateOutputType | null;
    _min: ProductImageMinAggregateOutputType | null;
    _max: ProductImageMaxAggregateOutputType | null;
  };

  export type ProductImageAvgAggregateOutputType = {
    width: number | null;
    height: number | null;
    size: number | null;
    sortOrder: number | null;
  };

  export type ProductImageSumAggregateOutputType = {
    width: number | null;
    height: number | null;
    size: number | null;
    sortOrder: number | null;
  };

  export type ProductImageMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    url: string | null;
    altText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    size: number | null;
    sortOrder: number | null;
    imageType: $Enums.ImageType | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ProductImageMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    url: string | null;
    altText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    size: number | null;
    sortOrder: number | null;
    imageType: $Enums.ImageType | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ProductImageCountAggregateOutputType = {
    id: number;
    productId: number;
    url: number;
    altText: number;
    caption: number;
    width: number;
    height: number;
    size: number;
    sortOrder: number;
    imageType: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ProductImageAvgAggregateInputType = {
    width?: true;
    height?: true;
    size?: true;
    sortOrder?: true;
  };

  export type ProductImageSumAggregateInputType = {
    width?: true;
    height?: true;
    size?: true;
    sortOrder?: true;
  };

  export type ProductImageMinAggregateInputType = {
    id?: true;
    productId?: true;
    url?: true;
    altText?: true;
    caption?: true;
    width?: true;
    height?: true;
    size?: true;
    sortOrder?: true;
    imageType?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ProductImageMaxAggregateInputType = {
    id?: true;
    productId?: true;
    url?: true;
    altText?: true;
    caption?: true;
    width?: true;
    height?: true;
    size?: true;
    sortOrder?: true;
    imageType?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ProductImageCountAggregateInputType = {
    id?: true;
    productId?: true;
    url?: true;
    altText?: true;
    caption?: true;
    width?: true;
    height?: true;
    size?: true;
    sortOrder?: true;
    imageType?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ProductImageAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ProductImage to aggregate.
     */
    where?: ProductImageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductImages to fetch.
     */
    orderBy?:
      | ProductImageOrderByWithRelationInput
      | ProductImageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProductImageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductImages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ProductImages
     **/
    _count?: true | ProductImageCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ProductImageAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ProductImageSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProductImageMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProductImageMaxAggregateInputType;
  };

  export type GetProductImageAggregateType<
    T extends ProductImageAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateProductImage]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductImage[P]>
      : GetScalarType<T[P], AggregateProductImage[P]>;
  };

  export type ProductImageGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductImageWhereInput;
    orderBy?:
      | ProductImageOrderByWithAggregationInput
      | ProductImageOrderByWithAggregationInput[];
    by: ProductImageScalarFieldEnum[] | ProductImageScalarFieldEnum;
    having?: ProductImageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductImageCountAggregateInputType | true;
    _avg?: ProductImageAvgAggregateInputType;
    _sum?: ProductImageSumAggregateInputType;
    _min?: ProductImageMinAggregateInputType;
    _max?: ProductImageMaxAggregateInputType;
  };

  export type ProductImageGroupByOutputType = {
    id: string;
    productId: string;
    url: string;
    altText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    size: number | null;
    sortOrder: number;
    imageType: $Enums.ImageType;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: ProductImageCountAggregateOutputType | null;
    _avg: ProductImageAvgAggregateOutputType | null;
    _sum: ProductImageSumAggregateOutputType | null;
    _min: ProductImageMinAggregateOutputType | null;
    _max: ProductImageMaxAggregateOutputType | null;
  };

  type GetProductImageGroupByPayload<T extends ProductImageGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ProductImageGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof ProductImageGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductImageGroupByOutputType[P]>
            : GetScalarType<T[P], ProductImageGroupByOutputType[P]>;
        }
      >
    >;

  export type ProductImageSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      productId?: boolean;
      url?: boolean;
      altText?: boolean;
      caption?: boolean;
      width?: boolean;
      height?: boolean;
      size?: boolean;
      sortOrder?: boolean;
      imageType?: boolean;
      isActive?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["productImage"]
  >;

  export type ProductImageSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      productId?: boolean;
      url?: boolean;
      altText?: boolean;
      caption?: boolean;
      width?: boolean;
      height?: boolean;
      size?: boolean;
      sortOrder?: boolean;
      imageType?: boolean;
      isActive?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["productImage"]
  >;

  export type ProductImageSelectScalar = {
    id?: boolean;
    productId?: boolean;
    url?: boolean;
    altText?: boolean;
    caption?: boolean;
    width?: boolean;
    height?: boolean;
    size?: boolean;
    sortOrder?: boolean;
    imageType?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ProductImageInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
  };
  export type ProductImageIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
  };

  export type $ProductImagePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "ProductImage";
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        productId: string;
        url: string;
        altText: string | null;
        caption: string | null;
        width: number | null;
        height: number | null;
        size: number | null;
        sortOrder: number;
        imageType: $Enums.ImageType;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["productImage"]
    >;
    composites: {};
  };

  type ProductImageGetPayload<
    S extends boolean | null | undefined | ProductImageDefaultArgs,
  > = $Result.GetResult<Prisma.$ProductImagePayload, S>;

  type ProductImageCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ProductImageFindManyArgs, "select" | "include" | "distinct"> & {
    select?: ProductImageCountAggregateInputType | true;
  };

  export interface ProductImageDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["ProductImage"];
      meta: { name: "ProductImage" };
    };
    /**
     * Find zero or one ProductImage that matches the filter.
     * @param {ProductImageFindUniqueArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductImageFindUniqueArgs>(
      args: SelectSubset<T, ProductImageFindUniqueArgs<ExtArgs>>,
    ): Prisma__ProductImageClient<
      $Result.GetResult<
        Prisma.$ProductImagePayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one ProductImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductImageFindUniqueOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductImageFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ProductImageFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductImageClient<
      $Result.GetResult<
        Prisma.$ProductImagePayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first ProductImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductImageFindFirstArgs>(
      args?: SelectSubset<T, ProductImageFindFirstArgs<ExtArgs>>,
    ): Prisma__ProductImageClient<
      $Result.GetResult<
        Prisma.$ProductImagePayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first ProductImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductImageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProductImageFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductImageClient<
      $Result.GetResult<
        Prisma.$ProductImagePayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more ProductImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductImages
     * const productImages = await prisma.productImage.findMany()
     *
     * // Get first 10 ProductImages
     * const productImages = await prisma.productImage.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const productImageWithIdOnly = await prisma.productImage.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProductImageFindManyArgs>(
      args?: SelectSubset<T, ProductImageFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a ProductImage.
     * @param {ProductImageCreateArgs} args - Arguments to create a ProductImage.
     * @example
     * // Create one ProductImage
     * const ProductImage = await prisma.productImage.create({
     *   data: {
     *     // ... data to create a ProductImage
     *   }
     * })
     *
     */
    create<T extends ProductImageCreateArgs>(
      args: SelectSubset<T, ProductImageCreateArgs<ExtArgs>>,
    ): Prisma__ProductImageClient<
      $Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many ProductImages.
     * @param {ProductImageCreateManyArgs} args - Arguments to create many ProductImages.
     * @example
     * // Create many ProductImages
     * const productImage = await prisma.productImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductImageCreateManyArgs>(
      args?: SelectSubset<T, ProductImageCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ProductImages and returns the data saved in the database.
     * @param {ProductImageCreateManyAndReturnArgs} args - Arguments to create many ProductImages.
     * @example
     * // Create many ProductImages
     * const productImage = await prisma.productImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ProductImages and only return the `id`
     * const productImageWithIdOnly = await prisma.productImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductImageCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ProductImageCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductImagePayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a ProductImage.
     * @param {ProductImageDeleteArgs} args - Arguments to delete one ProductImage.
     * @example
     * // Delete one ProductImage
     * const ProductImage = await prisma.productImage.delete({
     *   where: {
     *     // ... filter to delete one ProductImage
     *   }
     * })
     *
     */
    delete<T extends ProductImageDeleteArgs>(
      args: SelectSubset<T, ProductImageDeleteArgs<ExtArgs>>,
    ): Prisma__ProductImageClient<
      $Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one ProductImage.
     * @param {ProductImageUpdateArgs} args - Arguments to update one ProductImage.
     * @example
     * // Update one ProductImage
     * const productImage = await prisma.productImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductImageUpdateArgs>(
      args: SelectSubset<T, ProductImageUpdateArgs<ExtArgs>>,
    ): Prisma__ProductImageClient<
      $Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more ProductImages.
     * @param {ProductImageDeleteManyArgs} args - Arguments to filter ProductImages to delete.
     * @example
     * // Delete a few ProductImages
     * const { count } = await prisma.productImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductImageDeleteManyArgs>(
      args?: SelectSubset<T, ProductImageDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductImages
     * const productImage = await prisma.productImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductImageUpdateManyArgs>(
      args: SelectSubset<T, ProductImageUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one ProductImage.
     * @param {ProductImageUpsertArgs} args - Arguments to update or create a ProductImage.
     * @example
     * // Update or create a ProductImage
     * const productImage = await prisma.productImage.upsert({
     *   create: {
     *     // ... data to create a ProductImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductImage we want to update
     *   }
     * })
     */
    upsert<T extends ProductImageUpsertArgs>(
      args: SelectSubset<T, ProductImageUpsertArgs<ExtArgs>>,
    ): Prisma__ProductImageClient<
      $Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageCountArgs} args - Arguments to filter ProductImages to count.
     * @example
     * // Count the number of ProductImages
     * const count = await prisma.productImage.count({
     *   where: {
     *     // ... the filter for the ProductImages we want to count
     *   }
     * })
     **/
    count<T extends ProductImageCountArgs>(
      args?: Subset<T, ProductImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ProductImageCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProductImageAggregateArgs>(
      args: Subset<T, ProductImageAggregateArgs>,
    ): Prisma.PrismaPromise<GetProductImageAggregateType<T>>;

    /**
     * Group by ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ProductImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductImageGroupByArgs["orderBy"] }
        : { orderBy?: ProductImageGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ProductImageGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetProductImageGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ProductImage model
     */
    readonly fields: ProductImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductImageClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ProductDefaultArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      | $Result.GetResult<
          Prisma.$ProductPayload<ExtArgs>,
          T,
          "findUniqueOrThrow"
        >
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ProductImage model
   */
  interface ProductImageFieldRefs {
    readonly id: FieldRef<"ProductImage", "String">;
    readonly productId: FieldRef<"ProductImage", "String">;
    readonly url: FieldRef<"ProductImage", "String">;
    readonly altText: FieldRef<"ProductImage", "String">;
    readonly caption: FieldRef<"ProductImage", "String">;
    readonly width: FieldRef<"ProductImage", "Int">;
    readonly height: FieldRef<"ProductImage", "Int">;
    readonly size: FieldRef<"ProductImage", "Int">;
    readonly sortOrder: FieldRef<"ProductImage", "Int">;
    readonly imageType: FieldRef<"ProductImage", "ImageType">;
    readonly isActive: FieldRef<"ProductImage", "Boolean">;
    readonly createdAt: FieldRef<"ProductImage", "DateTime">;
    readonly updatedAt: FieldRef<"ProductImage", "DateTime">;
  }

  // Custom InputTypes
  /**
   * ProductImage findUnique
   */
  export type ProductImageFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null;
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput;
  };

  /**
   * ProductImage findUniqueOrThrow
   */
  export type ProductImageFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null;
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput;
  };

  /**
   * ProductImage findFirst
   */
  export type ProductImageFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null;
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductImages to fetch.
     */
    orderBy?:
      | ProductImageOrderByWithRelationInput
      | ProductImageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductImages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[];
  };

  /**
   * ProductImage findFirstOrThrow
   */
  export type ProductImageFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null;
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductImages to fetch.
     */
    orderBy?:
      | ProductImageOrderByWithRelationInput
      | ProductImageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductImages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[];
  };

  /**
   * ProductImage findMany
   */
  export type ProductImageFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null;
    /**
     * Filter, which ProductImages to fetch.
     */
    where?: ProductImageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductImages to fetch.
     */
    orderBy?:
      | ProductImageOrderByWithRelationInput
      | ProductImageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductImages.
     */
    skip?: number;
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[];
  };

  /**
   * ProductImage create
   */
  export type ProductImageCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null;
    /**
     * The data needed to create a ProductImage.
     */
    data: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>;
  };

  /**
   * ProductImage createMany
   */
  export type ProductImageCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ProductImages.
     */
    data: ProductImageCreateManyInput | ProductImageCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ProductImage createManyAndReturn
   */
  export type ProductImageCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many ProductImages.
     */
    data: ProductImageCreateManyInput | ProductImageCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ProductImage update
   */
  export type ProductImageUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null;
    /**
     * The data needed to update a ProductImage.
     */
    data: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>;
    /**
     * Choose, which ProductImage to update.
     */
    where: ProductImageWhereUniqueInput;
  };

  /**
   * ProductImage updateMany
   */
  export type ProductImageUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ProductImages.
     */
    data: XOR<
      ProductImageUpdateManyMutationInput,
      ProductImageUncheckedUpdateManyInput
    >;
    /**
     * Filter which ProductImages to update
     */
    where?: ProductImageWhereInput;
  };

  /**
   * ProductImage upsert
   */
  export type ProductImageUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null;
    /**
     * The filter to search for the ProductImage to update in case it exists.
     */
    where: ProductImageWhereUniqueInput;
    /**
     * In case the ProductImage found by the `where` argument doesn't exist, create a new ProductImage with this data.
     */
    create: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>;
    /**
     * In case the ProductImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>;
  };

  /**
   * ProductImage delete
   */
  export type ProductImageDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null;
    /**
     * Filter which ProductImage to delete.
     */
    where: ProductImageWhereUniqueInput;
  };

  /**
   * ProductImage deleteMany
   */
  export type ProductImageDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ProductImages to delete
     */
    where?: ProductImageWhereInput;
  };

  /**
   * ProductImage without action
   */
  export type ProductImageDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null;
  };

  /**
   * Model ProductCategory
   */

  export type AggregateProductCategory = {
    _count: ProductCategoryCountAggregateOutputType | null;
    _min: ProductCategoryMinAggregateOutputType | null;
    _max: ProductCategoryMaxAggregateOutputType | null;
  };

  export type ProductCategoryMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    categoryId: string | null;
    createdAt: Date | null;
  };

  export type ProductCategoryMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    categoryId: string | null;
    createdAt: Date | null;
  };

  export type ProductCategoryCountAggregateOutputType = {
    id: number;
    productId: number;
    categoryId: number;
    createdAt: number;
    _all: number;
  };

  export type ProductCategoryMinAggregateInputType = {
    id?: true;
    productId?: true;
    categoryId?: true;
    createdAt?: true;
  };

  export type ProductCategoryMaxAggregateInputType = {
    id?: true;
    productId?: true;
    categoryId?: true;
    createdAt?: true;
  };

  export type ProductCategoryCountAggregateInputType = {
    id?: true;
    productId?: true;
    categoryId?: true;
    createdAt?: true;
    _all?: true;
  };

  export type ProductCategoryAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ProductCategory to aggregate.
     */
    where?: ProductCategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductCategories to fetch.
     */
    orderBy?:
      | ProductCategoryOrderByWithRelationInput
      | ProductCategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProductCategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductCategories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductCategories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ProductCategories
     **/
    _count?: true | ProductCategoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProductCategoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProductCategoryMaxAggregateInputType;
  };

  export type GetProductCategoryAggregateType<
    T extends ProductCategoryAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateProductCategory]: P extends
      | "_count"
      | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductCategory[P]>
      : GetScalarType<T[P], AggregateProductCategory[P]>;
  };

  export type ProductCategoryGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductCategoryWhereInput;
    orderBy?:
      | ProductCategoryOrderByWithAggregationInput
      | ProductCategoryOrderByWithAggregationInput[];
    by: ProductCategoryScalarFieldEnum[] | ProductCategoryScalarFieldEnum;
    having?: ProductCategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductCategoryCountAggregateInputType | true;
    _min?: ProductCategoryMinAggregateInputType;
    _max?: ProductCategoryMaxAggregateInputType;
  };

  export type ProductCategoryGroupByOutputType = {
    id: string;
    productId: string;
    categoryId: string;
    createdAt: Date;
    _count: ProductCategoryCountAggregateOutputType | null;
    _min: ProductCategoryMinAggregateOutputType | null;
    _max: ProductCategoryMaxAggregateOutputType | null;
  };

  type GetProductCategoryGroupByPayload<T extends ProductCategoryGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ProductCategoryGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof ProductCategoryGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ProductCategoryGroupByOutputType[P]>;
        }
      >
    >;

  export type ProductCategorySelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      productId?: boolean;
      categoryId?: boolean;
      createdAt?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
      category?: boolean | CategoryDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["productCategory"]
  >;

  export type ProductCategorySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      productId?: boolean;
      categoryId?: boolean;
      createdAt?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
      category?: boolean | CategoryDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["productCategory"]
  >;

  export type ProductCategorySelectScalar = {
    id?: boolean;
    productId?: boolean;
    categoryId?: boolean;
    createdAt?: boolean;
  };

  export type ProductCategoryInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
    category?: boolean | CategoryDefaultArgs<ExtArgs>;
  };
  export type ProductCategoryIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
    category?: boolean | CategoryDefaultArgs<ExtArgs>;
  };

  export type $ProductCategoryPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "ProductCategory";
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>;
      category: Prisma.$CategoryPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        productId: string;
        categoryId: string;
        createdAt: Date;
      },
      ExtArgs["result"]["productCategory"]
    >;
    composites: {};
  };

  type ProductCategoryGetPayload<
    S extends boolean | null | undefined | ProductCategoryDefaultArgs,
  > = $Result.GetResult<Prisma.$ProductCategoryPayload, S>;

  type ProductCategoryCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ProductCategoryFindManyArgs, "select" | "include" | "distinct"> & {
    select?: ProductCategoryCountAggregateInputType | true;
  };

  export interface ProductCategoryDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["ProductCategory"];
      meta: { name: "ProductCategory" };
    };
    /**
     * Find zero or one ProductCategory that matches the filter.
     * @param {ProductCategoryFindUniqueArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductCategoryFindUniqueArgs>(
      args: SelectSubset<T, ProductCategoryFindUniqueArgs<ExtArgs>>,
    ): Prisma__ProductCategoryClient<
      $Result.GetResult<
        Prisma.$ProductCategoryPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one ProductCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductCategoryFindUniqueOrThrowArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductCategoryFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ProductCategoryFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductCategoryClient<
      $Result.GetResult<
        Prisma.$ProductCategoryPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first ProductCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryFindFirstArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductCategoryFindFirstArgs>(
      args?: SelectSubset<T, ProductCategoryFindFirstArgs<ExtArgs>>,
    ): Prisma__ProductCategoryClient<
      $Result.GetResult<
        Prisma.$ProductCategoryPayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first ProductCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryFindFirstOrThrowArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductCategoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProductCategoryFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductCategoryClient<
      $Result.GetResult<
        Prisma.$ProductCategoryPayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more ProductCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductCategories
     * const productCategories = await prisma.productCategory.findMany()
     *
     * // Get first 10 ProductCategories
     * const productCategories = await prisma.productCategory.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const productCategoryWithIdOnly = await prisma.productCategory.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProductCategoryFindManyArgs>(
      args?: SelectSubset<T, ProductCategoryFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a ProductCategory.
     * @param {ProductCategoryCreateArgs} args - Arguments to create a ProductCategory.
     * @example
     * // Create one ProductCategory
     * const ProductCategory = await prisma.productCategory.create({
     *   data: {
     *     // ... data to create a ProductCategory
     *   }
     * })
     *
     */
    create<T extends ProductCategoryCreateArgs>(
      args: SelectSubset<T, ProductCategoryCreateArgs<ExtArgs>>,
    ): Prisma__ProductCategoryClient<
      $Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many ProductCategories.
     * @param {ProductCategoryCreateManyArgs} args - Arguments to create many ProductCategories.
     * @example
     * // Create many ProductCategories
     * const productCategory = await prisma.productCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductCategoryCreateManyArgs>(
      args?: SelectSubset<T, ProductCategoryCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ProductCategories and returns the data saved in the database.
     * @param {ProductCategoryCreateManyAndReturnArgs} args - Arguments to create many ProductCategories.
     * @example
     * // Create many ProductCategories
     * const productCategory = await prisma.productCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ProductCategories and only return the `id`
     * const productCategoryWithIdOnly = await prisma.productCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductCategoryCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ProductCategoryCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductCategoryPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a ProductCategory.
     * @param {ProductCategoryDeleteArgs} args - Arguments to delete one ProductCategory.
     * @example
     * // Delete one ProductCategory
     * const ProductCategory = await prisma.productCategory.delete({
     *   where: {
     *     // ... filter to delete one ProductCategory
     *   }
     * })
     *
     */
    delete<T extends ProductCategoryDeleteArgs>(
      args: SelectSubset<T, ProductCategoryDeleteArgs<ExtArgs>>,
    ): Prisma__ProductCategoryClient<
      $Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one ProductCategory.
     * @param {ProductCategoryUpdateArgs} args - Arguments to update one ProductCategory.
     * @example
     * // Update one ProductCategory
     * const productCategory = await prisma.productCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductCategoryUpdateArgs>(
      args: SelectSubset<T, ProductCategoryUpdateArgs<ExtArgs>>,
    ): Prisma__ProductCategoryClient<
      $Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more ProductCategories.
     * @param {ProductCategoryDeleteManyArgs} args - Arguments to filter ProductCategories to delete.
     * @example
     * // Delete a few ProductCategories
     * const { count } = await prisma.productCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductCategoryDeleteManyArgs>(
      args?: SelectSubset<T, ProductCategoryDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ProductCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductCategories
     * const productCategory = await prisma.productCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductCategoryUpdateManyArgs>(
      args: SelectSubset<T, ProductCategoryUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one ProductCategory.
     * @param {ProductCategoryUpsertArgs} args - Arguments to update or create a ProductCategory.
     * @example
     * // Update or create a ProductCategory
     * const productCategory = await prisma.productCategory.upsert({
     *   create: {
     *     // ... data to create a ProductCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductCategory we want to update
     *   }
     * })
     */
    upsert<T extends ProductCategoryUpsertArgs>(
      args: SelectSubset<T, ProductCategoryUpsertArgs<ExtArgs>>,
    ): Prisma__ProductCategoryClient<
      $Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of ProductCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryCountArgs} args - Arguments to filter ProductCategories to count.
     * @example
     * // Count the number of ProductCategories
     * const count = await prisma.productCategory.count({
     *   where: {
     *     // ... the filter for the ProductCategories we want to count
     *   }
     * })
     **/
    count<T extends ProductCategoryCountArgs>(
      args?: Subset<T, ProductCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ProductCategoryCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ProductCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProductCategoryAggregateArgs>(
      args: Subset<T, ProductCategoryAggregateArgs>,
    ): Prisma.PrismaPromise<GetProductCategoryAggregateType<T>>;

    /**
     * Group by ProductCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ProductCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductCategoryGroupByArgs["orderBy"] }
        : { orderBy?: ProductCategoryGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ProductCategoryGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetProductCategoryGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ProductCategory model
     */
    readonly fields: ProductCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductCategoryClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ProductDefaultArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      | $Result.GetResult<
          Prisma.$ProductPayload<ExtArgs>,
          T,
          "findUniqueOrThrow"
        >
      | Null,
      Null,
      ExtArgs
    >;
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, CategoryDefaultArgs<ExtArgs>>,
    ): Prisma__CategoryClient<
      | $Result.GetResult<
          Prisma.$CategoryPayload<ExtArgs>,
          T,
          "findUniqueOrThrow"
        >
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ProductCategory model
   */
  interface ProductCategoryFieldRefs {
    readonly id: FieldRef<"ProductCategory", "String">;
    readonly productId: FieldRef<"ProductCategory", "String">;
    readonly categoryId: FieldRef<"ProductCategory", "String">;
    readonly createdAt: FieldRef<"ProductCategory", "DateTime">;
  }

  // Custom InputTypes
  /**
   * ProductCategory findUnique
   */
  export type ProductCategoryFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which ProductCategory to fetch.
     */
    where: ProductCategoryWhereUniqueInput;
  };

  /**
   * ProductCategory findUniqueOrThrow
   */
  export type ProductCategoryFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which ProductCategory to fetch.
     */
    where: ProductCategoryWhereUniqueInput;
  };

  /**
   * ProductCategory findFirst
   */
  export type ProductCategoryFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which ProductCategory to fetch.
     */
    where?: ProductCategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductCategories to fetch.
     */
    orderBy?:
      | ProductCategoryOrderByWithRelationInput
      | ProductCategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductCategories.
     */
    cursor?: ProductCategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductCategories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductCategories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductCategories.
     */
    distinct?:
      | ProductCategoryScalarFieldEnum
      | ProductCategoryScalarFieldEnum[];
  };

  /**
   * ProductCategory findFirstOrThrow
   */
  export type ProductCategoryFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which ProductCategory to fetch.
     */
    where?: ProductCategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductCategories to fetch.
     */
    orderBy?:
      | ProductCategoryOrderByWithRelationInput
      | ProductCategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductCategories.
     */
    cursor?: ProductCategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductCategories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductCategories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductCategories.
     */
    distinct?:
      | ProductCategoryScalarFieldEnum
      | ProductCategoryScalarFieldEnum[];
  };

  /**
   * ProductCategory findMany
   */
  export type ProductCategoryFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which ProductCategories to fetch.
     */
    where?: ProductCategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductCategories to fetch.
     */
    orderBy?:
      | ProductCategoryOrderByWithRelationInput
      | ProductCategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ProductCategories.
     */
    cursor?: ProductCategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductCategories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductCategories.
     */
    skip?: number;
    distinct?:
      | ProductCategoryScalarFieldEnum
      | ProductCategoryScalarFieldEnum[];
  };

  /**
   * ProductCategory create
   */
  export type ProductCategoryCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a ProductCategory.
     */
    data: XOR<ProductCategoryCreateInput, ProductCategoryUncheckedCreateInput>;
  };

  /**
   * ProductCategory createMany
   */
  export type ProductCategoryCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ProductCategories.
     */
    data: ProductCategoryCreateManyInput | ProductCategoryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ProductCategory createManyAndReturn
   */
  export type ProductCategoryCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many ProductCategories.
     */
    data: ProductCategoryCreateManyInput | ProductCategoryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ProductCategory update
   */
  export type ProductCategoryUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a ProductCategory.
     */
    data: XOR<ProductCategoryUpdateInput, ProductCategoryUncheckedUpdateInput>;
    /**
     * Choose, which ProductCategory to update.
     */
    where: ProductCategoryWhereUniqueInput;
  };

  /**
   * ProductCategory updateMany
   */
  export type ProductCategoryUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ProductCategories.
     */
    data: XOR<
      ProductCategoryUpdateManyMutationInput,
      ProductCategoryUncheckedUpdateManyInput
    >;
    /**
     * Filter which ProductCategories to update
     */
    where?: ProductCategoryWhereInput;
  };

  /**
   * ProductCategory upsert
   */
  export type ProductCategoryUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the ProductCategory to update in case it exists.
     */
    where: ProductCategoryWhereUniqueInput;
    /**
     * In case the ProductCategory found by the `where` argument doesn't exist, create a new ProductCategory with this data.
     */
    create: XOR<
      ProductCategoryCreateInput,
      ProductCategoryUncheckedCreateInput
    >;
    /**
     * In case the ProductCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<
      ProductCategoryUpdateInput,
      ProductCategoryUncheckedUpdateInput
    >;
  };

  /**
   * ProductCategory delete
   */
  export type ProductCategoryDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null;
    /**
     * Filter which ProductCategory to delete.
     */
    where: ProductCategoryWhereUniqueInput;
  };

  /**
   * ProductCategory deleteMany
   */
  export type ProductCategoryDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ProductCategories to delete
     */
    where?: ProductCategoryWhereInput;
  };

  /**
   * ProductCategory without action
   */
  export type ProductCategoryDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCategory
     */
    select?: ProductCategorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductCategoryInclude<ExtArgs> | null;
  };

  /**
   * Model CartItem
   */

  export type AggregateCartItem = {
    _count: CartItemCountAggregateOutputType | null;
    _avg: CartItemAvgAggregateOutputType | null;
    _sum: CartItemSumAggregateOutputType | null;
    _min: CartItemMinAggregateOutputType | null;
    _max: CartItemMaxAggregateOutputType | null;
  };

  export type CartItemAvgAggregateOutputType = {
    quantity: number | null;
    unitPrice: Decimal | null;
  };

  export type CartItemSumAggregateOutputType = {
    quantity: number | null;
    unitPrice: Decimal | null;
  };

  export type CartItemMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    productId: string | null;
    quantity: number | null;
    unitPrice: Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type CartItemMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    productId: string | null;
    quantity: number | null;
    unitPrice: Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type CartItemCountAggregateOutputType = {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type CartItemAvgAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
  };

  export type CartItemSumAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
  };

  export type CartItemMinAggregateInputType = {
    id?: true;
    userId?: true;
    productId?: true;
    quantity?: true;
    unitPrice?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type CartItemMaxAggregateInputType = {
    id?: true;
    userId?: true;
    productId?: true;
    quantity?: true;
    unitPrice?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type CartItemCountAggregateInputType = {
    id?: true;
    userId?: true;
    productId?: true;
    quantity?: true;
    unitPrice?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type CartItemAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which CartItem to aggregate.
     */
    where?: CartItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CartItems to fetch.
     */
    orderBy?:
      | CartItemOrderByWithRelationInput
      | CartItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CartItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CartItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned CartItems
     **/
    _count?: true | CartItemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: CartItemAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: CartItemSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: CartItemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: CartItemMaxAggregateInputType;
  };

  export type GetCartItemAggregateType<T extends CartItemAggregateArgs> = {
    [P in keyof T & keyof AggregateCartItem]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCartItem[P]>
      : GetScalarType<T[P], AggregateCartItem[P]>;
  };

  export type CartItemGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CartItemWhereInput;
    orderBy?:
      | CartItemOrderByWithAggregationInput
      | CartItemOrderByWithAggregationInput[];
    by: CartItemScalarFieldEnum[] | CartItemScalarFieldEnum;
    having?: CartItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CartItemCountAggregateInputType | true;
    _avg?: CartItemAvgAggregateInputType;
    _sum?: CartItemSumAggregateInputType;
    _min?: CartItemMinAggregateInputType;
    _max?: CartItemMaxAggregateInputType;
  };

  export type CartItemGroupByOutputType = {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    unitPrice: Decimal;
    createdAt: Date;
    updatedAt: Date;
    _count: CartItemCountAggregateOutputType | null;
    _avg: CartItemAvgAggregateOutputType | null;
    _sum: CartItemSumAggregateOutputType | null;
    _min: CartItemMinAggregateOutputType | null;
    _max: CartItemMaxAggregateOutputType | null;
  };

  type GetCartItemGroupByPayload<T extends CartItemGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<CartItemGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof CartItemGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartItemGroupByOutputType[P]>
            : GetScalarType<T[P], CartItemGroupByOutputType[P]>;
        }
      >
    >;

  export type CartItemSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      productId?: boolean;
      quantity?: boolean;
      unitPrice?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["cartItem"]
  >;

  export type CartItemSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      productId?: boolean;
      quantity?: boolean;
      unitPrice?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["cartItem"]
  >;

  export type CartItemSelectScalar = {
    id?: boolean;
    userId?: boolean;
    productId?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type CartItemInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    product?: boolean | ProductDefaultArgs<ExtArgs>;
  };
  export type CartItemIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    product?: boolean | ProductDefaultArgs<ExtArgs>;
  };

  export type $CartItemPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "CartItem";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        productId: string;
        quantity: number;
        unitPrice: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["cartItem"]
    >;
    composites: {};
  };

  type CartItemGetPayload<
    S extends boolean | null | undefined | CartItemDefaultArgs,
  > = $Result.GetResult<Prisma.$CartItemPayload, S>;

  type CartItemCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<CartItemFindManyArgs, "select" | "include" | "distinct"> & {
    select?: CartItemCountAggregateInputType | true;
  };

  export interface CartItemDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["CartItem"];
      meta: { name: "CartItem" };
    };
    /**
     * Find zero or one CartItem that matches the filter.
     * @param {CartItemFindUniqueArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartItemFindUniqueArgs>(
      args: SelectSubset<T, CartItemFindUniqueArgs<ExtArgs>>,
    ): Prisma__CartItemClient<
      $Result.GetResult<
        Prisma.$CartItemPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one CartItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CartItemFindUniqueOrThrowArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartItemFindUniqueOrThrowArgs>(
      args: SelectSubset<T, CartItemFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__CartItemClient<
      $Result.GetResult<
        Prisma.$CartItemPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first CartItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindFirstArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartItemFindFirstArgs>(
      args?: SelectSubset<T, CartItemFindFirstArgs<ExtArgs>>,
    ): Prisma__CartItemClient<
      $Result.GetResult<
        Prisma.$CartItemPayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first CartItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindFirstOrThrowArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartItemFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CartItemFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__CartItemClient<
      $Result.GetResult<
        Prisma.$CartItemPayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more CartItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CartItems
     * const cartItems = await prisma.cartItem.findMany()
     *
     * // Get first 10 CartItems
     * const cartItems = await prisma.cartItem.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const cartItemWithIdOnly = await prisma.cartItem.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CartItemFindManyArgs>(
      args?: SelectSubset<T, CartItemFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a CartItem.
     * @param {CartItemCreateArgs} args - Arguments to create a CartItem.
     * @example
     * // Create one CartItem
     * const CartItem = await prisma.cartItem.create({
     *   data: {
     *     // ... data to create a CartItem
     *   }
     * })
     *
     */
    create<T extends CartItemCreateArgs>(
      args: SelectSubset<T, CartItemCreateArgs<ExtArgs>>,
    ): Prisma__CartItemClient<
      $Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many CartItems.
     * @param {CartItemCreateManyArgs} args - Arguments to create many CartItems.
     * @example
     * // Create many CartItems
     * const cartItem = await prisma.cartItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CartItemCreateManyArgs>(
      args?: SelectSubset<T, CartItemCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many CartItems and returns the data saved in the database.
     * @param {CartItemCreateManyAndReturnArgs} args - Arguments to create many CartItems.
     * @example
     * // Create many CartItems
     * const cartItem = await prisma.cartItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many CartItems and only return the `id`
     * const cartItemWithIdOnly = await prisma.cartItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CartItemCreateManyAndReturnArgs>(
      args?: SelectSubset<T, CartItemCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CartItemPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a CartItem.
     * @param {CartItemDeleteArgs} args - Arguments to delete one CartItem.
     * @example
     * // Delete one CartItem
     * const CartItem = await prisma.cartItem.delete({
     *   where: {
     *     // ... filter to delete one CartItem
     *   }
     * })
     *
     */
    delete<T extends CartItemDeleteArgs>(
      args: SelectSubset<T, CartItemDeleteArgs<ExtArgs>>,
    ): Prisma__CartItemClient<
      $Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one CartItem.
     * @param {CartItemUpdateArgs} args - Arguments to update one CartItem.
     * @example
     * // Update one CartItem
     * const cartItem = await prisma.cartItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CartItemUpdateArgs>(
      args: SelectSubset<T, CartItemUpdateArgs<ExtArgs>>,
    ): Prisma__CartItemClient<
      $Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more CartItems.
     * @param {CartItemDeleteManyArgs} args - Arguments to filter CartItems to delete.
     * @example
     * // Delete a few CartItems
     * const { count } = await prisma.cartItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CartItemDeleteManyArgs>(
      args?: SelectSubset<T, CartItemDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more CartItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CartItems
     * const cartItem = await prisma.cartItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CartItemUpdateManyArgs>(
      args: SelectSubset<T, CartItemUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one CartItem.
     * @param {CartItemUpsertArgs} args - Arguments to update or create a CartItem.
     * @example
     * // Update or create a CartItem
     * const cartItem = await prisma.cartItem.upsert({
     *   create: {
     *     // ... data to create a CartItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CartItem we want to update
     *   }
     * })
     */
    upsert<T extends CartItemUpsertArgs>(
      args: SelectSubset<T, CartItemUpsertArgs<ExtArgs>>,
    ): Prisma__CartItemClient<
      $Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of CartItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemCountArgs} args - Arguments to filter CartItems to count.
     * @example
     * // Count the number of CartItems
     * const count = await prisma.cartItem.count({
     *   where: {
     *     // ... the filter for the CartItems we want to count
     *   }
     * })
     **/
    count<T extends CartItemCountArgs>(
      args?: Subset<T, CartItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], CartItemCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a CartItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends CartItemAggregateArgs>(
      args: Subset<T, CartItemAggregateArgs>,
    ): Prisma.PrismaPromise<GetCartItemAggregateType<T>>;

    /**
     * Group by CartItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends CartItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartItemGroupByArgs["orderBy"] }
        : { orderBy?: CartItemGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, CartItemGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetCartItemGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the CartItem model
     */
    readonly fields: CartItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CartItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartItemClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">
      | Null,
      Null,
      ExtArgs
    >;
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ProductDefaultArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      | $Result.GetResult<
          Prisma.$ProductPayload<ExtArgs>,
          T,
          "findUniqueOrThrow"
        >
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the CartItem model
   */
  interface CartItemFieldRefs {
    readonly id: FieldRef<"CartItem", "String">;
    readonly userId: FieldRef<"CartItem", "String">;
    readonly productId: FieldRef<"CartItem", "String">;
    readonly quantity: FieldRef<"CartItem", "Int">;
    readonly unitPrice: FieldRef<"CartItem", "Decimal">;
    readonly createdAt: FieldRef<"CartItem", "DateTime">;
    readonly updatedAt: FieldRef<"CartItem", "DateTime">;
  }

  // Custom InputTypes
  /**
   * CartItem findUnique
   */
  export type CartItemFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null;
    /**
     * Filter, which CartItem to fetch.
     */
    where: CartItemWhereUniqueInput;
  };

  /**
   * CartItem findUniqueOrThrow
   */
  export type CartItemFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null;
    /**
     * Filter, which CartItem to fetch.
     */
    where: CartItemWhereUniqueInput;
  };

  /**
   * CartItem findFirst
   */
  export type CartItemFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null;
    /**
     * Filter, which CartItem to fetch.
     */
    where?: CartItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CartItems to fetch.
     */
    orderBy?:
      | CartItemOrderByWithRelationInput
      | CartItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CartItems.
     */
    cursor?: CartItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CartItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CartItems.
     */
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[];
  };

  /**
   * CartItem findFirstOrThrow
   */
  export type CartItemFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null;
    /**
     * Filter, which CartItem to fetch.
     */
    where?: CartItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CartItems to fetch.
     */
    orderBy?:
      | CartItemOrderByWithRelationInput
      | CartItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CartItems.
     */
    cursor?: CartItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CartItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CartItems.
     */
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[];
  };

  /**
   * CartItem findMany
   */
  export type CartItemFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null;
    /**
     * Filter, which CartItems to fetch.
     */
    where?: CartItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CartItems to fetch.
     */
    orderBy?:
      | CartItemOrderByWithRelationInput
      | CartItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing CartItems.
     */
    cursor?: CartItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CartItems.
     */
    skip?: number;
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[];
  };

  /**
   * CartItem create
   */
  export type CartItemCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null;
    /**
     * The data needed to create a CartItem.
     */
    data: XOR<CartItemCreateInput, CartItemUncheckedCreateInput>;
  };

  /**
   * CartItem createMany
   */
  export type CartItemCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many CartItems.
     */
    data: CartItemCreateManyInput | CartItemCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * CartItem createManyAndReturn
   */
  export type CartItemCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many CartItems.
     */
    data: CartItemCreateManyInput | CartItemCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * CartItem update
   */
  export type CartItemUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null;
    /**
     * The data needed to update a CartItem.
     */
    data: XOR<CartItemUpdateInput, CartItemUncheckedUpdateInput>;
    /**
     * Choose, which CartItem to update.
     */
    where: CartItemWhereUniqueInput;
  };

  /**
   * CartItem updateMany
   */
  export type CartItemUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update CartItems.
     */
    data: XOR<
      CartItemUpdateManyMutationInput,
      CartItemUncheckedUpdateManyInput
    >;
    /**
     * Filter which CartItems to update
     */
    where?: CartItemWhereInput;
  };

  /**
   * CartItem upsert
   */
  export type CartItemUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null;
    /**
     * The filter to search for the CartItem to update in case it exists.
     */
    where: CartItemWhereUniqueInput;
    /**
     * In case the CartItem found by the `where` argument doesn't exist, create a new CartItem with this data.
     */
    create: XOR<CartItemCreateInput, CartItemUncheckedCreateInput>;
    /**
     * In case the CartItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartItemUpdateInput, CartItemUncheckedUpdateInput>;
  };

  /**
   * CartItem delete
   */
  export type CartItemDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null;
    /**
     * Filter which CartItem to delete.
     */
    where: CartItemWhereUniqueInput;
  };

  /**
   * CartItem deleteMany
   */
  export type CartItemDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which CartItems to delete
     */
    where?: CartItemWhereInput;
  };

  /**
   * CartItem without action
   */
  export type CartItemDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null;
  };

  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null;
    _avg: OrderAvgAggregateOutputType | null;
    _sum: OrderSumAggregateOutputType | null;
    _min: OrderMinAggregateOutputType | null;
    _max: OrderMaxAggregateOutputType | null;
  };

  export type OrderAvgAggregateOutputType = {
    subtotal: Decimal | null;
    taxAmount: Decimal | null;
    shippingCost: Decimal | null;
    discountAmount: Decimal | null;
    totalAmount: Decimal | null;
  };

  export type OrderSumAggregateOutputType = {
    subtotal: Decimal | null;
    taxAmount: Decimal | null;
    shippingCost: Decimal | null;
    discountAmount: Decimal | null;
    totalAmount: Decimal | null;
  };

  export type OrderMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    orderNumber: string | null;
    subtotal: Decimal | null;
    taxAmount: Decimal | null;
    shippingCost: Decimal | null;
    discountAmount: Decimal | null;
    totalAmount: Decimal | null;
    status: $Enums.OrderStatus | null;
    paymentStatus: $Enums.PaymentStatus | null;
    customerEmail: string | null;
    paymentMethod: string | null;
    paymentIntentId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type OrderMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    orderNumber: string | null;
    subtotal: Decimal | null;
    taxAmount: Decimal | null;
    shippingCost: Decimal | null;
    discountAmount: Decimal | null;
    totalAmount: Decimal | null;
    status: $Enums.OrderStatus | null;
    paymentStatus: $Enums.PaymentStatus | null;
    customerEmail: string | null;
    paymentMethod: string | null;
    paymentIntentId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type OrderCountAggregateOutputType = {
    id: number;
    userId: number;
    orderNumber: number;
    subtotal: number;
    taxAmount: number;
    shippingCost: number;
    discountAmount: number;
    totalAmount: number;
    status: number;
    paymentStatus: number;
    customerEmail: number;
    shippingAddress: number;
    billingAddress: number;
    paymentMethod: number;
    paymentIntentId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type OrderAvgAggregateInputType = {
    subtotal?: true;
    taxAmount?: true;
    shippingCost?: true;
    discountAmount?: true;
    totalAmount?: true;
  };

  export type OrderSumAggregateInputType = {
    subtotal?: true;
    taxAmount?: true;
    shippingCost?: true;
    discountAmount?: true;
    totalAmount?: true;
  };

  export type OrderMinAggregateInputType = {
    id?: true;
    userId?: true;
    orderNumber?: true;
    subtotal?: true;
    taxAmount?: true;
    shippingCost?: true;
    discountAmount?: true;
    totalAmount?: true;
    status?: true;
    paymentStatus?: true;
    customerEmail?: true;
    paymentMethod?: true;
    paymentIntentId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type OrderMaxAggregateInputType = {
    id?: true;
    userId?: true;
    orderNumber?: true;
    subtotal?: true;
    taxAmount?: true;
    shippingCost?: true;
    discountAmount?: true;
    totalAmount?: true;
    status?: true;
    paymentStatus?: true;
    customerEmail?: true;
    paymentMethod?: true;
    paymentIntentId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type OrderCountAggregateInputType = {
    id?: true;
    userId?: true;
    orderNumber?: true;
    subtotal?: true;
    taxAmount?: true;
    shippingCost?: true;
    discountAmount?: true;
    totalAmount?: true;
    status?: true;
    paymentStatus?: true;
    customerEmail?: true;
    shippingAddress?: true;
    billingAddress?: true;
    paymentMethod?: true;
    paymentIntentId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type OrderAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Orders
     **/
    _count?: true | OrderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: OrderAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: OrderSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrderMaxAggregateInputType;
  };

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
    [P in keyof T & keyof AggregateOrder]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>;
  };

  export type OrderGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderWhereInput;
    orderBy?:
      | OrderOrderByWithAggregationInput
      | OrderOrderByWithAggregationInput[];
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum;
    having?: OrderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderCountAggregateInputType | true;
    _avg?: OrderAvgAggregateInputType;
    _sum?: OrderSumAggregateInputType;
    _min?: OrderMinAggregateInputType;
    _max?: OrderMaxAggregateInputType;
  };

  export type OrderGroupByOutputType = {
    id: string;
    userId: string;
    orderNumber: string;
    subtotal: Decimal;
    taxAmount: Decimal;
    shippingCost: Decimal;
    discountAmount: Decimal;
    totalAmount: Decimal;
    status: $Enums.OrderStatus;
    paymentStatus: $Enums.PaymentStatus;
    customerEmail: string;
    shippingAddress: JsonValue;
    billingAddress: JsonValue;
    paymentMethod: string | null;
    paymentIntentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: OrderCountAggregateOutputType | null;
    _avg: OrderAvgAggregateOutputType | null;
    _sum: OrderSumAggregateOutputType | null;
    _min: OrderMinAggregateOutputType | null;
    _max: OrderMaxAggregateOutputType | null;
  };

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<OrderGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof OrderGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>;
        }
      >
    >;

  export type OrderSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      orderNumber?: boolean;
      subtotal?: boolean;
      taxAmount?: boolean;
      shippingCost?: boolean;
      discountAmount?: boolean;
      totalAmount?: boolean;
      status?: boolean;
      paymentStatus?: boolean;
      customerEmail?: boolean;
      shippingAddress?: boolean;
      billingAddress?: boolean;
      paymentMethod?: boolean;
      paymentIntentId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      orderItems?: boolean | Order$orderItemsArgs<ExtArgs>;
      _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["order"]
  >;

  export type OrderSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      orderNumber?: boolean;
      subtotal?: boolean;
      taxAmount?: boolean;
      shippingCost?: boolean;
      discountAmount?: boolean;
      totalAmount?: boolean;
      status?: boolean;
      paymentStatus?: boolean;
      customerEmail?: boolean;
      shippingAddress?: boolean;
      billingAddress?: boolean;
      paymentMethod?: boolean;
      paymentIntentId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["order"]
  >;

  export type OrderSelectScalar = {
    id?: boolean;
    userId?: boolean;
    orderNumber?: boolean;
    subtotal?: boolean;
    taxAmount?: boolean;
    shippingCost?: boolean;
    discountAmount?: boolean;
    totalAmount?: boolean;
    status?: boolean;
    paymentStatus?: boolean;
    customerEmail?: boolean;
    shippingAddress?: boolean;
    billingAddress?: boolean;
    paymentMethod?: boolean;
    paymentIntentId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type OrderInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    orderItems?: boolean | Order$orderItemsArgs<ExtArgs>;
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type OrderIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $OrderPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Order";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        orderNumber: string;
        subtotal: Prisma.Decimal;
        taxAmount: Prisma.Decimal;
        shippingCost: Prisma.Decimal;
        discountAmount: Prisma.Decimal;
        totalAmount: Prisma.Decimal;
        status: $Enums.OrderStatus;
        paymentStatus: $Enums.PaymentStatus;
        customerEmail: string;
        shippingAddress: Prisma.JsonValue;
        billingAddress: Prisma.JsonValue;
        paymentMethod: string | null;
        paymentIntentId: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["order"]
    >;
    composites: {};
  };

  type OrderGetPayload<
    S extends boolean | null | undefined | OrderDefaultArgs,
  > = $Result.GetResult<Prisma.$OrderPayload, S>;

  type OrderCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<OrderFindManyArgs, "select" | "include" | "distinct"> & {
    select?: OrderCountAggregateInputType | true;
  };

  export interface OrderDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Order"];
      meta: { name: "Order" };
    };
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(
      args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(
      args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(
      args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst"> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow">,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     *
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderFindManyArgs>(
      args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     *
     */
    create<T extends OrderCreateArgs>(
      args: SelectSubset<T, OrderCreateArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderCreateManyArgs>(
      args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(
      args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn">
    >;

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     *
     */
    delete<T extends OrderDeleteArgs>(
      args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderUpdateArgs>(
      args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderDeleteManyArgs>(
      args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderUpdateManyArgs>(
      args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(
      args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
     **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], OrderCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrderAggregateArgs>(
      args: Subset<T, OrderAggregateArgs>,
    ): Prisma.PrismaPromise<GetOrderAggregateType<T>>;

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs["orderBy"] }
        : { orderBy?: OrderGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetOrderGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Order model
     */
    readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">
      | Null,
      Null,
      ExtArgs
    >;
    orderItems<T extends Order$orderItemsArgs<ExtArgs> = {}>(
      args?: Subset<T, Order$orderItemsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany"> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", "String">;
    readonly userId: FieldRef<"Order", "String">;
    readonly orderNumber: FieldRef<"Order", "String">;
    readonly subtotal: FieldRef<"Order", "Decimal">;
    readonly taxAmount: FieldRef<"Order", "Decimal">;
    readonly shippingCost: FieldRef<"Order", "Decimal">;
    readonly discountAmount: FieldRef<"Order", "Decimal">;
    readonly totalAmount: FieldRef<"Order", "Decimal">;
    readonly status: FieldRef<"Order", "OrderStatus">;
    readonly paymentStatus: FieldRef<"Order", "PaymentStatus">;
    readonly customerEmail: FieldRef<"Order", "String">;
    readonly shippingAddress: FieldRef<"Order", "Json">;
    readonly billingAddress: FieldRef<"Order", "Json">;
    readonly paymentMethod: FieldRef<"Order", "String">;
    readonly paymentIntentId: FieldRef<"Order", "String">;
    readonly createdAt: FieldRef<"Order", "DateTime">;
    readonly updatedAt: FieldRef<"Order", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order create
   */
  export type OrderCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>;
  };

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Order update
   */
  export type OrderUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>;
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>;
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput;
  };

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput;
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>;
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>;
  };

  /**
   * Order delete
   */
  export type OrderDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput;
  };

  /**
   * Order.orderItems
   */
  export type Order$orderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    where?: OrderItemWhereInput;
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    cursor?: OrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * Order without action
   */
  export type OrderDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
  };

  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null;
    _avg: OrderItemAvgAggregateOutputType | null;
    _sum: OrderItemSumAggregateOutputType | null;
    _min: OrderItemMinAggregateOutputType | null;
    _max: OrderItemMaxAggregateOutputType | null;
  };

  export type OrderItemAvgAggregateOutputType = {
    quantity: number | null;
    unitPrice: Decimal | null;
    totalPrice: Decimal | null;
  };

  export type OrderItemSumAggregateOutputType = {
    quantity: number | null;
    unitPrice: Decimal | null;
    totalPrice: Decimal | null;
  };

  export type OrderItemMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    productId: string | null;
    productName: string | null;
    productSku: string | null;
    quantity: number | null;
    unitPrice: Decimal | null;
    totalPrice: Decimal | null;
    createdAt: Date | null;
  };

  export type OrderItemMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    productId: string | null;
    productName: string | null;
    productSku: string | null;
    quantity: number | null;
    unitPrice: Decimal | null;
    totalPrice: Decimal | null;
    createdAt: Date | null;
  };

  export type OrderItemCountAggregateOutputType = {
    id: number;
    orderId: number;
    productId: number;
    productName: number;
    productSku: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    createdAt: number;
    _all: number;
  };

  export type OrderItemAvgAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
  };

  export type OrderItemSumAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
  };

  export type OrderItemMinAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    productName?: true;
    productSku?: true;
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
    createdAt?: true;
  };

  export type OrderItemMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    productName?: true;
    productSku?: true;
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
    createdAt?: true;
  };

  export type OrderItemCountAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    productName?: true;
    productSku?: true;
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
    createdAt?: true;
    _all?: true;
  };

  export type OrderItemAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OrderItems
     **/
    _count?: true | OrderItemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: OrderItemAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: OrderItemSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrderItemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrderItemMaxAggregateInputType;
  };

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderItem]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>;
  };

  export type OrderItemGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderItemWhereInput;
    orderBy?:
      | OrderItemOrderByWithAggregationInput
      | OrderItemOrderByWithAggregationInput[];
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum;
    having?: OrderItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderItemCountAggregateInputType | true;
    _avg?: OrderItemAvgAggregateInputType;
    _sum?: OrderItemSumAggregateInputType;
    _min?: OrderItemMinAggregateInputType;
    _max?: OrderItemMaxAggregateInputType;
  };

  export type OrderItemGroupByOutputType = {
    id: string;
    orderId: string;
    productId: string;
    productName: string;
    productSku: string | null;
    quantity: number;
    unitPrice: Decimal;
    totalPrice: Decimal;
    createdAt: Date;
    _count: OrderItemCountAggregateOutputType | null;
    _avg: OrderItemAvgAggregateOutputType | null;
    _sum: OrderItemSumAggregateOutputType | null;
    _min: OrderItemMinAggregateOutputType | null;
    _max: OrderItemMaxAggregateOutputType | null;
  };

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<OrderItemGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof OrderItemGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>;
        }
      >
    >;

  export type OrderItemSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderId?: boolean;
      productId?: boolean;
      productName?: boolean;
      productSku?: boolean;
      quantity?: boolean;
      unitPrice?: boolean;
      totalPrice?: boolean;
      createdAt?: boolean;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["orderItem"]
  >;

  export type OrderItemSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderId?: boolean;
      productId?: boolean;
      productName?: boolean;
      productSku?: boolean;
      quantity?: boolean;
      unitPrice?: boolean;
      totalPrice?: boolean;
      createdAt?: boolean;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["orderItem"]
  >;

  export type OrderItemSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    productId?: boolean;
    productName?: boolean;
    productSku?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    totalPrice?: boolean;
    createdAt?: boolean;
  };

  export type OrderItemInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
    product?: boolean | ProductDefaultArgs<ExtArgs>;
  };
  export type OrderItemIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
    product?: boolean | ProductDefaultArgs<ExtArgs>;
  };

  export type $OrderItemPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "OrderItem";
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>;
      product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        orderId: string;
        productId: string;
        productName: string;
        productSku: string | null;
        quantity: number;
        unitPrice: Prisma.Decimal;
        totalPrice: Prisma.Decimal;
        createdAt: Date;
      },
      ExtArgs["result"]["orderItem"]
    >;
    composites: {};
  };

  type OrderItemGetPayload<
    S extends boolean | null | undefined | OrderItemDefaultArgs,
  > = $Result.GetResult<Prisma.$OrderItemPayload, S>;

  type OrderItemCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<OrderItemFindManyArgs, "select" | "include" | "distinct"> & {
    select?: OrderItemCountAggregateInputType | true;
  };

  export interface OrderItemDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["OrderItem"];
      meta: { name: "OrderItem" };
    };
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(
      args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(
      args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(
      args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     *
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderItemFindManyArgs>(
      args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     *
     */
    create<T extends OrderItemCreateArgs>(
      args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderItemCreateManyArgs>(
      args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(
      args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     *
     */
    delete<T extends OrderItemDeleteArgs>(
      args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderItemUpdateArgs>(
      args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(
      args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderItemUpdateManyArgs>(
      args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(
      args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
     **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], OrderItemCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrderItemAggregateArgs>(
      args: Subset<T, OrderItemAggregateArgs>,
    ): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>;

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs["orderBy"] }
        : { orderBy?: OrderItemGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetOrderItemGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OrderItem model
     */
    readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, OrderDefaultArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      | $Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow">
      | Null,
      Null,
      ExtArgs
    >;
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ProductDefaultArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      | $Result.GetResult<
          Prisma.$ProductPayload<ExtArgs>,
          T,
          "findUniqueOrThrow"
        >
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", "String">;
    readonly orderId: FieldRef<"OrderItem", "String">;
    readonly productId: FieldRef<"OrderItem", "String">;
    readonly productName: FieldRef<"OrderItem", "String">;
    readonly productSku: FieldRef<"OrderItem", "String">;
    readonly quantity: FieldRef<"OrderItem", "Int">;
    readonly unitPrice: FieldRef<"OrderItem", "Decimal">;
    readonly totalPrice: FieldRef<"OrderItem", "Decimal">;
    readonly createdAt: FieldRef<"OrderItem", "DateTime">;
  }

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>;
  };

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>;
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<
      OrderItemUpdateManyMutationInput,
      OrderItemUncheckedUpdateManyInput
    >;
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput;
  };

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput;
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>;
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>;
  };

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput;
  };

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
  };

  /**
   * Model Referral
   */

  export type AggregateReferral = {
    _count: ReferralCountAggregateOutputType | null;
    _avg: ReferralAvgAggregateOutputType | null;
    _sum: ReferralSumAggregateOutputType | null;
    _min: ReferralMinAggregateOutputType | null;
    _max: ReferralMaxAggregateOutputType | null;
  };

  export type ReferralAvgAggregateOutputType = {
    commissionRate: Decimal | null;
    commissionEarned: Decimal | null;
    clickCount: number | null;
  };

  export type ReferralSumAggregateOutputType = {
    commissionRate: Decimal | null;
    commissionEarned: Decimal | null;
    clickCount: number | null;
  };

  export type ReferralMinAggregateOutputType = {
    id: string | null;
    referrerId: string | null;
    referredId: string | null;
    referralCode: string | null;
    email: string | null;
    status: $Enums.ReferralStatus | null;
    commissionRate: Decimal | null;
    commissionEarned: Decimal | null;
    clickCount: number | null;
    conversionAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ReferralMaxAggregateOutputType = {
    id: string | null;
    referrerId: string | null;
    referredId: string | null;
    referralCode: string | null;
    email: string | null;
    status: $Enums.ReferralStatus | null;
    commissionRate: Decimal | null;
    commissionEarned: Decimal | null;
    clickCount: number | null;
    conversionAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ReferralCountAggregateOutputType = {
    id: number;
    referrerId: number;
    referredId: number;
    referralCode: number;
    email: number;
    status: number;
    commissionRate: number;
    commissionEarned: number;
    clickCount: number;
    conversionAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ReferralAvgAggregateInputType = {
    commissionRate?: true;
    commissionEarned?: true;
    clickCount?: true;
  };

  export type ReferralSumAggregateInputType = {
    commissionRate?: true;
    commissionEarned?: true;
    clickCount?: true;
  };

  export type ReferralMinAggregateInputType = {
    id?: true;
    referrerId?: true;
    referredId?: true;
    referralCode?: true;
    email?: true;
    status?: true;
    commissionRate?: true;
    commissionEarned?: true;
    clickCount?: true;
    conversionAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ReferralMaxAggregateInputType = {
    id?: true;
    referrerId?: true;
    referredId?: true;
    referralCode?: true;
    email?: true;
    status?: true;
    commissionRate?: true;
    commissionEarned?: true;
    clickCount?: true;
    conversionAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ReferralCountAggregateInputType = {
    id?: true;
    referrerId?: true;
    referredId?: true;
    referralCode?: true;
    email?: true;
    status?: true;
    commissionRate?: true;
    commissionEarned?: true;
    clickCount?: true;
    conversionAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ReferralAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Referral to aggregate.
     */
    where?: ReferralWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Referrals to fetch.
     */
    orderBy?:
      | ReferralOrderByWithRelationInput
      | ReferralOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ReferralWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Referrals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Referrals
     **/
    _count?: true | ReferralCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ReferralAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ReferralSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ReferralMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ReferralMaxAggregateInputType;
  };

  export type GetReferralAggregateType<T extends ReferralAggregateArgs> = {
    [P in keyof T & keyof AggregateReferral]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReferral[P]>
      : GetScalarType<T[P], AggregateReferral[P]>;
  };

  export type ReferralGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ReferralWhereInput;
    orderBy?:
      | ReferralOrderByWithAggregationInput
      | ReferralOrderByWithAggregationInput[];
    by: ReferralScalarFieldEnum[] | ReferralScalarFieldEnum;
    having?: ReferralScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReferralCountAggregateInputType | true;
    _avg?: ReferralAvgAggregateInputType;
    _sum?: ReferralSumAggregateInputType;
    _min?: ReferralMinAggregateInputType;
    _max?: ReferralMaxAggregateInputType;
  };

  export type ReferralGroupByOutputType = {
    id: string;
    referrerId: string;
    referredId: string | null;
    referralCode: string;
    email: string | null;
    status: $Enums.ReferralStatus;
    commissionRate: Decimal;
    commissionEarned: Decimal;
    clickCount: number;
    conversionAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ReferralCountAggregateOutputType | null;
    _avg: ReferralAvgAggregateOutputType | null;
    _sum: ReferralSumAggregateOutputType | null;
    _min: ReferralMinAggregateOutputType | null;
    _max: ReferralMaxAggregateOutputType | null;
  };

  type GetReferralGroupByPayload<T extends ReferralGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ReferralGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof ReferralGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReferralGroupByOutputType[P]>
            : GetScalarType<T[P], ReferralGroupByOutputType[P]>;
        }
      >
    >;

  export type ReferralSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      referrerId?: boolean;
      referredId?: boolean;
      referralCode?: boolean;
      email?: boolean;
      status?: boolean;
      commissionRate?: boolean;
      commissionEarned?: boolean;
      clickCount?: boolean;
      conversionAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      referrer?: boolean | UserDefaultArgs<ExtArgs>;
      referred?: boolean | Referral$referredArgs<ExtArgs>;
    },
    ExtArgs["result"]["referral"]
  >;

  export type ReferralSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      referrerId?: boolean;
      referredId?: boolean;
      referralCode?: boolean;
      email?: boolean;
      status?: boolean;
      commissionRate?: boolean;
      commissionEarned?: boolean;
      clickCount?: boolean;
      conversionAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      referrer?: boolean | UserDefaultArgs<ExtArgs>;
      referred?: boolean | Referral$referredArgs<ExtArgs>;
    },
    ExtArgs["result"]["referral"]
  >;

  export type ReferralSelectScalar = {
    id?: boolean;
    referrerId?: boolean;
    referredId?: boolean;
    referralCode?: boolean;
    email?: boolean;
    status?: boolean;
    commissionRate?: boolean;
    commissionEarned?: boolean;
    clickCount?: boolean;
    conversionAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ReferralInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    referrer?: boolean | UserDefaultArgs<ExtArgs>;
    referred?: boolean | Referral$referredArgs<ExtArgs>;
  };
  export type ReferralIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    referrer?: boolean | UserDefaultArgs<ExtArgs>;
    referred?: boolean | Referral$referredArgs<ExtArgs>;
  };

  export type $ReferralPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Referral";
    objects: {
      referrer: Prisma.$UserPayload<ExtArgs>;
      referred: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        referrerId: string;
        referredId: string | null;
        referralCode: string;
        email: string | null;
        status: $Enums.ReferralStatus;
        commissionRate: Prisma.Decimal;
        commissionEarned: Prisma.Decimal;
        clickCount: number;
        conversionAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["referral"]
    >;
    composites: {};
  };

  type ReferralGetPayload<
    S extends boolean | null | undefined | ReferralDefaultArgs,
  > = $Result.GetResult<Prisma.$ReferralPayload, S>;

  type ReferralCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ReferralFindManyArgs, "select" | "include" | "distinct"> & {
    select?: ReferralCountAggregateInputType | true;
  };

  export interface ReferralDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Referral"];
      meta: { name: "Referral" };
    };
    /**
     * Find zero or one Referral that matches the filter.
     * @param {ReferralFindUniqueArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReferralFindUniqueArgs>(
      args: SelectSubset<T, ReferralFindUniqueArgs<ExtArgs>>,
    ): Prisma__ReferralClient<
      $Result.GetResult<
        Prisma.$ReferralPayload<ExtArgs>,
        T,
        "findUnique"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Referral that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReferralFindUniqueOrThrowArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReferralFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ReferralFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ReferralClient<
      $Result.GetResult<
        Prisma.$ReferralPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first Referral that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFindFirstArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReferralFindFirstArgs>(
      args?: SelectSubset<T, ReferralFindFirstArgs<ExtArgs>>,
    ): Prisma__ReferralClient<
      $Result.GetResult<
        Prisma.$ReferralPayload<ExtArgs>,
        T,
        "findFirst"
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Referral that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFindFirstOrThrowArgs} args - Arguments to find a Referral
     * @example
     * // Get one Referral
     * const referral = await prisma.referral.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReferralFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ReferralFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ReferralClient<
      $Result.GetResult<
        Prisma.$ReferralPayload<ExtArgs>,
        T,
        "findFirstOrThrow"
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Referrals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Referrals
     * const referrals = await prisma.referral.findMany()
     *
     * // Get first 10 Referrals
     * const referrals = await prisma.referral.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const referralWithIdOnly = await prisma.referral.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ReferralFindManyArgs>(
      args?: SelectSubset<T, ReferralFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "findMany">
    >;

    /**
     * Create a Referral.
     * @param {ReferralCreateArgs} args - Arguments to create a Referral.
     * @example
     * // Create one Referral
     * const Referral = await prisma.referral.create({
     *   data: {
     *     // ... data to create a Referral
     *   }
     * })
     *
     */
    create<T extends ReferralCreateArgs>(
      args: SelectSubset<T, ReferralCreateArgs<ExtArgs>>,
    ): Prisma__ReferralClient<
      $Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "create">,
      never,
      ExtArgs
    >;

    /**
     * Create many Referrals.
     * @param {ReferralCreateManyArgs} args - Arguments to create many Referrals.
     * @example
     * // Create many Referrals
     * const referral = await prisma.referral.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ReferralCreateManyArgs>(
      args?: SelectSubset<T, ReferralCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Referrals and returns the data saved in the database.
     * @param {ReferralCreateManyAndReturnArgs} args - Arguments to create many Referrals.
     * @example
     * // Create many Referrals
     * const referral = await prisma.referral.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Referrals and only return the `id`
     * const referralWithIdOnly = await prisma.referral.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ReferralCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ReferralCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ReferralPayload<ExtArgs>,
        T,
        "createManyAndReturn"
      >
    >;

    /**
     * Delete a Referral.
     * @param {ReferralDeleteArgs} args - Arguments to delete one Referral.
     * @example
     * // Delete one Referral
     * const Referral = await prisma.referral.delete({
     *   where: {
     *     // ... filter to delete one Referral
     *   }
     * })
     *
     */
    delete<T extends ReferralDeleteArgs>(
      args: SelectSubset<T, ReferralDeleteArgs<ExtArgs>>,
    ): Prisma__ReferralClient<
      $Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "delete">,
      never,
      ExtArgs
    >;

    /**
     * Update one Referral.
     * @param {ReferralUpdateArgs} args - Arguments to update one Referral.
     * @example
     * // Update one Referral
     * const referral = await prisma.referral.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ReferralUpdateArgs>(
      args: SelectSubset<T, ReferralUpdateArgs<ExtArgs>>,
    ): Prisma__ReferralClient<
      $Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "update">,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Referrals.
     * @param {ReferralDeleteManyArgs} args - Arguments to filter Referrals to delete.
     * @example
     * // Delete a few Referrals
     * const { count } = await prisma.referral.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ReferralDeleteManyArgs>(
      args?: SelectSubset<T, ReferralDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Referrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Referrals
     * const referral = await prisma.referral.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ReferralUpdateManyArgs>(
      args: SelectSubset<T, ReferralUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Referral.
     * @param {ReferralUpsertArgs} args - Arguments to update or create a Referral.
     * @example
     * // Update or create a Referral
     * const referral = await prisma.referral.upsert({
     *   create: {
     *     // ... data to create a Referral
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Referral we want to update
     *   }
     * })
     */
    upsert<T extends ReferralUpsertArgs>(
      args: SelectSubset<T, ReferralUpsertArgs<ExtArgs>>,
    ): Prisma__ReferralClient<
      $Result.GetResult<Prisma.$ReferralPayload<ExtArgs>, T, "upsert">,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Referrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralCountArgs} args - Arguments to filter Referrals to count.
     * @example
     * // Count the number of Referrals
     * const count = await prisma.referral.count({
     *   where: {
     *     // ... the filter for the Referrals we want to count
     *   }
     * })
     **/
    count<T extends ReferralCountArgs>(
      args?: Subset<T, ReferralCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ReferralCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Referral.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ReferralAggregateArgs>(
      args: Subset<T, ReferralAggregateArgs>,
    ): Prisma.PrismaPromise<GetReferralAggregateType<T>>;

    /**
     * Group by Referral.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ReferralGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReferralGroupByArgs["orderBy"] }
        : { orderBy?: ReferralGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ReferralGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetReferralGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Referral model
     */
    readonly fields: ReferralFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Referral.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReferralClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    referrer<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">
      | Null,
      Null,
      ExtArgs
    >;
    referred<T extends Referral$referredArgs<ExtArgs> = {}>(
      args?: Subset<T, Referral$referredArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUniqueOrThrow"
      > | null,
      null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Referral model
   */
  interface ReferralFieldRefs {
    readonly id: FieldRef<"Referral", "String">;
    readonly referrerId: FieldRef<"Referral", "String">;
    readonly referredId: FieldRef<"Referral", "String">;
    readonly referralCode: FieldRef<"Referral", "String">;
    readonly email: FieldRef<"Referral", "String">;
    readonly status: FieldRef<"Referral", "ReferralStatus">;
    readonly commissionRate: FieldRef<"Referral", "Decimal">;
    readonly commissionEarned: FieldRef<"Referral", "Decimal">;
    readonly clickCount: FieldRef<"Referral", "Int">;
    readonly conversionAt: FieldRef<"Referral", "DateTime">;
    readonly createdAt: FieldRef<"Referral", "DateTime">;
    readonly updatedAt: FieldRef<"Referral", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Referral findUnique
   */
  export type ReferralFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null;
    /**
     * Filter, which Referral to fetch.
     */
    where: ReferralWhereUniqueInput;
  };

  /**
   * Referral findUniqueOrThrow
   */
  export type ReferralFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null;
    /**
     * Filter, which Referral to fetch.
     */
    where: ReferralWhereUniqueInput;
  };

  /**
   * Referral findFirst
   */
  export type ReferralFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null;
    /**
     * Filter, which Referral to fetch.
     */
    where?: ReferralWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Referrals to fetch.
     */
    orderBy?:
      | ReferralOrderByWithRelationInput
      | ReferralOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Referrals.
     */
    cursor?: ReferralWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Referrals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Referrals.
     */
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[];
  };

  /**
   * Referral findFirstOrThrow
   */
  export type ReferralFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null;
    /**
     * Filter, which Referral to fetch.
     */
    where?: ReferralWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Referrals to fetch.
     */
    orderBy?:
      | ReferralOrderByWithRelationInput
      | ReferralOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Referrals.
     */
    cursor?: ReferralWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Referrals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Referrals.
     */
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[];
  };

  /**
   * Referral findMany
   */
  export type ReferralFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null;
    /**
     * Filter, which Referrals to fetch.
     */
    where?: ReferralWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Referrals to fetch.
     */
    orderBy?:
      | ReferralOrderByWithRelationInput
      | ReferralOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Referrals.
     */
    cursor?: ReferralWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Referrals.
     */
    skip?: number;
    distinct?: ReferralScalarFieldEnum | ReferralScalarFieldEnum[];
  };

  /**
   * Referral create
   */
  export type ReferralCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null;
    /**
     * The data needed to create a Referral.
     */
    data: XOR<ReferralCreateInput, ReferralUncheckedCreateInput>;
  };

  /**
   * Referral createMany
   */
  export type ReferralCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Referrals.
     */
    data: ReferralCreateManyInput | ReferralCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Referral createManyAndReturn
   */
  export type ReferralCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Referrals.
     */
    data: ReferralCreateManyInput | ReferralCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Referral update
   */
  export type ReferralUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null;
    /**
     * The data needed to update a Referral.
     */
    data: XOR<ReferralUpdateInput, ReferralUncheckedUpdateInput>;
    /**
     * Choose, which Referral to update.
     */
    where: ReferralWhereUniqueInput;
  };

  /**
   * Referral updateMany
   */
  export type ReferralUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Referrals.
     */
    data: XOR<
      ReferralUpdateManyMutationInput,
      ReferralUncheckedUpdateManyInput
    >;
    /**
     * Filter which Referrals to update
     */
    where?: ReferralWhereInput;
  };

  /**
   * Referral upsert
   */
  export type ReferralUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null;
    /**
     * The filter to search for the Referral to update in case it exists.
     */
    where: ReferralWhereUniqueInput;
    /**
     * In case the Referral found by the `where` argument doesn't exist, create a new Referral with this data.
     */
    create: XOR<ReferralCreateInput, ReferralUncheckedCreateInput>;
    /**
     * In case the Referral was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReferralUpdateInput, ReferralUncheckedUpdateInput>;
  };

  /**
   * Referral delete
   */
  export type ReferralDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null;
    /**
     * Filter which Referral to delete.
     */
    where: ReferralWhereUniqueInput;
  };

  /**
   * Referral deleteMany
   */
  export type ReferralDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Referrals to delete
     */
    where?: ReferralWhereInput;
  };

  /**
   * Referral.referred
   */
  export type Referral$referredArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    where?: UserWhereInput;
  };

  /**
   * Referral without action
   */
  export type ReferralDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Referral
     */
    select?: ReferralSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: "ReadUncommitted";
    ReadCommitted: "ReadCommitted";
    RepeatableRead: "RepeatableRead";
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: "id";
    email: "email";
    emailVerified: "emailVerified";
    name: "name";
    image: "image";
    password: "password";
    role: "role";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const AccountScalarFieldEnum: {
    id: "id";
    userId: "userId";
    type: "type";
    provider: "provider";
    providerAccountId: "providerAccountId";
    refresh_token: "refresh_token";
    access_token: "access_token";
    expires_at: "expires_at";
    token_type: "token_type";
    scope: "scope";
    id_token: "id_token";
    session_state: "session_state";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type AccountScalarFieldEnum =
    (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];

  export const SessionScalarFieldEnum: {
    id: "id";
    sessionToken: "sessionToken";
    userId: "userId";
    expires: "expires";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type SessionScalarFieldEnum =
    (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];

  export const VerificationTokenScalarFieldEnum: {
    identifier: "identifier";
    token: "token";
    expires: "expires";
    createdAt: "createdAt";
  };

  export type VerificationTokenScalarFieldEnum =
    (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum];

  export const CategoryScalarFieldEnum: {
    id: "id";
    name: "name";
    slug: "slug";
    description: "description";
    image: "image";
    parentId: "parentId";
    isActive: "isActive";
    sortOrder: "sortOrder";
    seoTitle: "seoTitle";
    seoDescription: "seoDescription";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type CategoryScalarFieldEnum =
    (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];

  export const ProductScalarFieldEnum: {
    id: "id";
    name: "name";
    slug: "slug";
    description: "description";
    shortDescription: "shortDescription";
    sku: "sku";
    basePrice: "basePrice";
    salePrice: "salePrice";
    costPrice: "costPrice";
    stockQuantity: "stockQuantity";
    lowStockThreshold: "lowStockThreshold";
    trackInventory: "trackInventory";
    allowBackorder: "allowBackorder";
    weight: "weight";
    dimensions: "dimensions";
    seoTitle: "seoTitle";
    seoDescription: "seoDescription";
    tags: "tags";
    status: "status";
    isActive: "isActive";
    isFeatured: "isFeatured";
    publishedAt: "publishedAt";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type ProductScalarFieldEnum =
    (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];

  export const ProductVariantScalarFieldEnum: {
    id: "id";
    productId: "productId";
    sku: "sku";
    name: "name";
    price: "price";
    compareAtPrice: "compareAtPrice";
    costPrice: "costPrice";
    stockQuantity: "stockQuantity";
    attributes: "attributes";
    weight: "weight";
    barcode: "barcode";
    isActive: "isActive";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type ProductVariantScalarFieldEnum =
    (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum];

  export const ProductImageScalarFieldEnum: {
    id: "id";
    productId: "productId";
    url: "url";
    altText: "altText";
    caption: "caption";
    width: "width";
    height: "height";
    size: "size";
    sortOrder: "sortOrder";
    imageType: "imageType";
    isActive: "isActive";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type ProductImageScalarFieldEnum =
    (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum];

  export const ProductCategoryScalarFieldEnum: {
    id: "id";
    productId: "productId";
    categoryId: "categoryId";
    createdAt: "createdAt";
  };

  export type ProductCategoryScalarFieldEnum =
    (typeof ProductCategoryScalarFieldEnum)[keyof typeof ProductCategoryScalarFieldEnum];

  export const CartItemScalarFieldEnum: {
    id: "id";
    userId: "userId";
    productId: "productId";
    quantity: "quantity";
    unitPrice: "unitPrice";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type CartItemScalarFieldEnum =
    (typeof CartItemScalarFieldEnum)[keyof typeof CartItemScalarFieldEnum];

  export const OrderScalarFieldEnum: {
    id: "id";
    userId: "userId";
    orderNumber: "orderNumber";
    subtotal: "subtotal";
    taxAmount: "taxAmount";
    shippingCost: "shippingCost";
    discountAmount: "discountAmount";
    totalAmount: "totalAmount";
    status: "status";
    paymentStatus: "paymentStatus";
    customerEmail: "customerEmail";
    shippingAddress: "shippingAddress";
    billingAddress: "billingAddress";
    paymentMethod: "paymentMethod";
    paymentIntentId: "paymentIntentId";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type OrderScalarFieldEnum =
    (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];

  export const OrderItemScalarFieldEnum: {
    id: "id";
    orderId: "orderId";
    productId: "productId";
    productName: "productName";
    productSku: "productSku";
    quantity: "quantity";
    unitPrice: "unitPrice";
    totalPrice: "totalPrice";
    createdAt: "createdAt";
  };

  export type OrderItemScalarFieldEnum =
    (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];

  export const ReferralScalarFieldEnum: {
    id: "id";
    referrerId: "referrerId";
    referredId: "referredId";
    referralCode: "referralCode";
    email: "email";
    status: "status";
    commissionRate: "commissionRate";
    commissionEarned: "commissionEarned";
    clickCount: "clickCount";
    conversionAt: "conversionAt";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type ReferralScalarFieldEnum =
    (typeof ReferralScalarFieldEnum)[keyof typeof ReferralScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull;
  };

  export type JsonNullValueInput =
    (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: "first";
    last: "last";
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter =
    (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String"
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String[]"
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime"
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime[]"
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int"
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int[]"
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Boolean"
  >;

  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Decimal"
  >;

  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Decimal[]"
  >;

  /**
   * Reference to a field of type 'ProductStatus'
   */
  export type EnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "ProductStatus"
  >;

  /**
   * Reference to a field of type 'ProductStatus[]'
   */
  export type ListEnumProductStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "ProductStatus[]">;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Json"
  >;

  /**
   * Reference to a field of type 'ImageType'
   */
  export type EnumImageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "ImageType"
  >;

  /**
   * Reference to a field of type 'ImageType[]'
   */
  export type ListEnumImageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "ImageType[]"
  >;

  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "OrderStatus"
  >;

  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "OrderStatus[]">;

  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "PaymentStatus"
  >;

  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "PaymentStatus[]">;

  /**
   * Reference to a field of type 'ReferralStatus'
   */
  export type EnumReferralStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "ReferralStatus"
  >;

  /**
   * Reference to a field of type 'ReferralStatus[]'
   */
  export type ListEnumReferralStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "ReferralStatus[]">;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float"
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float[]"
  >;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<"User"> | string;
    email?: StringFilter<"User"> | string;
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null;
    name?: StringNullableFilter<"User"> | string | null;
    image?: StringNullableFilter<"User"> | string | null;
    password?: StringNullableFilter<"User"> | string | null;
    role?: StringFilter<"User"> | string;
    createdAt?: DateTimeFilter<"User"> | Date | string;
    updatedAt?: DateTimeFilter<"User"> | Date | string;
    accounts?: AccountListRelationFilter;
    sessions?: SessionListRelationFilter;
    orders?: OrderListRelationFilter;
    cartItems?: CartItemListRelationFilter;
    referralsGiven?: ReferralListRelationFilter;
    referralsReceived?: ReferralListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrderInput | SortOrder;
    name?: SortOrderInput | SortOrder;
    image?: SortOrderInput | SortOrder;
    password?: SortOrderInput | SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    accounts?: AccountOrderByRelationAggregateInput;
    sessions?: SessionOrderByRelationAggregateInput;
    orders?: OrderOrderByRelationAggregateInput;
    cartItems?: CartItemOrderByRelationAggregateInput;
    referralsGiven?: ReferralOrderByRelationAggregateInput;
    referralsReceived?: ReferralOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null;
      name?: StringNullableFilter<"User"> | string | null;
      image?: StringNullableFilter<"User"> | string | null;
      password?: StringNullableFilter<"User"> | string | null;
      role?: StringFilter<"User"> | string;
      createdAt?: DateTimeFilter<"User"> | Date | string;
      updatedAt?: DateTimeFilter<"User"> | Date | string;
      accounts?: AccountListRelationFilter;
      sessions?: SessionListRelationFilter;
      orders?: OrderListRelationFilter;
      cartItems?: CartItemListRelationFilter;
      referralsGiven?: ReferralListRelationFilter;
      referralsReceived?: ReferralListRelationFilter;
    },
    "id" | "email"
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrderInput | SortOrder;
    name?: SortOrderInput | SortOrder;
    image?: SortOrderInput | SortOrder;
    password?: SortOrderInput | SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"User"> | string;
    email?: StringWithAggregatesFilter<"User"> | string;
    emailVerified?:
      | DateTimeNullableWithAggregatesFilter<"User">
      | Date
      | string
      | null;
    name?: StringNullableWithAggregatesFilter<"User"> | string | null;
    image?: StringNullableWithAggregatesFilter<"User"> | string | null;
    password?: StringNullableWithAggregatesFilter<"User"> | string | null;
    role?: StringWithAggregatesFilter<"User"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
  };

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[];
    OR?: AccountWhereInput[];
    NOT?: AccountWhereInput | AccountWhereInput[];
    id?: StringFilter<"Account"> | string;
    userId?: StringFilter<"Account"> | string;
    type?: StringFilter<"Account"> | string;
    provider?: StringFilter<"Account"> | string;
    providerAccountId?: StringFilter<"Account"> | string;
    refresh_token?: StringNullableFilter<"Account"> | string | null;
    access_token?: StringNullableFilter<"Account"> | string | null;
    expires_at?: IntNullableFilter<"Account"> | number | null;
    token_type?: StringNullableFilter<"Account"> | string | null;
    scope?: StringNullableFilter<"Account"> | string | null;
    id_token?: StringNullableFilter<"Account"> | string | null;
    session_state?: StringNullableFilter<"Account"> | string | null;
    createdAt?: DateTimeFilter<"Account"> | Date | string;
    updatedAt?: DateTimeFilter<"Account"> | Date | string;
    user?: XOR<UserRelationFilter, UserWhereInput>;
  };

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrderInput | SortOrder;
    access_token?: SortOrderInput | SortOrder;
    expires_at?: SortOrderInput | SortOrder;
    token_type?: SortOrderInput | SortOrder;
    scope?: SortOrderInput | SortOrder;
    id_token?: SortOrderInput | SortOrder;
    session_state?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type AccountWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput;
      AND?: AccountWhereInput | AccountWhereInput[];
      OR?: AccountWhereInput[];
      NOT?: AccountWhereInput | AccountWhereInput[];
      userId?: StringFilter<"Account"> | string;
      type?: StringFilter<"Account"> | string;
      provider?: StringFilter<"Account"> | string;
      providerAccountId?: StringFilter<"Account"> | string;
      refresh_token?: StringNullableFilter<"Account"> | string | null;
      access_token?: StringNullableFilter<"Account"> | string | null;
      expires_at?: IntNullableFilter<"Account"> | number | null;
      token_type?: StringNullableFilter<"Account"> | string | null;
      scope?: StringNullableFilter<"Account"> | string | null;
      id_token?: StringNullableFilter<"Account"> | string | null;
      session_state?: StringNullableFilter<"Account"> | string | null;
      createdAt?: DateTimeFilter<"Account"> | Date | string;
      updatedAt?: DateTimeFilter<"Account"> | Date | string;
      user?: XOR<UserRelationFilter, UserWhereInput>;
    },
    "id" | "provider_providerAccountId"
  >;

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrderInput | SortOrder;
    access_token?: SortOrderInput | SortOrder;
    expires_at?: SortOrderInput | SortOrder;
    token_type?: SortOrderInput | SortOrder;
    scope?: SortOrderInput | SortOrder;
    id_token?: SortOrderInput | SortOrder;
    session_state?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: AccountCountOrderByAggregateInput;
    _avg?: AccountAvgOrderByAggregateInput;
    _max?: AccountMaxOrderByAggregateInput;
    _min?: AccountMinOrderByAggregateInput;
    _sum?: AccountSumOrderByAggregateInput;
  };

  export type AccountScalarWhereWithAggregatesInput = {
    AND?:
      | AccountScalarWhereWithAggregatesInput
      | AccountScalarWhereWithAggregatesInput[];
    OR?: AccountScalarWhereWithAggregatesInput[];
    NOT?:
      | AccountScalarWhereWithAggregatesInput
      | AccountScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Account"> | string;
    userId?: StringWithAggregatesFilter<"Account"> | string;
    type?: StringWithAggregatesFilter<"Account"> | string;
    provider?: StringWithAggregatesFilter<"Account"> | string;
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string;
    refresh_token?:
      | StringNullableWithAggregatesFilter<"Account">
      | string
      | null;
    access_token?:
      | StringNullableWithAggregatesFilter<"Account">
      | string
      | null;
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null;
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null;
    session_state?:
      | StringNullableWithAggregatesFilter<"Account">
      | string
      | null;
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string;
  };

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[];
    OR?: SessionWhereInput[];
    NOT?: SessionWhereInput | SessionWhereInput[];
    id?: StringFilter<"Session"> | string;
    sessionToken?: StringFilter<"Session"> | string;
    userId?: StringFilter<"Session"> | string;
    expires?: DateTimeFilter<"Session"> | Date | string;
    createdAt?: DateTimeFilter<"Session"> | Date | string;
    updatedAt?: DateTimeFilter<"Session"> | Date | string;
    user?: XOR<UserRelationFilter, UserWhereInput>;
  };

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type SessionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      sessionToken?: string;
      AND?: SessionWhereInput | SessionWhereInput[];
      OR?: SessionWhereInput[];
      NOT?: SessionWhereInput | SessionWhereInput[];
      userId?: StringFilter<"Session"> | string;
      expires?: DateTimeFilter<"Session"> | Date | string;
      createdAt?: DateTimeFilter<"Session"> | Date | string;
      updatedAt?: DateTimeFilter<"Session"> | Date | string;
      user?: XOR<UserRelationFilter, UserWhereInput>;
    },
    "id" | "sessionToken"
  >;

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: SessionCountOrderByAggregateInput;
    _max?: SessionMaxOrderByAggregateInput;
    _min?: SessionMinOrderByAggregateInput;
  };

  export type SessionScalarWhereWithAggregatesInput = {
    AND?:
      | SessionScalarWhereWithAggregatesInput
      | SessionScalarWhereWithAggregatesInput[];
    OR?: SessionScalarWhereWithAggregatesInput[];
    NOT?:
      | SessionScalarWhereWithAggregatesInput
      | SessionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Session"> | string;
    sessionToken?: StringWithAggregatesFilter<"Session"> | string;
    userId?: StringWithAggregatesFilter<"Session"> | string;
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
  };

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
    OR?: VerificationTokenWhereInput[];
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
    identifier?: StringFilter<"VerificationToken"> | string;
    token?: StringFilter<"VerificationToken"> | string;
    expires?: DateTimeFilter<"VerificationToken"> | Date | string;
    createdAt?: DateTimeFilter<"VerificationToken"> | Date | string;
  };

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
  };

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<
    {
      token?: string;
      identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput;
      AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
      OR?: VerificationTokenWhereInput[];
      NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
      identifier?: StringFilter<"VerificationToken"> | string;
      expires?: DateTimeFilter<"VerificationToken"> | Date | string;
      createdAt?: DateTimeFilter<"VerificationToken"> | Date | string;
    },
    "token" | "identifier_token"
  >;

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
    _count?: VerificationTokenCountOrderByAggregateInput;
    _max?: VerificationTokenMaxOrderByAggregateInput;
    _min?: VerificationTokenMinOrderByAggregateInput;
  };

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?:
      | VerificationTokenScalarWhereWithAggregatesInput
      | VerificationTokenScalarWhereWithAggregatesInput[];
    OR?: VerificationTokenScalarWhereWithAggregatesInput[];
    NOT?:
      | VerificationTokenScalarWhereWithAggregatesInput
      | VerificationTokenScalarWhereWithAggregatesInput[];
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string;
    token?: StringWithAggregatesFilter<"VerificationToken"> | string;
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string;
    createdAt?:
      | DateTimeWithAggregatesFilter<"VerificationToken">
      | Date
      | string;
  };

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[];
    OR?: CategoryWhereInput[];
    NOT?: CategoryWhereInput | CategoryWhereInput[];
    id?: StringFilter<"Category"> | string;
    name?: StringFilter<"Category"> | string;
    slug?: StringFilter<"Category"> | string;
    description?: StringNullableFilter<"Category"> | string | null;
    image?: StringNullableFilter<"Category"> | string | null;
    parentId?: StringNullableFilter<"Category"> | string | null;
    isActive?: BoolFilter<"Category"> | boolean;
    sortOrder?: IntFilter<"Category"> | number;
    seoTitle?: StringNullableFilter<"Category"> | string | null;
    seoDescription?: StringNullableFilter<"Category"> | string | null;
    createdAt?: DateTimeFilter<"Category"> | Date | string;
    updatedAt?: DateTimeFilter<"Category"> | Date | string;
    parent?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null;
    children?: CategoryListRelationFilter;
    productCategories?: ProductCategoryListRelationFilter;
  };

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrderInput | SortOrder;
    image?: SortOrderInput | SortOrder;
    parentId?: SortOrderInput | SortOrder;
    isActive?: SortOrder;
    sortOrder?: SortOrder;
    seoTitle?: SortOrderInput | SortOrder;
    seoDescription?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    parent?: CategoryOrderByWithRelationInput;
    children?: CategoryOrderByRelationAggregateInput;
    productCategories?: ProductCategoryOrderByRelationAggregateInput;
  };

  export type CategoryWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      slug?: string;
      AND?: CategoryWhereInput | CategoryWhereInput[];
      OR?: CategoryWhereInput[];
      NOT?: CategoryWhereInput | CategoryWhereInput[];
      name?: StringFilter<"Category"> | string;
      description?: StringNullableFilter<"Category"> | string | null;
      image?: StringNullableFilter<"Category"> | string | null;
      parentId?: StringNullableFilter<"Category"> | string | null;
      isActive?: BoolFilter<"Category"> | boolean;
      sortOrder?: IntFilter<"Category"> | number;
      seoTitle?: StringNullableFilter<"Category"> | string | null;
      seoDescription?: StringNullableFilter<"Category"> | string | null;
      createdAt?: DateTimeFilter<"Category"> | Date | string;
      updatedAt?: DateTimeFilter<"Category"> | Date | string;
      parent?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null;
      children?: CategoryListRelationFilter;
      productCategories?: ProductCategoryListRelationFilter;
    },
    "id" | "slug"
  >;

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrderInput | SortOrder;
    image?: SortOrderInput | SortOrder;
    parentId?: SortOrderInput | SortOrder;
    isActive?: SortOrder;
    sortOrder?: SortOrder;
    seoTitle?: SortOrderInput | SortOrder;
    seoDescription?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: CategoryCountOrderByAggregateInput;
    _avg?: CategoryAvgOrderByAggregateInput;
    _max?: CategoryMaxOrderByAggregateInput;
    _min?: CategoryMinOrderByAggregateInput;
    _sum?: CategorySumOrderByAggregateInput;
  };

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?:
      | CategoryScalarWhereWithAggregatesInput
      | CategoryScalarWhereWithAggregatesInput[];
    OR?: CategoryScalarWhereWithAggregatesInput[];
    NOT?:
      | CategoryScalarWhereWithAggregatesInput
      | CategoryScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Category"> | string;
    name?: StringWithAggregatesFilter<"Category"> | string;
    slug?: StringWithAggregatesFilter<"Category"> | string;
    description?:
      | StringNullableWithAggregatesFilter<"Category">
      | string
      | null;
    image?: StringNullableWithAggregatesFilter<"Category"> | string | null;
    parentId?: StringNullableWithAggregatesFilter<"Category"> | string | null;
    isActive?: BoolWithAggregatesFilter<"Category"> | boolean;
    sortOrder?: IntWithAggregatesFilter<"Category"> | number;
    seoTitle?: StringNullableWithAggregatesFilter<"Category"> | string | null;
    seoDescription?:
      | StringNullableWithAggregatesFilter<"Category">
      | string
      | null;
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string;
  };

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[];
    OR?: ProductWhereInput[];
    NOT?: ProductWhereInput | ProductWhereInput[];
    id?: StringFilter<"Product"> | string;
    name?: StringFilter<"Product"> | string;
    slug?: StringFilter<"Product"> | string;
    description?: StringNullableFilter<"Product"> | string | null;
    shortDescription?: StringNullableFilter<"Product"> | string | null;
    sku?: StringNullableFilter<"Product"> | string | null;
    basePrice?:
      | DecimalFilter<"Product">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | DecimalNullableFilter<"Product">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | DecimalNullableFilter<"Product">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFilter<"Product"> | number;
    lowStockThreshold?: IntFilter<"Product"> | number;
    trackInventory?: BoolFilter<"Product"> | boolean;
    allowBackorder?: BoolFilter<"Product"> | boolean;
    weight?:
      | DecimalNullableFilter<"Product">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: StringNullableFilter<"Product"> | string | null;
    seoTitle?: StringNullableFilter<"Product"> | string | null;
    seoDescription?: StringNullableFilter<"Product"> | string | null;
    tags?: StringNullableListFilter<"Product">;
    status?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus;
    isActive?: BoolFilter<"Product"> | boolean;
    isFeatured?: BoolFilter<"Product"> | boolean;
    publishedAt?: DateTimeNullableFilter<"Product"> | Date | string | null;
    createdAt?: DateTimeFilter<"Product"> | Date | string;
    updatedAt?: DateTimeFilter<"Product"> | Date | string;
    variants?: ProductVariantListRelationFilter;
    images?: ProductImageListRelationFilter;
    productCategories?: ProductCategoryListRelationFilter;
    cartItems?: CartItemListRelationFilter;
    orderItems?: OrderItemListRelationFilter;
  };

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrderInput | SortOrder;
    shortDescription?: SortOrderInput | SortOrder;
    sku?: SortOrderInput | SortOrder;
    basePrice?: SortOrder;
    salePrice?: SortOrderInput | SortOrder;
    costPrice?: SortOrderInput | SortOrder;
    stockQuantity?: SortOrder;
    lowStockThreshold?: SortOrder;
    trackInventory?: SortOrder;
    allowBackorder?: SortOrder;
    weight?: SortOrderInput | SortOrder;
    dimensions?: SortOrderInput | SortOrder;
    seoTitle?: SortOrderInput | SortOrder;
    seoDescription?: SortOrderInput | SortOrder;
    tags?: SortOrder;
    status?: SortOrder;
    isActive?: SortOrder;
    isFeatured?: SortOrder;
    publishedAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    variants?: ProductVariantOrderByRelationAggregateInput;
    images?: ProductImageOrderByRelationAggregateInput;
    productCategories?: ProductCategoryOrderByRelationAggregateInput;
    cartItems?: CartItemOrderByRelationAggregateInput;
    orderItems?: OrderItemOrderByRelationAggregateInput;
  };

  export type ProductWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      slug?: string;
      sku?: string;
      AND?: ProductWhereInput | ProductWhereInput[];
      OR?: ProductWhereInput[];
      NOT?: ProductWhereInput | ProductWhereInput[];
      name?: StringFilter<"Product"> | string;
      description?: StringNullableFilter<"Product"> | string | null;
      shortDescription?: StringNullableFilter<"Product"> | string | null;
      basePrice?:
        | DecimalFilter<"Product">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      salePrice?:
        | DecimalNullableFilter<"Product">
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      costPrice?:
        | DecimalNullableFilter<"Product">
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      stockQuantity?: IntFilter<"Product"> | number;
      lowStockThreshold?: IntFilter<"Product"> | number;
      trackInventory?: BoolFilter<"Product"> | boolean;
      allowBackorder?: BoolFilter<"Product"> | boolean;
      weight?:
        | DecimalNullableFilter<"Product">
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      dimensions?: StringNullableFilter<"Product"> | string | null;
      seoTitle?: StringNullableFilter<"Product"> | string | null;
      seoDescription?: StringNullableFilter<"Product"> | string | null;
      tags?: StringNullableListFilter<"Product">;
      status?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus;
      isActive?: BoolFilter<"Product"> | boolean;
      isFeatured?: BoolFilter<"Product"> | boolean;
      publishedAt?: DateTimeNullableFilter<"Product"> | Date | string | null;
      createdAt?: DateTimeFilter<"Product"> | Date | string;
      updatedAt?: DateTimeFilter<"Product"> | Date | string;
      variants?: ProductVariantListRelationFilter;
      images?: ProductImageListRelationFilter;
      productCategories?: ProductCategoryListRelationFilter;
      cartItems?: CartItemListRelationFilter;
      orderItems?: OrderItemListRelationFilter;
    },
    "id" | "slug" | "sku"
  >;

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrderInput | SortOrder;
    shortDescription?: SortOrderInput | SortOrder;
    sku?: SortOrderInput | SortOrder;
    basePrice?: SortOrder;
    salePrice?: SortOrderInput | SortOrder;
    costPrice?: SortOrderInput | SortOrder;
    stockQuantity?: SortOrder;
    lowStockThreshold?: SortOrder;
    trackInventory?: SortOrder;
    allowBackorder?: SortOrder;
    weight?: SortOrderInput | SortOrder;
    dimensions?: SortOrderInput | SortOrder;
    seoTitle?: SortOrderInput | SortOrder;
    seoDescription?: SortOrderInput | SortOrder;
    tags?: SortOrder;
    status?: SortOrder;
    isActive?: SortOrder;
    isFeatured?: SortOrder;
    publishedAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ProductCountOrderByAggregateInput;
    _avg?: ProductAvgOrderByAggregateInput;
    _max?: ProductMaxOrderByAggregateInput;
    _min?: ProductMinOrderByAggregateInput;
    _sum?: ProductSumOrderByAggregateInput;
  };

  export type ProductScalarWhereWithAggregatesInput = {
    AND?:
      | ProductScalarWhereWithAggregatesInput
      | ProductScalarWhereWithAggregatesInput[];
    OR?: ProductScalarWhereWithAggregatesInput[];
    NOT?:
      | ProductScalarWhereWithAggregatesInput
      | ProductScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Product"> | string;
    name?: StringWithAggregatesFilter<"Product"> | string;
    slug?: StringWithAggregatesFilter<"Product"> | string;
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null;
    shortDescription?:
      | StringNullableWithAggregatesFilter<"Product">
      | string
      | null;
    sku?: StringNullableWithAggregatesFilter<"Product"> | string | null;
    basePrice?:
      | DecimalWithAggregatesFilter<"Product">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | DecimalNullableWithAggregatesFilter<"Product">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | DecimalNullableWithAggregatesFilter<"Product">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntWithAggregatesFilter<"Product"> | number;
    lowStockThreshold?: IntWithAggregatesFilter<"Product"> | number;
    trackInventory?: BoolWithAggregatesFilter<"Product"> | boolean;
    allowBackorder?: BoolWithAggregatesFilter<"Product"> | boolean;
    weight?:
      | DecimalNullableWithAggregatesFilter<"Product">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: StringNullableWithAggregatesFilter<"Product"> | string | null;
    seoTitle?: StringNullableWithAggregatesFilter<"Product"> | string | null;
    seoDescription?:
      | StringNullableWithAggregatesFilter<"Product">
      | string
      | null;
    tags?: StringNullableListFilter<"Product">;
    status?:
      | EnumProductStatusWithAggregatesFilter<"Product">
      | $Enums.ProductStatus;
    isActive?: BoolWithAggregatesFilter<"Product"> | boolean;
    isFeatured?: BoolWithAggregatesFilter<"Product"> | boolean;
    publishedAt?:
      | DateTimeNullableWithAggregatesFilter<"Product">
      | Date
      | string
      | null;
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string;
  };

  export type ProductVariantWhereInput = {
    AND?: ProductVariantWhereInput | ProductVariantWhereInput[];
    OR?: ProductVariantWhereInput[];
    NOT?: ProductVariantWhereInput | ProductVariantWhereInput[];
    id?: StringFilter<"ProductVariant"> | string;
    productId?: StringFilter<"ProductVariant"> | string;
    sku?: StringFilter<"ProductVariant"> | string;
    name?: StringNullableFilter<"ProductVariant"> | string | null;
    price?:
      | DecimalFilter<"ProductVariant">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    compareAtPrice?:
      | DecimalNullableFilter<"ProductVariant">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | DecimalNullableFilter<"ProductVariant">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFilter<"ProductVariant"> | number;
    attributes?: JsonFilter<"ProductVariant">;
    weight?:
      | DecimalNullableFilter<"ProductVariant">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    barcode?: StringNullableFilter<"ProductVariant"> | string | null;
    isActive?: BoolFilter<"ProductVariant"> | boolean;
    createdAt?: DateTimeFilter<"ProductVariant"> | Date | string;
    updatedAt?: DateTimeFilter<"ProductVariant"> | Date | string;
    product?: XOR<ProductRelationFilter, ProductWhereInput>;
  };

  export type ProductVariantOrderByWithRelationInput = {
    id?: SortOrder;
    productId?: SortOrder;
    sku?: SortOrder;
    name?: SortOrderInput | SortOrder;
    price?: SortOrder;
    compareAtPrice?: SortOrderInput | SortOrder;
    costPrice?: SortOrderInput | SortOrder;
    stockQuantity?: SortOrder;
    attributes?: SortOrder;
    weight?: SortOrderInput | SortOrder;
    barcode?: SortOrderInput | SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    product?: ProductOrderByWithRelationInput;
  };

  export type ProductVariantWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      sku?: string;
      barcode?: string;
      AND?: ProductVariantWhereInput | ProductVariantWhereInput[];
      OR?: ProductVariantWhereInput[];
      NOT?: ProductVariantWhereInput | ProductVariantWhereInput[];
      productId?: StringFilter<"ProductVariant"> | string;
      name?: StringNullableFilter<"ProductVariant"> | string | null;
      price?:
        | DecimalFilter<"ProductVariant">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      compareAtPrice?:
        | DecimalNullableFilter<"ProductVariant">
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      costPrice?:
        | DecimalNullableFilter<"ProductVariant">
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      stockQuantity?: IntFilter<"ProductVariant"> | number;
      attributes?: JsonFilter<"ProductVariant">;
      weight?:
        | DecimalNullableFilter<"ProductVariant">
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      isActive?: BoolFilter<"ProductVariant"> | boolean;
      createdAt?: DateTimeFilter<"ProductVariant"> | Date | string;
      updatedAt?: DateTimeFilter<"ProductVariant"> | Date | string;
      product?: XOR<ProductRelationFilter, ProductWhereInput>;
    },
    "id" | "sku" | "barcode"
  >;

  export type ProductVariantOrderByWithAggregationInput = {
    id?: SortOrder;
    productId?: SortOrder;
    sku?: SortOrder;
    name?: SortOrderInput | SortOrder;
    price?: SortOrder;
    compareAtPrice?: SortOrderInput | SortOrder;
    costPrice?: SortOrderInput | SortOrder;
    stockQuantity?: SortOrder;
    attributes?: SortOrder;
    weight?: SortOrderInput | SortOrder;
    barcode?: SortOrderInput | SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ProductVariantCountOrderByAggregateInput;
    _avg?: ProductVariantAvgOrderByAggregateInput;
    _max?: ProductVariantMaxOrderByAggregateInput;
    _min?: ProductVariantMinOrderByAggregateInput;
    _sum?: ProductVariantSumOrderByAggregateInput;
  };

  export type ProductVariantScalarWhereWithAggregatesInput = {
    AND?:
      | ProductVariantScalarWhereWithAggregatesInput
      | ProductVariantScalarWhereWithAggregatesInput[];
    OR?: ProductVariantScalarWhereWithAggregatesInput[];
    NOT?:
      | ProductVariantScalarWhereWithAggregatesInput
      | ProductVariantScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"ProductVariant"> | string;
    productId?: StringWithAggregatesFilter<"ProductVariant"> | string;
    sku?: StringWithAggregatesFilter<"ProductVariant"> | string;
    name?: StringNullableWithAggregatesFilter<"ProductVariant"> | string | null;
    price?:
      | DecimalWithAggregatesFilter<"ProductVariant">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    compareAtPrice?:
      | DecimalNullableWithAggregatesFilter<"ProductVariant">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | DecimalNullableWithAggregatesFilter<"ProductVariant">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntWithAggregatesFilter<"ProductVariant"> | number;
    attributes?: JsonWithAggregatesFilter<"ProductVariant">;
    weight?:
      | DecimalNullableWithAggregatesFilter<"ProductVariant">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    barcode?:
      | StringNullableWithAggregatesFilter<"ProductVariant">
      | string
      | null;
    isActive?: BoolWithAggregatesFilter<"ProductVariant"> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<"ProductVariant"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"ProductVariant"> | Date | string;
  };

  export type ProductImageWhereInput = {
    AND?: ProductImageWhereInput | ProductImageWhereInput[];
    OR?: ProductImageWhereInput[];
    NOT?: ProductImageWhereInput | ProductImageWhereInput[];
    id?: StringFilter<"ProductImage"> | string;
    productId?: StringFilter<"ProductImage"> | string;
    url?: StringFilter<"ProductImage"> | string;
    altText?: StringNullableFilter<"ProductImage"> | string | null;
    caption?: StringNullableFilter<"ProductImage"> | string | null;
    width?: IntNullableFilter<"ProductImage"> | number | null;
    height?: IntNullableFilter<"ProductImage"> | number | null;
    size?: IntNullableFilter<"ProductImage"> | number | null;
    sortOrder?: IntFilter<"ProductImage"> | number;
    imageType?: EnumImageTypeFilter<"ProductImage"> | $Enums.ImageType;
    isActive?: BoolFilter<"ProductImage"> | boolean;
    createdAt?: DateTimeFilter<"ProductImage"> | Date | string;
    updatedAt?: DateTimeFilter<"ProductImage"> | Date | string;
    product?: XOR<ProductRelationFilter, ProductWhereInput>;
  };

  export type ProductImageOrderByWithRelationInput = {
    id?: SortOrder;
    productId?: SortOrder;
    url?: SortOrder;
    altText?: SortOrderInput | SortOrder;
    caption?: SortOrderInput | SortOrder;
    width?: SortOrderInput | SortOrder;
    height?: SortOrderInput | SortOrder;
    size?: SortOrderInput | SortOrder;
    sortOrder?: SortOrder;
    imageType?: SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    product?: ProductOrderByWithRelationInput;
  };

  export type ProductImageWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ProductImageWhereInput | ProductImageWhereInput[];
      OR?: ProductImageWhereInput[];
      NOT?: ProductImageWhereInput | ProductImageWhereInput[];
      productId?: StringFilter<"ProductImage"> | string;
      url?: StringFilter<"ProductImage"> | string;
      altText?: StringNullableFilter<"ProductImage"> | string | null;
      caption?: StringNullableFilter<"ProductImage"> | string | null;
      width?: IntNullableFilter<"ProductImage"> | number | null;
      height?: IntNullableFilter<"ProductImage"> | number | null;
      size?: IntNullableFilter<"ProductImage"> | number | null;
      sortOrder?: IntFilter<"ProductImage"> | number;
      imageType?: EnumImageTypeFilter<"ProductImage"> | $Enums.ImageType;
      isActive?: BoolFilter<"ProductImage"> | boolean;
      createdAt?: DateTimeFilter<"ProductImage"> | Date | string;
      updatedAt?: DateTimeFilter<"ProductImage"> | Date | string;
      product?: XOR<ProductRelationFilter, ProductWhereInput>;
    },
    "id"
  >;

  export type ProductImageOrderByWithAggregationInput = {
    id?: SortOrder;
    productId?: SortOrder;
    url?: SortOrder;
    altText?: SortOrderInput | SortOrder;
    caption?: SortOrderInput | SortOrder;
    width?: SortOrderInput | SortOrder;
    height?: SortOrderInput | SortOrder;
    size?: SortOrderInput | SortOrder;
    sortOrder?: SortOrder;
    imageType?: SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ProductImageCountOrderByAggregateInput;
    _avg?: ProductImageAvgOrderByAggregateInput;
    _max?: ProductImageMaxOrderByAggregateInput;
    _min?: ProductImageMinOrderByAggregateInput;
    _sum?: ProductImageSumOrderByAggregateInput;
  };

  export type ProductImageScalarWhereWithAggregatesInput = {
    AND?:
      | ProductImageScalarWhereWithAggregatesInput
      | ProductImageScalarWhereWithAggregatesInput[];
    OR?: ProductImageScalarWhereWithAggregatesInput[];
    NOT?:
      | ProductImageScalarWhereWithAggregatesInput
      | ProductImageScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"ProductImage"> | string;
    productId?: StringWithAggregatesFilter<"ProductImage"> | string;
    url?: StringWithAggregatesFilter<"ProductImage"> | string;
    altText?:
      | StringNullableWithAggregatesFilter<"ProductImage">
      | string
      | null;
    caption?:
      | StringNullableWithAggregatesFilter<"ProductImage">
      | string
      | null;
    width?: IntNullableWithAggregatesFilter<"ProductImage"> | number | null;
    height?: IntNullableWithAggregatesFilter<"ProductImage"> | number | null;
    size?: IntNullableWithAggregatesFilter<"ProductImage"> | number | null;
    sortOrder?: IntWithAggregatesFilter<"ProductImage"> | number;
    imageType?:
      | EnumImageTypeWithAggregatesFilter<"ProductImage">
      | $Enums.ImageType;
    isActive?: BoolWithAggregatesFilter<"ProductImage"> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<"ProductImage"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"ProductImage"> | Date | string;
  };

  export type ProductCategoryWhereInput = {
    AND?: ProductCategoryWhereInput | ProductCategoryWhereInput[];
    OR?: ProductCategoryWhereInput[];
    NOT?: ProductCategoryWhereInput | ProductCategoryWhereInput[];
    id?: StringFilter<"ProductCategory"> | string;
    productId?: StringFilter<"ProductCategory"> | string;
    categoryId?: StringFilter<"ProductCategory"> | string;
    createdAt?: DateTimeFilter<"ProductCategory"> | Date | string;
    product?: XOR<ProductRelationFilter, ProductWhereInput>;
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>;
  };

  export type ProductCategoryOrderByWithRelationInput = {
    id?: SortOrder;
    productId?: SortOrder;
    categoryId?: SortOrder;
    createdAt?: SortOrder;
    product?: ProductOrderByWithRelationInput;
    category?: CategoryOrderByWithRelationInput;
  };

  export type ProductCategoryWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      productId_categoryId?: ProductCategoryProductIdCategoryIdCompoundUniqueInput;
      AND?: ProductCategoryWhereInput | ProductCategoryWhereInput[];
      OR?: ProductCategoryWhereInput[];
      NOT?: ProductCategoryWhereInput | ProductCategoryWhereInput[];
      productId?: StringFilter<"ProductCategory"> | string;
      categoryId?: StringFilter<"ProductCategory"> | string;
      createdAt?: DateTimeFilter<"ProductCategory"> | Date | string;
      product?: XOR<ProductRelationFilter, ProductWhereInput>;
      category?: XOR<CategoryRelationFilter, CategoryWhereInput>;
    },
    "id" | "productId_categoryId"
  >;

  export type ProductCategoryOrderByWithAggregationInput = {
    id?: SortOrder;
    productId?: SortOrder;
    categoryId?: SortOrder;
    createdAt?: SortOrder;
    _count?: ProductCategoryCountOrderByAggregateInput;
    _max?: ProductCategoryMaxOrderByAggregateInput;
    _min?: ProductCategoryMinOrderByAggregateInput;
  };

  export type ProductCategoryScalarWhereWithAggregatesInput = {
    AND?:
      | ProductCategoryScalarWhereWithAggregatesInput
      | ProductCategoryScalarWhereWithAggregatesInput[];
    OR?: ProductCategoryScalarWhereWithAggregatesInput[];
    NOT?:
      | ProductCategoryScalarWhereWithAggregatesInput
      | ProductCategoryScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"ProductCategory"> | string;
    productId?: StringWithAggregatesFilter<"ProductCategory"> | string;
    categoryId?: StringWithAggregatesFilter<"ProductCategory"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"ProductCategory"> | Date | string;
  };

  export type CartItemWhereInput = {
    AND?: CartItemWhereInput | CartItemWhereInput[];
    OR?: CartItemWhereInput[];
    NOT?: CartItemWhereInput | CartItemWhereInput[];
    id?: StringFilter<"CartItem"> | string;
    userId?: StringFilter<"CartItem"> | string;
    productId?: StringFilter<"CartItem"> | string;
    quantity?: IntFilter<"CartItem"> | number;
    unitPrice?:
      | DecimalFilter<"CartItem">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFilter<"CartItem"> | Date | string;
    updatedAt?: DateTimeFilter<"CartItem"> | Date | string;
    user?: XOR<UserRelationFilter, UserWhereInput>;
    product?: XOR<ProductRelationFilter, ProductWhereInput>;
  };

  export type CartItemOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    productId?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    product?: ProductOrderByWithRelationInput;
  };

  export type CartItemWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      userId_productId?: CartItemUserIdProductIdCompoundUniqueInput;
      AND?: CartItemWhereInput | CartItemWhereInput[];
      OR?: CartItemWhereInput[];
      NOT?: CartItemWhereInput | CartItemWhereInput[];
      userId?: StringFilter<"CartItem"> | string;
      productId?: StringFilter<"CartItem"> | string;
      quantity?: IntFilter<"CartItem"> | number;
      unitPrice?:
        | DecimalFilter<"CartItem">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      createdAt?: DateTimeFilter<"CartItem"> | Date | string;
      updatedAt?: DateTimeFilter<"CartItem"> | Date | string;
      user?: XOR<UserRelationFilter, UserWhereInput>;
      product?: XOR<ProductRelationFilter, ProductWhereInput>;
    },
    "id" | "userId_productId"
  >;

  export type CartItemOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    productId?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: CartItemCountOrderByAggregateInput;
    _avg?: CartItemAvgOrderByAggregateInput;
    _max?: CartItemMaxOrderByAggregateInput;
    _min?: CartItemMinOrderByAggregateInput;
    _sum?: CartItemSumOrderByAggregateInput;
  };

  export type CartItemScalarWhereWithAggregatesInput = {
    AND?:
      | CartItemScalarWhereWithAggregatesInput
      | CartItemScalarWhereWithAggregatesInput[];
    OR?: CartItemScalarWhereWithAggregatesInput[];
    NOT?:
      | CartItemScalarWhereWithAggregatesInput
      | CartItemScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"CartItem"> | string;
    userId?: StringWithAggregatesFilter<"CartItem"> | string;
    productId?: StringWithAggregatesFilter<"CartItem"> | string;
    quantity?: IntWithAggregatesFilter<"CartItem"> | number;
    unitPrice?:
      | DecimalWithAggregatesFilter<"CartItem">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeWithAggregatesFilter<"CartItem"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"CartItem"> | Date | string;
  };

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[];
    OR?: OrderWhereInput[];
    NOT?: OrderWhereInput | OrderWhereInput[];
    id?: StringFilter<"Order"> | string;
    userId?: StringFilter<"Order"> | string;
    orderNumber?: StringFilter<"Order"> | string;
    subtotal?:
      | DecimalFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    taxAmount?:
      | DecimalFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingCost?:
      | DecimalFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    discountAmount?:
      | DecimalFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalAmount?:
      | DecimalFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus;
    paymentStatus?: EnumPaymentStatusFilter<"Order"> | $Enums.PaymentStatus;
    customerEmail?: StringFilter<"Order"> | string;
    shippingAddress?: JsonFilter<"Order">;
    billingAddress?: JsonFilter<"Order">;
    paymentMethod?: StringNullableFilter<"Order"> | string | null;
    paymentIntentId?: StringNullableFilter<"Order"> | string | null;
    createdAt?: DateTimeFilter<"Order"> | Date | string;
    updatedAt?: DateTimeFilter<"Order"> | Date | string;
    user?: XOR<UserRelationFilter, UserWhereInput>;
    orderItems?: OrderItemListRelationFilter;
  };

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    orderNumber?: SortOrder;
    subtotal?: SortOrder;
    taxAmount?: SortOrder;
    shippingCost?: SortOrder;
    discountAmount?: SortOrder;
    totalAmount?: SortOrder;
    status?: SortOrder;
    paymentStatus?: SortOrder;
    customerEmail?: SortOrder;
    shippingAddress?: SortOrder;
    billingAddress?: SortOrder;
    paymentMethod?: SortOrderInput | SortOrder;
    paymentIntentId?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    orderItems?: OrderItemOrderByRelationAggregateInput;
  };

  export type OrderWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      orderNumber?: string;
      AND?: OrderWhereInput | OrderWhereInput[];
      OR?: OrderWhereInput[];
      NOT?: OrderWhereInput | OrderWhereInput[];
      userId?: StringFilter<"Order"> | string;
      subtotal?:
        | DecimalFilter<"Order">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      taxAmount?:
        | DecimalFilter<"Order">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      shippingCost?:
        | DecimalFilter<"Order">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      discountAmount?:
        | DecimalFilter<"Order">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      totalAmount?:
        | DecimalFilter<"Order">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus;
      paymentStatus?: EnumPaymentStatusFilter<"Order"> | $Enums.PaymentStatus;
      customerEmail?: StringFilter<"Order"> | string;
      shippingAddress?: JsonFilter<"Order">;
      billingAddress?: JsonFilter<"Order">;
      paymentMethod?: StringNullableFilter<"Order"> | string | null;
      paymentIntentId?: StringNullableFilter<"Order"> | string | null;
      createdAt?: DateTimeFilter<"Order"> | Date | string;
      updatedAt?: DateTimeFilter<"Order"> | Date | string;
      user?: XOR<UserRelationFilter, UserWhereInput>;
      orderItems?: OrderItemListRelationFilter;
    },
    "id" | "orderNumber"
  >;

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    orderNumber?: SortOrder;
    subtotal?: SortOrder;
    taxAmount?: SortOrder;
    shippingCost?: SortOrder;
    discountAmount?: SortOrder;
    totalAmount?: SortOrder;
    status?: SortOrder;
    paymentStatus?: SortOrder;
    customerEmail?: SortOrder;
    shippingAddress?: SortOrder;
    billingAddress?: SortOrder;
    paymentMethod?: SortOrderInput | SortOrder;
    paymentIntentId?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: OrderCountOrderByAggregateInput;
    _avg?: OrderAvgOrderByAggregateInput;
    _max?: OrderMaxOrderByAggregateInput;
    _min?: OrderMinOrderByAggregateInput;
    _sum?: OrderSumOrderByAggregateInput;
  };

  export type OrderScalarWhereWithAggregatesInput = {
    AND?:
      | OrderScalarWhereWithAggregatesInput
      | OrderScalarWhereWithAggregatesInput[];
    OR?: OrderScalarWhereWithAggregatesInput[];
    NOT?:
      | OrderScalarWhereWithAggregatesInput
      | OrderScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Order"> | string;
    userId?: StringWithAggregatesFilter<"Order"> | string;
    orderNumber?: StringWithAggregatesFilter<"Order"> | string;
    subtotal?:
      | DecimalWithAggregatesFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    taxAmount?:
      | DecimalWithAggregatesFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingCost?:
      | DecimalWithAggregatesFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    discountAmount?:
      | DecimalWithAggregatesFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalAmount?:
      | DecimalWithAggregatesFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus;
    paymentStatus?:
      | EnumPaymentStatusWithAggregatesFilter<"Order">
      | $Enums.PaymentStatus;
    customerEmail?: StringWithAggregatesFilter<"Order"> | string;
    shippingAddress?: JsonWithAggregatesFilter<"Order">;
    billingAddress?: JsonWithAggregatesFilter<"Order">;
    paymentMethod?: StringNullableWithAggregatesFilter<"Order"> | string | null;
    paymentIntentId?:
      | StringNullableWithAggregatesFilter<"Order">
      | string
      | null;
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string;
  };

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[];
    OR?: OrderItemWhereInput[];
    NOT?: OrderItemWhereInput | OrderItemWhereInput[];
    id?: StringFilter<"OrderItem"> | string;
    orderId?: StringFilter<"OrderItem"> | string;
    productId?: StringFilter<"OrderItem"> | string;
    productName?: StringFilter<"OrderItem"> | string;
    productSku?: StringNullableFilter<"OrderItem"> | string | null;
    quantity?: IntFilter<"OrderItem"> | number;
    unitPrice?:
      | DecimalFilter<"OrderItem">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalFilter<"OrderItem">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string;
    order?: XOR<OrderRelationFilter, OrderWhereInput>;
    product?: XOR<ProductRelationFilter, ProductWhereInput>;
  };

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    productName?: SortOrder;
    productSku?: SortOrderInput | SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
    createdAt?: SortOrder;
    order?: OrderOrderByWithRelationInput;
    product?: ProductOrderByWithRelationInput;
  };

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: OrderItemWhereInput | OrderItemWhereInput[];
      OR?: OrderItemWhereInput[];
      NOT?: OrderItemWhereInput | OrderItemWhereInput[];
      orderId?: StringFilter<"OrderItem"> | string;
      productId?: StringFilter<"OrderItem"> | string;
      productName?: StringFilter<"OrderItem"> | string;
      productSku?: StringNullableFilter<"OrderItem"> | string | null;
      quantity?: IntFilter<"OrderItem"> | number;
      unitPrice?:
        | DecimalFilter<"OrderItem">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      totalPrice?:
        | DecimalFilter<"OrderItem">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      createdAt?: DateTimeFilter<"OrderItem"> | Date | string;
      order?: XOR<OrderRelationFilter, OrderWhereInput>;
      product?: XOR<ProductRelationFilter, ProductWhereInput>;
    },
    "id"
  >;

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    productName?: SortOrder;
    productSku?: SortOrderInput | SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
    createdAt?: SortOrder;
    _count?: OrderItemCountOrderByAggregateInput;
    _avg?: OrderItemAvgOrderByAggregateInput;
    _max?: OrderItemMaxOrderByAggregateInput;
    _min?: OrderItemMinOrderByAggregateInput;
    _sum?: OrderItemSumOrderByAggregateInput;
  };

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?:
      | OrderItemScalarWhereWithAggregatesInput
      | OrderItemScalarWhereWithAggregatesInput[];
    OR?: OrderItemScalarWhereWithAggregatesInput[];
    NOT?:
      | OrderItemScalarWhereWithAggregatesInput
      | OrderItemScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"OrderItem"> | string;
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string;
    productId?: StringWithAggregatesFilter<"OrderItem"> | string;
    productName?: StringWithAggregatesFilter<"OrderItem"> | string;
    productSku?:
      | StringNullableWithAggregatesFilter<"OrderItem">
      | string
      | null;
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number;
    unitPrice?:
      | DecimalWithAggregatesFilter<"OrderItem">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalWithAggregatesFilter<"OrderItem">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeWithAggregatesFilter<"OrderItem"> | Date | string;
  };

  export type ReferralWhereInput = {
    AND?: ReferralWhereInput | ReferralWhereInput[];
    OR?: ReferralWhereInput[];
    NOT?: ReferralWhereInput | ReferralWhereInput[];
    id?: StringFilter<"Referral"> | string;
    referrerId?: StringFilter<"Referral"> | string;
    referredId?: StringNullableFilter<"Referral"> | string | null;
    referralCode?: StringFilter<"Referral"> | string;
    email?: StringNullableFilter<"Referral"> | string | null;
    status?: EnumReferralStatusFilter<"Referral"> | $Enums.ReferralStatus;
    commissionRate?:
      | DecimalFilter<"Referral">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    commissionEarned?:
      | DecimalFilter<"Referral">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    clickCount?: IntFilter<"Referral"> | number;
    conversionAt?: DateTimeNullableFilter<"Referral"> | Date | string | null;
    createdAt?: DateTimeFilter<"Referral"> | Date | string;
    updatedAt?: DateTimeFilter<"Referral"> | Date | string;
    referrer?: XOR<UserRelationFilter, UserWhereInput>;
    referred?: XOR<UserNullableRelationFilter, UserWhereInput> | null;
  };

  export type ReferralOrderByWithRelationInput = {
    id?: SortOrder;
    referrerId?: SortOrder;
    referredId?: SortOrderInput | SortOrder;
    referralCode?: SortOrder;
    email?: SortOrderInput | SortOrder;
    status?: SortOrder;
    commissionRate?: SortOrder;
    commissionEarned?: SortOrder;
    clickCount?: SortOrder;
    conversionAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    referrer?: UserOrderByWithRelationInput;
    referred?: UserOrderByWithRelationInput;
  };

  export type ReferralWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      referralCode?: string;
      AND?: ReferralWhereInput | ReferralWhereInput[];
      OR?: ReferralWhereInput[];
      NOT?: ReferralWhereInput | ReferralWhereInput[];
      referrerId?: StringFilter<"Referral"> | string;
      referredId?: StringNullableFilter<"Referral"> | string | null;
      email?: StringNullableFilter<"Referral"> | string | null;
      status?: EnumReferralStatusFilter<"Referral"> | $Enums.ReferralStatus;
      commissionRate?:
        | DecimalFilter<"Referral">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      commissionEarned?:
        | DecimalFilter<"Referral">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      clickCount?: IntFilter<"Referral"> | number;
      conversionAt?: DateTimeNullableFilter<"Referral"> | Date | string | null;
      createdAt?: DateTimeFilter<"Referral"> | Date | string;
      updatedAt?: DateTimeFilter<"Referral"> | Date | string;
      referrer?: XOR<UserRelationFilter, UserWhereInput>;
      referred?: XOR<UserNullableRelationFilter, UserWhereInput> | null;
    },
    "id" | "referralCode"
  >;

  export type ReferralOrderByWithAggregationInput = {
    id?: SortOrder;
    referrerId?: SortOrder;
    referredId?: SortOrderInput | SortOrder;
    referralCode?: SortOrder;
    email?: SortOrderInput | SortOrder;
    status?: SortOrder;
    commissionRate?: SortOrder;
    commissionEarned?: SortOrder;
    clickCount?: SortOrder;
    conversionAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ReferralCountOrderByAggregateInput;
    _avg?: ReferralAvgOrderByAggregateInput;
    _max?: ReferralMaxOrderByAggregateInput;
    _min?: ReferralMinOrderByAggregateInput;
    _sum?: ReferralSumOrderByAggregateInput;
  };

  export type ReferralScalarWhereWithAggregatesInput = {
    AND?:
      | ReferralScalarWhereWithAggregatesInput
      | ReferralScalarWhereWithAggregatesInput[];
    OR?: ReferralScalarWhereWithAggregatesInput[];
    NOT?:
      | ReferralScalarWhereWithAggregatesInput
      | ReferralScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Referral"> | string;
    referrerId?: StringWithAggregatesFilter<"Referral"> | string;
    referredId?: StringNullableWithAggregatesFilter<"Referral"> | string | null;
    referralCode?: StringWithAggregatesFilter<"Referral"> | string;
    email?: StringNullableWithAggregatesFilter<"Referral"> | string | null;
    status?:
      | EnumReferralStatusWithAggregatesFilter<"Referral">
      | $Enums.ReferralStatus;
    commissionRate?:
      | DecimalWithAggregatesFilter<"Referral">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    commissionEarned?:
      | DecimalWithAggregatesFilter<"Referral">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    clickCount?: IntWithAggregatesFilter<"Referral"> | number;
    conversionAt?:
      | DateTimeNullableWithAggregatesFilter<"Referral">
      | Date
      | string
      | null;
    createdAt?: DateTimeWithAggregatesFilter<"Referral"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Referral"> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    orders?: OrderCreateNestedManyWithoutUserInput;
    cartItems?: CartItemCreateNestedManyWithoutUserInput;
    referralsGiven?: ReferralCreateNestedManyWithoutReferrerInput;
    referralsReceived?: ReferralCreateNestedManyWithoutReferredInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;
    cartItems?: CartItemUncheckedCreateNestedManyWithoutUserInput;
    referralsGiven?: ReferralUncheckedCreateNestedManyWithoutReferrerInput;
    referralsReceived?: ReferralUncheckedCreateNestedManyWithoutReferredInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    orders?: OrderUpdateManyWithoutUserNestedInput;
    cartItems?: CartItemUpdateManyWithoutUserNestedInput;
    referralsGiven?: ReferralUpdateManyWithoutReferrerNestedInput;
    referralsReceived?: ReferralUpdateManyWithoutReferredNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;
    cartItems?: CartItemUncheckedUpdateManyWithoutUserNestedInput;
    referralsGiven?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput;
    referralsReceived?: ReferralUncheckedUpdateManyWithoutReferredNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountCreateInput = {
    id?: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutAccountsInput;
  };

  export type AccountUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput;
  };

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountCreateManyInput = {
    id?: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateInput = {
    id?: string;
    sessionToken: string;
    expires: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutSessionsInput;
  };

  export type SessionUncheckedCreateInput = {
    id?: string;
    sessionToken: string;
    userId: string;
    expires: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput;
  };

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateManyInput = {
    id?: string;
    sessionToken: string;
    userId: string;
    expires: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenCreateInput = {
    identifier: string;
    token: string;
    expires: Date | string;
    createdAt?: Date | string;
  };

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string;
    token: string;
    expires: Date | string;
    createdAt?: Date | string;
  };

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenCreateManyInput = {
    identifier: string;
    token: string;
    expires: Date | string;
    createdAt?: Date | string;
  };

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CategoryCreateInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    isActive?: boolean;
    sortOrder?: number;
    seoTitle?: string | null;
    seoDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    parent?: CategoryCreateNestedOneWithoutChildrenInput;
    children?: CategoryCreateNestedManyWithoutParentInput;
    productCategories?: ProductCategoryCreateNestedManyWithoutCategoryInput;
  };

  export type CategoryUncheckedCreateInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    parentId?: string | null;
    isActive?: boolean;
    sortOrder?: number;
    seoTitle?: string | null;
    seoDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput;
    productCategories?: ProductCategoryUncheckedCreateNestedManyWithoutCategoryInput;
  };

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: CategoryUpdateOneWithoutChildrenNestedInput;
    children?: CategoryUpdateManyWithoutParentNestedInput;
    productCategories?: ProductCategoryUpdateManyWithoutCategoryNestedInput;
  };

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    parentId?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput;
    productCategories?: ProductCategoryUncheckedUpdateManyWithoutCategoryNestedInput;
  };

  export type CategoryCreateManyInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    parentId?: string | null;
    isActive?: boolean;
    sortOrder?: number;
    seoTitle?: string | null;
    seoDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    parentId?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductCreateInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    sku?: string | null;
    basePrice: Decimal | DecimalJsLike | number | string;
    salePrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: Decimal | DecimalJsLike | number | string | null;
    dimensions?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    tags?: ProductCreatetagsInput | string[];
    status?: $Enums.ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    variants?: ProductVariantCreateNestedManyWithoutProductInput;
    images?: ProductImageCreateNestedManyWithoutProductInput;
    productCategories?: ProductCategoryCreateNestedManyWithoutProductInput;
    cartItems?: CartItemCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    sku?: string | null;
    basePrice: Decimal | DecimalJsLike | number | string;
    salePrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: Decimal | DecimalJsLike | number | string | null;
    dimensions?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    tags?: ProductCreatetagsInput | string[];
    status?: $Enums.ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput;
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput;
    productCategories?: ProductCategoryUncheckedCreateNestedManyWithoutProductInput;
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    variants?: ProductVariantUpdateManyWithoutProductNestedInput;
    images?: ProductImageUpdateManyWithoutProductNestedInput;
    productCategories?: ProductCategoryUpdateManyWithoutProductNestedInput;
    cartItems?: CartItemUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput;
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput;
    productCategories?: ProductCategoryUncheckedUpdateManyWithoutProductNestedInput;
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type ProductCreateManyInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    sku?: string | null;
    basePrice: Decimal | DecimalJsLike | number | string;
    salePrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: Decimal | DecimalJsLike | number | string | null;
    dimensions?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    tags?: ProductCreatetagsInput | string[];
    status?: $Enums.ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductVariantCreateInput = {
    id?: string;
    sku: string;
    name?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    compareAtPrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    attributes: JsonNullValueInput | InputJsonValue;
    weight?: Decimal | DecimalJsLike | number | string | null;
    barcode?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: ProductCreateNestedOneWithoutVariantsInput;
  };

  export type ProductVariantUncheckedCreateInput = {
    id?: string;
    productId: string;
    sku: string;
    name?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    compareAtPrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    attributes: JsonNullValueInput | InputJsonValue;
    weight?: Decimal | DecimalJsLike | number | string | null;
    barcode?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProductVariantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sku?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    compareAtPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    attributes?: JsonNullValueInput | InputJsonValue;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    barcode?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput;
  };

  export type ProductVariantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    sku?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    compareAtPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    attributes?: JsonNullValueInput | InputJsonValue;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    barcode?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductVariantCreateManyInput = {
    id?: string;
    productId: string;
    sku: string;
    name?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    compareAtPrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    attributes: JsonNullValueInput | InputJsonValue;
    weight?: Decimal | DecimalJsLike | number | string | null;
    barcode?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProductVariantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sku?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    compareAtPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    attributes?: JsonNullValueInput | InputJsonValue;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    barcode?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductVariantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    sku?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    compareAtPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    attributes?: JsonNullValueInput | InputJsonValue;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    barcode?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductImageCreateInput = {
    id?: string;
    url: string;
    altText?: string | null;
    caption?: string | null;
    width?: number | null;
    height?: number | null;
    size?: number | null;
    sortOrder?: number;
    imageType?: $Enums.ImageType;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: ProductCreateNestedOneWithoutImagesInput;
  };

  export type ProductImageUncheckedCreateInput = {
    id?: string;
    productId: string;
    url: string;
    altText?: string | null;
    caption?: string | null;
    width?: number | null;
    height?: number | null;
    size?: number | null;
    sortOrder?: number;
    imageType?: $Enums.ImageType;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProductImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    url?: StringFieldUpdateOperationsInput | string;
    altText?: NullableStringFieldUpdateOperationsInput | string | null;
    caption?: NullableStringFieldUpdateOperationsInput | string | null;
    width?: NullableIntFieldUpdateOperationsInput | number | null;
    height?: NullableIntFieldUpdateOperationsInput | number | null;
    size?: NullableIntFieldUpdateOperationsInput | number | null;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    imageType?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    product?: ProductUpdateOneRequiredWithoutImagesNestedInput;
  };

  export type ProductImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    url?: StringFieldUpdateOperationsInput | string;
    altText?: NullableStringFieldUpdateOperationsInput | string | null;
    caption?: NullableStringFieldUpdateOperationsInput | string | null;
    width?: NullableIntFieldUpdateOperationsInput | number | null;
    height?: NullableIntFieldUpdateOperationsInput | number | null;
    size?: NullableIntFieldUpdateOperationsInput | number | null;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    imageType?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductImageCreateManyInput = {
    id?: string;
    productId: string;
    url: string;
    altText?: string | null;
    caption?: string | null;
    width?: number | null;
    height?: number | null;
    size?: number | null;
    sortOrder?: number;
    imageType?: $Enums.ImageType;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProductImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    url?: StringFieldUpdateOperationsInput | string;
    altText?: NullableStringFieldUpdateOperationsInput | string | null;
    caption?: NullableStringFieldUpdateOperationsInput | string | null;
    width?: NullableIntFieldUpdateOperationsInput | number | null;
    height?: NullableIntFieldUpdateOperationsInput | number | null;
    size?: NullableIntFieldUpdateOperationsInput | number | null;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    imageType?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    url?: StringFieldUpdateOperationsInput | string;
    altText?: NullableStringFieldUpdateOperationsInput | string | null;
    caption?: NullableStringFieldUpdateOperationsInput | string | null;
    width?: NullableIntFieldUpdateOperationsInput | number | null;
    height?: NullableIntFieldUpdateOperationsInput | number | null;
    size?: NullableIntFieldUpdateOperationsInput | number | null;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    imageType?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductCategoryCreateInput = {
    id?: string;
    createdAt?: Date | string;
    product: ProductCreateNestedOneWithoutProductCategoriesInput;
    category: CategoryCreateNestedOneWithoutProductCategoriesInput;
  };

  export type ProductCategoryUncheckedCreateInput = {
    id?: string;
    productId: string;
    categoryId: string;
    createdAt?: Date | string;
  };

  export type ProductCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    product?: ProductUpdateOneRequiredWithoutProductCategoriesNestedInput;
    category?: CategoryUpdateOneRequiredWithoutProductCategoriesNestedInput;
  };

  export type ProductCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    categoryId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductCategoryCreateManyInput = {
    id?: string;
    productId: string;
    categoryId: string;
    createdAt?: Date | string;
  };

  export type ProductCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    categoryId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CartItemCreateInput = {
    id?: string;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutCartItemsInput;
    product: ProductCreateNestedOneWithoutCartItemsInput;
  };

  export type CartItemUncheckedCreateInput = {
    id?: string;
    userId: string;
    productId: string;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CartItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutCartItemsNestedInput;
    product?: ProductUpdateOneRequiredWithoutCartItemsNestedInput;
  };

  export type CartItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CartItemCreateManyInput = {
    id?: string;
    userId: string;
    productId: string;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CartItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CartItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderCreateInput = {
    id?: string;
    orderNumber: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    taxAmount?: Decimal | DecimalJsLike | number | string;
    shippingCost?: Decimal | DecimalJsLike | number | string;
    discountAmount?: Decimal | DecimalJsLike | number | string;
    totalAmount: Decimal | DecimalJsLike | number | string;
    status?: $Enums.OrderStatus;
    paymentStatus?: $Enums.PaymentStatus;
    customerEmail: string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress: JsonNullValueInput | InputJsonValue;
    paymentMethod?: string | null;
    paymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutOrdersInput;
    orderItems?: OrderItemCreateNestedManyWithoutOrderInput;
  };

  export type OrderUncheckedCreateInput = {
    id?: string;
    userId: string;
    orderNumber: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    taxAmount?: Decimal | DecimalJsLike | number | string;
    shippingCost?: Decimal | DecimalJsLike | number | string;
    discountAmount?: Decimal | DecimalJsLike | number | string;
    totalAmount: Decimal | DecimalJsLike | number | string;
    status?: $Enums.OrderStatus;
    paymentStatus?: $Enums.PaymentStatus;
    customerEmail: string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress: JsonNullValueInput | InputJsonValue;
    paymentMethod?: string | null;
    paymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    subtotal?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    taxAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingCost?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    discountAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    customerEmail?: StringFieldUpdateOperationsInput | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: JsonNullValueInput | InputJsonValue;
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput;
    orderItems?: OrderItemUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    subtotal?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    taxAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingCost?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    discountAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    customerEmail?: StringFieldUpdateOperationsInput | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: JsonNullValueInput | InputJsonValue;
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orderItems?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderCreateManyInput = {
    id?: string;
    userId: string;
    orderNumber: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    taxAmount?: Decimal | DecimalJsLike | number | string;
    shippingCost?: Decimal | DecimalJsLike | number | string;
    discountAmount?: Decimal | DecimalJsLike | number | string;
    totalAmount: Decimal | DecimalJsLike | number | string;
    status?: $Enums.OrderStatus;
    paymentStatus?: $Enums.PaymentStatus;
    customerEmail: string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress: JsonNullValueInput | InputJsonValue;
    paymentMethod?: string | null;
    paymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    subtotal?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    taxAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingCost?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    discountAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    customerEmail?: StringFieldUpdateOperationsInput | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: JsonNullValueInput | InputJsonValue;
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    subtotal?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    taxAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingCost?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    discountAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    customerEmail?: StringFieldUpdateOperationsInput | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: JsonNullValueInput | InputJsonValue;
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemCreateInput = {
    id?: string;
    productName: string;
    productSku?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    order: OrderCreateNestedOneWithoutOrderItemsInput;
    product: ProductCreateNestedOneWithoutOrderItemsInput;
  };

  export type OrderItemUncheckedCreateInput = {
    id?: string;
    orderId: string;
    productId: string;
    productName: string;
    productSku?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
  };

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productName?: StringFieldUpdateOperationsInput | string;
    productSku?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    order?: OrderUpdateOneRequiredWithoutOrderItemsNestedInput;
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput;
  };

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    productName?: StringFieldUpdateOperationsInput | string;
    productSku?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemCreateManyInput = {
    id?: string;
    orderId: string;
    productId: string;
    productName: string;
    productSku?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
  };

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productName?: StringFieldUpdateOperationsInput | string;
    productSku?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    productName?: StringFieldUpdateOperationsInput | string;
    productSku?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ReferralCreateInput = {
    id?: string;
    referralCode: string;
    email?: string | null;
    status?: $Enums.ReferralStatus;
    commissionRate?: Decimal | DecimalJsLike | number | string;
    commissionEarned?: Decimal | DecimalJsLike | number | string;
    clickCount?: number;
    conversionAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    referrer: UserCreateNestedOneWithoutReferralsGivenInput;
    referred?: UserCreateNestedOneWithoutReferralsReceivedInput;
  };

  export type ReferralUncheckedCreateInput = {
    id?: string;
    referrerId: string;
    referredId?: string | null;
    referralCode: string;
    email?: string | null;
    status?: $Enums.ReferralStatus;
    commissionRate?: Decimal | DecimalJsLike | number | string;
    commissionEarned?: Decimal | DecimalJsLike | number | string;
    clickCount?: number;
    conversionAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ReferralUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    referralCode?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumReferralStatusFieldUpdateOperationsInput
      | $Enums.ReferralStatus;
    commissionRate?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    commissionEarned?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    clickCount?: IntFieldUpdateOperationsInput | number;
    conversionAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    referrer?: UserUpdateOneRequiredWithoutReferralsGivenNestedInput;
    referred?: UserUpdateOneWithoutReferralsReceivedNestedInput;
  };

  export type ReferralUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    referrerId?: StringFieldUpdateOperationsInput | string;
    referredId?: NullableStringFieldUpdateOperationsInput | string | null;
    referralCode?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumReferralStatusFieldUpdateOperationsInput
      | $Enums.ReferralStatus;
    commissionRate?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    commissionEarned?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    clickCount?: IntFieldUpdateOperationsInput | number;
    conversionAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ReferralCreateManyInput = {
    id?: string;
    referrerId: string;
    referredId?: string | null;
    referralCode: string;
    email?: string | null;
    status?: $Enums.ReferralStatus;
    commissionRate?: Decimal | DecimalJsLike | number | string;
    commissionEarned?: Decimal | DecimalJsLike | number | string;
    clickCount?: number;
    conversionAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ReferralUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    referralCode?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumReferralStatusFieldUpdateOperationsInput
      | $Enums.ReferralStatus;
    commissionRate?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    commissionEarned?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    clickCount?: IntFieldUpdateOperationsInput | number;
    conversionAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ReferralUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    referrerId?: StringFieldUpdateOperationsInput | string;
    referredId?: NullableStringFieldUpdateOperationsInput | string | null;
    referralCode?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumReferralStatusFieldUpdateOperationsInput
      | $Enums.ReferralStatus;
    commissionRate?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    commissionEarned?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    clickCount?: IntFieldUpdateOperationsInput | number;
    conversionAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type AccountListRelationFilter = {
    every?: AccountWhereInput;
    some?: AccountWhereInput;
    none?: AccountWhereInput;
  };

  export type SessionListRelationFilter = {
    every?: SessionWhereInput;
    some?: SessionWhereInput;
    none?: SessionWhereInput;
  };

  export type OrderListRelationFilter = {
    every?: OrderWhereInput;
    some?: OrderWhereInput;
    none?: OrderWhereInput;
  };

  export type CartItemListRelationFilter = {
    every?: CartItemWhereInput;
    some?: CartItemWhereInput;
    none?: CartItemWhereInput;
  };

  export type ReferralListRelationFilter = {
    every?: ReferralWhereInput;
    some?: ReferralWhereInput;
    none?: ReferralWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type CartItemOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ReferralOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrder;
    name?: SortOrder;
    image?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrder;
    name?: SortOrder;
    image?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrder;
    name?: SortOrder;
    image?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type UserRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string;
    providerAccountId: string;
  };

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrder;
    access_token?: SortOrder;
    expires_at?: SortOrder;
    token_type?: SortOrder;
    scope?: SortOrder;
    id_token?: SortOrder;
    session_state?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder;
  };

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrder;
    access_token?: SortOrder;
    expires_at?: SortOrder;
    token_type?: SortOrder;
    scope?: SortOrder;
    id_token?: SortOrder;
    session_state?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrder;
    access_token?: SortOrder;
    expires_at?: SortOrder;
    token_type?: SortOrder;
    scope?: SortOrder;
    id_token?: SortOrder;
    session_state?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string;
    token: string;
  };

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
  };

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
  };

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
    createdAt?: SortOrder;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type CategoryNullableRelationFilter = {
    is?: CategoryWhereInput | null;
    isNot?: CategoryWhereInput | null;
  };

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput;
    some?: CategoryWhereInput;
    none?: CategoryWhereInput;
  };

  export type ProductCategoryListRelationFilter = {
    every?: ProductCategoryWhereInput;
    some?: ProductCategoryWhereInput;
    none?: ProductCategoryWhereInput;
  };

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ProductCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrder;
    image?: SortOrder;
    parentId?: SortOrder;
    isActive?: SortOrder;
    sortOrder?: SortOrder;
    seoTitle?: SortOrder;
    seoDescription?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type CategoryAvgOrderByAggregateInput = {
    sortOrder?: SortOrder;
  };

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrder;
    image?: SortOrder;
    parentId?: SortOrder;
    isActive?: SortOrder;
    sortOrder?: SortOrder;
    seoTitle?: SortOrder;
    seoDescription?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrder;
    image?: SortOrder;
    parentId?: SortOrder;
    isActive?: SortOrder;
    sortOrder?: SortOrder;
    seoTitle?: SortOrder;
    seoDescription?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type CategorySumOrderByAggregateInput = {
    sortOrder?: SortOrder;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type DecimalFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>
      | null;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalNullableFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
  };

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type EnumProductStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ProductStatus
      | EnumProductStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ProductStatus[]
      | ListEnumProductStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ProductStatus[]
      | ListEnumProductStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus;
  };

  export type ProductVariantListRelationFilter = {
    every?: ProductVariantWhereInput;
    some?: ProductVariantWhereInput;
    none?: ProductVariantWhereInput;
  };

  export type ProductImageListRelationFilter = {
    every?: ProductImageWhereInput;
    some?: ProductImageWhereInput;
    none?: ProductImageWhereInput;
  };

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput;
    some?: OrderItemWhereInput;
    none?: OrderItemWhereInput;
  };

  export type ProductVariantOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ProductImageOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrder;
    shortDescription?: SortOrder;
    sku?: SortOrder;
    basePrice?: SortOrder;
    salePrice?: SortOrder;
    costPrice?: SortOrder;
    stockQuantity?: SortOrder;
    lowStockThreshold?: SortOrder;
    trackInventory?: SortOrder;
    allowBackorder?: SortOrder;
    weight?: SortOrder;
    dimensions?: SortOrder;
    seoTitle?: SortOrder;
    seoDescription?: SortOrder;
    tags?: SortOrder;
    status?: SortOrder;
    isActive?: SortOrder;
    isFeatured?: SortOrder;
    publishedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ProductAvgOrderByAggregateInput = {
    basePrice?: SortOrder;
    salePrice?: SortOrder;
    costPrice?: SortOrder;
    stockQuantity?: SortOrder;
    lowStockThreshold?: SortOrder;
    weight?: SortOrder;
  };

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrder;
    shortDescription?: SortOrder;
    sku?: SortOrder;
    basePrice?: SortOrder;
    salePrice?: SortOrder;
    costPrice?: SortOrder;
    stockQuantity?: SortOrder;
    lowStockThreshold?: SortOrder;
    trackInventory?: SortOrder;
    allowBackorder?: SortOrder;
    weight?: SortOrder;
    dimensions?: SortOrder;
    seoTitle?: SortOrder;
    seoDescription?: SortOrder;
    status?: SortOrder;
    isActive?: SortOrder;
    isFeatured?: SortOrder;
    publishedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrder;
    shortDescription?: SortOrder;
    sku?: SortOrder;
    basePrice?: SortOrder;
    salePrice?: SortOrder;
    costPrice?: SortOrder;
    stockQuantity?: SortOrder;
    lowStockThreshold?: SortOrder;
    trackInventory?: SortOrder;
    allowBackorder?: SortOrder;
    weight?: SortOrder;
    dimensions?: SortOrder;
    seoTitle?: SortOrder;
    seoDescription?: SortOrder;
    status?: SortOrder;
    isActive?: SortOrder;
    isFeatured?: SortOrder;
    publishedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ProductSumOrderByAggregateInput = {
    basePrice?: SortOrder;
    salePrice?: SortOrder;
    costPrice?: SortOrder;
    stockQuantity?: SortOrder;
    lowStockThreshold?: SortOrder;
    weight?: SortOrder;
  };

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedDecimalFilter<$PrismaModel>;
    _sum?: NestedDecimalFilter<$PrismaModel>;
    _min?: NestedDecimalFilter<$PrismaModel>;
    _max?: NestedDecimalFilter<$PrismaModel>;
  };

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>
      | null;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalNullableWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: NestedDecimalNullableFilter<$PrismaModel>;
    _min?: NestedDecimalNullableFilter<$PrismaModel>;
    _max?: NestedDecimalNullableFilter<$PrismaModel>;
  };

  export type EnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ProductStatus
      | EnumProductStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ProductStatus[]
      | ListEnumProductStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ProductStatus[]
      | ListEnumProductStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumProductStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.ProductStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumProductStatusFilter<$PrismaModel>;
    _max?: NestedEnumProductStatusFilter<$PrismaModel>;
  };
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, "path">
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, "path">>;

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type ProductRelationFilter = {
    is?: ProductWhereInput;
    isNot?: ProductWhereInput;
  };

  export type ProductVariantCountOrderByAggregateInput = {
    id?: SortOrder;
    productId?: SortOrder;
    sku?: SortOrder;
    name?: SortOrder;
    price?: SortOrder;
    compareAtPrice?: SortOrder;
    costPrice?: SortOrder;
    stockQuantity?: SortOrder;
    attributes?: SortOrder;
    weight?: SortOrder;
    barcode?: SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ProductVariantAvgOrderByAggregateInput = {
    price?: SortOrder;
    compareAtPrice?: SortOrder;
    costPrice?: SortOrder;
    stockQuantity?: SortOrder;
    weight?: SortOrder;
  };

  export type ProductVariantMaxOrderByAggregateInput = {
    id?: SortOrder;
    productId?: SortOrder;
    sku?: SortOrder;
    name?: SortOrder;
    price?: SortOrder;
    compareAtPrice?: SortOrder;
    costPrice?: SortOrder;
    stockQuantity?: SortOrder;
    weight?: SortOrder;
    barcode?: SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ProductVariantMinOrderByAggregateInput = {
    id?: SortOrder;
    productId?: SortOrder;
    sku?: SortOrder;
    name?: SortOrder;
    price?: SortOrder;
    compareAtPrice?: SortOrder;
    costPrice?: SortOrder;
    stockQuantity?: SortOrder;
    weight?: SortOrder;
    barcode?: SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ProductVariantSumOrderByAggregateInput = {
    price?: SortOrder;
    compareAtPrice?: SortOrder;
    costPrice?: SortOrder;
    stockQuantity?: SortOrder;
    weight?: SortOrder;
  };
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
            "path"
          >
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, "path">
      >;

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedJsonFilter<$PrismaModel>;
    _max?: NestedJsonFilter<$PrismaModel>;
  };

  export type EnumImageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageType | EnumImageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumImageTypeFilter<$PrismaModel> | $Enums.ImageType;
  };

  export type ProductImageCountOrderByAggregateInput = {
    id?: SortOrder;
    productId?: SortOrder;
    url?: SortOrder;
    altText?: SortOrder;
    caption?: SortOrder;
    width?: SortOrder;
    height?: SortOrder;
    size?: SortOrder;
    sortOrder?: SortOrder;
    imageType?: SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ProductImageAvgOrderByAggregateInput = {
    width?: SortOrder;
    height?: SortOrder;
    size?: SortOrder;
    sortOrder?: SortOrder;
  };

  export type ProductImageMaxOrderByAggregateInput = {
    id?: SortOrder;
    productId?: SortOrder;
    url?: SortOrder;
    altText?: SortOrder;
    caption?: SortOrder;
    width?: SortOrder;
    height?: SortOrder;
    size?: SortOrder;
    sortOrder?: SortOrder;
    imageType?: SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ProductImageMinOrderByAggregateInput = {
    id?: SortOrder;
    productId?: SortOrder;
    url?: SortOrder;
    altText?: SortOrder;
    caption?: SortOrder;
    width?: SortOrder;
    height?: SortOrder;
    size?: SortOrder;
    sortOrder?: SortOrder;
    imageType?: SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ProductImageSumOrderByAggregateInput = {
    width?: SortOrder;
    height?: SortOrder;
    size?: SortOrder;
    sortOrder?: SortOrder;
  };

  export type EnumImageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageType | EnumImageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumImageTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.ImageType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumImageTypeFilter<$PrismaModel>;
    _max?: NestedEnumImageTypeFilter<$PrismaModel>;
  };

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput;
    isNot?: CategoryWhereInput;
  };

  export type ProductCategoryProductIdCategoryIdCompoundUniqueInput = {
    productId: string;
    categoryId: string;
  };

  export type ProductCategoryCountOrderByAggregateInput = {
    id?: SortOrder;
    productId?: SortOrder;
    categoryId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type ProductCategoryMaxOrderByAggregateInput = {
    id?: SortOrder;
    productId?: SortOrder;
    categoryId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type ProductCategoryMinOrderByAggregateInput = {
    id?: SortOrder;
    productId?: SortOrder;
    categoryId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type CartItemUserIdProductIdCompoundUniqueInput = {
    userId: string;
    productId: string;
  };

  export type CartItemCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    productId?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type CartItemAvgOrderByAggregateInput = {
    quantity?: SortOrder;
    unitPrice?: SortOrder;
  };

  export type CartItemMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    productId?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type CartItemMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    productId?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type CartItemSumOrderByAggregateInput = {
    quantity?: SortOrder;
    unitPrice?: SortOrder;
  };

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.OrderStatus[]
      | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus;
  };

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.PaymentStatus
      | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
  };

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    orderNumber?: SortOrder;
    subtotal?: SortOrder;
    taxAmount?: SortOrder;
    shippingCost?: SortOrder;
    discountAmount?: SortOrder;
    totalAmount?: SortOrder;
    status?: SortOrder;
    paymentStatus?: SortOrder;
    customerEmail?: SortOrder;
    shippingAddress?: SortOrder;
    billingAddress?: SortOrder;
    paymentMethod?: SortOrder;
    paymentIntentId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type OrderAvgOrderByAggregateInput = {
    subtotal?: SortOrder;
    taxAmount?: SortOrder;
    shippingCost?: SortOrder;
    discountAmount?: SortOrder;
    totalAmount?: SortOrder;
  };

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    orderNumber?: SortOrder;
    subtotal?: SortOrder;
    taxAmount?: SortOrder;
    shippingCost?: SortOrder;
    discountAmount?: SortOrder;
    totalAmount?: SortOrder;
    status?: SortOrder;
    paymentStatus?: SortOrder;
    customerEmail?: SortOrder;
    paymentMethod?: SortOrder;
    paymentIntentId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    orderNumber?: SortOrder;
    subtotal?: SortOrder;
    taxAmount?: SortOrder;
    shippingCost?: SortOrder;
    discountAmount?: SortOrder;
    totalAmount?: SortOrder;
    status?: SortOrder;
    paymentStatus?: SortOrder;
    customerEmail?: SortOrder;
    paymentMethod?: SortOrder;
    paymentIntentId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type OrderSumOrderByAggregateInput = {
    subtotal?: SortOrder;
    taxAmount?: SortOrder;
    shippingCost?: SortOrder;
    discountAmount?: SortOrder;
    totalAmount?: SortOrder;
  };

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.OrderStatus[]
      | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.OrderStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>;
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>;
  };

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.PaymentStatus
      | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.PaymentStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>;
  };

  export type OrderRelationFilter = {
    is?: OrderWhereInput;
    isNot?: OrderWhereInput;
  };

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    productName?: SortOrder;
    productSku?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
    createdAt?: SortOrder;
  };

  export type OrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
  };

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    productName?: SortOrder;
    productSku?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
    createdAt?: SortOrder;
  };

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    productName?: SortOrder;
    productSku?: SortOrder;
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
    createdAt?: SortOrder;
  };

  export type OrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder;
    unitPrice?: SortOrder;
    totalPrice?: SortOrder;
  };

  export type EnumReferralStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ReferralStatus
      | EnumReferralStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ReferralStatus[]
      | ListEnumReferralStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ReferralStatus[]
      | ListEnumReferralStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumReferralStatusFilter<$PrismaModel> | $Enums.ReferralStatus;
  };

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null;
    isNot?: UserWhereInput | null;
  };

  export type ReferralCountOrderByAggregateInput = {
    id?: SortOrder;
    referrerId?: SortOrder;
    referredId?: SortOrder;
    referralCode?: SortOrder;
    email?: SortOrder;
    status?: SortOrder;
    commissionRate?: SortOrder;
    commissionEarned?: SortOrder;
    clickCount?: SortOrder;
    conversionAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ReferralAvgOrderByAggregateInput = {
    commissionRate?: SortOrder;
    commissionEarned?: SortOrder;
    clickCount?: SortOrder;
  };

  export type ReferralMaxOrderByAggregateInput = {
    id?: SortOrder;
    referrerId?: SortOrder;
    referredId?: SortOrder;
    referralCode?: SortOrder;
    email?: SortOrder;
    status?: SortOrder;
    commissionRate?: SortOrder;
    commissionEarned?: SortOrder;
    clickCount?: SortOrder;
    conversionAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ReferralMinOrderByAggregateInput = {
    id?: SortOrder;
    referrerId?: SortOrder;
    referredId?: SortOrder;
    referralCode?: SortOrder;
    email?: SortOrder;
    status?: SortOrder;
    commissionRate?: SortOrder;
    commissionEarned?: SortOrder;
    clickCount?: SortOrder;
    conversionAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ReferralSumOrderByAggregateInput = {
    commissionRate?: SortOrder;
    commissionEarned?: SortOrder;
    clickCount?: SortOrder;
  };

  export type EnumReferralStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ReferralStatus
      | EnumReferralStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ReferralStatus[]
      | ListEnumReferralStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ReferralStatus[]
      | ListEnumReferralStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumReferralStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.ReferralStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumReferralStatusFilter<$PrismaModel>;
    _max?: NestedEnumReferralStatusFilter<$PrismaModel>;
  };

  export type AccountCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
  };

  export type SessionCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type OrderCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
      | OrderCreateWithoutUserInput[]
      | OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutUserInput
      | OrderCreateOrConnectWithoutUserInput[];
    createMany?: OrderCreateManyUserInputEnvelope;
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
  };

  export type CartItemCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          CartItemCreateWithoutUserInput,
          CartItemUncheckedCreateWithoutUserInput
        >
      | CartItemCreateWithoutUserInput[]
      | CartItemUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | CartItemCreateOrConnectWithoutUserInput
      | CartItemCreateOrConnectWithoutUserInput[];
    createMany?: CartItemCreateManyUserInputEnvelope;
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
  };

  export type ReferralCreateNestedManyWithoutReferrerInput = {
    create?:
      | XOR<
          ReferralCreateWithoutReferrerInput,
          ReferralUncheckedCreateWithoutReferrerInput
        >
      | ReferralCreateWithoutReferrerInput[]
      | ReferralUncheckedCreateWithoutReferrerInput[];
    connectOrCreate?:
      | ReferralCreateOrConnectWithoutReferrerInput
      | ReferralCreateOrConnectWithoutReferrerInput[];
    createMany?: ReferralCreateManyReferrerInputEnvelope;
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
  };

  export type ReferralCreateNestedManyWithoutReferredInput = {
    create?:
      | XOR<
          ReferralCreateWithoutReferredInput,
          ReferralUncheckedCreateWithoutReferredInput
        >
      | ReferralCreateWithoutReferredInput[]
      | ReferralUncheckedCreateWithoutReferredInput[];
    connectOrCreate?:
      | ReferralCreateOrConnectWithoutReferredInput
      | ReferralCreateOrConnectWithoutReferredInput[];
    createMany?: ReferralCreateManyReferredInputEnvelope;
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
  };

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
  };

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
      | OrderCreateWithoutUserInput[]
      | OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutUserInput
      | OrderCreateOrConnectWithoutUserInput[];
    createMany?: OrderCreateManyUserInputEnvelope;
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
  };

  export type CartItemUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          CartItemCreateWithoutUserInput,
          CartItemUncheckedCreateWithoutUserInput
        >
      | CartItemCreateWithoutUserInput[]
      | CartItemUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | CartItemCreateOrConnectWithoutUserInput
      | CartItemCreateOrConnectWithoutUserInput[];
    createMany?: CartItemCreateManyUserInputEnvelope;
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
  };

  export type ReferralUncheckedCreateNestedManyWithoutReferrerInput = {
    create?:
      | XOR<
          ReferralCreateWithoutReferrerInput,
          ReferralUncheckedCreateWithoutReferrerInput
        >
      | ReferralCreateWithoutReferrerInput[]
      | ReferralUncheckedCreateWithoutReferrerInput[];
    connectOrCreate?:
      | ReferralCreateOrConnectWithoutReferrerInput
      | ReferralCreateOrConnectWithoutReferrerInput[];
    createMany?: ReferralCreateManyReferrerInputEnvelope;
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
  };

  export type ReferralUncheckedCreateNestedManyWithoutReferredInput = {
    create?:
      | XOR<
          ReferralCreateWithoutReferredInput,
          ReferralUncheckedCreateWithoutReferredInput
        >
      | ReferralCreateWithoutReferredInput[]
      | ReferralUncheckedCreateWithoutReferredInput[];
    connectOrCreate?:
      | ReferralCreateOrConnectWithoutReferredInput
      | ReferralCreateOrConnectWithoutReferredInput[];
    createMany?: ReferralCreateManyReferredInputEnvelope;
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    upsert?:
      | AccountUpsertWithWhereUniqueWithoutUserInput
      | AccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    update?:
      | AccountUpdateWithWhereUniqueWithoutUserInput
      | AccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AccountUpdateManyWithWhereWithoutUserInput
      | AccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
  };

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SessionUpsertWithWhereUniqueWithoutUserInput
      | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      | SessionUpdateWithWhereUniqueWithoutUserInput
      | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SessionUpdateManyWithWhereWithoutUserInput
      | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
      | OrderCreateWithoutUserInput[]
      | OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutUserInput
      | OrderCreateOrConnectWithoutUserInput[];
    upsert?:
      | OrderUpsertWithWhereUniqueWithoutUserInput
      | OrderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: OrderCreateManyUserInputEnvelope;
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    update?:
      | OrderUpdateWithWhereUniqueWithoutUserInput
      | OrderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | OrderUpdateManyWithWhereWithoutUserInput
      | OrderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[];
  };

  export type CartItemUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          CartItemCreateWithoutUserInput,
          CartItemUncheckedCreateWithoutUserInput
        >
      | CartItemCreateWithoutUserInput[]
      | CartItemUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | CartItemCreateOrConnectWithoutUserInput
      | CartItemCreateOrConnectWithoutUserInput[];
    upsert?:
      | CartItemUpsertWithWhereUniqueWithoutUserInput
      | CartItemUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: CartItemCreateManyUserInputEnvelope;
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    update?:
      | CartItemUpdateWithWhereUniqueWithoutUserInput
      | CartItemUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | CartItemUpdateManyWithWhereWithoutUserInput
      | CartItemUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[];
  };

  export type ReferralUpdateManyWithoutReferrerNestedInput = {
    create?:
      | XOR<
          ReferralCreateWithoutReferrerInput,
          ReferralUncheckedCreateWithoutReferrerInput
        >
      | ReferralCreateWithoutReferrerInput[]
      | ReferralUncheckedCreateWithoutReferrerInput[];
    connectOrCreate?:
      | ReferralCreateOrConnectWithoutReferrerInput
      | ReferralCreateOrConnectWithoutReferrerInput[];
    upsert?:
      | ReferralUpsertWithWhereUniqueWithoutReferrerInput
      | ReferralUpsertWithWhereUniqueWithoutReferrerInput[];
    createMany?: ReferralCreateManyReferrerInputEnvelope;
    set?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    disconnect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    delete?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    update?:
      | ReferralUpdateWithWhereUniqueWithoutReferrerInput
      | ReferralUpdateWithWhereUniqueWithoutReferrerInput[];
    updateMany?:
      | ReferralUpdateManyWithWhereWithoutReferrerInput
      | ReferralUpdateManyWithWhereWithoutReferrerInput[];
    deleteMany?: ReferralScalarWhereInput | ReferralScalarWhereInput[];
  };

  export type ReferralUpdateManyWithoutReferredNestedInput = {
    create?:
      | XOR<
          ReferralCreateWithoutReferredInput,
          ReferralUncheckedCreateWithoutReferredInput
        >
      | ReferralCreateWithoutReferredInput[]
      | ReferralUncheckedCreateWithoutReferredInput[];
    connectOrCreate?:
      | ReferralCreateOrConnectWithoutReferredInput
      | ReferralCreateOrConnectWithoutReferredInput[];
    upsert?:
      | ReferralUpsertWithWhereUniqueWithoutReferredInput
      | ReferralUpsertWithWhereUniqueWithoutReferredInput[];
    createMany?: ReferralCreateManyReferredInputEnvelope;
    set?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    disconnect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    delete?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    update?:
      | ReferralUpdateWithWhereUniqueWithoutReferredInput
      | ReferralUpdateWithWhereUniqueWithoutReferredInput[];
    updateMany?:
      | ReferralUpdateManyWithWhereWithoutReferredInput
      | ReferralUpdateManyWithWhereWithoutReferredInput[];
    deleteMany?: ReferralScalarWhereInput | ReferralScalarWhereInput[];
  };

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    upsert?:
      | AccountUpsertWithWhereUniqueWithoutUserInput
      | AccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    update?:
      | AccountUpdateWithWhereUniqueWithoutUserInput
      | AccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AccountUpdateManyWithWhereWithoutUserInput
      | AccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
  };

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SessionUpsertWithWhereUniqueWithoutUserInput
      | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      | SessionUpdateWithWhereUniqueWithoutUserInput
      | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SessionUpdateManyWithWhereWithoutUserInput
      | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
      | OrderCreateWithoutUserInput[]
      | OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutUserInput
      | OrderCreateOrConnectWithoutUserInput[];
    upsert?:
      | OrderUpsertWithWhereUniqueWithoutUserInput
      | OrderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: OrderCreateManyUserInputEnvelope;
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    update?:
      | OrderUpdateWithWhereUniqueWithoutUserInput
      | OrderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | OrderUpdateManyWithWhereWithoutUserInput
      | OrderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[];
  };

  export type CartItemUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          CartItemCreateWithoutUserInput,
          CartItemUncheckedCreateWithoutUserInput
        >
      | CartItemCreateWithoutUserInput[]
      | CartItemUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | CartItemCreateOrConnectWithoutUserInput
      | CartItemCreateOrConnectWithoutUserInput[];
    upsert?:
      | CartItemUpsertWithWhereUniqueWithoutUserInput
      | CartItemUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: CartItemCreateManyUserInputEnvelope;
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    update?:
      | CartItemUpdateWithWhereUniqueWithoutUserInput
      | CartItemUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | CartItemUpdateManyWithWhereWithoutUserInput
      | CartItemUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[];
  };

  export type ReferralUncheckedUpdateManyWithoutReferrerNestedInput = {
    create?:
      | XOR<
          ReferralCreateWithoutReferrerInput,
          ReferralUncheckedCreateWithoutReferrerInput
        >
      | ReferralCreateWithoutReferrerInput[]
      | ReferralUncheckedCreateWithoutReferrerInput[];
    connectOrCreate?:
      | ReferralCreateOrConnectWithoutReferrerInput
      | ReferralCreateOrConnectWithoutReferrerInput[];
    upsert?:
      | ReferralUpsertWithWhereUniqueWithoutReferrerInput
      | ReferralUpsertWithWhereUniqueWithoutReferrerInput[];
    createMany?: ReferralCreateManyReferrerInputEnvelope;
    set?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    disconnect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    delete?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    update?:
      | ReferralUpdateWithWhereUniqueWithoutReferrerInput
      | ReferralUpdateWithWhereUniqueWithoutReferrerInput[];
    updateMany?:
      | ReferralUpdateManyWithWhereWithoutReferrerInput
      | ReferralUpdateManyWithWhereWithoutReferrerInput[];
    deleteMany?: ReferralScalarWhereInput | ReferralScalarWhereInput[];
  };

  export type ReferralUncheckedUpdateManyWithoutReferredNestedInput = {
    create?:
      | XOR<
          ReferralCreateWithoutReferredInput,
          ReferralUncheckedCreateWithoutReferredInput
        >
      | ReferralCreateWithoutReferredInput[]
      | ReferralUncheckedCreateWithoutReferredInput[];
    connectOrCreate?:
      | ReferralCreateOrConnectWithoutReferredInput
      | ReferralCreateOrConnectWithoutReferredInput[];
    upsert?:
      | ReferralUpsertWithWhereUniqueWithoutReferredInput
      | ReferralUpsertWithWhereUniqueWithoutReferredInput[];
    createMany?: ReferralCreateManyReferredInputEnvelope;
    set?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    disconnect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    delete?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    connect?: ReferralWhereUniqueInput | ReferralWhereUniqueInput[];
    update?:
      | ReferralUpdateWithWhereUniqueWithoutReferredInput
      | ReferralUpdateWithWhereUniqueWithoutReferredInput[];
    updateMany?:
      | ReferralUpdateManyWithWhereWithoutReferredInput
      | ReferralUpdateManyWithWhereWithoutReferredInput[];
    deleteMany?: ReferralScalarWhereInput | ReferralScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
    connect?: UserWhereUniqueInput;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
    upsert?: UserUpsertWithoutAccountsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutAccountsInput,
        UserUpdateWithoutAccountsInput
      >,
      UserUncheckedUpdateWithoutAccountsInput
    >;
  };

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    upsert?: UserUpsertWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutSessionsInput,
        UserUpdateWithoutSessionsInput
      >,
      UserUncheckedUpdateWithoutSessionsInput
    >;
  };

  export type CategoryCreateNestedOneWithoutChildrenInput = {
    create?: XOR<
      CategoryCreateWithoutChildrenInput,
      CategoryUncheckedCreateWithoutChildrenInput
    >;
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput;
    connect?: CategoryWhereUniqueInput;
  };

  export type CategoryCreateNestedManyWithoutParentInput = {
    create?:
      | XOR<
          CategoryCreateWithoutParentInput,
          CategoryUncheckedCreateWithoutParentInput
        >
      | CategoryCreateWithoutParentInput[]
      | CategoryUncheckedCreateWithoutParentInput[];
    connectOrCreate?:
      | CategoryCreateOrConnectWithoutParentInput
      | CategoryCreateOrConnectWithoutParentInput[];
    createMany?: CategoryCreateManyParentInputEnvelope;
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
  };

  export type ProductCategoryCreateNestedManyWithoutCategoryInput = {
    create?:
      | XOR<
          ProductCategoryCreateWithoutCategoryInput,
          ProductCategoryUncheckedCreateWithoutCategoryInput
        >
      | ProductCategoryCreateWithoutCategoryInput[]
      | ProductCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?:
      | ProductCategoryCreateOrConnectWithoutCategoryInput
      | ProductCategoryCreateOrConnectWithoutCategoryInput[];
    createMany?: ProductCategoryCreateManyCategoryInputEnvelope;
    connect?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
  };

  export type CategoryUncheckedCreateNestedManyWithoutParentInput = {
    create?:
      | XOR<
          CategoryCreateWithoutParentInput,
          CategoryUncheckedCreateWithoutParentInput
        >
      | CategoryCreateWithoutParentInput[]
      | CategoryUncheckedCreateWithoutParentInput[];
    connectOrCreate?:
      | CategoryCreateOrConnectWithoutParentInput
      | CategoryCreateOrConnectWithoutParentInput[];
    createMany?: CategoryCreateManyParentInputEnvelope;
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
  };

  export type ProductCategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?:
      | XOR<
          ProductCategoryCreateWithoutCategoryInput,
          ProductCategoryUncheckedCreateWithoutCategoryInput
        >
      | ProductCategoryCreateWithoutCategoryInput[]
      | ProductCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?:
      | ProductCategoryCreateOrConnectWithoutCategoryInput
      | ProductCategoryCreateOrConnectWithoutCategoryInput[];
    createMany?: ProductCategoryCreateManyCategoryInputEnvelope;
    connect?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type CategoryUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<
      CategoryCreateWithoutChildrenInput,
      CategoryUncheckedCreateWithoutChildrenInput
    >;
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput;
    upsert?: CategoryUpsertWithoutChildrenInput;
    disconnect?: CategoryWhereInput | boolean;
    delete?: CategoryWhereInput | boolean;
    connect?: CategoryWhereUniqueInput;
    update?: XOR<
      XOR<
        CategoryUpdateToOneWithWhereWithoutChildrenInput,
        CategoryUpdateWithoutChildrenInput
      >,
      CategoryUncheckedUpdateWithoutChildrenInput
    >;
  };

  export type CategoryUpdateManyWithoutParentNestedInput = {
    create?:
      | XOR<
          CategoryCreateWithoutParentInput,
          CategoryUncheckedCreateWithoutParentInput
        >
      | CategoryCreateWithoutParentInput[]
      | CategoryUncheckedCreateWithoutParentInput[];
    connectOrCreate?:
      | CategoryCreateOrConnectWithoutParentInput
      | CategoryCreateOrConnectWithoutParentInput[];
    upsert?:
      | CategoryUpsertWithWhereUniqueWithoutParentInput
      | CategoryUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: CategoryCreateManyParentInputEnvelope;
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    update?:
      | CategoryUpdateWithWhereUniqueWithoutParentInput
      | CategoryUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?:
      | CategoryUpdateManyWithWhereWithoutParentInput
      | CategoryUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[];
  };

  export type ProductCategoryUpdateManyWithoutCategoryNestedInput = {
    create?:
      | XOR<
          ProductCategoryCreateWithoutCategoryInput,
          ProductCategoryUncheckedCreateWithoutCategoryInput
        >
      | ProductCategoryCreateWithoutCategoryInput[]
      | ProductCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?:
      | ProductCategoryCreateOrConnectWithoutCategoryInput
      | ProductCategoryCreateOrConnectWithoutCategoryInput[];
    upsert?:
      | ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput
      | ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: ProductCategoryCreateManyCategoryInputEnvelope;
    set?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[];
    disconnect?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
    delete?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
    connect?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
    update?:
      | ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput
      | ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?:
      | ProductCategoryUpdateManyWithWhereWithoutCategoryInput
      | ProductCategoryUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?:
      | ProductCategoryScalarWhereInput
      | ProductCategoryScalarWhereInput[];
  };

  export type CategoryUncheckedUpdateManyWithoutParentNestedInput = {
    create?:
      | XOR<
          CategoryCreateWithoutParentInput,
          CategoryUncheckedCreateWithoutParentInput
        >
      | CategoryCreateWithoutParentInput[]
      | CategoryUncheckedCreateWithoutParentInput[];
    connectOrCreate?:
      | CategoryCreateOrConnectWithoutParentInput
      | CategoryCreateOrConnectWithoutParentInput[];
    upsert?:
      | CategoryUpsertWithWhereUniqueWithoutParentInput
      | CategoryUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: CategoryCreateManyParentInputEnvelope;
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[];
    update?:
      | CategoryUpdateWithWhereUniqueWithoutParentInput
      | CategoryUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?:
      | CategoryUpdateManyWithWhereWithoutParentInput
      | CategoryUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[];
  };

  export type ProductCategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?:
      | XOR<
          ProductCategoryCreateWithoutCategoryInput,
          ProductCategoryUncheckedCreateWithoutCategoryInput
        >
      | ProductCategoryCreateWithoutCategoryInput[]
      | ProductCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?:
      | ProductCategoryCreateOrConnectWithoutCategoryInput
      | ProductCategoryCreateOrConnectWithoutCategoryInput[];
    upsert?:
      | ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput
      | ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: ProductCategoryCreateManyCategoryInputEnvelope;
    set?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[];
    disconnect?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
    delete?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
    connect?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
    update?:
      | ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput
      | ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?:
      | ProductCategoryUpdateManyWithWhereWithoutCategoryInput
      | ProductCategoryUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?:
      | ProductCategoryScalarWhereInput
      | ProductCategoryScalarWhereInput[];
  };

  export type ProductCreatetagsInput = {
    set: string[];
  };

  export type ProductVariantCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          ProductVariantCreateWithoutProductInput,
          ProductVariantUncheckedCreateWithoutProductInput
        >
      | ProductVariantCreateWithoutProductInput[]
      | ProductVariantUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductVariantCreateOrConnectWithoutProductInput
      | ProductVariantCreateOrConnectWithoutProductInput[];
    createMany?: ProductVariantCreateManyProductInputEnvelope;
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
  };

  export type ProductImageCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          ProductImageCreateWithoutProductInput,
          ProductImageUncheckedCreateWithoutProductInput
        >
      | ProductImageCreateWithoutProductInput[]
      | ProductImageUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductImageCreateOrConnectWithoutProductInput
      | ProductImageCreateOrConnectWithoutProductInput[];
    createMany?: ProductImageCreateManyProductInputEnvelope;
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[];
  };

  export type ProductCategoryCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          ProductCategoryCreateWithoutProductInput,
          ProductCategoryUncheckedCreateWithoutProductInput
        >
      | ProductCategoryCreateWithoutProductInput[]
      | ProductCategoryUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductCategoryCreateOrConnectWithoutProductInput
      | ProductCategoryCreateOrConnectWithoutProductInput[];
    createMany?: ProductCategoryCreateManyProductInputEnvelope;
    connect?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
  };

  export type CartItemCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          CartItemCreateWithoutProductInput,
          CartItemUncheckedCreateWithoutProductInput
        >
      | CartItemCreateWithoutProductInput[]
      | CartItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | CartItemCreateOrConnectWithoutProductInput
      | CartItemCreateOrConnectWithoutProductInput[];
    createMany?: CartItemCreateManyProductInputEnvelope;
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
  };

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutProductInput,
          OrderItemUncheckedCreateWithoutProductInput
        >
      | OrderItemCreateWithoutProductInput[]
      | OrderItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutProductInput
      | OrderItemCreateOrConnectWithoutProductInput[];
    createMany?: OrderItemCreateManyProductInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type ProductVariantUncheckedCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          ProductVariantCreateWithoutProductInput,
          ProductVariantUncheckedCreateWithoutProductInput
        >
      | ProductVariantCreateWithoutProductInput[]
      | ProductVariantUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductVariantCreateOrConnectWithoutProductInput
      | ProductVariantCreateOrConnectWithoutProductInput[];
    createMany?: ProductVariantCreateManyProductInputEnvelope;
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
  };

  export type ProductImageUncheckedCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          ProductImageCreateWithoutProductInput,
          ProductImageUncheckedCreateWithoutProductInput
        >
      | ProductImageCreateWithoutProductInput[]
      | ProductImageUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductImageCreateOrConnectWithoutProductInput
      | ProductImageCreateOrConnectWithoutProductInput[];
    createMany?: ProductImageCreateManyProductInputEnvelope;
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[];
  };

  export type ProductCategoryUncheckedCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          ProductCategoryCreateWithoutProductInput,
          ProductCategoryUncheckedCreateWithoutProductInput
        >
      | ProductCategoryCreateWithoutProductInput[]
      | ProductCategoryUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductCategoryCreateOrConnectWithoutProductInput
      | ProductCategoryCreateOrConnectWithoutProductInput[];
    createMany?: ProductCategoryCreateManyProductInputEnvelope;
    connect?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
  };

  export type CartItemUncheckedCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          CartItemCreateWithoutProductInput,
          CartItemUncheckedCreateWithoutProductInput
        >
      | CartItemCreateWithoutProductInput[]
      | CartItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | CartItemCreateOrConnectWithoutProductInput
      | CartItemCreateOrConnectWithoutProductInput[];
    createMany?: CartItemCreateManyProductInputEnvelope;
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
  };

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutProductInput,
          OrderItemUncheckedCreateWithoutProductInput
        >
      | OrderItemCreateWithoutProductInput[]
      | OrderItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutProductInput
      | OrderItemCreateOrConnectWithoutProductInput[];
    createMany?: OrderItemCreateManyProductInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string;
    increment?: Decimal | DecimalJsLike | number | string;
    decrement?: Decimal | DecimalJsLike | number | string;
    multiply?: Decimal | DecimalJsLike | number | string;
    divide?: Decimal | DecimalJsLike | number | string;
  };

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null;
    increment?: Decimal | DecimalJsLike | number | string;
    decrement?: Decimal | DecimalJsLike | number | string;
    multiply?: Decimal | DecimalJsLike | number | string;
    divide?: Decimal | DecimalJsLike | number | string;
  };

  export type ProductUpdatetagsInput = {
    set?: string[];
    push?: string | string[];
  };

  export type EnumProductStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProductStatus;
  };

  export type ProductVariantUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          ProductVariantCreateWithoutProductInput,
          ProductVariantUncheckedCreateWithoutProductInput
        >
      | ProductVariantCreateWithoutProductInput[]
      | ProductVariantUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductVariantCreateOrConnectWithoutProductInput
      | ProductVariantCreateOrConnectWithoutProductInput[];
    upsert?:
      | ProductVariantUpsertWithWhereUniqueWithoutProductInput
      | ProductVariantUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: ProductVariantCreateManyProductInputEnvelope;
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
    disconnect?:
      | ProductVariantWhereUniqueInput
      | ProductVariantWhereUniqueInput[];
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
    update?:
      | ProductVariantUpdateWithWhereUniqueWithoutProductInput
      | ProductVariantUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | ProductVariantUpdateManyWithWhereWithoutProductInput
      | ProductVariantUpdateManyWithWhereWithoutProductInput[];
    deleteMany?:
      | ProductVariantScalarWhereInput
      | ProductVariantScalarWhereInput[];
  };

  export type ProductImageUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          ProductImageCreateWithoutProductInput,
          ProductImageUncheckedCreateWithoutProductInput
        >
      | ProductImageCreateWithoutProductInput[]
      | ProductImageUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductImageCreateOrConnectWithoutProductInput
      | ProductImageCreateOrConnectWithoutProductInput[];
    upsert?:
      | ProductImageUpsertWithWhereUniqueWithoutProductInput
      | ProductImageUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: ProductImageCreateManyProductInputEnvelope;
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[];
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[];
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[];
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[];
    update?:
      | ProductImageUpdateWithWhereUniqueWithoutProductInput
      | ProductImageUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | ProductImageUpdateManyWithWhereWithoutProductInput
      | ProductImageUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[];
  };

  export type ProductCategoryUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          ProductCategoryCreateWithoutProductInput,
          ProductCategoryUncheckedCreateWithoutProductInput
        >
      | ProductCategoryCreateWithoutProductInput[]
      | ProductCategoryUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductCategoryCreateOrConnectWithoutProductInput
      | ProductCategoryCreateOrConnectWithoutProductInput[];
    upsert?:
      | ProductCategoryUpsertWithWhereUniqueWithoutProductInput
      | ProductCategoryUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: ProductCategoryCreateManyProductInputEnvelope;
    set?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[];
    disconnect?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
    delete?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
    connect?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
    update?:
      | ProductCategoryUpdateWithWhereUniqueWithoutProductInput
      | ProductCategoryUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | ProductCategoryUpdateManyWithWhereWithoutProductInput
      | ProductCategoryUpdateManyWithWhereWithoutProductInput[];
    deleteMany?:
      | ProductCategoryScalarWhereInput
      | ProductCategoryScalarWhereInput[];
  };

  export type CartItemUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          CartItemCreateWithoutProductInput,
          CartItemUncheckedCreateWithoutProductInput
        >
      | CartItemCreateWithoutProductInput[]
      | CartItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | CartItemCreateOrConnectWithoutProductInput
      | CartItemCreateOrConnectWithoutProductInput[];
    upsert?:
      | CartItemUpsertWithWhereUniqueWithoutProductInput
      | CartItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: CartItemCreateManyProductInputEnvelope;
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    update?:
      | CartItemUpdateWithWhereUniqueWithoutProductInput
      | CartItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | CartItemUpdateManyWithWhereWithoutProductInput
      | CartItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[];
  };

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutProductInput,
          OrderItemUncheckedCreateWithoutProductInput
        >
      | OrderItemCreateWithoutProductInput[]
      | OrderItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutProductInput
      | OrderItemCreateOrConnectWithoutProductInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutProductInput
      | OrderItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: OrderItemCreateManyProductInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutProductInput
      | OrderItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutProductInput
      | OrderItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type ProductVariantUncheckedUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          ProductVariantCreateWithoutProductInput,
          ProductVariantUncheckedCreateWithoutProductInput
        >
      | ProductVariantCreateWithoutProductInput[]
      | ProductVariantUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductVariantCreateOrConnectWithoutProductInput
      | ProductVariantCreateOrConnectWithoutProductInput[];
    upsert?:
      | ProductVariantUpsertWithWhereUniqueWithoutProductInput
      | ProductVariantUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: ProductVariantCreateManyProductInputEnvelope;
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
    disconnect?:
      | ProductVariantWhereUniqueInput
      | ProductVariantWhereUniqueInput[];
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
    update?:
      | ProductVariantUpdateWithWhereUniqueWithoutProductInput
      | ProductVariantUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | ProductVariantUpdateManyWithWhereWithoutProductInput
      | ProductVariantUpdateManyWithWhereWithoutProductInput[];
    deleteMany?:
      | ProductVariantScalarWhereInput
      | ProductVariantScalarWhereInput[];
  };

  export type ProductImageUncheckedUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          ProductImageCreateWithoutProductInput,
          ProductImageUncheckedCreateWithoutProductInput
        >
      | ProductImageCreateWithoutProductInput[]
      | ProductImageUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductImageCreateOrConnectWithoutProductInput
      | ProductImageCreateOrConnectWithoutProductInput[];
    upsert?:
      | ProductImageUpsertWithWhereUniqueWithoutProductInput
      | ProductImageUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: ProductImageCreateManyProductInputEnvelope;
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[];
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[];
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[];
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[];
    update?:
      | ProductImageUpdateWithWhereUniqueWithoutProductInput
      | ProductImageUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | ProductImageUpdateManyWithWhereWithoutProductInput
      | ProductImageUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[];
  };

  export type ProductCategoryUncheckedUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          ProductCategoryCreateWithoutProductInput,
          ProductCategoryUncheckedCreateWithoutProductInput
        >
      | ProductCategoryCreateWithoutProductInput[]
      | ProductCategoryUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductCategoryCreateOrConnectWithoutProductInput
      | ProductCategoryCreateOrConnectWithoutProductInput[];
    upsert?:
      | ProductCategoryUpsertWithWhereUniqueWithoutProductInput
      | ProductCategoryUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: ProductCategoryCreateManyProductInputEnvelope;
    set?: ProductCategoryWhereUniqueInput | ProductCategoryWhereUniqueInput[];
    disconnect?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
    delete?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
    connect?:
      | ProductCategoryWhereUniqueInput
      | ProductCategoryWhereUniqueInput[];
    update?:
      | ProductCategoryUpdateWithWhereUniqueWithoutProductInput
      | ProductCategoryUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | ProductCategoryUpdateManyWithWhereWithoutProductInput
      | ProductCategoryUpdateManyWithWhereWithoutProductInput[];
    deleteMany?:
      | ProductCategoryScalarWhereInput
      | ProductCategoryScalarWhereInput[];
  };

  export type CartItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          CartItemCreateWithoutProductInput,
          CartItemUncheckedCreateWithoutProductInput
        >
      | CartItemCreateWithoutProductInput[]
      | CartItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | CartItemCreateOrConnectWithoutProductInput
      | CartItemCreateOrConnectWithoutProductInput[];
    upsert?:
      | CartItemUpsertWithWhereUniqueWithoutProductInput
      | CartItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: CartItemCreateManyProductInputEnvelope;
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[];
    update?:
      | CartItemUpdateWithWhereUniqueWithoutProductInput
      | CartItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | CartItemUpdateManyWithWhereWithoutProductInput
      | CartItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[];
  };

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutProductInput,
          OrderItemUncheckedCreateWithoutProductInput
        >
      | OrderItemCreateWithoutProductInput[]
      | OrderItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutProductInput
      | OrderItemCreateOrConnectWithoutProductInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutProductInput
      | OrderItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: OrderItemCreateManyProductInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutProductInput
      | OrderItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutProductInput
      | OrderItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type ProductCreateNestedOneWithoutVariantsInput = {
    create?: XOR<
      ProductCreateWithoutVariantsInput,
      ProductUncheckedCreateWithoutVariantsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput;
    connect?: ProductWhereUniqueInput;
  };

  export type ProductUpdateOneRequiredWithoutVariantsNestedInput = {
    create?: XOR<
      ProductCreateWithoutVariantsInput,
      ProductUncheckedCreateWithoutVariantsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput;
    upsert?: ProductUpsertWithoutVariantsInput;
    connect?: ProductWhereUniqueInput;
    update?: XOR<
      XOR<
        ProductUpdateToOneWithWhereWithoutVariantsInput,
        ProductUpdateWithoutVariantsInput
      >,
      ProductUncheckedUpdateWithoutVariantsInput
    >;
  };

  export type ProductCreateNestedOneWithoutImagesInput = {
    create?: XOR<
      ProductCreateWithoutImagesInput,
      ProductUncheckedCreateWithoutImagesInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput;
    connect?: ProductWhereUniqueInput;
  };

  export type EnumImageTypeFieldUpdateOperationsInput = {
    set?: $Enums.ImageType;
  };

  export type ProductUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<
      ProductCreateWithoutImagesInput,
      ProductUncheckedCreateWithoutImagesInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput;
    upsert?: ProductUpsertWithoutImagesInput;
    connect?: ProductWhereUniqueInput;
    update?: XOR<
      XOR<
        ProductUpdateToOneWithWhereWithoutImagesInput,
        ProductUpdateWithoutImagesInput
      >,
      ProductUncheckedUpdateWithoutImagesInput
    >;
  };

  export type ProductCreateNestedOneWithoutProductCategoriesInput = {
    create?: XOR<
      ProductCreateWithoutProductCategoriesInput,
      ProductUncheckedCreateWithoutProductCategoriesInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutProductCategoriesInput;
    connect?: ProductWhereUniqueInput;
  };

  export type CategoryCreateNestedOneWithoutProductCategoriesInput = {
    create?: XOR<
      CategoryCreateWithoutProductCategoriesInput,
      CategoryUncheckedCreateWithoutProductCategoriesInput
    >;
    connectOrCreate?: CategoryCreateOrConnectWithoutProductCategoriesInput;
    connect?: CategoryWhereUniqueInput;
  };

  export type ProductUpdateOneRequiredWithoutProductCategoriesNestedInput = {
    create?: XOR<
      ProductCreateWithoutProductCategoriesInput,
      ProductUncheckedCreateWithoutProductCategoriesInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutProductCategoriesInput;
    upsert?: ProductUpsertWithoutProductCategoriesInput;
    connect?: ProductWhereUniqueInput;
    update?: XOR<
      XOR<
        ProductUpdateToOneWithWhereWithoutProductCategoriesInput,
        ProductUpdateWithoutProductCategoriesInput
      >,
      ProductUncheckedUpdateWithoutProductCategoriesInput
    >;
  };

  export type CategoryUpdateOneRequiredWithoutProductCategoriesNestedInput = {
    create?: XOR<
      CategoryCreateWithoutProductCategoriesInput,
      CategoryUncheckedCreateWithoutProductCategoriesInput
    >;
    connectOrCreate?: CategoryCreateOrConnectWithoutProductCategoriesInput;
    upsert?: CategoryUpsertWithoutProductCategoriesInput;
    connect?: CategoryWhereUniqueInput;
    update?: XOR<
      XOR<
        CategoryUpdateToOneWithWhereWithoutProductCategoriesInput,
        CategoryUpdateWithoutProductCategoriesInput
      >,
      CategoryUncheckedUpdateWithoutProductCategoriesInput
    >;
  };

  export type UserCreateNestedOneWithoutCartItemsInput = {
    create?: XOR<
      UserCreateWithoutCartItemsInput,
      UserUncheckedCreateWithoutCartItemsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutCartItemsInput;
    connect?: UserWhereUniqueInput;
  };

  export type ProductCreateNestedOneWithoutCartItemsInput = {
    create?: XOR<
      ProductCreateWithoutCartItemsInput,
      ProductUncheckedCreateWithoutCartItemsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutCartItemsInput;
    connect?: ProductWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutCartItemsNestedInput = {
    create?: XOR<
      UserCreateWithoutCartItemsInput,
      UserUncheckedCreateWithoutCartItemsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutCartItemsInput;
    upsert?: UserUpsertWithoutCartItemsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutCartItemsInput,
        UserUpdateWithoutCartItemsInput
      >,
      UserUncheckedUpdateWithoutCartItemsInput
    >;
  };

  export type ProductUpdateOneRequiredWithoutCartItemsNestedInput = {
    create?: XOR<
      ProductCreateWithoutCartItemsInput,
      ProductUncheckedCreateWithoutCartItemsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutCartItemsInput;
    upsert?: ProductUpsertWithoutCartItemsInput;
    connect?: ProductWhereUniqueInput;
    update?: XOR<
      XOR<
        ProductUpdateToOneWithWhereWithoutCartItemsInput,
        ProductUpdateWithoutCartItemsInput
      >,
      ProductUncheckedUpdateWithoutCartItemsInput
    >;
  };

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<
      UserCreateWithoutOrdersInput,
      UserUncheckedCreateWithoutOrdersInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput;
    connect?: UserWhereUniqueInput;
  };

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutOrderInput,
          OrderItemUncheckedCreateWithoutOrderInput
        >
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutOrderInput,
          OrderItemUncheckedCreateWithoutOrderInput
        >
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus;
  };

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus;
  };

  export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<
      UserCreateWithoutOrdersInput,
      UserUncheckedCreateWithoutOrdersInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput;
    upsert?: UserUpsertWithoutOrdersInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutOrdersInput,
        UserUpdateWithoutOrdersInput
      >,
      UserUncheckedUpdateWithoutOrdersInput
    >;
  };

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutOrderInput,
          OrderItemUncheckedCreateWithoutOrderInput
        >
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutOrderInput
      | OrderItemUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutOrderInput,
          OrderItemUncheckedCreateWithoutOrderInput
        >
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutOrderInput
      | OrderItemUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type OrderCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<
      OrderCreateWithoutOrderItemsInput,
      OrderUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: OrderCreateOrConnectWithoutOrderItemsInput;
    connect?: OrderWhereUniqueInput;
  };

  export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput;
    connect?: ProductWhereUniqueInput;
  };

  export type OrderUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<
      OrderCreateWithoutOrderItemsInput,
      OrderUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: OrderCreateOrConnectWithoutOrderItemsInput;
    upsert?: OrderUpsertWithoutOrderItemsInput;
    connect?: OrderWhereUniqueInput;
    update?: XOR<
      XOR<
        OrderUpdateToOneWithWhereWithoutOrderItemsInput,
        OrderUpdateWithoutOrderItemsInput
      >,
      OrderUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput;
    upsert?: ProductUpsertWithoutOrderItemsInput;
    connect?: ProductWhereUniqueInput;
    update?: XOR<
      XOR<
        ProductUpdateToOneWithWhereWithoutOrderItemsInput,
        ProductUpdateWithoutOrderItemsInput
      >,
      ProductUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type UserCreateNestedOneWithoutReferralsGivenInput = {
    create?: XOR<
      UserCreateWithoutReferralsGivenInput,
      UserUncheckedCreateWithoutReferralsGivenInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReferralsGivenInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutReferralsReceivedInput = {
    create?: XOR<
      UserCreateWithoutReferralsReceivedInput,
      UserUncheckedCreateWithoutReferralsReceivedInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReferralsReceivedInput;
    connect?: UserWhereUniqueInput;
  };

  export type EnumReferralStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReferralStatus;
  };

  export type UserUpdateOneRequiredWithoutReferralsGivenNestedInput = {
    create?: XOR<
      UserCreateWithoutReferralsGivenInput,
      UserUncheckedCreateWithoutReferralsGivenInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReferralsGivenInput;
    upsert?: UserUpsertWithoutReferralsGivenInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutReferralsGivenInput,
        UserUpdateWithoutReferralsGivenInput
      >,
      UserUncheckedUpdateWithoutReferralsGivenInput
    >;
  };

  export type UserUpdateOneWithoutReferralsReceivedNestedInput = {
    create?: XOR<
      UserCreateWithoutReferralsReceivedInput,
      UserUncheckedCreateWithoutReferralsReceivedInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReferralsReceivedInput;
    upsert?: UserUpsertWithoutReferralsReceivedInput;
    disconnect?: UserWhereInput | boolean;
    delete?: UserWhereInput | boolean;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutReferralsReceivedInput,
        UserUpdateWithoutReferralsReceivedInput
      >,
      UserUncheckedUpdateWithoutReferralsReceivedInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        | Date[]
        | string[]
        | ListDateTimeFieldRefInput<$PrismaModel>
        | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>
      | null;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalNullableFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
  };

  export type NestedEnumProductStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ProductStatus
      | EnumProductStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ProductStatus[]
      | ListEnumProductStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ProductStatus[]
      | ListEnumProductStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus;
  };

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedDecimalFilter<$PrismaModel>;
    _sum?: NestedDecimalFilter<$PrismaModel>;
    _min?: NestedDecimalFilter<$PrismaModel>;
    _max?: NestedDecimalFilter<$PrismaModel>;
  };

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>
        | null;
      in?:
        | Decimal[]
        | DecimalJsLike[]
        | number[]
        | string[]
        | ListDecimalFieldRefInput<$PrismaModel>
        | null;
      notIn?:
        | Decimal[]
        | DecimalJsLike[]
        | number[]
        | string[]
        | ListDecimalFieldRefInput<$PrismaModel>
        | null;
      lt?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>;
      lte?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>;
      gt?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>;
      gte?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>;
      not?:
        | NestedDecimalNullableWithAggregatesFilter<$PrismaModel>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _avg?: NestedDecimalNullableFilter<$PrismaModel>;
      _sum?: NestedDecimalNullableFilter<$PrismaModel>;
      _min?: NestedDecimalNullableFilter<$PrismaModel>;
      _max?: NestedDecimalNullableFilter<$PrismaModel>;
    };

  export type NestedEnumProductStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.ProductStatus
      | EnumProductStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ProductStatus[]
      | ListEnumProductStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ProductStatus[]
      | ListEnumProductStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumProductStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.ProductStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumProductStatusFilter<$PrismaModel>;
    _max?: NestedEnumProductStatusFilter<$PrismaModel>;
  };
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, "path">
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, "path">>;

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type NestedEnumImageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageType | EnumImageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumImageTypeFilter<$PrismaModel> | $Enums.ImageType;
  };

  export type NestedEnumImageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageType | EnumImageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ImageType[] | ListEnumImageTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumImageTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.ImageType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumImageTypeFilter<$PrismaModel>;
    _max?: NestedEnumImageTypeFilter<$PrismaModel>;
  };

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.OrderStatus[]
      | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus;
  };

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.PaymentStatus
      | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
  };

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.OrderStatus[]
        | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.OrderStatus[]
        | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel>
        | $Enums.OrderStatus;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumOrderStatusFilter<$PrismaModel>;
      _max?: NestedEnumOrderStatusFilter<$PrismaModel>;
    };

  export type NestedEnumPaymentStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.PaymentStatus
      | EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.PaymentStatus[]
      | ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.PaymentStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>;
  };

  export type NestedEnumReferralStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ReferralStatus
      | EnumReferralStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ReferralStatus[]
      | ListEnumReferralStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ReferralStatus[]
      | ListEnumReferralStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumReferralStatusFilter<$PrismaModel> | $Enums.ReferralStatus;
  };

  export type NestedEnumReferralStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.ReferralStatus
      | EnumReferralStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ReferralStatus[]
      | ListEnumReferralStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ReferralStatus[]
      | ListEnumReferralStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumReferralStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.ReferralStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumReferralStatusFilter<$PrismaModel>;
    _max?: NestedEnumReferralStatusFilter<$PrismaModel>;
  };

  export type AccountCreateWithoutUserInput = {
    id?: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput;
    create: XOR<
      AccountCreateWithoutUserInput,
      AccountUncheckedCreateWithoutUserInput
    >;
  };

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type SessionCreateWithoutUserInput = {
    id?: string;
    sessionToken: string;
    expires: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string;
    sessionToken: string;
    expires: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput;
    create: XOR<
      SessionCreateWithoutUserInput,
      SessionUncheckedCreateWithoutUserInput
    >;
  };

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type OrderCreateWithoutUserInput = {
    id?: string;
    orderNumber: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    taxAmount?: Decimal | DecimalJsLike | number | string;
    shippingCost?: Decimal | DecimalJsLike | number | string;
    discountAmount?: Decimal | DecimalJsLike | number | string;
    totalAmount: Decimal | DecimalJsLike | number | string;
    status?: $Enums.OrderStatus;
    paymentStatus?: $Enums.PaymentStatus;
    customerEmail: string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress: JsonNullValueInput | InputJsonValue;
    paymentMethod?: string | null;
    paymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orderItems?: OrderItemCreateNestedManyWithoutOrderInput;
  };

  export type OrderUncheckedCreateWithoutUserInput = {
    id?: string;
    orderNumber: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    taxAmount?: Decimal | DecimalJsLike | number | string;
    shippingCost?: Decimal | DecimalJsLike | number | string;
    discountAmount?: Decimal | DecimalJsLike | number | string;
    totalAmount: Decimal | DecimalJsLike | number | string;
    status?: $Enums.OrderStatus;
    paymentStatus?: $Enums.PaymentStatus;
    customerEmail: string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress: JsonNullValueInput | InputJsonValue;
    paymentMethod?: string | null;
    paymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput;
    create: XOR<
      OrderCreateWithoutUserInput,
      OrderUncheckedCreateWithoutUserInput
    >;
  };

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type CartItemCreateWithoutUserInput = {
    id?: string;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    product: ProductCreateNestedOneWithoutCartItemsInput;
  };

  export type CartItemUncheckedCreateWithoutUserInput = {
    id?: string;
    productId: string;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CartItemCreateOrConnectWithoutUserInput = {
    where: CartItemWhereUniqueInput;
    create: XOR<
      CartItemCreateWithoutUserInput,
      CartItemUncheckedCreateWithoutUserInput
    >;
  };

  export type CartItemCreateManyUserInputEnvelope = {
    data: CartItemCreateManyUserInput | CartItemCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type ReferralCreateWithoutReferrerInput = {
    id?: string;
    referralCode: string;
    email?: string | null;
    status?: $Enums.ReferralStatus;
    commissionRate?: Decimal | DecimalJsLike | number | string;
    commissionEarned?: Decimal | DecimalJsLike | number | string;
    clickCount?: number;
    conversionAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    referred?: UserCreateNestedOneWithoutReferralsReceivedInput;
  };

  export type ReferralUncheckedCreateWithoutReferrerInput = {
    id?: string;
    referredId?: string | null;
    referralCode: string;
    email?: string | null;
    status?: $Enums.ReferralStatus;
    commissionRate?: Decimal | DecimalJsLike | number | string;
    commissionEarned?: Decimal | DecimalJsLike | number | string;
    clickCount?: number;
    conversionAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ReferralCreateOrConnectWithoutReferrerInput = {
    where: ReferralWhereUniqueInput;
    create: XOR<
      ReferralCreateWithoutReferrerInput,
      ReferralUncheckedCreateWithoutReferrerInput
    >;
  };

  export type ReferralCreateManyReferrerInputEnvelope = {
    data: ReferralCreateManyReferrerInput | ReferralCreateManyReferrerInput[];
    skipDuplicates?: boolean;
  };

  export type ReferralCreateWithoutReferredInput = {
    id?: string;
    referralCode: string;
    email?: string | null;
    status?: $Enums.ReferralStatus;
    commissionRate?: Decimal | DecimalJsLike | number | string;
    commissionEarned?: Decimal | DecimalJsLike | number | string;
    clickCount?: number;
    conversionAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    referrer: UserCreateNestedOneWithoutReferralsGivenInput;
  };

  export type ReferralUncheckedCreateWithoutReferredInput = {
    id?: string;
    referrerId: string;
    referralCode: string;
    email?: string | null;
    status?: $Enums.ReferralStatus;
    commissionRate?: Decimal | DecimalJsLike | number | string;
    commissionEarned?: Decimal | DecimalJsLike | number | string;
    clickCount?: number;
    conversionAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ReferralCreateOrConnectWithoutReferredInput = {
    where: ReferralWhereUniqueInput;
    create: XOR<
      ReferralCreateWithoutReferredInput,
      ReferralUncheckedCreateWithoutReferredInput
    >;
  };

  export type ReferralCreateManyReferredInputEnvelope = {
    data: ReferralCreateManyReferredInput | ReferralCreateManyReferredInput[];
    skipDuplicates?: boolean;
  };

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput;
    update: XOR<
      AccountUpdateWithoutUserInput,
      AccountUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      AccountCreateWithoutUserInput,
      AccountUncheckedCreateWithoutUserInput
    >;
  };

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput;
    data: XOR<
      AccountUpdateWithoutUserInput,
      AccountUncheckedUpdateWithoutUserInput
    >;
  };

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput;
    data: XOR<
      AccountUpdateManyMutationInput,
      AccountUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[];
    OR?: AccountScalarWhereInput[];
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[];
    id?: StringFilter<"Account"> | string;
    userId?: StringFilter<"Account"> | string;
    type?: StringFilter<"Account"> | string;
    provider?: StringFilter<"Account"> | string;
    providerAccountId?: StringFilter<"Account"> | string;
    refresh_token?: StringNullableFilter<"Account"> | string | null;
    access_token?: StringNullableFilter<"Account"> | string | null;
    expires_at?: IntNullableFilter<"Account"> | number | null;
    token_type?: StringNullableFilter<"Account"> | string | null;
    scope?: StringNullableFilter<"Account"> | string | null;
    id_token?: StringNullableFilter<"Account"> | string | null;
    session_state?: StringNullableFilter<"Account"> | string | null;
    createdAt?: DateTimeFilter<"Account"> | Date | string;
    updatedAt?: DateTimeFilter<"Account"> | Date | string;
  };

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    update: XOR<
      SessionUpdateWithoutUserInput,
      SessionUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      SessionCreateWithoutUserInput,
      SessionUncheckedCreateWithoutUserInput
    >;
  };

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    data: XOR<
      SessionUpdateWithoutUserInput,
      SessionUncheckedUpdateWithoutUserInput
    >;
  };

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput;
    data: XOR<
      SessionUpdateManyMutationInput,
      SessionUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[];
    OR?: SessionScalarWhereInput[];
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[];
    id?: StringFilter<"Session"> | string;
    sessionToken?: StringFilter<"Session"> | string;
    userId?: StringFilter<"Session"> | string;
    expires?: DateTimeFilter<"Session"> | Date | string;
    createdAt?: DateTimeFilter<"Session"> | Date | string;
    updatedAt?: DateTimeFilter<"Session"> | Date | string;
  };

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput;
    update: XOR<
      OrderUpdateWithoutUserInput,
      OrderUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      OrderCreateWithoutUserInput,
      OrderUncheckedCreateWithoutUserInput
    >;
  };

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput;
    data: XOR<
      OrderUpdateWithoutUserInput,
      OrderUncheckedUpdateWithoutUserInput
    >;
  };

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput;
    data: XOR<
      OrderUpdateManyMutationInput,
      OrderUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[];
    OR?: OrderScalarWhereInput[];
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[];
    id?: StringFilter<"Order"> | string;
    userId?: StringFilter<"Order"> | string;
    orderNumber?: StringFilter<"Order"> | string;
    subtotal?:
      | DecimalFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    taxAmount?:
      | DecimalFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingCost?:
      | DecimalFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    discountAmount?:
      | DecimalFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalAmount?:
      | DecimalFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus;
    paymentStatus?: EnumPaymentStatusFilter<"Order"> | $Enums.PaymentStatus;
    customerEmail?: StringFilter<"Order"> | string;
    shippingAddress?: JsonFilter<"Order">;
    billingAddress?: JsonFilter<"Order">;
    paymentMethod?: StringNullableFilter<"Order"> | string | null;
    paymentIntentId?: StringNullableFilter<"Order"> | string | null;
    createdAt?: DateTimeFilter<"Order"> | Date | string;
    updatedAt?: DateTimeFilter<"Order"> | Date | string;
  };

  export type CartItemUpsertWithWhereUniqueWithoutUserInput = {
    where: CartItemWhereUniqueInput;
    update: XOR<
      CartItemUpdateWithoutUserInput,
      CartItemUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      CartItemCreateWithoutUserInput,
      CartItemUncheckedCreateWithoutUserInput
    >;
  };

  export type CartItemUpdateWithWhereUniqueWithoutUserInput = {
    where: CartItemWhereUniqueInput;
    data: XOR<
      CartItemUpdateWithoutUserInput,
      CartItemUncheckedUpdateWithoutUserInput
    >;
  };

  export type CartItemUpdateManyWithWhereWithoutUserInput = {
    where: CartItemScalarWhereInput;
    data: XOR<
      CartItemUpdateManyMutationInput,
      CartItemUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type CartItemScalarWhereInput = {
    AND?: CartItemScalarWhereInput | CartItemScalarWhereInput[];
    OR?: CartItemScalarWhereInput[];
    NOT?: CartItemScalarWhereInput | CartItemScalarWhereInput[];
    id?: StringFilter<"CartItem"> | string;
    userId?: StringFilter<"CartItem"> | string;
    productId?: StringFilter<"CartItem"> | string;
    quantity?: IntFilter<"CartItem"> | number;
    unitPrice?:
      | DecimalFilter<"CartItem">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFilter<"CartItem"> | Date | string;
    updatedAt?: DateTimeFilter<"CartItem"> | Date | string;
  };

  export type ReferralUpsertWithWhereUniqueWithoutReferrerInput = {
    where: ReferralWhereUniqueInput;
    update: XOR<
      ReferralUpdateWithoutReferrerInput,
      ReferralUncheckedUpdateWithoutReferrerInput
    >;
    create: XOR<
      ReferralCreateWithoutReferrerInput,
      ReferralUncheckedCreateWithoutReferrerInput
    >;
  };

  export type ReferralUpdateWithWhereUniqueWithoutReferrerInput = {
    where: ReferralWhereUniqueInput;
    data: XOR<
      ReferralUpdateWithoutReferrerInput,
      ReferralUncheckedUpdateWithoutReferrerInput
    >;
  };

  export type ReferralUpdateManyWithWhereWithoutReferrerInput = {
    where: ReferralScalarWhereInput;
    data: XOR<
      ReferralUpdateManyMutationInput,
      ReferralUncheckedUpdateManyWithoutReferrerInput
    >;
  };

  export type ReferralScalarWhereInput = {
    AND?: ReferralScalarWhereInput | ReferralScalarWhereInput[];
    OR?: ReferralScalarWhereInput[];
    NOT?: ReferralScalarWhereInput | ReferralScalarWhereInput[];
    id?: StringFilter<"Referral"> | string;
    referrerId?: StringFilter<"Referral"> | string;
    referredId?: StringNullableFilter<"Referral"> | string | null;
    referralCode?: StringFilter<"Referral"> | string;
    email?: StringNullableFilter<"Referral"> | string | null;
    status?: EnumReferralStatusFilter<"Referral"> | $Enums.ReferralStatus;
    commissionRate?:
      | DecimalFilter<"Referral">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    commissionEarned?:
      | DecimalFilter<"Referral">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    clickCount?: IntFilter<"Referral"> | number;
    conversionAt?: DateTimeNullableFilter<"Referral"> | Date | string | null;
    createdAt?: DateTimeFilter<"Referral"> | Date | string;
    updatedAt?: DateTimeFilter<"Referral"> | Date | string;
  };

  export type ReferralUpsertWithWhereUniqueWithoutReferredInput = {
    where: ReferralWhereUniqueInput;
    update: XOR<
      ReferralUpdateWithoutReferredInput,
      ReferralUncheckedUpdateWithoutReferredInput
    >;
    create: XOR<
      ReferralCreateWithoutReferredInput,
      ReferralUncheckedCreateWithoutReferredInput
    >;
  };

  export type ReferralUpdateWithWhereUniqueWithoutReferredInput = {
    where: ReferralWhereUniqueInput;
    data: XOR<
      ReferralUpdateWithoutReferredInput,
      ReferralUncheckedUpdateWithoutReferredInput
    >;
  };

  export type ReferralUpdateManyWithWhereWithoutReferredInput = {
    where: ReferralScalarWhereInput;
    data: XOR<
      ReferralUpdateManyMutationInput,
      ReferralUncheckedUpdateManyWithoutReferredInput
    >;
  };

  export type UserCreateWithoutAccountsInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    orders?: OrderCreateNestedManyWithoutUserInput;
    cartItems?: CartItemCreateNestedManyWithoutUserInput;
    referralsGiven?: ReferralCreateNestedManyWithoutReferrerInput;
    referralsReceived?: ReferralCreateNestedManyWithoutReferredInput;
  };

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;
    cartItems?: CartItemUncheckedCreateNestedManyWithoutUserInput;
    referralsGiven?: ReferralUncheckedCreateNestedManyWithoutReferrerInput;
    referralsReceived?: ReferralUncheckedCreateNestedManyWithoutReferredInput;
  };

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
  };

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<
      UserUpdateWithoutAccountsInput,
      UserUncheckedUpdateWithoutAccountsInput
    >;
    create: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutAccountsInput,
      UserUncheckedUpdateWithoutAccountsInput
    >;
  };

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    orders?: OrderUpdateManyWithoutUserNestedInput;
    cartItems?: CartItemUpdateManyWithoutUserNestedInput;
    referralsGiven?: ReferralUpdateManyWithoutReferrerNestedInput;
    referralsReceived?: ReferralUpdateManyWithoutReferredNestedInput;
  };

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;
    cartItems?: CartItemUncheckedUpdateManyWithoutUserNestedInput;
    referralsGiven?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput;
    referralsReceived?: ReferralUncheckedUpdateManyWithoutReferredNestedInput;
  };

  export type UserCreateWithoutSessionsInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    orders?: OrderCreateNestedManyWithoutUserInput;
    cartItems?: CartItemCreateNestedManyWithoutUserInput;
    referralsGiven?: ReferralCreateNestedManyWithoutReferrerInput;
    referralsReceived?: ReferralCreateNestedManyWithoutReferredInput;
  };

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;
    cartItems?: CartItemUncheckedCreateNestedManyWithoutUserInput;
    referralsGiven?: ReferralUncheckedCreateNestedManyWithoutReferrerInput;
    referralsReceived?: ReferralUncheckedCreateNestedManyWithoutReferredInput;
  };

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
  };

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<
      UserUpdateWithoutSessionsInput,
      UserUncheckedUpdateWithoutSessionsInput
    >;
    create: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutSessionsInput,
      UserUncheckedUpdateWithoutSessionsInput
    >;
  };

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    orders?: OrderUpdateManyWithoutUserNestedInput;
    cartItems?: CartItemUpdateManyWithoutUserNestedInput;
    referralsGiven?: ReferralUpdateManyWithoutReferrerNestedInput;
    referralsReceived?: ReferralUpdateManyWithoutReferredNestedInput;
  };

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;
    cartItems?: CartItemUncheckedUpdateManyWithoutUserNestedInput;
    referralsGiven?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput;
    referralsReceived?: ReferralUncheckedUpdateManyWithoutReferredNestedInput;
  };

  export type CategoryCreateWithoutChildrenInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    isActive?: boolean;
    sortOrder?: number;
    seoTitle?: string | null;
    seoDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    parent?: CategoryCreateNestedOneWithoutChildrenInput;
    productCategories?: ProductCategoryCreateNestedManyWithoutCategoryInput;
  };

  export type CategoryUncheckedCreateWithoutChildrenInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    parentId?: string | null;
    isActive?: boolean;
    sortOrder?: number;
    seoTitle?: string | null;
    seoDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productCategories?: ProductCategoryUncheckedCreateNestedManyWithoutCategoryInput;
  };

  export type CategoryCreateOrConnectWithoutChildrenInput = {
    where: CategoryWhereUniqueInput;
    create: XOR<
      CategoryCreateWithoutChildrenInput,
      CategoryUncheckedCreateWithoutChildrenInput
    >;
  };

  export type CategoryCreateWithoutParentInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    isActive?: boolean;
    sortOrder?: number;
    seoTitle?: string | null;
    seoDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    children?: CategoryCreateNestedManyWithoutParentInput;
    productCategories?: ProductCategoryCreateNestedManyWithoutCategoryInput;
  };

  export type CategoryUncheckedCreateWithoutParentInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    isActive?: boolean;
    sortOrder?: number;
    seoTitle?: string | null;
    seoDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput;
    productCategories?: ProductCategoryUncheckedCreateNestedManyWithoutCategoryInput;
  };

  export type CategoryCreateOrConnectWithoutParentInput = {
    where: CategoryWhereUniqueInput;
    create: XOR<
      CategoryCreateWithoutParentInput,
      CategoryUncheckedCreateWithoutParentInput
    >;
  };

  export type CategoryCreateManyParentInputEnvelope = {
    data: CategoryCreateManyParentInput | CategoryCreateManyParentInput[];
    skipDuplicates?: boolean;
  };

  export type ProductCategoryCreateWithoutCategoryInput = {
    id?: string;
    createdAt?: Date | string;
    product: ProductCreateNestedOneWithoutProductCategoriesInput;
  };

  export type ProductCategoryUncheckedCreateWithoutCategoryInput = {
    id?: string;
    productId: string;
    createdAt?: Date | string;
  };

  export type ProductCategoryCreateOrConnectWithoutCategoryInput = {
    where: ProductCategoryWhereUniqueInput;
    create: XOR<
      ProductCategoryCreateWithoutCategoryInput,
      ProductCategoryUncheckedCreateWithoutCategoryInput
    >;
  };

  export type ProductCategoryCreateManyCategoryInputEnvelope = {
    data:
      | ProductCategoryCreateManyCategoryInput
      | ProductCategoryCreateManyCategoryInput[];
    skipDuplicates?: boolean;
  };

  export type CategoryUpsertWithoutChildrenInput = {
    update: XOR<
      CategoryUpdateWithoutChildrenInput,
      CategoryUncheckedUpdateWithoutChildrenInput
    >;
    create: XOR<
      CategoryCreateWithoutChildrenInput,
      CategoryUncheckedCreateWithoutChildrenInput
    >;
    where?: CategoryWhereInput;
  };

  export type CategoryUpdateToOneWithWhereWithoutChildrenInput = {
    where?: CategoryWhereInput;
    data: XOR<
      CategoryUpdateWithoutChildrenInput,
      CategoryUncheckedUpdateWithoutChildrenInput
    >;
  };

  export type CategoryUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: CategoryUpdateOneWithoutChildrenNestedInput;
    productCategories?: ProductCategoryUpdateManyWithoutCategoryNestedInput;
  };

  export type CategoryUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    parentId?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    productCategories?: ProductCategoryUncheckedUpdateManyWithoutCategoryNestedInput;
  };

  export type CategoryUpsertWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput;
    update: XOR<
      CategoryUpdateWithoutParentInput,
      CategoryUncheckedUpdateWithoutParentInput
    >;
    create: XOR<
      CategoryCreateWithoutParentInput,
      CategoryUncheckedCreateWithoutParentInput
    >;
  };

  export type CategoryUpdateWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput;
    data: XOR<
      CategoryUpdateWithoutParentInput,
      CategoryUncheckedUpdateWithoutParentInput
    >;
  };

  export type CategoryUpdateManyWithWhereWithoutParentInput = {
    where: CategoryScalarWhereInput;
    data: XOR<
      CategoryUpdateManyMutationInput,
      CategoryUncheckedUpdateManyWithoutParentInput
    >;
  };

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[];
    OR?: CategoryScalarWhereInput[];
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[];
    id?: StringFilter<"Category"> | string;
    name?: StringFilter<"Category"> | string;
    slug?: StringFilter<"Category"> | string;
    description?: StringNullableFilter<"Category"> | string | null;
    image?: StringNullableFilter<"Category"> | string | null;
    parentId?: StringNullableFilter<"Category"> | string | null;
    isActive?: BoolFilter<"Category"> | boolean;
    sortOrder?: IntFilter<"Category"> | number;
    seoTitle?: StringNullableFilter<"Category"> | string | null;
    seoDescription?: StringNullableFilter<"Category"> | string | null;
    createdAt?: DateTimeFilter<"Category"> | Date | string;
    updatedAt?: DateTimeFilter<"Category"> | Date | string;
  };

  export type ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductCategoryWhereUniqueInput;
    update: XOR<
      ProductCategoryUpdateWithoutCategoryInput,
      ProductCategoryUncheckedUpdateWithoutCategoryInput
    >;
    create: XOR<
      ProductCategoryCreateWithoutCategoryInput,
      ProductCategoryUncheckedCreateWithoutCategoryInput
    >;
  };

  export type ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductCategoryWhereUniqueInput;
    data: XOR<
      ProductCategoryUpdateWithoutCategoryInput,
      ProductCategoryUncheckedUpdateWithoutCategoryInput
    >;
  };

  export type ProductCategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductCategoryScalarWhereInput;
    data: XOR<
      ProductCategoryUpdateManyMutationInput,
      ProductCategoryUncheckedUpdateManyWithoutCategoryInput
    >;
  };

  export type ProductCategoryScalarWhereInput = {
    AND?: ProductCategoryScalarWhereInput | ProductCategoryScalarWhereInput[];
    OR?: ProductCategoryScalarWhereInput[];
    NOT?: ProductCategoryScalarWhereInput | ProductCategoryScalarWhereInput[];
    id?: StringFilter<"ProductCategory"> | string;
    productId?: StringFilter<"ProductCategory"> | string;
    categoryId?: StringFilter<"ProductCategory"> | string;
    createdAt?: DateTimeFilter<"ProductCategory"> | Date | string;
  };

  export type ProductVariantCreateWithoutProductInput = {
    id?: string;
    sku: string;
    name?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    compareAtPrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    attributes: JsonNullValueInput | InputJsonValue;
    weight?: Decimal | DecimalJsLike | number | string | null;
    barcode?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProductVariantUncheckedCreateWithoutProductInput = {
    id?: string;
    sku: string;
    name?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    compareAtPrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    attributes: JsonNullValueInput | InputJsonValue;
    weight?: Decimal | DecimalJsLike | number | string | null;
    barcode?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProductVariantCreateOrConnectWithoutProductInput = {
    where: ProductVariantWhereUniqueInput;
    create: XOR<
      ProductVariantCreateWithoutProductInput,
      ProductVariantUncheckedCreateWithoutProductInput
    >;
  };

  export type ProductVariantCreateManyProductInputEnvelope = {
    data:
      | ProductVariantCreateManyProductInput
      | ProductVariantCreateManyProductInput[];
    skipDuplicates?: boolean;
  };

  export type ProductImageCreateWithoutProductInput = {
    id?: string;
    url: string;
    altText?: string | null;
    caption?: string | null;
    width?: number | null;
    height?: number | null;
    size?: number | null;
    sortOrder?: number;
    imageType?: $Enums.ImageType;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProductImageUncheckedCreateWithoutProductInput = {
    id?: string;
    url: string;
    altText?: string | null;
    caption?: string | null;
    width?: number | null;
    height?: number | null;
    size?: number | null;
    sortOrder?: number;
    imageType?: $Enums.ImageType;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProductImageCreateOrConnectWithoutProductInput = {
    where: ProductImageWhereUniqueInput;
    create: XOR<
      ProductImageCreateWithoutProductInput,
      ProductImageUncheckedCreateWithoutProductInput
    >;
  };

  export type ProductImageCreateManyProductInputEnvelope = {
    data:
      | ProductImageCreateManyProductInput
      | ProductImageCreateManyProductInput[];
    skipDuplicates?: boolean;
  };

  export type ProductCategoryCreateWithoutProductInput = {
    id?: string;
    createdAt?: Date | string;
    category: CategoryCreateNestedOneWithoutProductCategoriesInput;
  };

  export type ProductCategoryUncheckedCreateWithoutProductInput = {
    id?: string;
    categoryId: string;
    createdAt?: Date | string;
  };

  export type ProductCategoryCreateOrConnectWithoutProductInput = {
    where: ProductCategoryWhereUniqueInput;
    create: XOR<
      ProductCategoryCreateWithoutProductInput,
      ProductCategoryUncheckedCreateWithoutProductInput
    >;
  };

  export type ProductCategoryCreateManyProductInputEnvelope = {
    data:
      | ProductCategoryCreateManyProductInput
      | ProductCategoryCreateManyProductInput[];
    skipDuplicates?: boolean;
  };

  export type CartItemCreateWithoutProductInput = {
    id?: string;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutCartItemsInput;
  };

  export type CartItemUncheckedCreateWithoutProductInput = {
    id?: string;
    userId: string;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CartItemCreateOrConnectWithoutProductInput = {
    where: CartItemWhereUniqueInput;
    create: XOR<
      CartItemCreateWithoutProductInput,
      CartItemUncheckedCreateWithoutProductInput
    >;
  };

  export type CartItemCreateManyProductInputEnvelope = {
    data: CartItemCreateManyProductInput | CartItemCreateManyProductInput[];
    skipDuplicates?: boolean;
  };

  export type OrderItemCreateWithoutProductInput = {
    id?: string;
    productName: string;
    productSku?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    order: OrderCreateNestedOneWithoutOrderItemsInput;
  };

  export type OrderItemUncheckedCreateWithoutProductInput = {
    id?: string;
    orderId: string;
    productName: string;
    productSku?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
  };

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput;
    create: XOR<
      OrderItemCreateWithoutProductInput,
      OrderItemUncheckedCreateWithoutProductInput
    >;
  };

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[];
    skipDuplicates?: boolean;
  };

  export type ProductVariantUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductVariantWhereUniqueInput;
    update: XOR<
      ProductVariantUpdateWithoutProductInput,
      ProductVariantUncheckedUpdateWithoutProductInput
    >;
    create: XOR<
      ProductVariantCreateWithoutProductInput,
      ProductVariantUncheckedCreateWithoutProductInput
    >;
  };

  export type ProductVariantUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductVariantWhereUniqueInput;
    data: XOR<
      ProductVariantUpdateWithoutProductInput,
      ProductVariantUncheckedUpdateWithoutProductInput
    >;
  };

  export type ProductVariantUpdateManyWithWhereWithoutProductInput = {
    where: ProductVariantScalarWhereInput;
    data: XOR<
      ProductVariantUpdateManyMutationInput,
      ProductVariantUncheckedUpdateManyWithoutProductInput
    >;
  };

  export type ProductVariantScalarWhereInput = {
    AND?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[];
    OR?: ProductVariantScalarWhereInput[];
    NOT?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[];
    id?: StringFilter<"ProductVariant"> | string;
    productId?: StringFilter<"ProductVariant"> | string;
    sku?: StringFilter<"ProductVariant"> | string;
    name?: StringNullableFilter<"ProductVariant"> | string | null;
    price?:
      | DecimalFilter<"ProductVariant">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    compareAtPrice?:
      | DecimalNullableFilter<"ProductVariant">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | DecimalNullableFilter<"ProductVariant">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFilter<"ProductVariant"> | number;
    attributes?: JsonFilter<"ProductVariant">;
    weight?:
      | DecimalNullableFilter<"ProductVariant">
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    barcode?: StringNullableFilter<"ProductVariant"> | string | null;
    isActive?: BoolFilter<"ProductVariant"> | boolean;
    createdAt?: DateTimeFilter<"ProductVariant"> | Date | string;
    updatedAt?: DateTimeFilter<"ProductVariant"> | Date | string;
  };

  export type ProductImageUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput;
    update: XOR<
      ProductImageUpdateWithoutProductInput,
      ProductImageUncheckedUpdateWithoutProductInput
    >;
    create: XOR<
      ProductImageCreateWithoutProductInput,
      ProductImageUncheckedCreateWithoutProductInput
    >;
  };

  export type ProductImageUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput;
    data: XOR<
      ProductImageUpdateWithoutProductInput,
      ProductImageUncheckedUpdateWithoutProductInput
    >;
  };

  export type ProductImageUpdateManyWithWhereWithoutProductInput = {
    where: ProductImageScalarWhereInput;
    data: XOR<
      ProductImageUpdateManyMutationInput,
      ProductImageUncheckedUpdateManyWithoutProductInput
    >;
  };

  export type ProductImageScalarWhereInput = {
    AND?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[];
    OR?: ProductImageScalarWhereInput[];
    NOT?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[];
    id?: StringFilter<"ProductImage"> | string;
    productId?: StringFilter<"ProductImage"> | string;
    url?: StringFilter<"ProductImage"> | string;
    altText?: StringNullableFilter<"ProductImage"> | string | null;
    caption?: StringNullableFilter<"ProductImage"> | string | null;
    width?: IntNullableFilter<"ProductImage"> | number | null;
    height?: IntNullableFilter<"ProductImage"> | number | null;
    size?: IntNullableFilter<"ProductImage"> | number | null;
    sortOrder?: IntFilter<"ProductImage"> | number;
    imageType?: EnumImageTypeFilter<"ProductImage"> | $Enums.ImageType;
    isActive?: BoolFilter<"ProductImage"> | boolean;
    createdAt?: DateTimeFilter<"ProductImage"> | Date | string;
    updatedAt?: DateTimeFilter<"ProductImage"> | Date | string;
  };

  export type ProductCategoryUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductCategoryWhereUniqueInput;
    update: XOR<
      ProductCategoryUpdateWithoutProductInput,
      ProductCategoryUncheckedUpdateWithoutProductInput
    >;
    create: XOR<
      ProductCategoryCreateWithoutProductInput,
      ProductCategoryUncheckedCreateWithoutProductInput
    >;
  };

  export type ProductCategoryUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductCategoryWhereUniqueInput;
    data: XOR<
      ProductCategoryUpdateWithoutProductInput,
      ProductCategoryUncheckedUpdateWithoutProductInput
    >;
  };

  export type ProductCategoryUpdateManyWithWhereWithoutProductInput = {
    where: ProductCategoryScalarWhereInput;
    data: XOR<
      ProductCategoryUpdateManyMutationInput,
      ProductCategoryUncheckedUpdateManyWithoutProductInput
    >;
  };

  export type CartItemUpsertWithWhereUniqueWithoutProductInput = {
    where: CartItemWhereUniqueInput;
    update: XOR<
      CartItemUpdateWithoutProductInput,
      CartItemUncheckedUpdateWithoutProductInput
    >;
    create: XOR<
      CartItemCreateWithoutProductInput,
      CartItemUncheckedCreateWithoutProductInput
    >;
  };

  export type CartItemUpdateWithWhereUniqueWithoutProductInput = {
    where: CartItemWhereUniqueInput;
    data: XOR<
      CartItemUpdateWithoutProductInput,
      CartItemUncheckedUpdateWithoutProductInput
    >;
  };

  export type CartItemUpdateManyWithWhereWithoutProductInput = {
    where: CartItemScalarWhereInput;
    data: XOR<
      CartItemUpdateManyMutationInput,
      CartItemUncheckedUpdateManyWithoutProductInput
    >;
  };

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput;
    update: XOR<
      OrderItemUpdateWithoutProductInput,
      OrderItemUncheckedUpdateWithoutProductInput
    >;
    create: XOR<
      OrderItemCreateWithoutProductInput,
      OrderItemUncheckedCreateWithoutProductInput
    >;
  };

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput;
    data: XOR<
      OrderItemUpdateWithoutProductInput,
      OrderItemUncheckedUpdateWithoutProductInput
    >;
  };

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput;
    data: XOR<
      OrderItemUpdateManyMutationInput,
      OrderItemUncheckedUpdateManyWithoutProductInput
    >;
  };

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
    OR?: OrderItemScalarWhereInput[];
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
    id?: StringFilter<"OrderItem"> | string;
    orderId?: StringFilter<"OrderItem"> | string;
    productId?: StringFilter<"OrderItem"> | string;
    productName?: StringFilter<"OrderItem"> | string;
    productSku?: StringNullableFilter<"OrderItem"> | string | null;
    quantity?: IntFilter<"OrderItem"> | number;
    unitPrice?:
      | DecimalFilter<"OrderItem">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalFilter<"OrderItem">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string;
  };

  export type ProductCreateWithoutVariantsInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    sku?: string | null;
    basePrice: Decimal | DecimalJsLike | number | string;
    salePrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: Decimal | DecimalJsLike | number | string | null;
    dimensions?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    tags?: ProductCreatetagsInput | string[];
    status?: $Enums.ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    images?: ProductImageCreateNestedManyWithoutProductInput;
    productCategories?: ProductCategoryCreateNestedManyWithoutProductInput;
    cartItems?: CartItemCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateWithoutVariantsInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    sku?: string | null;
    basePrice: Decimal | DecimalJsLike | number | string;
    salePrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: Decimal | DecimalJsLike | number | string | null;
    dimensions?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    tags?: ProductCreatetagsInput | string[];
    status?: $Enums.ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput;
    productCategories?: ProductCategoryUncheckedCreateNestedManyWithoutProductInput;
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductCreateOrConnectWithoutVariantsInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutVariantsInput,
      ProductUncheckedCreateWithoutVariantsInput
    >;
  };

  export type ProductUpsertWithoutVariantsInput = {
    update: XOR<
      ProductUpdateWithoutVariantsInput,
      ProductUncheckedUpdateWithoutVariantsInput
    >;
    create: XOR<
      ProductCreateWithoutVariantsInput,
      ProductUncheckedCreateWithoutVariantsInput
    >;
    where?: ProductWhereInput;
  };

  export type ProductUpdateToOneWithWhereWithoutVariantsInput = {
    where?: ProductWhereInput;
    data: XOR<
      ProductUpdateWithoutVariantsInput,
      ProductUncheckedUpdateWithoutVariantsInput
    >;
  };

  export type ProductUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    images?: ProductImageUpdateManyWithoutProductNestedInput;
    productCategories?: ProductCategoryUpdateManyWithoutProductNestedInput;
    cartItems?: CartItemUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput;
    productCategories?: ProductCategoryUncheckedUpdateManyWithoutProductNestedInput;
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type ProductCreateWithoutImagesInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    sku?: string | null;
    basePrice: Decimal | DecimalJsLike | number | string;
    salePrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: Decimal | DecimalJsLike | number | string | null;
    dimensions?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    tags?: ProductCreatetagsInput | string[];
    status?: $Enums.ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    variants?: ProductVariantCreateNestedManyWithoutProductInput;
    productCategories?: ProductCategoryCreateNestedManyWithoutProductInput;
    cartItems?: CartItemCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateWithoutImagesInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    sku?: string | null;
    basePrice: Decimal | DecimalJsLike | number | string;
    salePrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: Decimal | DecimalJsLike | number | string | null;
    dimensions?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    tags?: ProductCreatetagsInput | string[];
    status?: $Enums.ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput;
    productCategories?: ProductCategoryUncheckedCreateNestedManyWithoutProductInput;
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductCreateOrConnectWithoutImagesInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutImagesInput,
      ProductUncheckedCreateWithoutImagesInput
    >;
  };

  export type ProductUpsertWithoutImagesInput = {
    update: XOR<
      ProductUpdateWithoutImagesInput,
      ProductUncheckedUpdateWithoutImagesInput
    >;
    create: XOR<
      ProductCreateWithoutImagesInput,
      ProductUncheckedCreateWithoutImagesInput
    >;
    where?: ProductWhereInput;
  };

  export type ProductUpdateToOneWithWhereWithoutImagesInput = {
    where?: ProductWhereInput;
    data: XOR<
      ProductUpdateWithoutImagesInput,
      ProductUncheckedUpdateWithoutImagesInput
    >;
  };

  export type ProductUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    variants?: ProductVariantUpdateManyWithoutProductNestedInput;
    productCategories?: ProductCategoryUpdateManyWithoutProductNestedInput;
    cartItems?: CartItemUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput;
    productCategories?: ProductCategoryUncheckedUpdateManyWithoutProductNestedInput;
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type ProductCreateWithoutProductCategoriesInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    sku?: string | null;
    basePrice: Decimal | DecimalJsLike | number | string;
    salePrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: Decimal | DecimalJsLike | number | string | null;
    dimensions?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    tags?: ProductCreatetagsInput | string[];
    status?: $Enums.ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    variants?: ProductVariantCreateNestedManyWithoutProductInput;
    images?: ProductImageCreateNestedManyWithoutProductInput;
    cartItems?: CartItemCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateWithoutProductCategoriesInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    sku?: string | null;
    basePrice: Decimal | DecimalJsLike | number | string;
    salePrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: Decimal | DecimalJsLike | number | string | null;
    dimensions?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    tags?: ProductCreatetagsInput | string[];
    status?: $Enums.ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput;
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput;
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductCreateOrConnectWithoutProductCategoriesInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutProductCategoriesInput,
      ProductUncheckedCreateWithoutProductCategoriesInput
    >;
  };

  export type CategoryCreateWithoutProductCategoriesInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    isActive?: boolean;
    sortOrder?: number;
    seoTitle?: string | null;
    seoDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    parent?: CategoryCreateNestedOneWithoutChildrenInput;
    children?: CategoryCreateNestedManyWithoutParentInput;
  };

  export type CategoryUncheckedCreateWithoutProductCategoriesInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    parentId?: string | null;
    isActive?: boolean;
    sortOrder?: number;
    seoTitle?: string | null;
    seoDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput;
  };

  export type CategoryCreateOrConnectWithoutProductCategoriesInput = {
    where: CategoryWhereUniqueInput;
    create: XOR<
      CategoryCreateWithoutProductCategoriesInput,
      CategoryUncheckedCreateWithoutProductCategoriesInput
    >;
  };

  export type ProductUpsertWithoutProductCategoriesInput = {
    update: XOR<
      ProductUpdateWithoutProductCategoriesInput,
      ProductUncheckedUpdateWithoutProductCategoriesInput
    >;
    create: XOR<
      ProductCreateWithoutProductCategoriesInput,
      ProductUncheckedCreateWithoutProductCategoriesInput
    >;
    where?: ProductWhereInput;
  };

  export type ProductUpdateToOneWithWhereWithoutProductCategoriesInput = {
    where?: ProductWhereInput;
    data: XOR<
      ProductUpdateWithoutProductCategoriesInput,
      ProductUncheckedUpdateWithoutProductCategoriesInput
    >;
  };

  export type ProductUpdateWithoutProductCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    variants?: ProductVariantUpdateManyWithoutProductNestedInput;
    images?: ProductImageUpdateManyWithoutProductNestedInput;
    cartItems?: CartItemUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateWithoutProductCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput;
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput;
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type CategoryUpsertWithoutProductCategoriesInput = {
    update: XOR<
      CategoryUpdateWithoutProductCategoriesInput,
      CategoryUncheckedUpdateWithoutProductCategoriesInput
    >;
    create: XOR<
      CategoryCreateWithoutProductCategoriesInput,
      CategoryUncheckedCreateWithoutProductCategoriesInput
    >;
    where?: CategoryWhereInput;
  };

  export type CategoryUpdateToOneWithWhereWithoutProductCategoriesInput = {
    where?: CategoryWhereInput;
    data: XOR<
      CategoryUpdateWithoutProductCategoriesInput,
      CategoryUncheckedUpdateWithoutProductCategoriesInput
    >;
  };

  export type CategoryUpdateWithoutProductCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: CategoryUpdateOneWithoutChildrenNestedInput;
    children?: CategoryUpdateManyWithoutParentNestedInput;
  };

  export type CategoryUncheckedUpdateWithoutProductCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    parentId?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput;
  };

  export type UserCreateWithoutCartItemsInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    orders?: OrderCreateNestedManyWithoutUserInput;
    referralsGiven?: ReferralCreateNestedManyWithoutReferrerInput;
    referralsReceived?: ReferralCreateNestedManyWithoutReferredInput;
  };

  export type UserUncheckedCreateWithoutCartItemsInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;
    referralsGiven?: ReferralUncheckedCreateNestedManyWithoutReferrerInput;
    referralsReceived?: ReferralUncheckedCreateNestedManyWithoutReferredInput;
  };

  export type UserCreateOrConnectWithoutCartItemsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutCartItemsInput,
      UserUncheckedCreateWithoutCartItemsInput
    >;
  };

  export type ProductCreateWithoutCartItemsInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    sku?: string | null;
    basePrice: Decimal | DecimalJsLike | number | string;
    salePrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: Decimal | DecimalJsLike | number | string | null;
    dimensions?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    tags?: ProductCreatetagsInput | string[];
    status?: $Enums.ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    variants?: ProductVariantCreateNestedManyWithoutProductInput;
    images?: ProductImageCreateNestedManyWithoutProductInput;
    productCategories?: ProductCategoryCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateWithoutCartItemsInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    sku?: string | null;
    basePrice: Decimal | DecimalJsLike | number | string;
    salePrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: Decimal | DecimalJsLike | number | string | null;
    dimensions?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    tags?: ProductCreatetagsInput | string[];
    status?: $Enums.ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput;
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput;
    productCategories?: ProductCategoryUncheckedCreateNestedManyWithoutProductInput;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductCreateOrConnectWithoutCartItemsInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutCartItemsInput,
      ProductUncheckedCreateWithoutCartItemsInput
    >;
  };

  export type UserUpsertWithoutCartItemsInput = {
    update: XOR<
      UserUpdateWithoutCartItemsInput,
      UserUncheckedUpdateWithoutCartItemsInput
    >;
    create: XOR<
      UserCreateWithoutCartItemsInput,
      UserUncheckedCreateWithoutCartItemsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutCartItemsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutCartItemsInput,
      UserUncheckedUpdateWithoutCartItemsInput
    >;
  };

  export type UserUpdateWithoutCartItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    orders?: OrderUpdateManyWithoutUserNestedInput;
    referralsGiven?: ReferralUpdateManyWithoutReferrerNestedInput;
    referralsReceived?: ReferralUpdateManyWithoutReferredNestedInput;
  };

  export type UserUncheckedUpdateWithoutCartItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;
    referralsGiven?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput;
    referralsReceived?: ReferralUncheckedUpdateManyWithoutReferredNestedInput;
  };

  export type ProductUpsertWithoutCartItemsInput = {
    update: XOR<
      ProductUpdateWithoutCartItemsInput,
      ProductUncheckedUpdateWithoutCartItemsInput
    >;
    create: XOR<
      ProductCreateWithoutCartItemsInput,
      ProductUncheckedCreateWithoutCartItemsInput
    >;
    where?: ProductWhereInput;
  };

  export type ProductUpdateToOneWithWhereWithoutCartItemsInput = {
    where?: ProductWhereInput;
    data: XOR<
      ProductUpdateWithoutCartItemsInput,
      ProductUncheckedUpdateWithoutCartItemsInput
    >;
  };

  export type ProductUpdateWithoutCartItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    variants?: ProductVariantUpdateManyWithoutProductNestedInput;
    images?: ProductImageUpdateManyWithoutProductNestedInput;
    productCategories?: ProductCategoryUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateWithoutCartItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput;
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput;
    productCategories?: ProductCategoryUncheckedUpdateManyWithoutProductNestedInput;
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type UserCreateWithoutOrdersInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    cartItems?: CartItemCreateNestedManyWithoutUserInput;
    referralsGiven?: ReferralCreateNestedManyWithoutReferrerInput;
    referralsReceived?: ReferralCreateNestedManyWithoutReferredInput;
  };

  export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    cartItems?: CartItemUncheckedCreateNestedManyWithoutUserInput;
    referralsGiven?: ReferralUncheckedCreateNestedManyWithoutReferrerInput;
    referralsReceived?: ReferralUncheckedCreateNestedManyWithoutReferredInput;
  };

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutOrdersInput,
      UserUncheckedCreateWithoutOrdersInput
    >;
  };

  export type OrderItemCreateWithoutOrderInput = {
    id?: string;
    productName: string;
    productSku?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    product: ProductCreateNestedOneWithoutOrderItemsInput;
  };

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string;
    productId: string;
    productName: string;
    productSku?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
  };

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput;
    create: XOR<
      OrderItemCreateWithoutOrderInput,
      OrderItemUncheckedCreateWithoutOrderInput
    >;
  };

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<
      UserUpdateWithoutOrdersInput,
      UserUncheckedUpdateWithoutOrdersInput
    >;
    create: XOR<
      UserCreateWithoutOrdersInput,
      UserUncheckedCreateWithoutOrdersInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutOrdersInput,
      UserUncheckedUpdateWithoutOrdersInput
    >;
  };

  export type UserUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    cartItems?: CartItemUpdateManyWithoutUserNestedInput;
    referralsGiven?: ReferralUpdateManyWithoutReferrerNestedInput;
    referralsReceived?: ReferralUpdateManyWithoutReferredNestedInput;
  };

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    cartItems?: CartItemUncheckedUpdateManyWithoutUserNestedInput;
    referralsGiven?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput;
    referralsReceived?: ReferralUncheckedUpdateManyWithoutReferredNestedInput;
  };

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput;
    update: XOR<
      OrderItemUpdateWithoutOrderInput,
      OrderItemUncheckedUpdateWithoutOrderInput
    >;
    create: XOR<
      OrderItemCreateWithoutOrderInput,
      OrderItemUncheckedCreateWithoutOrderInput
    >;
  };

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput;
    data: XOR<
      OrderItemUpdateWithoutOrderInput,
      OrderItemUncheckedUpdateWithoutOrderInput
    >;
  };

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput;
    data: XOR<
      OrderItemUpdateManyMutationInput,
      OrderItemUncheckedUpdateManyWithoutOrderInput
    >;
  };

  export type OrderCreateWithoutOrderItemsInput = {
    id?: string;
    orderNumber: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    taxAmount?: Decimal | DecimalJsLike | number | string;
    shippingCost?: Decimal | DecimalJsLike | number | string;
    discountAmount?: Decimal | DecimalJsLike | number | string;
    totalAmount: Decimal | DecimalJsLike | number | string;
    status?: $Enums.OrderStatus;
    paymentStatus?: $Enums.PaymentStatus;
    customerEmail: string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress: JsonNullValueInput | InputJsonValue;
    paymentMethod?: string | null;
    paymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutOrdersInput;
  };

  export type OrderUncheckedCreateWithoutOrderItemsInput = {
    id?: string;
    userId: string;
    orderNumber: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    taxAmount?: Decimal | DecimalJsLike | number | string;
    shippingCost?: Decimal | DecimalJsLike | number | string;
    discountAmount?: Decimal | DecimalJsLike | number | string;
    totalAmount: Decimal | DecimalJsLike | number | string;
    status?: $Enums.OrderStatus;
    paymentStatus?: $Enums.PaymentStatus;
    customerEmail: string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress: JsonNullValueInput | InputJsonValue;
    paymentMethod?: string | null;
    paymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type OrderCreateOrConnectWithoutOrderItemsInput = {
    where: OrderWhereUniqueInput;
    create: XOR<
      OrderCreateWithoutOrderItemsInput,
      OrderUncheckedCreateWithoutOrderItemsInput
    >;
  };

  export type ProductCreateWithoutOrderItemsInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    sku?: string | null;
    basePrice: Decimal | DecimalJsLike | number | string;
    salePrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: Decimal | DecimalJsLike | number | string | null;
    dimensions?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    tags?: ProductCreatetagsInput | string[];
    status?: $Enums.ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    variants?: ProductVariantCreateNestedManyWithoutProductInput;
    images?: ProductImageCreateNestedManyWithoutProductInput;
    productCategories?: ProductCategoryCreateNestedManyWithoutProductInput;
    cartItems?: CartItemCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateWithoutOrderItemsInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    shortDescription?: string | null;
    sku?: string | null;
    basePrice: Decimal | DecimalJsLike | number | string;
    salePrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
    weight?: Decimal | DecimalJsLike | number | string | null;
    dimensions?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    tags?: ProductCreatetagsInput | string[];
    status?: $Enums.ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput;
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput;
    productCategories?: ProductCategoryUncheckedCreateNestedManyWithoutProductInput;
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
  };

  export type OrderUpsertWithoutOrderItemsInput = {
    update: XOR<
      OrderUpdateWithoutOrderItemsInput,
      OrderUncheckedUpdateWithoutOrderItemsInput
    >;
    create: XOR<
      OrderCreateWithoutOrderItemsInput,
      OrderUncheckedCreateWithoutOrderItemsInput
    >;
    where?: OrderWhereInput;
  };

  export type OrderUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: OrderWhereInput;
    data: XOR<
      OrderUpdateWithoutOrderItemsInput,
      OrderUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type OrderUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    subtotal?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    taxAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingCost?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    discountAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    customerEmail?: StringFieldUpdateOperationsInput | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: JsonNullValueInput | InputJsonValue;
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput;
  };

  export type OrderUncheckedUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    subtotal?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    taxAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingCost?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    discountAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    customerEmail?: StringFieldUpdateOperationsInput | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: JsonNullValueInput | InputJsonValue;
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductUpsertWithoutOrderItemsInput = {
    update: XOR<
      ProductUpdateWithoutOrderItemsInput,
      ProductUncheckedUpdateWithoutOrderItemsInput
    >;
    create: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
    where?: ProductWhereInput;
  };

  export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductWhereInput;
    data: XOR<
      ProductUpdateWithoutOrderItemsInput,
      ProductUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type ProductUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    variants?: ProductVariantUpdateManyWithoutProductNestedInput;
    images?: ProductImageUpdateManyWithoutProductNestedInput;
    productCategories?: ProductCategoryUpdateManyWithoutProductNestedInput;
    cartItems?: CartItemUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    shortDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: NullableStringFieldUpdateOperationsInput | string | null;
    basePrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    salePrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    lowStockThreshold?: IntFieldUpdateOperationsInput | number;
    trackInventory?: BoolFieldUpdateOperationsInput | boolean;
    allowBackorder?: BoolFieldUpdateOperationsInput | boolean;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    dimensions?: NullableStringFieldUpdateOperationsInput | string | null;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    tags?: ProductUpdatetagsInput | string[];
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: BoolFieldUpdateOperationsInput | boolean;
    publishedAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput;
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput;
    productCategories?: ProductCategoryUncheckedUpdateManyWithoutProductNestedInput;
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type UserCreateWithoutReferralsGivenInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    orders?: OrderCreateNestedManyWithoutUserInput;
    cartItems?: CartItemCreateNestedManyWithoutUserInput;
    referralsReceived?: ReferralCreateNestedManyWithoutReferredInput;
  };

  export type UserUncheckedCreateWithoutReferralsGivenInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;
    cartItems?: CartItemUncheckedCreateNestedManyWithoutUserInput;
    referralsReceived?: ReferralUncheckedCreateNestedManyWithoutReferredInput;
  };

  export type UserCreateOrConnectWithoutReferralsGivenInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutReferralsGivenInput,
      UserUncheckedCreateWithoutReferralsGivenInput
    >;
  };

  export type UserCreateWithoutReferralsReceivedInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    orders?: OrderCreateNestedManyWithoutUserInput;
    cartItems?: CartItemCreateNestedManyWithoutUserInput;
    referralsGiven?: ReferralCreateNestedManyWithoutReferrerInput;
  };

  export type UserUncheckedCreateWithoutReferralsReceivedInput = {
    id?: string;
    email: string;
    emailVerified?: Date | string | null;
    name?: string | null;
    image?: string | null;
    password?: string | null;
    role?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;
    cartItems?: CartItemUncheckedCreateNestedManyWithoutUserInput;
    referralsGiven?: ReferralUncheckedCreateNestedManyWithoutReferrerInput;
  };

  export type UserCreateOrConnectWithoutReferralsReceivedInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutReferralsReceivedInput,
      UserUncheckedCreateWithoutReferralsReceivedInput
    >;
  };

  export type UserUpsertWithoutReferralsGivenInput = {
    update: XOR<
      UserUpdateWithoutReferralsGivenInput,
      UserUncheckedUpdateWithoutReferralsGivenInput
    >;
    create: XOR<
      UserCreateWithoutReferralsGivenInput,
      UserUncheckedCreateWithoutReferralsGivenInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutReferralsGivenInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutReferralsGivenInput,
      UserUncheckedUpdateWithoutReferralsGivenInput
    >;
  };

  export type UserUpdateWithoutReferralsGivenInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    orders?: OrderUpdateManyWithoutUserNestedInput;
    cartItems?: CartItemUpdateManyWithoutUserNestedInput;
    referralsReceived?: ReferralUpdateManyWithoutReferredNestedInput;
  };

  export type UserUncheckedUpdateWithoutReferralsGivenInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;
    cartItems?: CartItemUncheckedUpdateManyWithoutUserNestedInput;
    referralsReceived?: ReferralUncheckedUpdateManyWithoutReferredNestedInput;
  };

  export type UserUpsertWithoutReferralsReceivedInput = {
    update: XOR<
      UserUpdateWithoutReferralsReceivedInput,
      UserUncheckedUpdateWithoutReferralsReceivedInput
    >;
    create: XOR<
      UserCreateWithoutReferralsReceivedInput,
      UserUncheckedCreateWithoutReferralsReceivedInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutReferralsReceivedInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutReferralsReceivedInput,
      UserUncheckedUpdateWithoutReferralsReceivedInput
    >;
  };

  export type UserUpdateWithoutReferralsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    orders?: OrderUpdateManyWithoutUserNestedInput;
    cartItems?: CartItemUpdateManyWithoutUserNestedInput;
    referralsGiven?: ReferralUpdateManyWithoutReferrerNestedInput;
  };

  export type UserUncheckedUpdateWithoutReferralsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;
    cartItems?: CartItemUncheckedUpdateManyWithoutUserNestedInput;
    referralsGiven?: ReferralUncheckedUpdateManyWithoutReferrerNestedInput;
  };

  export type AccountCreateManyUserInput = {
    id?: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SessionCreateManyUserInput = {
    id?: string;
    sessionToken: string;
    expires: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type OrderCreateManyUserInput = {
    id?: string;
    orderNumber: string;
    subtotal: Decimal | DecimalJsLike | number | string;
    taxAmount?: Decimal | DecimalJsLike | number | string;
    shippingCost?: Decimal | DecimalJsLike | number | string;
    discountAmount?: Decimal | DecimalJsLike | number | string;
    totalAmount: Decimal | DecimalJsLike | number | string;
    status?: $Enums.OrderStatus;
    paymentStatus?: $Enums.PaymentStatus;
    customerEmail: string;
    shippingAddress: JsonNullValueInput | InputJsonValue;
    billingAddress: JsonNullValueInput | InputJsonValue;
    paymentMethod?: string | null;
    paymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CartItemCreateManyUserInput = {
    id?: string;
    productId: string;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ReferralCreateManyReferrerInput = {
    id?: string;
    referredId?: string | null;
    referralCode: string;
    email?: string | null;
    status?: $Enums.ReferralStatus;
    commissionRate?: Decimal | DecimalJsLike | number | string;
    commissionEarned?: Decimal | DecimalJsLike | number | string;
    clickCount?: number;
    conversionAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ReferralCreateManyReferredInput = {
    id?: string;
    referrerId: string;
    referralCode: string;
    email?: string | null;
    status?: $Enums.ReferralStatus;
    commissionRate?: Decimal | DecimalJsLike | number | string;
    commissionEarned?: Decimal | DecimalJsLike | number | string;
    clickCount?: number;
    conversionAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    subtotal?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    taxAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingCost?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    discountAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    customerEmail?: StringFieldUpdateOperationsInput | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: JsonNullValueInput | InputJsonValue;
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orderItems?: OrderItemUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    subtotal?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    taxAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingCost?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    discountAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    customerEmail?: StringFieldUpdateOperationsInput | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: JsonNullValueInput | InputJsonValue;
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orderItems?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    subtotal?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    taxAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingCost?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    discountAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    paymentStatus?:
      | EnumPaymentStatusFieldUpdateOperationsInput
      | $Enums.PaymentStatus;
    customerEmail?: StringFieldUpdateOperationsInput | string;
    shippingAddress?: JsonNullValueInput | InputJsonValue;
    billingAddress?: JsonNullValueInput | InputJsonValue;
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null;
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CartItemUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    product?: ProductUpdateOneRequiredWithoutCartItemsNestedInput;
  };

  export type CartItemUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CartItemUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ReferralUpdateWithoutReferrerInput = {
    id?: StringFieldUpdateOperationsInput | string;
    referralCode?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumReferralStatusFieldUpdateOperationsInput
      | $Enums.ReferralStatus;
    commissionRate?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    commissionEarned?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    clickCount?: IntFieldUpdateOperationsInput | number;
    conversionAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    referred?: UserUpdateOneWithoutReferralsReceivedNestedInput;
  };

  export type ReferralUncheckedUpdateWithoutReferrerInput = {
    id?: StringFieldUpdateOperationsInput | string;
    referredId?: NullableStringFieldUpdateOperationsInput | string | null;
    referralCode?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumReferralStatusFieldUpdateOperationsInput
      | $Enums.ReferralStatus;
    commissionRate?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    commissionEarned?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    clickCount?: IntFieldUpdateOperationsInput | number;
    conversionAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ReferralUncheckedUpdateManyWithoutReferrerInput = {
    id?: StringFieldUpdateOperationsInput | string;
    referredId?: NullableStringFieldUpdateOperationsInput | string | null;
    referralCode?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumReferralStatusFieldUpdateOperationsInput
      | $Enums.ReferralStatus;
    commissionRate?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    commissionEarned?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    clickCount?: IntFieldUpdateOperationsInput | number;
    conversionAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ReferralUpdateWithoutReferredInput = {
    id?: StringFieldUpdateOperationsInput | string;
    referralCode?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumReferralStatusFieldUpdateOperationsInput
      | $Enums.ReferralStatus;
    commissionRate?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    commissionEarned?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    clickCount?: IntFieldUpdateOperationsInput | number;
    conversionAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    referrer?: UserUpdateOneRequiredWithoutReferralsGivenNestedInput;
  };

  export type ReferralUncheckedUpdateWithoutReferredInput = {
    id?: StringFieldUpdateOperationsInput | string;
    referrerId?: StringFieldUpdateOperationsInput | string;
    referralCode?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumReferralStatusFieldUpdateOperationsInput
      | $Enums.ReferralStatus;
    commissionRate?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    commissionEarned?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    clickCount?: IntFieldUpdateOperationsInput | number;
    conversionAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ReferralUncheckedUpdateManyWithoutReferredInput = {
    id?: StringFieldUpdateOperationsInput | string;
    referrerId?: StringFieldUpdateOperationsInput | string;
    referralCode?: StringFieldUpdateOperationsInput | string;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    status?:
      | EnumReferralStatusFieldUpdateOperationsInput
      | $Enums.ReferralStatus;
    commissionRate?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    commissionEarned?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    clickCount?: IntFieldUpdateOperationsInput | number;
    conversionAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CategoryCreateManyParentInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    isActive?: boolean;
    sortOrder?: number;
    seoTitle?: string | null;
    seoDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProductCategoryCreateManyCategoryInput = {
    id?: string;
    productId: string;
    createdAt?: Date | string;
  };

  export type CategoryUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    children?: CategoryUpdateManyWithoutParentNestedInput;
    productCategories?: ProductCategoryUpdateManyWithoutCategoryNestedInput;
  };

  export type CategoryUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput;
    productCategories?: ProductCategoryUncheckedUpdateManyWithoutCategoryNestedInput;
  };

  export type CategoryUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null;
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductCategoryUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    product?: ProductUpdateOneRequiredWithoutProductCategoriesNestedInput;
  };

  export type ProductCategoryUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductCategoryUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductVariantCreateManyProductInput = {
    id?: string;
    sku: string;
    name?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    compareAtPrice?: Decimal | DecimalJsLike | number | string | null;
    costPrice?: Decimal | DecimalJsLike | number | string | null;
    stockQuantity?: number;
    attributes: JsonNullValueInput | InputJsonValue;
    weight?: Decimal | DecimalJsLike | number | string | null;
    barcode?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProductImageCreateManyProductInput = {
    id?: string;
    url: string;
    altText?: string | null;
    caption?: string | null;
    width?: number | null;
    height?: number | null;
    size?: number | null;
    sortOrder?: number;
    imageType?: $Enums.ImageType;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ProductCategoryCreateManyProductInput = {
    id?: string;
    categoryId: string;
    createdAt?: Date | string;
  };

  export type CartItemCreateManyProductInput = {
    id?: string;
    userId: string;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type OrderItemCreateManyProductInput = {
    id?: string;
    orderId: string;
    productName: string;
    productSku?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
  };

  export type ProductVariantUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sku?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    compareAtPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    attributes?: JsonNullValueInput | InputJsonValue;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    barcode?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductVariantUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sku?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    compareAtPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    attributes?: JsonNullValueInput | InputJsonValue;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    barcode?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductVariantUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sku?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    compareAtPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    costPrice?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stockQuantity?: IntFieldUpdateOperationsInput | number;
    attributes?: JsonNullValueInput | InputJsonValue;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    barcode?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductImageUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    url?: StringFieldUpdateOperationsInput | string;
    altText?: NullableStringFieldUpdateOperationsInput | string | null;
    caption?: NullableStringFieldUpdateOperationsInput | string | null;
    width?: NullableIntFieldUpdateOperationsInput | number | null;
    height?: NullableIntFieldUpdateOperationsInput | number | null;
    size?: NullableIntFieldUpdateOperationsInput | number | null;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    imageType?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductImageUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    url?: StringFieldUpdateOperationsInput | string;
    altText?: NullableStringFieldUpdateOperationsInput | string | null;
    caption?: NullableStringFieldUpdateOperationsInput | string | null;
    width?: NullableIntFieldUpdateOperationsInput | number | null;
    height?: NullableIntFieldUpdateOperationsInput | number | null;
    size?: NullableIntFieldUpdateOperationsInput | number | null;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    imageType?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductImageUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    url?: StringFieldUpdateOperationsInput | string;
    altText?: NullableStringFieldUpdateOperationsInput | string | null;
    caption?: NullableStringFieldUpdateOperationsInput | string | null;
    width?: NullableIntFieldUpdateOperationsInput | number | null;
    height?: NullableIntFieldUpdateOperationsInput | number | null;
    size?: NullableIntFieldUpdateOperationsInput | number | null;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    imageType?: EnumImageTypeFieldUpdateOperationsInput | $Enums.ImageType;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductCategoryUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    category?: CategoryUpdateOneRequiredWithoutProductCategoriesNestedInput;
  };

  export type ProductCategoryUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    categoryId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductCategoryUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    categoryId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CartItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutCartItemsNestedInput;
  };

  export type CartItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CartItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productName?: StringFieldUpdateOperationsInput | string;
    productSku?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    order?: OrderUpdateOneRequiredWithoutOrderItemsNestedInput;
  };

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    productName?: StringFieldUpdateOperationsInput | string;
    productSku?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    productName?: StringFieldUpdateOperationsInput | string;
    productSku?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemCreateManyOrderInput = {
    id?: string;
    productId: string;
    productName: string;
    productSku?: string | null;
    quantity: number;
    unitPrice: Decimal | DecimalJsLike | number | string;
    totalPrice: Decimal | DecimalJsLike | number | string;
    createdAt?: Date | string;
  };

  export type OrderItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productName?: StringFieldUpdateOperationsInput | string;
    productSku?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput;
  };

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    productName?: StringFieldUpdateOperationsInput | string;
    productSku?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    productName?: StringFieldUpdateOperationsInput | string;
    productSku?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    unitPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    totalPrice?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Aliases for legacy arg types
   */
  /**
   * @deprecated Use UserCountOutputTypeDefaultArgs instead
   */
  export type UserCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = UserCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
   */
  export type CategoryCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = CategoryCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ProductCountOutputTypeDefaultArgs instead
   */
  export type ProductCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ProductCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use OrderCountOutputTypeDefaultArgs instead
   */
  export type OrderCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = OrderCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use UserDefaultArgs instead
   */
  export type UserArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = UserDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use AccountDefaultArgs instead
   */
  export type AccountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = AccountDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use SessionDefaultArgs instead
   */
  export type SessionArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = SessionDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use VerificationTokenDefaultArgs instead
   */
  export type VerificationTokenArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = VerificationTokenDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use CategoryDefaultArgs instead
   */
  export type CategoryArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = CategoryDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ProductDefaultArgs instead
   */
  export type ProductArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ProductDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ProductVariantDefaultArgs instead
   */
  export type ProductVariantArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ProductVariantDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ProductImageDefaultArgs instead
   */
  export type ProductImageArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ProductImageDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ProductCategoryDefaultArgs instead
   */
  export type ProductCategoryArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ProductCategoryDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use CartItemDefaultArgs instead
   */
  export type CartItemArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = CartItemDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use OrderDefaultArgs instead
   */
  export type OrderArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = OrderDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use OrderItemDefaultArgs instead
   */
  export type OrderItemArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = OrderItemDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ReferralDefaultArgs instead
   */
  export type ReferralArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = ReferralDefaultArgs<ExtArgs>;

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
