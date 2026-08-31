import { NextFunction, Request, Response } from "express";
import { SupplyRequestService } from "../services/SupplyRequestService";

export class SupplyRequestController {
  private readonly service = new SupplyRequestService();

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(201).json(await this.service.create(req.body)); } catch (error) { next(error); }
  };
  updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json(await this.service.updateStatus(Number(req.params.id), req.body.requestStatus)); } catch (error) { next(error); }
  };
  active = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json(await this.service.getActive()); } catch (error) { next(error); }
  };
  history = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json(await this.service.getHistoryByClinic(Number(req.params.clinicId))); } catch (error) { next(error); }
  };
  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json(await this.service.softDelete(Number(req.params.id))); } catch (error) { next(error); }
  };
}
