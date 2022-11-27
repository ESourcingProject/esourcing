using ESourcingSoln.Account.Data.Abstraction;
using ESourcingSoln.Account.Data.Interfaces;
using ESourcingSoln.Account.Repositories.Abstractions;
using ESourcingSoln.Account.Repositories.Interfaces;
using ESourcingSoln.Account.Settings;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

#region Configuration Dependencies
builder.Services.Configure<AccountDatabaseSettings>(builder.Configuration.GetSection(nameof(AccountDatabaseSettings)));
builder.Services.AddSingleton<IAccountDatabaseSettings>(x => x.GetRequiredService<IOptions<AccountDatabaseSettings>>().Value);
#endregion

#region Project Dependencies
builder.Services.AddTransient<IAccountContext, AccountContext>();
builder.Services.AddTransient<IAccountRepository, AccountRepository>();
#endregion


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
