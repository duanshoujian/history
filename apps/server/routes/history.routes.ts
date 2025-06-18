
import { Router } from 'express';
import { HistoryController } from '../controller/history.controller';



const router = Router();

let historyControllerInstance: HistoryController | null = null;
const getUserController = () => {
  if (!historyControllerInstance) {
    historyControllerInstance = new HistoryController();
  }
  return historyControllerInstance;
};

router.get('/all', async (req, res) => {
  const controller = getUserController();
  await controller.getHistory(req, res);
});

export default router;