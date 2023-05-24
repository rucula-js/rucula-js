FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build
WORKDIR /source
COPY *.csproj .
RUN dotnet restore --use-current-runtime

