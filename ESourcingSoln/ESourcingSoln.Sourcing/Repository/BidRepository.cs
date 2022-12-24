using ESourcingSoln.Sourcing.Data.Interfaces;
using ESourcingSoln.Sourcing.Entities;
using ESourcingSoln.Sourcing.Repository.Interfaces;
using MongoDB.Driver;

namespace ESourcingSoln.Sourcing.Repository
{
    public class BidRepository : IBidRepository
    {
        private readonly ISourcingContext _context;

        public BidRepository(ISourcingContext context)
        {
            _context = context;
        }
        public async Task Create(Bid bid)
        {
            await _context.Bids.InsertOneAsync(bid);
        }

        public async Task<bool> Delete(string id)
        {
            var filter = Builders<Bid>.Filter.Eq(m => m.Id, id);
            DeleteResult deleteResult = await _context.Bids.DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }

        public async Task<Bid> GetBid(string id)
        {
            return await _context.Bids.Find(a => a.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Bid> GetLastBidForAuction(string auctionId)
        {
            return await _context.Bids.Find(a => a.Auction == auctionId && a.Statu == BidStatues.Active).FirstOrDefaultAsync();
        }
        public async Task<IEnumerable<Bid>> GetBids()
        {
            return await _context.Bids.Find(a => true).ToListAsync();
        }

        public async Task<bool> Update(Bid bid)
        {
            ReplaceOneResult updateResult = await _context.Bids.ReplaceOneAsync(filter: a => a.Id == bid.Id, replacement: bid);

            return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
        }
    }
}
