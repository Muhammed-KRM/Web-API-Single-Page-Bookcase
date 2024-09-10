# First stage: build the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Second stage: build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=build-env /app/out .

# Expose ports for HTTP and HTTPS
EXPOSE 80
EXPOSE 443

# Run the application
ENTRYPOINT ["dotnet", "WebApi.dll"]
