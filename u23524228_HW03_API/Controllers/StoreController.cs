using u23524228_HW03_API.Models;
using u23524228_HW03_API.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace u23524228_HW03_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        // Repository for data access
        private readonly IRepository _repository;
        public StoreController(IRepository repository)
        {
            _repository = repository;
        }

        // Get a list of all products
        [HttpGet]
        [Route("ProductListing")]
        public async Task<ActionResult> ProductListing()
        {
            try
            {
                var results = await _repository.GetProductsAsync();

                // Select product details to return
                dynamic products = results.Select(p => new
                {
                    p.ProductId,
                    p.Price,
                    ProductTypeName = p.ProductType.Name,
                    BrandName = p.Brand.Name,
                    p.Name,
                    p.Description,
                    p.DateCreated,
                    p.DateModified,
                    p.IsActive,
                    p.IsDeleted,
                    p.Image
                });

                return Ok(products);
            }
            catch (Exception)
            {
                // Return error if something goes wrong
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }

        // Add a new product (with image upload)
        [HttpPost, DisableRequestSizeLimit]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct([FromForm] IFormCollection formData)
        {
            try
            {
                // Read form data including files
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();

                if (file.Length > 0)
                {
                    // Convert file to base64 string
                    using (var ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        string base64 = Convert.ToBase64String(fileBytes);

                        // Parse price using invariant culture
                        string price = formData["price"];
                        decimal num = decimal.Parse(price, CultureInfo.InvariantCulture);

                        // Create new product object
                        var product = new Product
                        {
                            Price = num,
                            Name = formData["name"],
                            Description = formData["description"],
                            BrandId = Convert.ToInt32(formData["brand"]),
                            ProductTypeId = Convert.ToInt32(formData["producttype"]),
                            Image = base64,
                            DateCreated = DateTime.Now
                        };

                        // Add and save product to the database
                        _repository.Add(product);
                        await _repository.SaveChangesAsync();
                    }

                    return Ok();
                }
                else
                {
                    // No file uploaded
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                // Return error if something goes wrong
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        // Get a list of all brands
        [HttpGet]
        [Route("Brands")]
        public async Task<ActionResult> Brands()
        {
            try
            {
                var results = await _repository.GetBrandsAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                // Return error if something goes wrong
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }

        // Get a list of all product types
        [HttpGet]
        [Route("ProductTypes")]
        public async Task<ActionResult> ProductTypes()
        {
            try
            {
                var results = await _repository.GetProductTypesAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                // Return error if something goes wrong
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }
    }
}
