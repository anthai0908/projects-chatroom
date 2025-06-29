import { AppDataSource } from "../data-source";
import { ThreadCategory } from "./ThreadCategory";
import { QueryArrayResult } from "./QueryArrayResult";
export const getAllCategories = async () : Promise<QueryArrayResult<ThreadCategory>> => {
        const threadCategoryRepo = AppDataSource.getRepository(ThreadCategory);
        const categories = await threadCategoryRepo.find();
        return {
            entities : categories,
        }

    }