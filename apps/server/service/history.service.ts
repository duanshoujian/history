import { HistoryMapper } from "../mapper/history.mapper";
import { DynastyRecord } from "../types/history";



export class HistoryService {
    private historyMapper: HistoryMapper;

    constructor() {
        this.historyMapper = new HistoryMapper();
    }

    async getHistory(): Promise<DynastyRecord[]> {
        return this.historyMapper.findHistory();
    }
}