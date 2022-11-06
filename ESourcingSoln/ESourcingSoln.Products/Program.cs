using ESourcingSoln.Products.Data;
using ESourcingSoln.Products.Data.Interfaces;
using ESourcingSoln.Products.Repositories;
using ESourcingSoln.Products.Repositories.Interfaces;
using ESourcingSoln.Products.Settings;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

#region Configuration Dependencies
builder.Services.Configure<ProductDatabaseSettings>(builder.Configuration.GetSection(nameof(ProductDatabaseSettings)));
builder.Services.AddSingleton<IProductDatabaseSettings>(x => x.GetRequiredService<IOptions<ProductDatabaseSettings>>().Value);
#endregion

#region Project Dependencies
builder.Services.AddTransient<IProductContext, ProductContext>();
builder.Services.AddTransient<IProductRepository, ProductRepository>();
#endregion

#region Swagger Dependencies

builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "ESourcingSoln.Products",
        Version = "v1"
    });
}); 
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c=>c.SwaggerEndpoint("/swagger/v1/swagger.json","ESourcingSoln.Products v1"));
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
