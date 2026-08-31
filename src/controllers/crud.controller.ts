import { NextFunction, Request, Response } from "express";

export class CrudController {
  constructor(private readonly service: any) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { 
      res.status(201).json(await this.service.create(req.body)); } 
      catch (error) { next(error); }
  };


  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
       res.json(await this.service.getAll()); }
        catch (error) { next(error); }
  };


  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { 
      res.json(await this.service.getById(Number(req.params.id))); } 
      catch (error) { next(error); }
  };


  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json(await this.service.update(Number(req.params.id), req.body)); } catch (error) { next(error); }
  };

  
  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { 
      res.json(await this.service.softDelete(Number(req.params.id))); } 
      catch (error) { next(error); }
  };
}
