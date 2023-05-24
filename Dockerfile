FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /source
COPY src/ .
RUN dotnet new sln -n Rucula
RUN dotnet sln add **/*.csproj
RUN dotnet restore --use-current-runtime
RUN dotnet publish Rucula.WebApi/Rucula.WebApi.csproj -c Realease -o app

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine AS asp
EXPOSE 80
WORKDIR /app
COPY --from=build /source/app ./
ENTRYPOINT ["dotnet","Rucula.WebApi.dll"]
