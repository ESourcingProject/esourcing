using ESourcingSoln.Sourcing.Entities;
using ESourcingSoln.Sourcing.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;

namespace ESourcingSoln.Sourcing.Controllers
{
    [ApiController, Route("/api/v1/[controller]")]
    public class BidController : ControllerBase
    {
        #region Variables
        private readonly IBidRepository _repository;
        private readonly ILogger<BidController> _logger;
        #endregion
        public BidController(IBidRepository repository, ILogger<BidController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet, ProducesResponseType(typeof(Auction), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Bid>>> GetBids()
        {
            var bids = await _repository.GetBids();
            return Ok(bids);
        }

        [HttpGet("{id:length(24)}", Name = "GetBid")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(Bid), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Bid>> GetBid(string id)
        {
            var bid = await _repository.GetBid(id);
            if (bid == null)
            {
                _logger.LogError($"Bid with id : {id}, hasn't been found in database");
                return NotFound();
            }
            return Ok(bid);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Bid), (int)HttpStatusCode.Created)]
        public async Task<ActionResult<Bid>> CreateBid([FromBody] Bid bid)
        {
            await _repository.Create(bid);
            return CreatedAtRoute("GetBid", new { id = bid.Id }, bid);
        }
    }
}
