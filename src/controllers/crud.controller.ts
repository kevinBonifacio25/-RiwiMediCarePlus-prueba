import { NextFunction, Request, Response } from "express";

/**
 * Controlador genérico para CRUD de entidades del sistema.
 * Se reutiliza para clínicas, almacenes y medicamentos.
 */
export class CrudController {
  constructor(private readonly service: any) {}

  /**
   * Crea un nuevo registro en la entidad configurada.
   */
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { 
      res.status(201).json(await this.service.create(req.body)); } 
      catch (error) { next(error); }
  };


  /**
   * Devuelve todos los registros activos de la entidad.
   */
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
       res.json(await this.service.getAll()); }
        catch (error) { next(error); }
  };


  /**
   * Busca un registro por su identificador.
   */
  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { 
      res.json(await this.service.getById(Number(req.params.id))); } 
      catch (error) { next(error); }
  };


  /**
   * Actualiza un registro existente usando el id de la ruta.
   */
  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json(await this.service.update(Number(req.params.id), req.body)); } catch (error) { next(error); }
  };

  
  /**
   * Elimina lógicamente el registro cambiando su estado a eliminado.
   */
  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { 
      res.json(await this.service.softDelete(Number(req.params.id))); } 
      catch (error) { next(error); }
  };
}
