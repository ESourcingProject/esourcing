using ESourcingSoln.Sourcing.Data.Interfaces;
using ESourcingSoln.Sourcing.Entities;
using ESourcingSoln.Sourcing.Settings;
using MongoDB.Driver;

namespace ESourcingSoln.Sourcing.Data
{
    public class SourcingContext : ISourcingContext
    {
        public SourcingContext(ISourcingDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            Auctions = database.GetCollection<Auction>(nameof(Auction));
            AuctionContextSeed.SeedData(Auctions);

            Bids = database.GetCollection<Bid>(nameof(Bid));
        }
        public IMongoCollection<Auction> Auctions { get; set; }
        public IMongoCollection<Bid> Bids { get; set; }
    }
}
