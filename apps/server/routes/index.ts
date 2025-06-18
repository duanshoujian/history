import { Router } from 'express';
import userRoutes from './user.routes.ts';
import historyRoutes from './history.routes.ts';
import figureRoutes from './figure.routes.ts';
import articleRoutes from './article.routes.ts';


const router = Router();

// Register routes
router.use('/api/users', userRoutes);
router.use('/api/history', historyRoutes);
router.use('/api/figure', figureRoutes);
router.use('/api/articles', articleRoutes);

export default router; 