using ESourcingSoln.Sourcing.Entities;
using ESourcingSoln.Sourcing.Repository.Interfaces;
using EventBusMQ.Core;
using EventBusMQ.Events;
using EventBusMQ.Producer;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ESourcingSoln.Sourcing.Controllers
{
    [ApiController,Route("/api/v1/[controller]")]
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionRepository _repository;
        private readonly ILogger<AuctionController> _logger;
        private readonly EventBusRabbitMQProducer _eventBus;

        public AuctionController(
            IAuctionRepository repository, 
            ILogger<AuctionController> logger, 
            EventBusRabbitMQProducer eventBus)
        {
            _repository = repository;
            _logger = logger;
            _eventBus = eventBus;
        }

        [HttpGet, ProducesResponseType(typeof(Auction), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Auction>>> GetAuctions()
        {
            var auctions = await _repository.GetAuctions();
            return Ok(auctions);
        }

        [HttpGet("{id:length(24)}", Name = "GetAuction")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(Auction), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Auction>> GetAuction(string id)
        {
            var auction = await _repository.GetAuction(id);
            if (auction == null)
            {
                _logger.LogError($"Auction with id : {id}, hasn't been found in database");
                return NotFound();
            }
            return Ok(auction);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Auction), (int)HttpStatusCode.Created)]
        public async Task<ActionResult<Auction>> CreateAuction([FromBody] Auction auction)
        {
            await _repository.Create(auction);
            return CreatedAtRoute("GetAuction", new { id = auction.Id }, auction);
        }

        [HttpPut]
        [ProducesResponseType(typeof(Auction), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> UpdateAuction([FromBody] Auction auction)
        {
            return Ok(await _repository.Update(auction));
        }

        [HttpPost("TestMQ")]
        public ActionResult<OrderCreateEvent> TestMQ()
        {
            OrderCreateEvent eventMessage = new OrderCreateEvent();
            eventMessage.AuctionId = "deneme1";

            try
            {
                _eventBus.Publish(EventBusConstants.AuctionCompleteQueue, eventMessage);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR Publishing integration event: {EventId} from {AppName}", eventMessage.Id, "Sourcing");
                throw;
            }

            return Accepted(eventMessage);
        }
    }
}
