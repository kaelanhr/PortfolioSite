FROM node:12-alpine AS build-client
WORKDIR /app
# copy package json and install dependencies
COPY src/WebUI/ClientApp/package.json ./ClientApp/
WORKDIR /app/ClientApp
RUN yarn
COPY src/WebUI/ClientApp/ .
RUN yarn run build

# server
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-server
WORKDIR /app

# copy csproj and restore
COPY src/Infrastructure/*.csproj ./src/Infrastructure/
COPY src/WebUI/*.csproj ./src/WebUI/
COPY src/Application/*.csproj ./src/Application/
COPY src/Domain/*.csproj ./src/Domain/
COPY ./*.sln .
WORKDIR /app/src/WebUI
RUN dotnet restore

# copy remaining files and make a publish release
WORKDIR /app
COPY src/. ./src/
COPY --from=build-client /app/ClientApp src/WebUI/ClientApp/
WORKDIR /app/src/WebUI
RUN dotnet publish -c Docker-Release
#RUN dotnet build

# run time
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
WORKDIR /app
EXPOSE 80
EXPOSE 443
EXPOSE 5000/tcp
ENV ASPNETCORE_URLS http://*:5000
COPY --from=build-server /app/src/WebUI/bin/Docker-Release/netcoreapp3.1/publish .
ENTRYPOINT [ "dotnet", "PersonalSite.WebUI.dll" ]