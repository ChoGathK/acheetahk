"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonEntity = void 0;
const typeorm_1 = require("typeorm");
/**
 * typeorm public static method
 */
class CommonEntity extends typeorm_1.BaseEntity {
    /**
     * Query a single record by ID
     *
     * id ID
     *
     * maybeOptions Optional configuration when writing
     */
    static toFindById(id, maybeOptions) {
        return this.getRepository().findOne({ where: { id, isDeleted: false } }, maybeOptions);
    }
    /**
     * Query a single record by condition
     *
     * optionsOrConditions Query conditions
     *
     * maybeOptions Optional configuration when writing
     */
    static toFindOne(optionsOrConditions, maybeOptions) {
        optionsOrConditions.where = {
            ...optionsOrConditions.where,
            isDeleted: false,
        };
        return this.getRepository().findOne(optionsOrConditions, maybeOptions);
    }
    /**
     * Query multiple records by condition
     *
     * optionsOrConditions Query conditions
     *
     * maybeOptions Optional configuration when writing
     */
    static toFindAll(optionsOrConditions) {
        optionsOrConditions.where = {
            ...optionsOrConditions.where,
            isDeleted: false,
        };
        return this.getRepository().find(optionsOrConditions);
    }
    /**
     * Create
     *
     * entityPart Entity (partial)）
     *
     * maybeOptions Optional configuration when writing
     */
    static toCreate(entityPart, maybeOptions) {
        const entity = this.getRepository().create(entityPart);
        return this.getRepository().save(entity, maybeOptions);
    }
    /**
     * Create all
     *
     * entityPartArray Entity (partial) list
     *
     * maybeOptions Optional configuration when writing
     */
    static toCreateAll(entityPartArray, maybeOptions) {
        const entities = this.getRepository().create(entityPartArray);
        return this.getRepository().save(entities, maybeOptions);
    }
    /**
     * Update eligible entities
     *
     * criteria Update criteria
     *
     * entityPart Some entities that need to be updated
     *
     * maybeOptions Optional configuration when writing
     */
    static toChange(criteria, entityPart, maybeOptions) {
        const nowCriteria = { ...criteria, isDeleted: false };
        return this.getRepository().update(nowCriteria, entityPart, maybeOptions);
    }
    /**
     * Soft delete eligible entities
     *
     * criteria Update criteria
     *
     * maybeOptions Optional configuration when writing
     */
    static toSoftRemove(criteria, maybeOptions) {
        const nowCriteria = { ...criteria, isDeleted: false };
        return this.getRepository().update(nowCriteria, { isDeleted: true }, maybeOptions);
    }
}
exports.CommonEntity = CommonEntity;
//# sourceMappingURL=entity.common.js.map