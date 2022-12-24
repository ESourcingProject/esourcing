using ESourcingSoln.Sourcing.Entities;

namespace ESourcingSoln.Sourcing.Repository.Interfaces
{
    public interface IBidRepository
    {
        Task<IEnumerable<Bid>> GetBids();
        Task<Bid> GetBid(string id);
        Task<Bid> GetLastBidForAuction(string auctionId);
        Task Create(Bid bid);
        Task<bool> Update(Bid bid);
        Task<bool> Delete(string id);
    }
}
