# client
FROM node:12-alpine AS build-client
WORKDIR /app
# copy package json and install dependencies
COPY Client/package.json ./Client/
WORKDIR /app/Client
RUN yarn
COPY Client/ .
RUN yarn run build

# server
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-server
WORKDIR /app

# copy csproj and restore
COPY Server/*.csproj ./Server/
COPY Server/*.sln ./Server/
WORKDIR /app/Server
RUN dotnet restore

# copy remaining files and make a publish release
COPY Server/. .
COPY --from=build-client /app/Client ../Client/
RUN dotnet publish -c Docker-Release

# run time
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
WORKDIR /app
EXPOSE 80
EXPOSE 443
EXPOSE 5000/tcp
ENV ASPNETCORE_URLS http://*:5000
COPY --from=build-server /app/Server/bin/Docker-Release/netcoreapp3.1/publish .
ENTRYPOINT [ "dotnet", "PersonalSite.dll" ]