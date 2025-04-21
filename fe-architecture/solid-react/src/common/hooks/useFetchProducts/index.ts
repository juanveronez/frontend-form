import { useEffect, useState } from "react";
import { IproductService } from "../../interfaces/productService.interface";
import { Product } from "../../types/product";

const useFetchProducts = (productService: IproductService) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await productService.fetchProducts();
        setProducts(productsResponse);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productService]);

  return {
    products,
    isLoading,
    error,
  };
};

export default useFetchProducts;
