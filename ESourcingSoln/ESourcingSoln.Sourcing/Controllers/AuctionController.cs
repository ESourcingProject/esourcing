using ESourcingSoln.Sourcing.Entities;
using ESourcingSoln.Sourcing.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ESourcingSoln.Sourcing.Controllers
{
    [ApiController,Route("/api/v1/[controller]")]
    public class AuctionController : ControllerBase
    {
        private readonly ISourcingRepository _repository;
        public AuctionController(ISourcingRepository repository)
        {
            _repository = repository;
        }

        [HttpGet, ProducesResponseType(typeof(Auction), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Auction>>> GetAuctions()
        {
            var auctions = await _repository.GetAuctions();
            return Ok(auctions);
        }
    }
}
