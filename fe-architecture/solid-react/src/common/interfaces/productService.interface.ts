import { Product } from "../types/product";

export interface IproductService {
  fetchProducts: () => Promise<Product[]>;
}
