import { Router } from 'express';

import creditBatchRoutes from './credit_batch.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/credit_batches', creditBatchRoutes);

export default router;
