using Microsoft.AspNetCore.Mvc;
using Moq;
using u23524228_HW01_API.Controllers;
using u23524228_HW01_API.Models;
using u23524228_HW01_API.Repositories;
using Xunit;
using System.Collections.Generic;

namespace u23524228_HW01_API.Tests
{
    public class ProductControllerTests//testing class for product controller 
    {
        private readonly Mock<IProductRepository> _mockRepo;//mock repo
        private readonly ProductController _controller;//controller that we gonna test

        public ProductControllerTests()
        {
            _mockRepo = new Mock<IProductRepository>();
            _controller = new ProductController(_mockRepo.Object);
        }

        [Fact]
        public async void GetAllProducts_ReturnsOkResult_WithListOfProducts()//test for getallproduct()
        {
            // Arrange
            var products = new List<Product>//sets up mock data and repo behaviour 
            {
                new Product { Id = 1, Name = "Product1", Price = 15, Description = "Desc1" },
                new Product { Id = 2, Name = "Product2", Price = 25, Description = "Desc2" }
            };

            _mockRepo.Setup(repo => repo.GetAllProducts()).ReturnsAsync(products);

            // Act
            var result = await _controller.GetAllProduct();// calls the controllers getall method 

            // Assert....verify result .....
            var okResult = Assert.IsType<OkObjectResult>(result.Result);//check if ok result
            var returnProducts = Assert.IsType<List<Product>>(okResult.Value);
            Assert.NotNull(returnProducts);//check if not null
        }

        [Fact]
        public async void GetProductById_ReturnsOkResult_WithProduct()//test method for getproductbyid()
        {
            // Arrange...set up mock data and repo behaviour 
            var product = new Product { Id = 1, Name = "Product1", Price = 10, Description = "Desc1" };
            _mockRepo.Setup(repo => repo.GetProductById(1)).ReturnsAsync(product);

            // Act...Call controller method 
            var result = await _controller.GetProduct(1);

            // Assert...Verify result 
            var okResult = Assert.IsType<OkObjectResult>(result.Result);//check if ok result
            var returnProduct = Assert.IsType<Product>(okResult.Value);
            Assert.NotNull(returnProduct);//check if not null
        }
    }
}
