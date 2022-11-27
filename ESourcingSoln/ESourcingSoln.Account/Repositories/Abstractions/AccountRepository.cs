using ESourcingSoln.Account.Data.Interfaces;
using ESourcingSoln.Account.Repositories.Interfaces;
using MongoDB.Driver;

namespace ESourcingSoln.Account.Repositories.Abstractions
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IAccountContext _context;
        public AccountRepository(IAccountContext context)
        {
            _context = context;
        }
        public async Task Create(Entities.Account account)
        {
            await _context.Accounts.InsertOneAsync(account);
        }

        public async Task<Entities.Account> GetAccount(string id)
        {
            return await _context.Accounts.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Entities.Account> GetAccountByUserNameAndPassword(string name, string password)
        {
            return await _context.Accounts.Find(p => p.UserName == name && p.Password == password).FirstOrDefaultAsync();
        }
    }
}
