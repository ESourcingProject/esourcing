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
