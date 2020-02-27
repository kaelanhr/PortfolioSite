using System;
using System.Threading.Tasks;
using PersonalSite.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace PersonalSite
{
	public class Startup
	{

		private readonly IWebHostEnvironment _currentEnvironment;

		public Startup(IConfiguration configuration, IWebHostEnvironment env)
		{
			_currentEnvironment = env;
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{

			services.AddControllersWithViews();

			// In production, the React files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/build";
			});

			services.AddDbContext<SiteDbContext>(options =>
				options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

			services.AddIdentity<SiteUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
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
				options.User.AllowedUserNameCharacters =
					  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
				options.User.RequireUniqueEmail = true;
			});


			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
				options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
			}).AddCookie();

			services.ConfigureApplicationCookie(options =>
			{
				options.Events.OnRedirectToLogin = context =>
				{
					context.Response.StatusCode = 401;
					return Task.CompletedTask;
				};

				// Cookie settings
				options.Cookie.HttpOnly = true;
				options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

				options.Cookie.SecurePolicy = _currentEnvironment.IsDevelopment() ? CookieSecurePolicy.None : CookieSecurePolicy.Always;
				options.Cookie.SameSite = SameSiteMode.Strict;

				options.LoginPath = "/Identity/Account/Login";
				options.SlidingExpiration = true;
			});

			services.AddAuthorization(options =>
			{
				options.AddPolicy("AdminRoleRequired", policy => policy.RequireRole("Administrator"));
			});

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseHttpsRedirection();

			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseRouting();


			app.UseCookiePolicy();
			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller}/{action=Index}/{id?}");
			});

			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseReactDevelopmentServer(npmScript: "start");
				}
			});

			string[] roleList = { "Admin", "Member" };

			SeedRolesAsync(serviceProvider, roleList).Wait();

			if (env.IsDevelopment())
			{
				SeedUsersAsync(serviceProvider, roleList).Wait();
			}
		}

		private static async Task SeedRolesAsync(IServiceProvider serviceProvider, string[] roleList)
		{
			// initializing  roles
			var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

			foreach (var role in roleList)
			{
				var roleExist = await roleManager.RoleExistsAsync(role);
				if (!roleExist)
				{
					// create the roles and seed them to the database: Question 1
					await roleManager.CreateAsync(new IdentityRole(role));
				}
			}
		}

		private static async Task SeedUsersAsync(IServiceProvider serviceProvider, string[] roleList)
		{
			var userManager = serviceProvider.GetRequiredService<UserManager<SiteUser>>();

			// create a default user for each role
			foreach (var role in roleList)
			{
				var user = new SiteUser
				{
					Email = $"{role}@example.com",
					UserName = role,
				};

				var existingUser = await userManager.FindByEmailAsync($"{role}@example.com");

				if (existingUser == null)
				{
					await userManager.CreateAsync(user, "password1234");
				}
			}
		}
	}
}