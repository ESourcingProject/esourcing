namespace ESourcingSoln.Account.Settings
{
    public interface IAccountDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string CollectionName { get; set; }
    }
}
