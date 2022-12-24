using ESourcingSoln.Sourcing.Entities;
using ESourcingSoln.Sourcing.Model;
using ESourcingSoln.Sourcing.Repository.Interfaces;
using EventBusMQ.Core;
using EventBusMQ.Events;
using EventBusMQ.Producer;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace ESourcingSoln.Sourcing.Controllers
{
    [ApiController,Route("/api/v1/[controller]")]
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionRepository _auctionRepository;
        private readonly IBidRepository _bidRepository;
        private readonly ILogger<AuctionController> _logger;
        private readonly EventBusRabbitMQProducer _eventBus;
        private readonly IConfiguration _configuration;

        public AuctionController(
            IAuctionRepository auctionRepository, 
            IBidRepository bidRepository,
            ILogger<AuctionController> logger, 
            EventBusRabbitMQProducer eventBus,
            IConfiguration configuration)
        {
            _auctionRepository = auctionRepository;
            _bidRepository = bidRepository;
            _logger = logger;
            _eventBus = eventBus;
            _configuration = configuration;
        }

        [HttpGet, ProducesResponseType(typeof(Auction), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Auction>>> GetAuctions()
        {
            var auctions = await _auctionRepository.GetAuctions();
            return Ok(auctions);
        }

        [HttpGet("GetActiveAuctions", Name = "GetActiveAuctions"), ProducesResponseType(typeof(IEnumerable<AuctionBidModel>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<AuctionBidModel>>> GetActiveAuctions()
        {
            List<AuctionBidModel> response = new List<AuctionBidModel>();
            var auctions = await _auctionRepository.GetActiveAuctions();
            foreach (var auction in auctions)
            {
                AuctionBidModel responseItem = new AuctionBidModel();
                responseItem.Id = auction.Id;
                responseItem.Name = auction.Name;
                responseItem.Product = auction.Product;
                responseItem.Quantity = auction.Quantity;
                responseItem.MinPrice = auction.MinPrice;
                responseItem.IsCompleted = auction.IsCompleted;
                responseItem.CreatedUser = auction.CreatedUser;
                responseItem.LastBid = (await _bidRepository.GetLastBidForAuction(auction.Id))?.Price;

                string ProductServiceUrl = _configuration.GetValue<string>("ProductServiceUrl");
                HttpClient client = new HttpClient();
                var content = await client.GetStringAsync(ProductServiceUrl + auction.Product);
                ProductModel? jsonContent = JsonSerializer.Deserialize<ProductModel?>(content);

                responseItem.ProductName = jsonContent?.name;
                response.Add(responseItem);
            }
            return Ok(response);
        }

        [HttpGet("GetAuctionsWithLastBid/{userId:length(24)}", Name = "GetAuctionsWithLastBid"), ProducesResponseType(typeof(IEnumerable<AuctionBidModel>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<AuctionBidModel>>> GetAuctionsWithLastBid(string userId)
        {
            List<AuctionBidModel> response = new List<AuctionBidModel>();
            var auctions = await _auctionRepository.GetAuctionByUserId(userId);
            foreach (var auction in auctions)
            {
                AuctionBidModel responseItem = new AuctionBidModel();
                responseItem.Id = auction.Id;
                responseItem.Name = auction.Name;
                responseItem.Product = auction.Product;
                responseItem.Quantity = auction.Quantity;
                responseItem.MinPrice = auction.MinPrice;
                responseItem.IsCompleted = auction.IsCompleted;
                responseItem.CreatedUser = auction.CreatedUser;
                responseItem.LastBid = (await _bidRepository.GetLastBidForAuction(auction.Id))?.Price;

                string ProductServiceUrl = _configuration.GetValue<string>("ProductServiceUrl");
                HttpClient client = new HttpClient();
                var content = await client.GetStringAsync(ProductServiceUrl + auction.Product);
                ProductModel? jsonContent =  JsonSerializer.Deserialize<ProductModel?>(content);

                responseItem.ProductName = jsonContent?.name;
                response.Add(responseItem);
            }
            return Ok(response);
        }

        [HttpGet("{id:length(24)}", Name = "GetAuction")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(Auction), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Auction>> GetAuction(string id)
        {
            var auction = await _auctionRepository.GetAuction(id);
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
            await _auctionRepository.Create(auction);
            return CreatedAtRoute("GetAuction", new { id = auction.Id }, auction);
        }

        [HttpPut]
        [ProducesResponseType(typeof(Auction), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> UpdateAuction([FromBody] Auction auction)
        {
            return Ok(await _auctionRepository.Update(auction));
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
