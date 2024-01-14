import { Request, Response } from 'express';
import CategoryModel from '../models/category.model';

class CategoryController {
    async createCategory(req: Request, res: Response) {
        try {
            const name = req.body.name;
            console.log(req.body);
            
            const category = await CategoryModel.createCategory(name);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async getAllCategories(req: Request, res: Response) {
        try {
            const works = await CategoryModel.GetAllCategories();
            if (works.length != 0)
                res.json(works);
            else
                res.status(404).json({ message: "No work Found" });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async getCategoryById(req: Request, res: Response) {
        try {
            const category = await CategoryModel.findCategoryById(parseInt(req.params.categoryId));
            if (category) {
                res.json(category);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const category = await CategoryModel.updateCategory(parseInt(req.params.categoryId), req.body);
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            await CategoryModel.deleteCategory(parseInt(req.params.categoryId));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default new CategoryController();
