import { Category } from "../../models/entities/products/category.entity";
import { AppDataSource } from "../../models/database/connection"
 const categoryRepository = AppDataSource.getRepository(Category);

export const createCategoryDb = async (categories: any) => {

    const category = await categoryRepository.save(categories);
    if (!category) {
        return null;
    }
    return category;
}

export const findCategoryById = async (id: number) => {

    const category = await categoryRepository.findOne({ where: { id } })
    if (!category) {
        return null;
    }
    return category;
}


export const findCategoryByName = async (name: string) => {

    const category = await categoryRepository.findOne({ where: { name } })


    if (!category) {
        return null;
    }
    return category;
}

export const updateCategory = async (id: number, name: string) => {

    const category = await categoryRepository.update(id, { name })
    if (!category) {
        return null;
    }
    return category;
}

export const deleteCategory = async (id: number) => {
    const category = await categoryRepository.delete(id)
    if (!category) {
        return null;
    }
    return category;
}