using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ESourcingSoln.Sourcing.Entities
{
    public class Auction
    {
        [BsonId, BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } 
        public string Name { get; set; }
        public string Product { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public bool IsCompleted { get; set; }
    }
}
