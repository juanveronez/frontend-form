import { PRODUCTS_BASE_URL } from "../../constants/endpoints";
import { IHttp } from "../../interfaces/http.interface";
import { IproductService } from "../../interfaces/productService.interface";
import { Product } from "../../types/product";

const ProductService = (http: IHttp): IproductService => ({
  fetchProducts: async () => {
    try {
      const productsData = await http.get<{ products: Product[] }>(
        PRODUCTS_BASE_URL
      );
      return productsData.products;
    } catch {
      throw new Error("Erro ao buscar produtos");
    }
  },
});

export default ProductService;
