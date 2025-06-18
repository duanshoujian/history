import { Request, Response } from 'express';
import { FigureService } from '../service/figure.service';
import { Figure } from '@monorepo/shared';
import fs from 'fs';
import { ResponseUtil } from '../utils/response.util';

export class FigureController {
    private figureService: FigureService;

    constructor() {
        this.figureService = new FigureService();
    }

    async getAllFigures(req: Request, res: Response): Promise<void> {
        try {
            const figures = await this.figureService.getAllFigures();
            ResponseUtil.success(res, figures);
        } catch (error) {
            ResponseUtil.error(res, error);
        }
    }

    async getFiguresByFields(req: Request, res: Response): Promise<void> {
        try {
            const { fields } = req.query;
            if (!fields || !Array.isArray(fields)) {
                ResponseUtil.badRequest(res, 'Fields parameter is required and must be an array');
                return;
            }
            const figures = await this.figureService.getFiguresByFields(fields as (keyof Figure)[]);
            ResponseUtil.success(res, figures);
        } catch (error) {
            ResponseUtil.error(res, error);
        }
    }

    async getFiguresByDynasty(req: Request, res: Response): Promise<void> {
        try {
            const { dynasty } = req.params;
            const { fields } = req.query;

            console.log('getFiguresByDynasty', dynasty, fields);
            
            const figures = await this.figureService.getFiguresByDynasty(
                dynasty,
                fields ? (fields as string).split(',') as (keyof Figure)[] : undefined
            );
            ResponseUtil.success(res, figures);
        } catch (error) {
            ResponseUtil.error(res, error);
        }
    }

    async getImage(req: Request, res: Response): Promise<void> {
        try {
            const { imageName } = req.params;
            const imageFile = await this.figureService.getImageFile(imageName);
            
            if (!imageFile) {
                ResponseUtil.notFound(res, 'Image not found');
                return;
            }

            res.setHeader('Content-Type', imageFile.type);
            const stream = fs.createReadStream(imageFile.path);
            stream.pipe(res);
        } catch (error) {
            ResponseUtil.error(res, error);
        }
    }
} 