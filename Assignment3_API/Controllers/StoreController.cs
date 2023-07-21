using Assignment3_Backend.Models;
using Assignment3_Backend.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Assignment3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IRepository repository;

        public StoreController(IRepository Repository)
        {
            repository = Repository;
        }

        //Get 
        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> GetProducts() 
        {
            try
            {
                var results = await repository.GetProductsAsync();

                dynamic productList = results.OrderByDescending(p => p.Price).Select(p => new
                {
                    ProductName = p.Name,
                    ProductPrice = Math.Round((double)p.Price, 2),
                    ProductBrand = p.Brand.Name,
                    ProductType = p.ProductType.Name,
                    ProductDescription = p.Description,
                    ProductImage = p.Image
                }).ToArray();

                return Ok(productList);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        //Add
        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct(ProductViewModel product) 
        {
            try
            {
                var results = await repository.AddProduct(product);
                if (results == 200)
                {
                    return Ok("Added " + product.name );

                }
                else
                {
                    return BadRequest("Product not added. Please retry");
                }

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        //  Product Types
        [HttpGet]
        [Route("GetProductTypes")]
        public async Task<ProductType[]> GetProductTypes()
        {
            return await repository.GetProductTypesAsync();
        }

        //  Brands 
        [HttpGet]
        [Route("GetBrands")]
        public async Task<Brand[]> GetBrands()
        {
            return await repository.GetBrandsAsync();
        }
    }
}
