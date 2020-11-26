import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity, ObjectType, FindOneOptions, ObjectID, FindConditions, FindManyOptions, SaveOptions, DeepPartial, UpdateResult } from 'typeorm';
/**
 * typeorm public static method
 */
export declare class CommonEntity extends BaseEntity {
    /**
     * Query a single record by ID
     *
     * id ID
     *
     * maybeOptions Optional configuration when writing
     */
    static toFindById<T extends BaseEntity>(this: ObjectType<T>, id: number, maybeOptions?: FindOneOptions<T>): Promise<T | undefined>;
    /**
     * Query a single record by condition
     *
     * optionsOrConditions Query conditions
     *
     * maybeOptions Optional configuration when writing
     */
    static toFindOne<T extends BaseEntity>(this: ObjectType<T>, optionsOrConditions?: FindOneOptions<T>, maybeOptions?: FindOneOptions<T>): Promise<T | undefined>;
    /**
     * Query multiple records by condition
     *
     * optionsOrConditions Query conditions
     *
     * maybeOptions Optional configuration when writing
     */
    static toFindAll<T extends BaseEntity>(this: ObjectType<T>, optionsOrConditions?: FindManyOptions<T>): Promise<T[]>;
    /**
     * Create
     *
     * entityPart Entity (partial)）
     *
     * maybeOptions Optional configuration when writing
     */
    static toCreate<T extends BaseEntity>(this: ObjectType<T>, entityPart: DeepPartial<T>, maybeOptions?: SaveOptions): Promise<T>;
    /**
     * Create all
     *
     * entityPartArray Entity (partial) list
     *
     * maybeOptions Optional configuration when writing
     */
    static toCreateAll<T extends BaseEntity>(this: ObjectType<T>, entityPartArray: Array<DeepPartial<T>>, maybeOptions?: SaveOptions): Promise<T[]>;
    /**
     * Update eligible entities
     *
     * criteria Update criteria
     *
     * entityPart Some entities that need to be updated
     *
     * maybeOptions Optional configuration when writing
     */
    static toChange<T extends BaseEntity>(this: ObjectType<T>, criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<T>, entityPart: QueryDeepPartialEntity<T>, maybeOptions?: SaveOptions): Promise<UpdateResult>;
    /**
     * Soft delete eligible entities
     *
     * criteria Update criteria
     *
     * maybeOptions Optional configuration when writing
     */
    static toSoftRemove<T extends BaseEntity>(this: ObjectType<T>, criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<T>, maybeOptions?: SaveOptions): Promise<UpdateResult>;
}
