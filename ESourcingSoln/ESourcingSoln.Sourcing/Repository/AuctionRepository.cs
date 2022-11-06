using ESourcingSoln.Sourcing.Data.Interfaces;
using ESourcingSoln.Sourcing.Entities;
using ESourcingSoln.Sourcing.Repository.Interfaces;
using MongoDB.Driver;
using System.Xml.Linq;

namespace ESourcingSoln.Sourcing.Repository
{
    public class AuctionRepository : IAuctionRepository
    {
        private readonly ISourcingContext _context;

        public AuctionRepository(ISourcingContext context)
        {
            _context = context;
        }

        public async Task Create(Auction auction)
        {
            await _context.Auctions.InsertOneAsync(auction);
        }

        public async Task<bool> Delete(string id)
        {
            var filter = Builders<Auction>.Filter.Eq(m => m.Id, id);
            DeleteResult deleteResult = await _context.Auctions.DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }

        public async Task<Auction> GetAuction(string id)
        {
            return await _context.Auctions.Find(a => a.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Auction>> GetAuctions()
        {
            return await _context.Auctions.Find(a => true).ToListAsync();
        }

        public async Task<IEnumerable<Auction>> GetProductsByName(string name)
        {
            var filter = Builders<Auction>.Filter.ElemMatch(m => m.Name, name);
            return await _context.Auctions.Find(filter).ToListAsync();
        }

        public async Task<bool> Update(Auction auction)
        {

            ReplaceOneResult updateResult = await _context.Auctions.ReplaceOneAsync(filter: a => a.Id == auction.Id, replacement: auction);

            return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
        }
    }
}
