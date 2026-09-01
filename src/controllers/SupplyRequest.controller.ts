import {
  NextFunction,
  Request,
  Response
} from "express";

import { SupplyRequestService } from "../services/supplyRequest.service";

import {
  CreateSupplyRequestDto,
  UpdateSupplyRequestStatusDto
} from "../dto/supplyRequest.dto";

/**
 * Controlador para la gestión de solicitudes de abastecimiento.
 * Maneja la creación, seguimiento, historial y actualización de estados.
 */
export class SupplyRequestController {
  private readonly service: SupplyRequestService =
    new SupplyRequestService();

  /**
   * Crea una nueva solicitud de abastecimiento validando clínica, almacén,
   * medicamento y disponibilidad del inventario.
   */
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

  /**
   * Cambia el estado de una solicitud (pendiente, aprobada, rechazada, etc.).
   */
  updateStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = req.body as UpdateSupplyRequestStatusDto & { status: string };

      const request = await this.service.updateStatus(
        Number(req.params.id),
    
        (data.status as unknown) as any
      );

      res.json(request);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Consulta las solicitudes que siguen activas en el sistema.
   */
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

  /**
   * Obtiene el historial de solicitudes asociado a una clínica.
   */
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

  /**
   * Elimina lógicamente una solicitud cuando ya no debe estar activa.
   */
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