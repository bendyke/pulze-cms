import { Request, Response } from 'express';

import { ApiResponse } from '../interfaces/common.interfaces';
import { IUserCreditBatches } from '../interfaces/CreditBatch.interfaces';
import creditBatchService from '../services/CreditBatch.service';

export class CreditBatchController {
  public async getCreditBatchesByUserId(req: Request, res: Response) {
    try {
      const creditBatches = await creditBatchService.getCreditBatchesByUserId(
        req.params.userId
      );
      const response: ApiResponse<IUserCreditBatches> = {
        success: true,
        data: creditBatches,
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
      return res.status(500).json(response);
    }
  }

  public async consumeCreditsForUser(req: Request, res: Response) {
    try {
      const consumeResponse = await creditBatchService.consumeCreditsForUser(
        req.params.userId,
        req.body.creditsToConsume
      );
      const response: ApiResponse<IUserCreditBatches> = {
        success: true,
        data: consumeResponse,
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
      return res.status(500).json(response);
    }
  }

  // CRUD operations for CreditBatch
  public async createCreditBatch(req: Request, res: Response) {
    try {
      const creditBatch = await creditBatchService.createCreditBatch(req.body);
      const response: ApiResponse<typeof creditBatch> = {
        success: true,
        data: creditBatch,
      };
      return res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
      return res.status(500).json(response);
    }
  }

  public async getCreditBatch(req: Request, res: Response) {
    try {
      const creditBatch = await creditBatchService.getCreditBatchById(
        req.params.id
      );
      const response: ApiResponse<typeof creditBatch> = {
        success: true,
        data: creditBatch,
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
      return res.status(500).json(response);
    }
  }

  public async getAllCreditBatches(req: Request, res: Response) {
    try {
      const creditBatches = await creditBatchService.getAllCreditBatches();
      const response: ApiResponse<typeof creditBatches> = {
        success: true,
        data: creditBatches,
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
      return res.status(500).json(response);
    }
  }

  public async updateCreditBatch(req: Request, res: Response) {
    try {
      const creditBatch = await creditBatchService.updateCreditBatch(
        req.params.id,
        req.body
      );
      const response: ApiResponse<typeof creditBatch> = {
        success: true,
        data: creditBatch,
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
      return res.status(500).json(response);
    }
  }

  public async deleteCreditBatch(req: Request, res: Response) {
    try {
      await creditBatchService.deleteCreditBatch(req.params.id);
      const response: ApiResponse<null> = {
        success: true,
        data: null,
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
      return res.status(500).json(response);
    }
  }
}

export default new CreditBatchController();
