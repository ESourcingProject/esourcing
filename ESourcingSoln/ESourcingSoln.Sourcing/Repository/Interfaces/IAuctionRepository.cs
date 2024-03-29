﻿using ESourcingSoln.Sourcing.Entities;

namespace ESourcingSoln.Sourcing.Repository.Interfaces
{
    public interface IAuctionRepository
    {
        Task<IEnumerable<Auction>> GetAuctions();
        Task<IEnumerable<Auction>> GetActiveAuctions();
        Task<Auction> GetAuction(string id);
        Task<IEnumerable<Auction>> GetAuctionByUserId(string userId);
        Task<IEnumerable<Auction>> GetAuctionsByName(string name);
        Task Create(Auction auction);
        Task<bool> Update(Auction auction);
        Task<bool> Delete(string id);
    }
}
