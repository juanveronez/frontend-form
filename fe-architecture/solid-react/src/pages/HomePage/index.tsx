import Button from "../../components/Button";
import Categories from "../../components/Categories";
import HeroBanner from "../../components/HeroBanner";
import Newsletter from "../../components/Newsletter";
import ProductList from "../../components/ProductList";
import Typography from "../../components/Typography";
import StatusHandler from "../../common/utils/statusHandler";
import Http from "../../common/lib/httpClient";
import ProductService from "../../common/services/ProductService";
import useFetchProducts from "../../common/hooks/useFetchProducts";
import CategoryService from "../../common/services/CategoryService";
import useFetchCategories from "../../common/hooks/useFetchCategories";

const httpService = Http();
const productService = ProductService(httpService);
const categoryService = CategoryService(httpService);

function HomePage() {
  const handleSubscribe = (email: string) => {
    console.log(`Usuário inscrito com o email: ${email}`);
  };

  // Fetch de categorias
  const {
    categories,
    error: categoriesError,
    isLoading: isLoadingCategories,
  } = useFetchCategories(categoryService);

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
          {categories && <Categories categories={categories} />}
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
