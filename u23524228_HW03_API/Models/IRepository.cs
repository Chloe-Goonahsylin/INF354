namespace u23524228_HW03_API.Models
{
    public interface IRepository
    {
        Task<bool> SaveChangesAsync();
        Task<Product[]> GetProductsAsync();
        Task<ProductType[]> GetProductTypesAsync();
        Task<Brand[]> GetBrandsAsync();

        Task<Product[]> GetProductsReportAsync();

        void Add<T>(T entity) where T : class;
    }
}
