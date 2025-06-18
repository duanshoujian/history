import { HistoryService } from "../service/history.service";
import { Request, Response } from 'express';
import { ResponseUtil } from '../utils/response.util';

export class HistoryController {
  private historyService: HistoryService;

  constructor() {
    this.historyService = new HistoryService();
  }

  async getHistory(req: Request, res: Response) {
    try {
      const history = await this.historyService.getHistory();
      ResponseUtil.success(res, history );
    } catch (error) {
      ResponseUtil.error(res, error);
    }
  }
}
