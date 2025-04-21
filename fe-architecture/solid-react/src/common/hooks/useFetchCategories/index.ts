import { useEffect, useState } from "react";
import { ICategoryService } from "../../interfaces/categoryService.interface";
import { Category } from "../../types/category";

const useFetchCategories = (categoryService: ICategoryService) => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await categoryService.fetchCategories();
        setCategories(categoriesResponse);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [categoryService]);

  return {
    categories,
    isLoading,
    error,
  };
};

export default useFetchCategories;
