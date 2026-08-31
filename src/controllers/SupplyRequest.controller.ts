import {
  NextFunction,
  Request,
  Response
} from "express";

import { SupplyRequestService } from "../services/SupplyRequestService";

import {
  CreateSupplyRequestDto,
  UpdateSupplyRequestStatusDto
} from "../dtos/supplyRequest.dto";

export class SupplyRequestController {
  private readonly service: SupplyRequestService =
    new SupplyRequestService();

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: CreateSupplyRequestDto =
        req.body;

      const request =
        await this.service.create(data);

      res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: UpdateSupplyRequestStatusDto =
        req.body;

      const request =
        await this.service.updateStatus(
          Number(req.params.id),
          data
        );

      res.json(request);
    } catch (error) {
      next(error);
    }
  };

  active = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const requests =
        await this.service.getActive();

      res.json(requests);
    } catch (error) {
      next(error);
    }
  };

  history = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const requests =
        await this.service.getHistoryByClinic(
          Number(req.params.clinicId)
        );

      res.json(requests);
    } catch (error) {
      next(error);
    }
  };

  remove = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const request =
        await this.service.softDelete(
          Number(req.params.id)
        );

      res.json(request);
    } catch (error) {
      next(error);
    }
  };
}