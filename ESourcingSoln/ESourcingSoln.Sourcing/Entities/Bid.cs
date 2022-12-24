using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ESourcingSoln.Sourcing.Entities
{
    public enum BidStatues
    {
        Cancelled = 0,
        Active = 1
    }
    public class Bid
    {
        [BsonId, BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Auction { get; set; }
        public string BidderUser { get; set; }
        public decimal Price { get; set; }
        public BidStatues Statu { get; set; }
    }
}
