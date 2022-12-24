using ESourcingSoln.Sourcing.Entities;
using MongoDB.Driver;

namespace ESourcingSoln.Sourcing.Data
{
    public class AuctionContextSeed
    {
        public static void SeedData(IMongoCollection<Auction> auctionCollection)
        {
            bool existsAuction = auctionCollection.Find(x => true).Any();
            if (!existsAuction)
            {
                auctionCollection.InsertManyAsync(GetConfigureAuctions());
            }
        }

        private static IEnumerable<Auction> GetConfigureAuctions()
        {
            return new List<Auction>() {
                new Auction()
                {
                    Name="İhale 1",
                    MinPrice= 350,
                    Quantity = 50,
                    IsCompleted = false,
                    Product = "63678d2aab6559393330c801",
                    CreatedUser = "system"
                }
            };
        }
    }
}