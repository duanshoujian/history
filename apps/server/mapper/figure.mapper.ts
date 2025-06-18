import { Collection } from "mongodb";
import { getCollection } from "../mongodb/connection";
import { Figure } from "@monorepo/shared";

export class FigureMapper {
    private collection: Collection<Figure>;

    constructor() {
        this.collection = getCollection<Figure>('figures');
    }

    // 查询所有字段
    async findAll(): Promise<Figure[]> {
        return this.collection.find().toArray();
    }

    // 只查询指定字段
    async findWithFields(fields: (keyof Figure)[]): Promise<Partial<Figure>[]> {
        const projection: Record<string, 1> = {};
        fields.forEach(field => {
            projection[field] = 1;
        });
        // 始终包含 _id
        projection._id = 1;
        
        return this.collection.find({}, { projection }).toArray();
    }

    // 按朝代查询指定字段
    async findByDynastyWithFields(dynasty: string, fields: (keyof Figure)[]): Promise<Partial<Figure>[]> {
        const projection: Record<string, 1> = {};
        fields.forEach(field => {
            projection[field] = 1;
        });
        projection._id = 1;
        console.log('projection', projection, dynasty);
        return this.collection.find({ dynasty }, { projection }).toArray();
    }
} 