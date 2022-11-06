#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["ESourcingSoln.Products/ESourcingSoln.Products.csproj", "ESourcingSoln.Products/"]
RUN dotnet restore "ESourcingSoln.Products/ESourcingSoln.Products.csproj"
COPY . .
WORKDIR "/src/ESourcingSoln.Products"
RUN dotnet build "ESourcingSoln.Products.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ESourcingSoln.Products.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ESourcingSoln.Products.dll"]