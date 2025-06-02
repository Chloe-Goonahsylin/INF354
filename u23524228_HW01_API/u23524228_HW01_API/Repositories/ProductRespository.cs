using Microsoft.EntityFrameworkCore;
using u23524228_HW01_API.Data;
using u23524228_HW01_API.Models;

namespace u23524228_HW01_API.Repositories
{
    public class ProductRespository : IProductRepository
    {
        private readonly ApplicationDbContext _context;//variable for database so we can work with the database
    
    public ProductRespository(ApplicationDbContext context)//constructor 
        {
            _context = context;//context now representas the database 
        }

        public async Task<IEnumerable<Product>> GetAllProducts()//asyn = allows
        {
            return await _context.Products.ToListAsync();
        }
        /*
          public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _context.Products.OrderBy(p => p.Name).ToListAsync();
        }

         */

        public async Task<Product?> GetProductById(int id)//gets product by id db
        {
            return await _context.Products.FirstOrDefaultAsync(s => s.Id == id);
        }
        public async Task<Product> AddProduct(Product products)//adds a product to the database
        {
            _context.Products.Add(products);
            await _context.SaveChangesAsync();
            return products;
        }

        public async Task<Product?> UpdateProduct(Product products)//updates existing product in db 
        {
            var existingProduct = await _context.Products.FindAsync(products.Id);
            if (existingProduct == null) return null;

            existingProduct.Name = products.Name;
            existingProduct.Description = products.Description;
            existingProduct.Price = products.Price;

            await _context.SaveChangesAsync();
            return existingProduct;
        }

        public async Task<bool> DeleteProduct(int id)//deletes product from db
        {
            var student = await _context.Products.FindAsync(id);
            if (student == null) return false;

            _context.Products.Remove(student);
            await _context.SaveChangesAsync();
            return true;
        }


    }
}
