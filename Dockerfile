# https://hub.docker.com/_/microsoft-dotnet-core
#FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
#WORKDIR /app

# copy csproj and restore as distinct layers
# COPY Server/*.sln ./Server/
# COPY Server/*.csproj ./Server/
# RUN dotnet restore Server/PersonalSite.csproj

# copy everything else and build app
# COPY Client/. ./Client/
# COPY Server/. ./Server/
# WORKDIR /app/Server
# RUN dotnet publish -c Release

# WORKDIR /app


# FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
# WORKDIR /app
# COPY --from=build /app/bin/Release/netcoreapp3.1 ./
# ENTRYPOINT ["dotnet", "PersonalSite.dll"]


# clientside
FROM node:12-alpine AS build-client
WORKDIR /app
COPY Client/package.json ./Client/
WORKDIR /app/Client
RUN yarn
COPY Client/ .
RUN yarn run build

#serverside build
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-server
WORKDIR /app

# copy csproj and restore as distinct layers
COPY Server/*.csproj ./Server/
COPY Server/*.sln ./Server/
WORKDIR /app/Server
RUN dotnet restore
#COPY . .
COPY Server/. .
COPY --from=build-client /app/Client ../Client/
RUN dotnet publish -c Docker-Release

#serverside run
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
WORKDIR /app
COPY --from=build-server /app/Server/bin/Docker-Release/netcoreapp3.1/publish .
#COPY --from=build-nоde /Client/build ./Clientаpp/build
ENTRYPOINT [ "dоtnet","PersonalSite.dll" ]
