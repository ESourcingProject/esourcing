using MongoDB.Driver;

namespace ESourcingSoln.Account.Data.Abstraction
{
    public class AccountContextSeed
    {
        public static void SeedData(IMongoCollection<Entities.Account> accountCollection)
        {
            bool existsProduct = accountCollection.Find(x => true).Any();
            if (!existsProduct)
            {
                accountCollection.InsertManyAsync(GetConfigureAccounts());
            }
        }

        private static IEnumerable<Entities.Account> GetConfigureAccounts()
        {
            return new List<Entities.Account>() {
                new Entities.Account()
                {
                    UserName = "admin",
                    Password = "admin"
                },
                new Entities.Account()
                {
                    UserName = "system",
                    Password = "system"
                }
            };
        }
    }
}
