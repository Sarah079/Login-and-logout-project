using Assignment3_Backend.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Assignment3_Backend.Models
{
    public class Repository:IRepository
    {
        private readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public void Add<T>(T entity) where T : class
        {
            _appDbContext.Add(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        public async Task<Product[]> GetProductsAsync()            
        {
                IQueryable<Product> query = _appDbContext.Products.Include(p => p.ProductType).Include(p => p.Brand);
                return await query.ToArrayAsync();                                  
        }

        public async Task<int> AddProduct(ProductViewModel model)
        {
            int result = 200;
            try
            {
                Product newproduct = new Product();
                                
                newproduct.Name = model.name;                
                newproduct.Description = model.description;
                newproduct.Price = model.price;
                newproduct.Image = model.image;
                newproduct.ProductTypeId = model.producttype;
                newproduct.BrandId = model.brand;

                await _appDbContext.Products.AddAsync(newproduct);
                await _appDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return result = 500;
            }

            return result;
        }
        public async Task<ProductType[]> GetProductTypesAsync()
        {
            return await _appDbContext.ProductTypes.ToArrayAsync();
        }
        public async Task<Brand[]> GetBrandsAsync()
        {
            return await _appDbContext.Brands.ToArrayAsync();
        }

    }
}
