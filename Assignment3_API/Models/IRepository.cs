using Assignment3_Backend.ViewModels;

namespace Assignment3_Backend.Models
{
    public interface IRepository
    {
        Task<bool> SaveChangesAsync();
        
        void Add<T>(T entity) where T : class;

        Task<Product[]> GetProductsAsync();

        Task<int> AddProduct(ProductViewModel model);

        Task<Brand[]> GetBrandsAsync();

        Task<ProductType[]> GetProductTypesAsync();
    }
}
