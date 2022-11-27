namespace ESourcingSoln.Account.Data.Interfaces;

using ESourcingSoln.Account.Entities;
using MongoDB.Driver;

public interface IAccountContext
{
    IMongoCollection<Account> Accounts { get; }
}

