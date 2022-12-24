namespace ESourcingSoln.Sourcing.Model
{
    public class AuctionBidModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Product { get; set; }
        public int Quantity { get; set; }
        public decimal MinPrice { get; set; }
        public bool IsCompleted { get; set; }
        public string CreatedUser { get; set; }
        public decimal? LastBid { get; set; }
        public string ProductName { get; set; }
    }
}
