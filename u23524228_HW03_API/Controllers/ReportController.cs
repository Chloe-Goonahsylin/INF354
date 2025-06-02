using u23524228_HW03_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Dynamic;

namespace u23524228_HW03_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        // Access to the data repository
        private readonly IRepository _repository;
        public ReportController(IRepository repository)
        {
            _repository = repository;
        }

        // Returns a report with product stats by brand, product type, and top 10 expensive products
        [HttpGet]
        [Route("ProductsReport")]
        public async Task<ActionResult<dynamic>> ProductsReport()
        {
            try
            {
                // List to hold the report sections
                List<dynamic> productsreport = new List<dynamic>();

                // Get all products for the report
                var results = await _repository.GetProductsReportAsync();

                // Group products by brand and calculate stats
                dynamic brands = results
                    .GroupBy(p => p.Brand.Name)
                    .Select(b => new
                    {
                        Key = b.Key, // Brand name
                        ProductCount = b.Count(), // Number of products
                        ProductTotalCost = Math.Round((double)b.Sum(p => p.Price), 2), // Total price
                        ProductAverageCost = Math.Round((double)b.Average(p => p.Price), 2) // Average price
                    });

                // Group products by type and calculate stats
                dynamic productTypes = results
                    .GroupBy(p => p.ProductType.Name)
                    .Select(pt => new
                    {
                        Key = pt.Key, // Product type name
                        ProductCount = pt.Count(), // Number of products
                        ProductTotalCost = Math.Round((double)pt.Sum(p => p.Price), 2), // Total price
                        ProductAverageCost = Math.Round((double)pt.Average(p => p.Price), 2) // Average price
                    });

                // Get the 10 most expensive products
                dynamic top10MostExpensiveProducts = results
                    .OrderByDescending(p => p.Price)
                    .Take(10)
                    .Select(p => new
                    {
                        ProductName = p.Name,
                        BrandName = p.Brand.Name,
                        ProductTypeName = p.ProductType.Name,
                        ProductPrice = Math.Round((double)p.Price, 2)
                    });

                // Add all sections to the report
                productsreport.Add(brands);
                productsreport.Add(productTypes);
                productsreport.Add(top10MostExpensiveProducts);

                // Return the report
                return productsreport;
            }
            catch (Exception)
            {
                // Return error if something goes wrong
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }
    }
}
