using ESourcingSoln.Products.Entities;
using MongoDB.Driver;

namespace ESourcingSoln.Products.Data
{
    public class ProductContextSeed
    {
        public static void SeedData(IMongoCollection<Product> productCollection)
        {
            bool existsProduct = productCollection.Find(x => true).Any();
            if (!existsProduct)
            {
                productCollection.InsertManyAsync(GetConfigureProducts());
            }
        }

        private static IEnumerable<Product> GetConfigureProducts()
        {
            return new List<Product>() {
                new Product()
                {
                    Name="Urun 1",
                    Category="Kategori 1",
                    Description = "Açıklama 1",
                    Price = 10,
                    Summary = "Özet 1",
                    ImageFile = "product1.jpg"
                }
            };
        }
    }
}
