using ESourcingSoln.Account.Data.Interfaces;
using ESourcingSoln.Account.Entities;
using ESourcingSoln.Account.Settings;
using MongoDB.Driver;

namespace ESourcingSoln.Account.Data.Abstraction
{
    public class AccountContext : IAccountContext
    {
        public AccountContext(IAccountDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            Accounts = database.GetCollection<Entities.Account>(settings.CollectionName);
        }
        public IMongoCollection<Entities.Account> Accounts { get; }
    }
}
