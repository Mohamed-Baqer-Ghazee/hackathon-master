import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CategoryModel {
    async createCategory(name: string) {
        try {
            return await prisma.category.create({
                data: { name }
            });
        } catch (error) {
            throw new Error('Failed to create a category');
        }
    }

    async GetAllCategories() {
        try {
            return await prisma.category.findMany();
        } catch (error) {
            throw new Error('Failed to retrieve all categories');
        }
    }

    async findCategoryById(categoryId: number) {
        try {
            return await prisma.category.findUnique({
                where: { id: categoryId }
            });
        } catch (error) {
            throw new Error('Failed to find a category by ID');
        }
    }

    async updateCategory(categoryId: number, updateData: { content?: string; rating?: number }) {
        try {
            return await prisma.category.update({
                where: { id: categoryId },
                data: updateData
            });
        } catch (error) {
            throw new Error('Failed to update a category');
        }
    }

    async deleteCategory(categoryId: number) {
        try {
            return await prisma.category.delete({
                where: { id: categoryId }
            });
        } catch (error) {
            throw new Error('Failed to delete a category');
        }
    }
}

export default new CategoryModel();
