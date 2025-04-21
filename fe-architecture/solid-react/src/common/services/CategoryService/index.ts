import { CATEGORIES_BASE_URL } from "../../constants/endpoints";
import { ICategoryService } from "../../interfaces/categoryService.interface";
import { IHttp } from "../../interfaces/http.interface";
import { Category } from "../../types/category";

const CategoryService = (http: IHttp): ICategoryService => ({
  fetchCategories: async () => {
    try {
      const { categories } = await http.get<{ categories: Category[] }>(
        CATEGORIES_BASE_URL
      );
      return categories;
    } catch {
      throw new Error("Erro ao buscar categorias.");
    }
  },
});

export default CategoryService;
