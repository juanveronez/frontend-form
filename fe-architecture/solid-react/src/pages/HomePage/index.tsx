import Button from "../../components/Button";
import Categories from "../../components/Categories";
import HeroBanner from "../../components/HeroBanner";
import Newsletter from "../../components/Newsletter";
import ProductList from "../../components/ProductList";
import Typography from "../../components/Typography";
import { Category } from "../../common/types/category";
import { CATEGORIES_BASE_URL } from "../../common/constants/endpoints";
import StatusHandler from "../../common/utils/statusHandler";
import useFetch from "../../common/hooks/useFetch";
import Http from "../../common/lib/httpClient";
import ProductService from "../../common/services/productService";
import useFetchProducts from "../../common/hooks/useFetchProducts";

const httpService = Http();
const productService = ProductService(httpService);

function HomePage() {
  const handleSubscribe = (email: string) => {
    console.log(`Usuário inscrito com o email: ${email}`);
  };

  // Fetch de categorias
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: isLoadingCategories,
  } = useFetch<{ categories: Category[] }>(CATEGORIES_BASE_URL);

  // Fetch de produtos
  const {
    products,
    error: productsError,
    isLoading: isLoadingProducts,
  } = useFetchProducts(productService);

  return (
    <>
      <HeroBanner
        backgroundImage="https://raw.githubusercontent.com/gss-patricia/use-dev-assets/refs/heads/main/banner-seceos-tablet.png"
        mainImage="https://raw.githubusercontent.com/gss-patricia/use-dev-assets/8df6d50256e4b270eb794ccbc0314baf2a656211/hero.png"
      >
        <Typography variant="h1">
          Hora de abraçar seu{" "}
          <span style={{ color: "#8fff24" }}>lado geek!</span>
        </Typography>
        <Button onClick={() => console.log("ver novidades")} size="large">
          Ver as novidades!
        </Button>
      </HeroBanner>
      <main className="container">
        <StatusHandler isLoading={isLoadingCategories} error={categoriesError}>
          {categoriesData && (
            <Categories categories={categoriesData.categories} />
          )}
        </StatusHandler>

        <StatusHandler isLoading={isLoadingProducts} error={productsError}>
          {products && (
            <ProductList title="Promoções especiais" products={products} />
          )}
        </StatusHandler>
      </main>
      <Newsletter onSubscribe={handleSubscribe} />
    </>
  );
}

export default HomePage;
