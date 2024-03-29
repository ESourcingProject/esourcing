﻿using ESourcingSoln.Products.Entities;

namespace ESourcingSoln.Products.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProducts();
        Task<Product> GetProduct(string id);
        Task<IEnumerable<Product>> GetProductsByName(string name);
        Task<IEnumerable<Product>> GetProductsByCategory(string category);
        Task Create(Product product);
        Task<bool> Update(Product product);
        Task<bool> Delete(string id);

    }
}
