import { FigureMapper } from "../mapper/figure.mapper";
import { Figure } from "@monorepo/shared";
import path from 'path';
import fs from 'fs';

export class FigureService {
    private figureMapper: FigureMapper;
    private readonly PUBLIC_PATH: string;
    private readonly IMAGE_BASE_URL: string;

    constructor() {
        this.figureMapper = new FigureMapper();
        this.PUBLIC_PATH = path.join(process.cwd(), 'public');
        this.IMAGE_BASE_URL = '/image/figure';
    }

    private processImagePath(figure: Partial<Figure>): Partial<Figure> {
        if (figure.image) {
            // 检查图片文件是否存在
            const imagePath = path.join(this.PUBLIC_PATH, '/image/figure', figure.image);
            console.log(imagePath)
            if (fs.existsSync(imagePath)) {
                console.log(2)
                // 返回完整的图片URL
                figure.image = `${this.IMAGE_BASE_URL}/${figure.image}`;
            } else {
                console.log(3)

                // 如果图片不存在，设置为默认图片
                figure.image = `${this.IMAGE_BASE_URL}/default.jpg`;
            }
        }
        return figure;
    }

    private processImagePaths(figures: Partial<Figure>[]): Partial<Figure>[] {
        return figures.map(figure => this.processImagePath(figure));
    }

    async getAllFigures(): Promise<Figure[]> {
        const figures = await this.figureMapper.findAll();
        return this.processImagePaths(figures) as Figure[];
    }

    async getFiguresByFields(fields: (keyof Figure)[]): Promise<Partial<Figure>[]> {
        // 确保 image 字段始终被包含
        const fieldsWithImage = fields.includes('image') ? fields : [...fields, 'image'];
        const figures = await this.figureMapper.findWithFields(fieldsWithImage as (keyof Figure)[]);
        return this.processImagePaths(figures);
    }

    async getFiguresByDynasty(dynasty: string, fields?: (keyof Figure)[]): Promise<Partial<Figure>[]> {
        // 确保 image 字段始终被包含
        const fieldsWithImage = fields 
            ? (fields.includes('image') ? fields : [...fields, 'image'])
            : ['name', 'dynasty', 'description', 'image'];
            
        const figures = await this.figureMapper.findByDynastyWithFields(dynasty, fieldsWithImage as (keyof Figure)[]);
        console.log('getFiguresByDynasty123', figures);
        return this.processImagePaths(figures);
    }

    // 获取图片文件
    async getImageFile(imageName: string): Promise<{ path: string; type: string } | null> {
        const imagePath = path.join(this.PUBLIC_PATH, 'images/figures', imageName);
        
        if (fs.existsSync(imagePath)) {
            const ext = path.extname(imageName).toLowerCase();
            const contentType = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif'
            }[ext] || 'application/octet-stream';

            return {
                path: imagePath,
                type: contentType
            };
        }
        
        return null;
    }
} 