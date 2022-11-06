using ESourcingSoln.Products.Entities;
using MongoDB.Driver;

namespace ESourcingSoln.Products.Data.Interfaces
{
    public interface IProductContext
    {
        IMongoCollection<Product> Products { get; }
    }
}
