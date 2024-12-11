import { Request, Response } from 'express';

import { ApiResponse } from '../interfaces/common.interfaces';
import userService from '../services/User.service';

export class UserController {
  public async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      const response: ApiResponse<typeof users> = {
        success: true,
        data: users,
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

  public async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      const response: ApiResponse<typeof user> = {
        success: true,
        data: user,
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

  public async getUser(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(req.params.id);
      const response: ApiResponse<typeof user> = {
        success: true,
        data: user,
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

  public async updateUser(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      const response: ApiResponse<typeof user> = {
        success: true,
        data: user,
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

  public async deleteUser(req: Request, res: Response) {
    try {
      await userService.deleteUser(req.params.id);
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

export default new UserController();
