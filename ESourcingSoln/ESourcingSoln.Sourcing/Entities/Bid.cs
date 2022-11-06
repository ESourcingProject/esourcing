using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ESourcingSoln.Sourcing.Entities
{
    public enum BidStatues
    {
        Rejected = 0,
        Waiting = 1,
        Accepted = 2
    }
    public class Bid
    {
        [BsonId, BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Product { get; set; }
        public string User { get; set; }
        public decimal Price { get; set; }
        public BidStatues Statu { get; set; }
    }
}
