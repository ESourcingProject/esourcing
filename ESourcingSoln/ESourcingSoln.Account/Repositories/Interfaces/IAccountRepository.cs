namespace ESourcingSoln.Account.Repositories.Interfaces
{
    public interface IAccountRepository
    {
        Task<Entities.Account> GetAccount(string id);
        Task<Entities.Account> GetAccountByUserNameAndPassword(string name, string password);
        Task Create(Entities.Account account);
    }
}
