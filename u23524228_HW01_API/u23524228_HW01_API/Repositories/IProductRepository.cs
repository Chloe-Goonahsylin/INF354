using u23524228_HW01_API.Models;
namespace u23524228_HW01_API.Repositories
{
   
        public interface IProductRepository//interface for product repository
    {
            Task<IEnumerable<Product>> GetAllProducts();//functions implemented in repo
            Task<Product?> GetProductById(int id);
            Task<Product> AddProduct(Product product);
            Task<Product?> UpdateProduct(Product product);
            Task<bool> DeleteProduct(int id);
        }


    
}
