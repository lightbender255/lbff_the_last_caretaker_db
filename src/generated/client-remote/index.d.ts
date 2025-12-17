
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Poi
 * 
 */
export type Poi = $Result.DefaultSelection<Prisma.$PoiPayload>
/**
 * Model LookupValue
 * 
 */
export type LookupValue = $Result.DefaultSelection<Prisma.$LookupValuePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Pois
 * const pois = await prisma.poi.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Pois
   * const pois = await prisma.poi.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

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
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.poi`: Exposes CRUD operations for the **Poi** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pois
    * const pois = await prisma.poi.findMany()
    * ```
    */
  get poi(): Prisma.PoiDelegate<ExtArgs>;

  /**
   * `prisma.lookupValue`: Exposes CRUD operations for the **LookupValue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LookupValues
    * const lookupValues = await prisma.lookupValue.findMany()
    * ```
    */
  get lookupValue(): Prisma.LookupValueDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

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
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
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
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Poi: 'Poi',
    LookupValue: 'LookupValue'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "poi" | "lookupValue"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Poi: {
        payload: Prisma.$PoiPayload<ExtArgs>
        fields: Prisma.PoiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PoiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PoiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoiPayload>
          }
          findFirst: {
            args: Prisma.PoiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PoiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoiPayload>
          }
          findMany: {
            args: Prisma.PoiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoiPayload>[]
          }
          create: {
            args: Prisma.PoiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoiPayload>
          }
          createMany: {
            args: Prisma.PoiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PoiCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoiPayload>[]
          }
          delete: {
            args: Prisma.PoiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoiPayload>
          }
          update: {
            args: Prisma.PoiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoiPayload>
          }
          deleteMany: {
            args: Prisma.PoiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PoiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PoiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoiPayload>
          }
          aggregate: {
            args: Prisma.PoiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePoi>
          }
          groupBy: {
            args: Prisma.PoiGroupByArgs<ExtArgs>
            result: $Utils.Optional<PoiGroupByOutputType>[]
          }
          count: {
            args: Prisma.PoiCountArgs<ExtArgs>
            result: $Utils.Optional<PoiCountAggregateOutputType> | number
          }
        }
      }
      LookupValue: {
        payload: Prisma.$LookupValuePayload<ExtArgs>
        fields: Prisma.LookupValueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LookupValueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LookupValuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LookupValueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LookupValuePayload>
          }
          findFirst: {
            args: Prisma.LookupValueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LookupValuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LookupValueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LookupValuePayload>
          }
          findMany: {
            args: Prisma.LookupValueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LookupValuePayload>[]
          }
          create: {
            args: Prisma.LookupValueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LookupValuePayload>
          }
          createMany: {
            args: Prisma.LookupValueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LookupValueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LookupValuePayload>[]
          }
          delete: {
            args: Prisma.LookupValueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LookupValuePayload>
          }
          update: {
            args: Prisma.LookupValueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LookupValuePayload>
          }
          deleteMany: {
            args: Prisma.LookupValueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LookupValueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LookupValueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LookupValuePayload>
          }
          aggregate: {
            args: Prisma.LookupValueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLookupValue>
          }
          groupBy: {
            args: Prisma.LookupValueGroupByArgs<ExtArgs>
            result: $Utils.Optional<LookupValueGroupByOutputType>[]
          }
          count: {
            args: Prisma.LookupValueCountArgs<ExtArgs>
            result: $Utils.Optional<LookupValueCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
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
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Poi
   */

  export type AggregatePoi = {
    _count: PoiCountAggregateOutputType | null
    _avg: PoiAvgAggregateOutputType | null
    _sum: PoiSumAggregateOutputType | null
    _min: PoiMinAggregateOutputType | null
    _max: PoiMaxAggregateOutputType | null
  }

  export type PoiAvgAggregateOutputType = {
    id: number | null
    x: number | null
    y: number | null
    depth_m: number | null
    ocean_floor_depth_m: number | null
    top_depth_m: number | null
    max_explored_depth_m: number | null
    max_psi_reached: number | null
  }

  export type PoiSumAggregateOutputType = {
    id: number | null
    x: number | null
    y: number | null
    depth_m: number | null
    ocean_floor_depth_m: number | null
    top_depth_m: number | null
    max_explored_depth_m: number | null
    max_psi_reached: number | null
  }

  export type PoiMinAggregateOutputType = {
    id: number | null
    name: string | null
    x: number | null
    y: number | null
    type: string | null
    bio_hostiles: string | null
    mech_hostiles: string | null
    salvage: string | null
    power: string | null
    beacon: string | null
    depth_m: number | null
    ocean_floor_depth_m: number | null
    top_depth_m: number | null
    max_explored_depth_m: number | null
    max_psi_reached: number | null
    notes: string | null
  }

  export type PoiMaxAggregateOutputType = {
    id: number | null
    name: string | null
    x: number | null
    y: number | null
    type: string | null
    bio_hostiles: string | null
    mech_hostiles: string | null
    salvage: string | null
    power: string | null
    beacon: string | null
    depth_m: number | null
    ocean_floor_depth_m: number | null
    top_depth_m: number | null
    max_explored_depth_m: number | null
    max_psi_reached: number | null
    notes: string | null
  }

  export type PoiCountAggregateOutputType = {
    id: number
    name: number
    x: number
    y: number
    type: number
    bio_hostiles: number
    mech_hostiles: number
    salvage: number
    power: number
    beacon: number
    depth_m: number
    ocean_floor_depth_m: number
    top_depth_m: number
    max_explored_depth_m: number
    max_psi_reached: number
    notes: number
    _all: number
  }


  export type PoiAvgAggregateInputType = {
    id?: true
    x?: true
    y?: true
    depth_m?: true
    ocean_floor_depth_m?: true
    top_depth_m?: true
    max_explored_depth_m?: true
    max_psi_reached?: true
  }

  export type PoiSumAggregateInputType = {
    id?: true
    x?: true
    y?: true
    depth_m?: true
    ocean_floor_depth_m?: true
    top_depth_m?: true
    max_explored_depth_m?: true
    max_psi_reached?: true
  }

  export type PoiMinAggregateInputType = {
    id?: true
    name?: true
    x?: true
    y?: true
    type?: true
    bio_hostiles?: true
    mech_hostiles?: true
    salvage?: true
    power?: true
    beacon?: true
    depth_m?: true
    ocean_floor_depth_m?: true
    top_depth_m?: true
    max_explored_depth_m?: true
    max_psi_reached?: true
    notes?: true
  }

  export type PoiMaxAggregateInputType = {
    id?: true
    name?: true
    x?: true
    y?: true
    type?: true
    bio_hostiles?: true
    mech_hostiles?: true
    salvage?: true
    power?: true
    beacon?: true
    depth_m?: true
    ocean_floor_depth_m?: true
    top_depth_m?: true
    max_explored_depth_m?: true
    max_psi_reached?: true
    notes?: true
  }

  export type PoiCountAggregateInputType = {
    id?: true
    name?: true
    x?: true
    y?: true
    type?: true
    bio_hostiles?: true
    mech_hostiles?: true
    salvage?: true
    power?: true
    beacon?: true
    depth_m?: true
    ocean_floor_depth_m?: true
    top_depth_m?: true
    max_explored_depth_m?: true
    max_psi_reached?: true
    notes?: true
    _all?: true
  }

  export type PoiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Poi to aggregate.
     */
    where?: PoiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pois to fetch.
     */
    orderBy?: PoiOrderByWithRelationInput | PoiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PoiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pois from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pois.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pois
    **/
    _count?: true | PoiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PoiAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PoiSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PoiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PoiMaxAggregateInputType
  }

  export type GetPoiAggregateType<T extends PoiAggregateArgs> = {
        [P in keyof T & keyof AggregatePoi]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePoi[P]>
      : GetScalarType<T[P], AggregatePoi[P]>
  }




  export type PoiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoiWhereInput
    orderBy?: PoiOrderByWithAggregationInput | PoiOrderByWithAggregationInput[]
    by: PoiScalarFieldEnum[] | PoiScalarFieldEnum
    having?: PoiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PoiCountAggregateInputType | true
    _avg?: PoiAvgAggregateInputType
    _sum?: PoiSumAggregateInputType
    _min?: PoiMinAggregateInputType
    _max?: PoiMaxAggregateInputType
  }

  export type PoiGroupByOutputType = {
    id: number
    name: string
    x: number | null
    y: number | null
    type: string | null
    bio_hostiles: string | null
    mech_hostiles: string | null
    salvage: string | null
    power: string | null
    beacon: string | null
    depth_m: number | null
    ocean_floor_depth_m: number | null
    top_depth_m: number | null
    max_explored_depth_m: number | null
    max_psi_reached: number | null
    notes: string | null
    _count: PoiCountAggregateOutputType | null
    _avg: PoiAvgAggregateOutputType | null
    _sum: PoiSumAggregateOutputType | null
    _min: PoiMinAggregateOutputType | null
    _max: PoiMaxAggregateOutputType | null
  }

  type GetPoiGroupByPayload<T extends PoiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PoiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PoiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PoiGroupByOutputType[P]>
            : GetScalarType<T[P], PoiGroupByOutputType[P]>
        }
      >
    >


  export type PoiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    x?: boolean
    y?: boolean
    type?: boolean
    bio_hostiles?: boolean
    mech_hostiles?: boolean
    salvage?: boolean
    power?: boolean
    beacon?: boolean
    depth_m?: boolean
    ocean_floor_depth_m?: boolean
    top_depth_m?: boolean
    max_explored_depth_m?: boolean
    max_psi_reached?: boolean
    notes?: boolean
  }, ExtArgs["result"]["poi"]>

  export type PoiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    x?: boolean
    y?: boolean
    type?: boolean
    bio_hostiles?: boolean
    mech_hostiles?: boolean
    salvage?: boolean
    power?: boolean
    beacon?: boolean
    depth_m?: boolean
    ocean_floor_depth_m?: boolean
    top_depth_m?: boolean
    max_explored_depth_m?: boolean
    max_psi_reached?: boolean
    notes?: boolean
  }, ExtArgs["result"]["poi"]>

  export type PoiSelectScalar = {
    id?: boolean
    name?: boolean
    x?: boolean
    y?: boolean
    type?: boolean
    bio_hostiles?: boolean
    mech_hostiles?: boolean
    salvage?: boolean
    power?: boolean
    beacon?: boolean
    depth_m?: boolean
    ocean_floor_depth_m?: boolean
    top_depth_m?: boolean
    max_explored_depth_m?: boolean
    max_psi_reached?: boolean
    notes?: boolean
  }


  export type $PoiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Poi"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      x: number | null
      y: number | null
      type: string | null
      bio_hostiles: string | null
      mech_hostiles: string | null
      salvage: string | null
      power: string | null
      beacon: string | null
      depth_m: number | null
      ocean_floor_depth_m: number | null
      top_depth_m: number | null
      max_explored_depth_m: number | null
      max_psi_reached: number | null
      notes: string | null
    }, ExtArgs["result"]["poi"]>
    composites: {}
  }

  type PoiGetPayload<S extends boolean | null | undefined | PoiDefaultArgs> = $Result.GetResult<Prisma.$PoiPayload, S>

  type PoiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PoiFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PoiCountAggregateInputType | true
    }

  export interface PoiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Poi'], meta: { name: 'Poi' } }
    /**
     * Find zero or one Poi that matches the filter.
     * @param {PoiFindUniqueArgs} args - Arguments to find a Poi
     * @example
     * // Get one Poi
     * const poi = await prisma.poi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PoiFindUniqueArgs>(args: SelectSubset<T, PoiFindUniqueArgs<ExtArgs>>): Prisma__PoiClient<$Result.GetResult<Prisma.$PoiPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Poi that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PoiFindUniqueOrThrowArgs} args - Arguments to find a Poi
     * @example
     * // Get one Poi
     * const poi = await prisma.poi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PoiFindUniqueOrThrowArgs>(args: SelectSubset<T, PoiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PoiClient<$Result.GetResult<Prisma.$PoiPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Poi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoiFindFirstArgs} args - Arguments to find a Poi
     * @example
     * // Get one Poi
     * const poi = await prisma.poi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PoiFindFirstArgs>(args?: SelectSubset<T, PoiFindFirstArgs<ExtArgs>>): Prisma__PoiClient<$Result.GetResult<Prisma.$PoiPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Poi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoiFindFirstOrThrowArgs} args - Arguments to find a Poi
     * @example
     * // Get one Poi
     * const poi = await prisma.poi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PoiFindFirstOrThrowArgs>(args?: SelectSubset<T, PoiFindFirstOrThrowArgs<ExtArgs>>): Prisma__PoiClient<$Result.GetResult<Prisma.$PoiPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Pois that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pois
     * const pois = await prisma.poi.findMany()
     * 
     * // Get first 10 Pois
     * const pois = await prisma.poi.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const poiWithIdOnly = await prisma.poi.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PoiFindManyArgs>(args?: SelectSubset<T, PoiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoiPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Poi.
     * @param {PoiCreateArgs} args - Arguments to create a Poi.
     * @example
     * // Create one Poi
     * const Poi = await prisma.poi.create({
     *   data: {
     *     // ... data to create a Poi
     *   }
     * })
     * 
     */
    create<T extends PoiCreateArgs>(args: SelectSubset<T, PoiCreateArgs<ExtArgs>>): Prisma__PoiClient<$Result.GetResult<Prisma.$PoiPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Pois.
     * @param {PoiCreateManyArgs} args - Arguments to create many Pois.
     * @example
     * // Create many Pois
     * const poi = await prisma.poi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PoiCreateManyArgs>(args?: SelectSubset<T, PoiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pois and returns the data saved in the database.
     * @param {PoiCreateManyAndReturnArgs} args - Arguments to create many Pois.
     * @example
     * // Create many Pois
     * const poi = await prisma.poi.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pois and only return the `id`
     * const poiWithIdOnly = await prisma.poi.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PoiCreateManyAndReturnArgs>(args?: SelectSubset<T, PoiCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoiPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Poi.
     * @param {PoiDeleteArgs} args - Arguments to delete one Poi.
     * @example
     * // Delete one Poi
     * const Poi = await prisma.poi.delete({
     *   where: {
     *     // ... filter to delete one Poi
     *   }
     * })
     * 
     */
    delete<T extends PoiDeleteArgs>(args: SelectSubset<T, PoiDeleteArgs<ExtArgs>>): Prisma__PoiClient<$Result.GetResult<Prisma.$PoiPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Poi.
     * @param {PoiUpdateArgs} args - Arguments to update one Poi.
     * @example
     * // Update one Poi
     * const poi = await prisma.poi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PoiUpdateArgs>(args: SelectSubset<T, PoiUpdateArgs<ExtArgs>>): Prisma__PoiClient<$Result.GetResult<Prisma.$PoiPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Pois.
     * @param {PoiDeleteManyArgs} args - Arguments to filter Pois to delete.
     * @example
     * // Delete a few Pois
     * const { count } = await prisma.poi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PoiDeleteManyArgs>(args?: SelectSubset<T, PoiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pois.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pois
     * const poi = await prisma.poi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PoiUpdateManyArgs>(args: SelectSubset<T, PoiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Poi.
     * @param {PoiUpsertArgs} args - Arguments to update or create a Poi.
     * @example
     * // Update or create a Poi
     * const poi = await prisma.poi.upsert({
     *   create: {
     *     // ... data to create a Poi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Poi we want to update
     *   }
     * })
     */
    upsert<T extends PoiUpsertArgs>(args: SelectSubset<T, PoiUpsertArgs<ExtArgs>>): Prisma__PoiClient<$Result.GetResult<Prisma.$PoiPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Pois.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoiCountArgs} args - Arguments to filter Pois to count.
     * @example
     * // Count the number of Pois
     * const count = await prisma.poi.count({
     *   where: {
     *     // ... the filter for the Pois we want to count
     *   }
     * })
    **/
    count<T extends PoiCountArgs>(
      args?: Subset<T, PoiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PoiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Poi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PoiAggregateArgs>(args: Subset<T, PoiAggregateArgs>): Prisma.PrismaPromise<GetPoiAggregateType<T>>

    /**
     * Group by Poi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoiGroupByArgs} args - Group by arguments.
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
      T extends PoiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PoiGroupByArgs['orderBy'] }
        : { orderBy?: PoiGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PoiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Poi model
   */
  readonly fields: PoiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Poi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PoiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Poi model
   */ 
  interface PoiFieldRefs {
    readonly id: FieldRef<"Poi", 'Int'>
    readonly name: FieldRef<"Poi", 'String'>
    readonly x: FieldRef<"Poi", 'Int'>
    readonly y: FieldRef<"Poi", 'Int'>
    readonly type: FieldRef<"Poi", 'String'>
    readonly bio_hostiles: FieldRef<"Poi", 'String'>
    readonly mech_hostiles: FieldRef<"Poi", 'String'>
    readonly salvage: FieldRef<"Poi", 'String'>
    readonly power: FieldRef<"Poi", 'String'>
    readonly beacon: FieldRef<"Poi", 'String'>
    readonly depth_m: FieldRef<"Poi", 'Int'>
    readonly ocean_floor_depth_m: FieldRef<"Poi", 'Int'>
    readonly top_depth_m: FieldRef<"Poi", 'Int'>
    readonly max_explored_depth_m: FieldRef<"Poi", 'Int'>
    readonly max_psi_reached: FieldRef<"Poi", 'Int'>
    readonly notes: FieldRef<"Poi", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Poi findUnique
   */
  export type PoiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poi
     */
    select?: PoiSelect<ExtArgs> | null
    /**
     * Filter, which Poi to fetch.
     */
    where: PoiWhereUniqueInput
  }

  /**
   * Poi findUniqueOrThrow
   */
  export type PoiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poi
     */
    select?: PoiSelect<ExtArgs> | null
    /**
     * Filter, which Poi to fetch.
     */
    where: PoiWhereUniqueInput
  }

  /**
   * Poi findFirst
   */
  export type PoiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poi
     */
    select?: PoiSelect<ExtArgs> | null
    /**
     * Filter, which Poi to fetch.
     */
    where?: PoiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pois to fetch.
     */
    orderBy?: PoiOrderByWithRelationInput | PoiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pois.
     */
    cursor?: PoiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pois from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pois.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pois.
     */
    distinct?: PoiScalarFieldEnum | PoiScalarFieldEnum[]
  }

  /**
   * Poi findFirstOrThrow
   */
  export type PoiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poi
     */
    select?: PoiSelect<ExtArgs> | null
    /**
     * Filter, which Poi to fetch.
     */
    where?: PoiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pois to fetch.
     */
    orderBy?: PoiOrderByWithRelationInput | PoiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pois.
     */
    cursor?: PoiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pois from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pois.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pois.
     */
    distinct?: PoiScalarFieldEnum | PoiScalarFieldEnum[]
  }

  /**
   * Poi findMany
   */
  export type PoiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poi
     */
    select?: PoiSelect<ExtArgs> | null
    /**
     * Filter, which Pois to fetch.
     */
    where?: PoiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pois to fetch.
     */
    orderBy?: PoiOrderByWithRelationInput | PoiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pois.
     */
    cursor?: PoiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pois from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pois.
     */
    skip?: number
    distinct?: PoiScalarFieldEnum | PoiScalarFieldEnum[]
  }

  /**
   * Poi create
   */
  export type PoiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poi
     */
    select?: PoiSelect<ExtArgs> | null
    /**
     * The data needed to create a Poi.
     */
    data: XOR<PoiCreateInput, PoiUncheckedCreateInput>
  }

  /**
   * Poi createMany
   */
  export type PoiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pois.
     */
    data: PoiCreateManyInput | PoiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Poi createManyAndReturn
   */
  export type PoiCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poi
     */
    select?: PoiSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Pois.
     */
    data: PoiCreateManyInput | PoiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Poi update
   */
  export type PoiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poi
     */
    select?: PoiSelect<ExtArgs> | null
    /**
     * The data needed to update a Poi.
     */
    data: XOR<PoiUpdateInput, PoiUncheckedUpdateInput>
    /**
     * Choose, which Poi to update.
     */
    where: PoiWhereUniqueInput
  }

  /**
   * Poi updateMany
   */
  export type PoiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pois.
     */
    data: XOR<PoiUpdateManyMutationInput, PoiUncheckedUpdateManyInput>
    /**
     * Filter which Pois to update
     */
    where?: PoiWhereInput
  }

  /**
   * Poi upsert
   */
  export type PoiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poi
     */
    select?: PoiSelect<ExtArgs> | null
    /**
     * The filter to search for the Poi to update in case it exists.
     */
    where: PoiWhereUniqueInput
    /**
     * In case the Poi found by the `where` argument doesn't exist, create a new Poi with this data.
     */
    create: XOR<PoiCreateInput, PoiUncheckedCreateInput>
    /**
     * In case the Poi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PoiUpdateInput, PoiUncheckedUpdateInput>
  }

  /**
   * Poi delete
   */
  export type PoiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poi
     */
    select?: PoiSelect<ExtArgs> | null
    /**
     * Filter which Poi to delete.
     */
    where: PoiWhereUniqueInput
  }

  /**
   * Poi deleteMany
   */
  export type PoiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pois to delete
     */
    where?: PoiWhereInput
  }

  /**
   * Poi without action
   */
  export type PoiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poi
     */
    select?: PoiSelect<ExtArgs> | null
  }


  /**
   * Model LookupValue
   */

  export type AggregateLookupValue = {
    _count: LookupValueCountAggregateOutputType | null
    _avg: LookupValueAvgAggregateOutputType | null
    _sum: LookupValueSumAggregateOutputType | null
    _min: LookupValueMinAggregateOutputType | null
    _max: LookupValueMaxAggregateOutputType | null
  }

  export type LookupValueAvgAggregateOutputType = {
    id: number | null
  }

  export type LookupValueSumAggregateOutputType = {
    id: number | null
  }

  export type LookupValueMinAggregateOutputType = {
    id: number | null
    category: string | null
    value: string | null
  }

  export type LookupValueMaxAggregateOutputType = {
    id: number | null
    category: string | null
    value: string | null
  }

  export type LookupValueCountAggregateOutputType = {
    id: number
    category: number
    value: number
    _all: number
  }


  export type LookupValueAvgAggregateInputType = {
    id?: true
  }

  export type LookupValueSumAggregateInputType = {
    id?: true
  }

  export type LookupValueMinAggregateInputType = {
    id?: true
    category?: true
    value?: true
  }

  export type LookupValueMaxAggregateInputType = {
    id?: true
    category?: true
    value?: true
  }

  export type LookupValueCountAggregateInputType = {
    id?: true
    category?: true
    value?: true
    _all?: true
  }

  export type LookupValueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LookupValue to aggregate.
     */
    where?: LookupValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LookupValues to fetch.
     */
    orderBy?: LookupValueOrderByWithRelationInput | LookupValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LookupValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LookupValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LookupValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LookupValues
    **/
    _count?: true | LookupValueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LookupValueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LookupValueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LookupValueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LookupValueMaxAggregateInputType
  }

  export type GetLookupValueAggregateType<T extends LookupValueAggregateArgs> = {
        [P in keyof T & keyof AggregateLookupValue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLookupValue[P]>
      : GetScalarType<T[P], AggregateLookupValue[P]>
  }




  export type LookupValueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LookupValueWhereInput
    orderBy?: LookupValueOrderByWithAggregationInput | LookupValueOrderByWithAggregationInput[]
    by: LookupValueScalarFieldEnum[] | LookupValueScalarFieldEnum
    having?: LookupValueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LookupValueCountAggregateInputType | true
    _avg?: LookupValueAvgAggregateInputType
    _sum?: LookupValueSumAggregateInputType
    _min?: LookupValueMinAggregateInputType
    _max?: LookupValueMaxAggregateInputType
  }

  export type LookupValueGroupByOutputType = {
    id: number
    category: string
    value: string
    _count: LookupValueCountAggregateOutputType | null
    _avg: LookupValueAvgAggregateOutputType | null
    _sum: LookupValueSumAggregateOutputType | null
    _min: LookupValueMinAggregateOutputType | null
    _max: LookupValueMaxAggregateOutputType | null
  }

  type GetLookupValueGroupByPayload<T extends LookupValueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LookupValueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LookupValueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LookupValueGroupByOutputType[P]>
            : GetScalarType<T[P], LookupValueGroupByOutputType[P]>
        }
      >
    >


  export type LookupValueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    value?: boolean
  }, ExtArgs["result"]["lookupValue"]>

  export type LookupValueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    value?: boolean
  }, ExtArgs["result"]["lookupValue"]>

  export type LookupValueSelectScalar = {
    id?: boolean
    category?: boolean
    value?: boolean
  }


  export type $LookupValuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LookupValue"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      category: string
      value: string
    }, ExtArgs["result"]["lookupValue"]>
    composites: {}
  }

  type LookupValueGetPayload<S extends boolean | null | undefined | LookupValueDefaultArgs> = $Result.GetResult<Prisma.$LookupValuePayload, S>

  type LookupValueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LookupValueFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LookupValueCountAggregateInputType | true
    }

  export interface LookupValueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LookupValue'], meta: { name: 'LookupValue' } }
    /**
     * Find zero or one LookupValue that matches the filter.
     * @param {LookupValueFindUniqueArgs} args - Arguments to find a LookupValue
     * @example
     * // Get one LookupValue
     * const lookupValue = await prisma.lookupValue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LookupValueFindUniqueArgs>(args: SelectSubset<T, LookupValueFindUniqueArgs<ExtArgs>>): Prisma__LookupValueClient<$Result.GetResult<Prisma.$LookupValuePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LookupValue that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LookupValueFindUniqueOrThrowArgs} args - Arguments to find a LookupValue
     * @example
     * // Get one LookupValue
     * const lookupValue = await prisma.lookupValue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LookupValueFindUniqueOrThrowArgs>(args: SelectSubset<T, LookupValueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LookupValueClient<$Result.GetResult<Prisma.$LookupValuePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LookupValue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LookupValueFindFirstArgs} args - Arguments to find a LookupValue
     * @example
     * // Get one LookupValue
     * const lookupValue = await prisma.lookupValue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LookupValueFindFirstArgs>(args?: SelectSubset<T, LookupValueFindFirstArgs<ExtArgs>>): Prisma__LookupValueClient<$Result.GetResult<Prisma.$LookupValuePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LookupValue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LookupValueFindFirstOrThrowArgs} args - Arguments to find a LookupValue
     * @example
     * // Get one LookupValue
     * const lookupValue = await prisma.lookupValue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LookupValueFindFirstOrThrowArgs>(args?: SelectSubset<T, LookupValueFindFirstOrThrowArgs<ExtArgs>>): Prisma__LookupValueClient<$Result.GetResult<Prisma.$LookupValuePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LookupValues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LookupValueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LookupValues
     * const lookupValues = await prisma.lookupValue.findMany()
     * 
     * // Get first 10 LookupValues
     * const lookupValues = await prisma.lookupValue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lookupValueWithIdOnly = await prisma.lookupValue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LookupValueFindManyArgs>(args?: SelectSubset<T, LookupValueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LookupValuePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LookupValue.
     * @param {LookupValueCreateArgs} args - Arguments to create a LookupValue.
     * @example
     * // Create one LookupValue
     * const LookupValue = await prisma.lookupValue.create({
     *   data: {
     *     // ... data to create a LookupValue
     *   }
     * })
     * 
     */
    create<T extends LookupValueCreateArgs>(args: SelectSubset<T, LookupValueCreateArgs<ExtArgs>>): Prisma__LookupValueClient<$Result.GetResult<Prisma.$LookupValuePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LookupValues.
     * @param {LookupValueCreateManyArgs} args - Arguments to create many LookupValues.
     * @example
     * // Create many LookupValues
     * const lookupValue = await prisma.lookupValue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LookupValueCreateManyArgs>(args?: SelectSubset<T, LookupValueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LookupValues and returns the data saved in the database.
     * @param {LookupValueCreateManyAndReturnArgs} args - Arguments to create many LookupValues.
     * @example
     * // Create many LookupValues
     * const lookupValue = await prisma.lookupValue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LookupValues and only return the `id`
     * const lookupValueWithIdOnly = await prisma.lookupValue.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LookupValueCreateManyAndReturnArgs>(args?: SelectSubset<T, LookupValueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LookupValuePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LookupValue.
     * @param {LookupValueDeleteArgs} args - Arguments to delete one LookupValue.
     * @example
     * // Delete one LookupValue
     * const LookupValue = await prisma.lookupValue.delete({
     *   where: {
     *     // ... filter to delete one LookupValue
     *   }
     * })
     * 
     */
    delete<T extends LookupValueDeleteArgs>(args: SelectSubset<T, LookupValueDeleteArgs<ExtArgs>>): Prisma__LookupValueClient<$Result.GetResult<Prisma.$LookupValuePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LookupValue.
     * @param {LookupValueUpdateArgs} args - Arguments to update one LookupValue.
     * @example
     * // Update one LookupValue
     * const lookupValue = await prisma.lookupValue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LookupValueUpdateArgs>(args: SelectSubset<T, LookupValueUpdateArgs<ExtArgs>>): Prisma__LookupValueClient<$Result.GetResult<Prisma.$LookupValuePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LookupValues.
     * @param {LookupValueDeleteManyArgs} args - Arguments to filter LookupValues to delete.
     * @example
     * // Delete a few LookupValues
     * const { count } = await prisma.lookupValue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LookupValueDeleteManyArgs>(args?: SelectSubset<T, LookupValueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LookupValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LookupValueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LookupValues
     * const lookupValue = await prisma.lookupValue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LookupValueUpdateManyArgs>(args: SelectSubset<T, LookupValueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LookupValue.
     * @param {LookupValueUpsertArgs} args - Arguments to update or create a LookupValue.
     * @example
     * // Update or create a LookupValue
     * const lookupValue = await prisma.lookupValue.upsert({
     *   create: {
     *     // ... data to create a LookupValue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LookupValue we want to update
     *   }
     * })
     */
    upsert<T extends LookupValueUpsertArgs>(args: SelectSubset<T, LookupValueUpsertArgs<ExtArgs>>): Prisma__LookupValueClient<$Result.GetResult<Prisma.$LookupValuePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LookupValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LookupValueCountArgs} args - Arguments to filter LookupValues to count.
     * @example
     * // Count the number of LookupValues
     * const count = await prisma.lookupValue.count({
     *   where: {
     *     // ... the filter for the LookupValues we want to count
     *   }
     * })
    **/
    count<T extends LookupValueCountArgs>(
      args?: Subset<T, LookupValueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LookupValueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LookupValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LookupValueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LookupValueAggregateArgs>(args: Subset<T, LookupValueAggregateArgs>): Prisma.PrismaPromise<GetLookupValueAggregateType<T>>

    /**
     * Group by LookupValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LookupValueGroupByArgs} args - Group by arguments.
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
      T extends LookupValueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LookupValueGroupByArgs['orderBy'] }
        : { orderBy?: LookupValueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
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
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LookupValueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLookupValueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LookupValue model
   */
  readonly fields: LookupValueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LookupValue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LookupValueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LookupValue model
   */ 
  interface LookupValueFieldRefs {
    readonly id: FieldRef<"LookupValue", 'Int'>
    readonly category: FieldRef<"LookupValue", 'String'>
    readonly value: FieldRef<"LookupValue", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LookupValue findUnique
   */
  export type LookupValueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LookupValue
     */
    select?: LookupValueSelect<ExtArgs> | null
    /**
     * Filter, which LookupValue to fetch.
     */
    where: LookupValueWhereUniqueInput
  }

  /**
   * LookupValue findUniqueOrThrow
   */
  export type LookupValueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LookupValue
     */
    select?: LookupValueSelect<ExtArgs> | null
    /**
     * Filter, which LookupValue to fetch.
     */
    where: LookupValueWhereUniqueInput
  }

  /**
   * LookupValue findFirst
   */
  export type LookupValueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LookupValue
     */
    select?: LookupValueSelect<ExtArgs> | null
    /**
     * Filter, which LookupValue to fetch.
     */
    where?: LookupValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LookupValues to fetch.
     */
    orderBy?: LookupValueOrderByWithRelationInput | LookupValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LookupValues.
     */
    cursor?: LookupValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LookupValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LookupValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LookupValues.
     */
    distinct?: LookupValueScalarFieldEnum | LookupValueScalarFieldEnum[]
  }

  /**
   * LookupValue findFirstOrThrow
   */
  export type LookupValueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LookupValue
     */
    select?: LookupValueSelect<ExtArgs> | null
    /**
     * Filter, which LookupValue to fetch.
     */
    where?: LookupValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LookupValues to fetch.
     */
    orderBy?: LookupValueOrderByWithRelationInput | LookupValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LookupValues.
     */
    cursor?: LookupValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LookupValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LookupValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LookupValues.
     */
    distinct?: LookupValueScalarFieldEnum | LookupValueScalarFieldEnum[]
  }

  /**
   * LookupValue findMany
   */
  export type LookupValueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LookupValue
     */
    select?: LookupValueSelect<ExtArgs> | null
    /**
     * Filter, which LookupValues to fetch.
     */
    where?: LookupValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LookupValues to fetch.
     */
    orderBy?: LookupValueOrderByWithRelationInput | LookupValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LookupValues.
     */
    cursor?: LookupValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LookupValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LookupValues.
     */
    skip?: number
    distinct?: LookupValueScalarFieldEnum | LookupValueScalarFieldEnum[]
  }

  /**
   * LookupValue create
   */
  export type LookupValueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LookupValue
     */
    select?: LookupValueSelect<ExtArgs> | null
    /**
     * The data needed to create a LookupValue.
     */
    data: XOR<LookupValueCreateInput, LookupValueUncheckedCreateInput>
  }

  /**
   * LookupValue createMany
   */
  export type LookupValueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LookupValues.
     */
    data: LookupValueCreateManyInput | LookupValueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LookupValue createManyAndReturn
   */
  export type LookupValueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LookupValue
     */
    select?: LookupValueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LookupValues.
     */
    data: LookupValueCreateManyInput | LookupValueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LookupValue update
   */
  export type LookupValueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LookupValue
     */
    select?: LookupValueSelect<ExtArgs> | null
    /**
     * The data needed to update a LookupValue.
     */
    data: XOR<LookupValueUpdateInput, LookupValueUncheckedUpdateInput>
    /**
     * Choose, which LookupValue to update.
     */
    where: LookupValueWhereUniqueInput
  }

  /**
   * LookupValue updateMany
   */
  export type LookupValueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LookupValues.
     */
    data: XOR<LookupValueUpdateManyMutationInput, LookupValueUncheckedUpdateManyInput>
    /**
     * Filter which LookupValues to update
     */
    where?: LookupValueWhereInput
  }

  /**
   * LookupValue upsert
   */
  export type LookupValueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LookupValue
     */
    select?: LookupValueSelect<ExtArgs> | null
    /**
     * The filter to search for the LookupValue to update in case it exists.
     */
    where: LookupValueWhereUniqueInput
    /**
     * In case the LookupValue found by the `where` argument doesn't exist, create a new LookupValue with this data.
     */
    create: XOR<LookupValueCreateInput, LookupValueUncheckedCreateInput>
    /**
     * In case the LookupValue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LookupValueUpdateInput, LookupValueUncheckedUpdateInput>
  }

  /**
   * LookupValue delete
   */
  export type LookupValueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LookupValue
     */
    select?: LookupValueSelect<ExtArgs> | null
    /**
     * Filter which LookupValue to delete.
     */
    where: LookupValueWhereUniqueInput
  }

  /**
   * LookupValue deleteMany
   */
  export type LookupValueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LookupValues to delete
     */
    where?: LookupValueWhereInput
  }

  /**
   * LookupValue without action
   */
  export type LookupValueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LookupValue
     */
    select?: LookupValueSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PoiScalarFieldEnum: {
    id: 'id',
    name: 'name',
    x: 'x',
    y: 'y',
    type: 'type',
    bio_hostiles: 'bio_hostiles',
    mech_hostiles: 'mech_hostiles',
    salvage: 'salvage',
    power: 'power',
    beacon: 'beacon',
    depth_m: 'depth_m',
    ocean_floor_depth_m: 'ocean_floor_depth_m',
    top_depth_m: 'top_depth_m',
    max_explored_depth_m: 'max_explored_depth_m',
    max_psi_reached: 'max_psi_reached',
    notes: 'notes'
  };

  export type PoiScalarFieldEnum = (typeof PoiScalarFieldEnum)[keyof typeof PoiScalarFieldEnum]


  export const LookupValueScalarFieldEnum: {
    id: 'id',
    category: 'category',
    value: 'value'
  };

  export type LookupValueScalarFieldEnum = (typeof LookupValueScalarFieldEnum)[keyof typeof LookupValueScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PoiWhereInput = {
    AND?: PoiWhereInput | PoiWhereInput[]
    OR?: PoiWhereInput[]
    NOT?: PoiWhereInput | PoiWhereInput[]
    id?: IntFilter<"Poi"> | number
    name?: StringFilter<"Poi"> | string
    x?: IntNullableFilter<"Poi"> | number | null
    y?: IntNullableFilter<"Poi"> | number | null
    type?: StringNullableFilter<"Poi"> | string | null
    bio_hostiles?: StringNullableFilter<"Poi"> | string | null
    mech_hostiles?: StringNullableFilter<"Poi"> | string | null
    salvage?: StringNullableFilter<"Poi"> | string | null
    power?: StringNullableFilter<"Poi"> | string | null
    beacon?: StringNullableFilter<"Poi"> | string | null
    depth_m?: IntNullableFilter<"Poi"> | number | null
    ocean_floor_depth_m?: IntNullableFilter<"Poi"> | number | null
    top_depth_m?: IntNullableFilter<"Poi"> | number | null
    max_explored_depth_m?: IntNullableFilter<"Poi"> | number | null
    max_psi_reached?: IntNullableFilter<"Poi"> | number | null
    notes?: StringNullableFilter<"Poi"> | string | null
  }

  export type PoiOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    x?: SortOrderInput | SortOrder
    y?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    bio_hostiles?: SortOrderInput | SortOrder
    mech_hostiles?: SortOrderInput | SortOrder
    salvage?: SortOrderInput | SortOrder
    power?: SortOrderInput | SortOrder
    beacon?: SortOrderInput | SortOrder
    depth_m?: SortOrderInput | SortOrder
    ocean_floor_depth_m?: SortOrderInput | SortOrder
    top_depth_m?: SortOrderInput | SortOrder
    max_explored_depth_m?: SortOrderInput | SortOrder
    max_psi_reached?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
  }

  export type PoiWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PoiWhereInput | PoiWhereInput[]
    OR?: PoiWhereInput[]
    NOT?: PoiWhereInput | PoiWhereInput[]
    name?: StringFilter<"Poi"> | string
    x?: IntNullableFilter<"Poi"> | number | null
    y?: IntNullableFilter<"Poi"> | number | null
    type?: StringNullableFilter<"Poi"> | string | null
    bio_hostiles?: StringNullableFilter<"Poi"> | string | null
    mech_hostiles?: StringNullableFilter<"Poi"> | string | null
    salvage?: StringNullableFilter<"Poi"> | string | null
    power?: StringNullableFilter<"Poi"> | string | null
    beacon?: StringNullableFilter<"Poi"> | string | null
    depth_m?: IntNullableFilter<"Poi"> | number | null
    ocean_floor_depth_m?: IntNullableFilter<"Poi"> | number | null
    top_depth_m?: IntNullableFilter<"Poi"> | number | null
    max_explored_depth_m?: IntNullableFilter<"Poi"> | number | null
    max_psi_reached?: IntNullableFilter<"Poi"> | number | null
    notes?: StringNullableFilter<"Poi"> | string | null
  }, "id">

  export type PoiOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    x?: SortOrderInput | SortOrder
    y?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    bio_hostiles?: SortOrderInput | SortOrder
    mech_hostiles?: SortOrderInput | SortOrder
    salvage?: SortOrderInput | SortOrder
    power?: SortOrderInput | SortOrder
    beacon?: SortOrderInput | SortOrder
    depth_m?: SortOrderInput | SortOrder
    ocean_floor_depth_m?: SortOrderInput | SortOrder
    top_depth_m?: SortOrderInput | SortOrder
    max_explored_depth_m?: SortOrderInput | SortOrder
    max_psi_reached?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: PoiCountOrderByAggregateInput
    _avg?: PoiAvgOrderByAggregateInput
    _max?: PoiMaxOrderByAggregateInput
    _min?: PoiMinOrderByAggregateInput
    _sum?: PoiSumOrderByAggregateInput
  }

  export type PoiScalarWhereWithAggregatesInput = {
    AND?: PoiScalarWhereWithAggregatesInput | PoiScalarWhereWithAggregatesInput[]
    OR?: PoiScalarWhereWithAggregatesInput[]
    NOT?: PoiScalarWhereWithAggregatesInput | PoiScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Poi"> | number
    name?: StringWithAggregatesFilter<"Poi"> | string
    x?: IntNullableWithAggregatesFilter<"Poi"> | number | null
    y?: IntNullableWithAggregatesFilter<"Poi"> | number | null
    type?: StringNullableWithAggregatesFilter<"Poi"> | string | null
    bio_hostiles?: StringNullableWithAggregatesFilter<"Poi"> | string | null
    mech_hostiles?: StringNullableWithAggregatesFilter<"Poi"> | string | null
    salvage?: StringNullableWithAggregatesFilter<"Poi"> | string | null
    power?: StringNullableWithAggregatesFilter<"Poi"> | string | null
    beacon?: StringNullableWithAggregatesFilter<"Poi"> | string | null
    depth_m?: IntNullableWithAggregatesFilter<"Poi"> | number | null
    ocean_floor_depth_m?: IntNullableWithAggregatesFilter<"Poi"> | number | null
    top_depth_m?: IntNullableWithAggregatesFilter<"Poi"> | number | null
    max_explored_depth_m?: IntNullableWithAggregatesFilter<"Poi"> | number | null
    max_psi_reached?: IntNullableWithAggregatesFilter<"Poi"> | number | null
    notes?: StringNullableWithAggregatesFilter<"Poi"> | string | null
  }

  export type LookupValueWhereInput = {
    AND?: LookupValueWhereInput | LookupValueWhereInput[]
    OR?: LookupValueWhereInput[]
    NOT?: LookupValueWhereInput | LookupValueWhereInput[]
    id?: IntFilter<"LookupValue"> | number
    category?: StringFilter<"LookupValue"> | string
    value?: StringFilter<"LookupValue"> | string
  }

  export type LookupValueOrderByWithRelationInput = {
    id?: SortOrder
    category?: SortOrder
    value?: SortOrder
  }

  export type LookupValueWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LookupValueWhereInput | LookupValueWhereInput[]
    OR?: LookupValueWhereInput[]
    NOT?: LookupValueWhereInput | LookupValueWhereInput[]
    category?: StringFilter<"LookupValue"> | string
    value?: StringFilter<"LookupValue"> | string
  }, "id">

  export type LookupValueOrderByWithAggregationInput = {
    id?: SortOrder
    category?: SortOrder
    value?: SortOrder
    _count?: LookupValueCountOrderByAggregateInput
    _avg?: LookupValueAvgOrderByAggregateInput
    _max?: LookupValueMaxOrderByAggregateInput
    _min?: LookupValueMinOrderByAggregateInput
    _sum?: LookupValueSumOrderByAggregateInput
  }

  export type LookupValueScalarWhereWithAggregatesInput = {
    AND?: LookupValueScalarWhereWithAggregatesInput | LookupValueScalarWhereWithAggregatesInput[]
    OR?: LookupValueScalarWhereWithAggregatesInput[]
    NOT?: LookupValueScalarWhereWithAggregatesInput | LookupValueScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LookupValue"> | number
    category?: StringWithAggregatesFilter<"LookupValue"> | string
    value?: StringWithAggregatesFilter<"LookupValue"> | string
  }

  export type PoiCreateInput = {
    name: string
    x?: number | null
    y?: number | null
    type?: string | null
    bio_hostiles?: string | null
    mech_hostiles?: string | null
    salvage?: string | null
    power?: string | null
    beacon?: string | null
    depth_m?: number | null
    ocean_floor_depth_m?: number | null
    top_depth_m?: number | null
    max_explored_depth_m?: number | null
    max_psi_reached?: number | null
    notes?: string | null
  }

  export type PoiUncheckedCreateInput = {
    id?: number
    name: string
    x?: number | null
    y?: number | null
    type?: string | null
    bio_hostiles?: string | null
    mech_hostiles?: string | null
    salvage?: string | null
    power?: string | null
    beacon?: string | null
    depth_m?: number | null
    ocean_floor_depth_m?: number | null
    top_depth_m?: number | null
    max_explored_depth_m?: number | null
    max_psi_reached?: number | null
    notes?: string | null
  }

  export type PoiUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    bio_hostiles?: NullableStringFieldUpdateOperationsInput | string | null
    mech_hostiles?: NullableStringFieldUpdateOperationsInput | string | null
    salvage?: NullableStringFieldUpdateOperationsInput | string | null
    power?: NullableStringFieldUpdateOperationsInput | string | null
    beacon?: NullableStringFieldUpdateOperationsInput | string | null
    depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    ocean_floor_depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    top_depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    max_explored_depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    max_psi_reached?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PoiUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    bio_hostiles?: NullableStringFieldUpdateOperationsInput | string | null
    mech_hostiles?: NullableStringFieldUpdateOperationsInput | string | null
    salvage?: NullableStringFieldUpdateOperationsInput | string | null
    power?: NullableStringFieldUpdateOperationsInput | string | null
    beacon?: NullableStringFieldUpdateOperationsInput | string | null
    depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    ocean_floor_depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    top_depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    max_explored_depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    max_psi_reached?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PoiCreateManyInput = {
    id?: number
    name: string
    x?: number | null
    y?: number | null
    type?: string | null
    bio_hostiles?: string | null
    mech_hostiles?: string | null
    salvage?: string | null
    power?: string | null
    beacon?: string | null
    depth_m?: number | null
    ocean_floor_depth_m?: number | null
    top_depth_m?: number | null
    max_explored_depth_m?: number | null
    max_psi_reached?: number | null
    notes?: string | null
  }

  export type PoiUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    bio_hostiles?: NullableStringFieldUpdateOperationsInput | string | null
    mech_hostiles?: NullableStringFieldUpdateOperationsInput | string | null
    salvage?: NullableStringFieldUpdateOperationsInput | string | null
    power?: NullableStringFieldUpdateOperationsInput | string | null
    beacon?: NullableStringFieldUpdateOperationsInput | string | null
    depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    ocean_floor_depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    top_depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    max_explored_depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    max_psi_reached?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PoiUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    x?: NullableIntFieldUpdateOperationsInput | number | null
    y?: NullableIntFieldUpdateOperationsInput | number | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    bio_hostiles?: NullableStringFieldUpdateOperationsInput | string | null
    mech_hostiles?: NullableStringFieldUpdateOperationsInput | string | null
    salvage?: NullableStringFieldUpdateOperationsInput | string | null
    power?: NullableStringFieldUpdateOperationsInput | string | null
    beacon?: NullableStringFieldUpdateOperationsInput | string | null
    depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    ocean_floor_depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    top_depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    max_explored_depth_m?: NullableIntFieldUpdateOperationsInput | number | null
    max_psi_reached?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LookupValueCreateInput = {
    category: string
    value: string
  }

  export type LookupValueUncheckedCreateInput = {
    id?: number
    category: string
    value: string
  }

  export type LookupValueUpdateInput = {
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type LookupValueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type LookupValueCreateManyInput = {
    id?: number
    category: string
    value: string
  }

  export type LookupValueUpdateManyMutationInput = {
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type LookupValueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PoiCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    x?: SortOrder
    y?: SortOrder
    type?: SortOrder
    bio_hostiles?: SortOrder
    mech_hostiles?: SortOrder
    salvage?: SortOrder
    power?: SortOrder
    beacon?: SortOrder
    depth_m?: SortOrder
    ocean_floor_depth_m?: SortOrder
    top_depth_m?: SortOrder
    max_explored_depth_m?: SortOrder
    max_psi_reached?: SortOrder
    notes?: SortOrder
  }

  export type PoiAvgOrderByAggregateInput = {
    id?: SortOrder
    x?: SortOrder
    y?: SortOrder
    depth_m?: SortOrder
    ocean_floor_depth_m?: SortOrder
    top_depth_m?: SortOrder
    max_explored_depth_m?: SortOrder
    max_psi_reached?: SortOrder
  }

  export type PoiMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    x?: SortOrder
    y?: SortOrder
    type?: SortOrder
    bio_hostiles?: SortOrder
    mech_hostiles?: SortOrder
    salvage?: SortOrder
    power?: SortOrder
    beacon?: SortOrder
    depth_m?: SortOrder
    ocean_floor_depth_m?: SortOrder
    top_depth_m?: SortOrder
    max_explored_depth_m?: SortOrder
    max_psi_reached?: SortOrder
    notes?: SortOrder
  }

  export type PoiMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    x?: SortOrder
    y?: SortOrder
    type?: SortOrder
    bio_hostiles?: SortOrder
    mech_hostiles?: SortOrder
    salvage?: SortOrder
    power?: SortOrder
    beacon?: SortOrder
    depth_m?: SortOrder
    ocean_floor_depth_m?: SortOrder
    top_depth_m?: SortOrder
    max_explored_depth_m?: SortOrder
    max_psi_reached?: SortOrder
    notes?: SortOrder
  }

  export type PoiSumOrderByAggregateInput = {
    id?: SortOrder
    x?: SortOrder
    y?: SortOrder
    depth_m?: SortOrder
    ocean_floor_depth_m?: SortOrder
    top_depth_m?: SortOrder
    max_explored_depth_m?: SortOrder
    max_psi_reached?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type LookupValueCountOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    value?: SortOrder
  }

  export type LookupValueAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LookupValueMaxOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    value?: SortOrder
  }

  export type LookupValueMinOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    value?: SortOrder
  }

  export type LookupValueSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PoiDefaultArgs instead
     */
    export type PoiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PoiDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LookupValueDefaultArgs instead
     */
    export type LookupValueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LookupValueDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}