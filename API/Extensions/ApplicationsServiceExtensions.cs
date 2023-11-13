using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationsServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt => 
                opt.UseSqlite(config.GetConnectionString("DefaultConnection")));

            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();

            return services;
        } 
    }
}
