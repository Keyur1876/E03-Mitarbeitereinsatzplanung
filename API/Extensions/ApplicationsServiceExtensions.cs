using API;
using API.Data;
using Microsoft.EntityFrameworkCore;

public static class ApplicationsServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<DataContext>(opt => 
            opt.UseSqlServer(config.GetConnectionString("DefaultConnection"))); // UseSqlServer instead of UseSqlite

        services.AddCors();
        services.AddScoped<ITokenService, TokenService>();

        return services;
    } 
}
