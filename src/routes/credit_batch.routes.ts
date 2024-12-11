import { Router } from 'express';

import creditBatchController from '../controllers/CreditBatch.controller';

const router = Router();

router.get('/user/:userId', (req, res) => {
  creditBatchController.getCreditBatchesByUserId(req, res);
});

router.post('/consume/:userId', (req, res) => {
  creditBatchController.consumeCreditsForUser(req, res);
});

// CRUD Routes

router.get('/', (req, res) => {
  creditBatchController.getAllCreditBatches(req, res);
});

router.post('/', (req, res) => {
  creditBatchController.createCreditBatch(req, res);
});

router.get('/:id', (req, res) => {
  creditBatchController.getCreditBatch(req, res);
});

router.put('/:id', (req, res) => {
  creditBatchController.updateCreditBatch(req, res);
});

router.delete('/:id', (req, res) => {
  creditBatchController.deleteCreditBatch(req, res);
});

export default router;
