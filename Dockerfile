# https://hub.docker.com/_/microsoft-dotnet-core
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY Server/*.sln ./Server/
COPY Server/*.csproj ./Server/
RUN dotnet restore Server/PersonalSite.csproj

# copy everything else and build app
COPY Client/. ./Client/
COPY Server/. ./Server/
WORKDIR /app/Server
RUN dotnet publish -c Release


FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
WORKDIR /app
COPY --from=build /app/Server/bin/Release/netcoreapp3.1 ./
ENTRYPOINT ["dotnet", "PersonalSite.dll"]