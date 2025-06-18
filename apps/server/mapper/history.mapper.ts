import { Collection } from "mongodb";
import { getCollection } from "../mongodb/connection";
import { DynastyRecord } from "../types/history";


export class HistoryMapper {
    private collection: Collection<DynastyRecord>;

    constructor() {
        this.collection = getCollection<DynastyRecord>('history');
    }

    async findHistory(): Promise<DynastyRecord[]> {
        return this.collection.find().toArray();
    }
    
}