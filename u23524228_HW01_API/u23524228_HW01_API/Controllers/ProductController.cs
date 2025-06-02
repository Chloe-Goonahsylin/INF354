using Microsoft.AspNetCore.Mvc;
using u23524228_HW01_API.Models;
using u23524228_HW01_API.Repositories;

namespace u23524228_HW01_API.Controllers
{
    [Route("api/[controller]")] //  the route for the controller (defines it) 
    [ApiController] 
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _repository;

        public ProductController(IProductRepository repository)//constructor
        {
            _repository = repository;
        }

        
        [HttpGet] // HTTP GET method to get all products
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProduct()
        {
            return Ok(await _repository.GetAllProducts());
        }

        
        [HttpGet("{id}")] // HTTP GET method to get a product by ID
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            
            var product = await _repository.GetProductById(id);
            return product == null ? NotFound() : Ok(product);
        }

      
        [HttpPost] // HTTP POST method to add a new product
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            
            var newProduct = await _repository.AddProduct(product);
            
            return CreatedAtAction(nameof(GetProduct), new { id = newProduct.Id }, newProduct);
        }

       
        [HttpPut("{id}")] // HTTP PUT method to update an existing product
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.Id) return BadRequest();// returns bad request if ID does not match
            var updatedProduct = await _repository.UpdateProduct(product);
            return updatedProduct == null ? NotFound() : NoContent(); // returns a NotFound if the product is not found
        }

        [HttpDelete("{id}")] // HTTP DELETE method to delete a product by ID
        public async Task<IActionResult> DeleteProduct(int id)
        {
           
            return await _repository.DeleteProduct(id) ? NoContent() : NotFound();
        }
    }
}
