using System;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Infrastructure.Identity;
using PersonalSite.Infrastructure.Persistence;

namespace PersonalSite.Infrastructure
{
	public static class DependencyInjection
	{
		public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
		{

			services.AddDbContext<SiteDbContext>(options =>
				options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly(typeof(SiteDbContext).Assembly.FullName)));

			services.AddIdentity<SiteUser, SiteRole>(options => options.SignIn.RequireConfirmedAccount = true)
			.AddDefaultTokenProviders()
			.AddEntityFrameworkStores<SiteDbContext>();

			services.Configure<IdentityOptions>(options =>
			{
				/* Password settings.
				* The only limitation we will enforce is length
				* any other password restrictions make it easier to decipher
				*/
				options.Password.RequireDigit = false;
				options.Password.RequireLowercase = false;
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequireUppercase = false;
				options.Password.RequiredLength = 12;
				options.Password.RequiredUniqueChars = 0;

				// Lockout settings.
				options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
				options.Lockout.MaxFailedAccessAttempts = 5;
				options.Lockout.AllowedForNewUsers = true;

				// User settings.
				options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
				options.User.RequireUniqueEmail = true;
			});

			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
				options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
			}).AddCookie();


			services.AddAuthorization(options =>
			{
				options.AddPolicy("AdminRoleRequired", policy => policy.RequireRole("Administrator"));
			});

			services.AddScoped<IDbContext>(provider => provider.GetService<SiteDbContext>());
			services.AddTransient<IIdentityService, IdentityService>();

			return services;
		}
	}
}
