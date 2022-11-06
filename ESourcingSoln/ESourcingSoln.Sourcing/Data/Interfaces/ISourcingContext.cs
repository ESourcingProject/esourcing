using ESourcingSoln.Sourcing.Entities;
using MongoDB.Driver;

namespace ESourcingSoln.Sourcing.Data.Interfaces
{
    public interface ISourcingContext
    {
        IMongoCollection<Auction> Auctions { get; }
    }
}
