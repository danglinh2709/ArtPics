# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy sln and csproj files for restore
COPY beSCRL.sln ./
COPY Domain/Domain.csproj Domain/
COPY Application/Application.csproj Application/
COPY Infrastructure/Infrastructure.csproj Infrastructure/
COPY WebAPI/WebAPI.csproj WebAPI/

# Restore dependencies
RUN dotnet restore

# Copy the rest of the source code
COPY . .

# Build and publish
WORKDIR /app/WebAPI
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/publish .

# Expose port
EXPOSE 8080

# Environment variables for ASP.NET Core
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Run the application
ENTRYPOINT ["dotnet", "WebAPI.dll"]
