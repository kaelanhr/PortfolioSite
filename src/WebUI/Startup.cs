using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using PersonalSite.Application;
using PersonalSite.Infrastructure;
using PersonalSite.Services;

namespace PersonalSite
{
	/// <summary>
	/// This class is called at startup and
	/// contains all necessary setup for services, data seeding
	/// and other configuration.
	/// </summary>
	public class Startup
	{
		private readonly IWebHostEnvironment _currentEnvironment;

		/// <summary>
		/// Initializes a new instance of the <see cref="Startup"/> class.
		/// </summary>
		/// <param name="configuration">Configuration settings.</param>
		/// <param name="env">Hosting environment.</param>
		public Startup(IConfiguration configuration, IWebHostEnvironment env)
		{
			_currentEnvironment = env;
			Configuration = configuration;
		}

		/// <summary>
		/// Gets the configuration used for startups.
		/// </summary>
		public IConfiguration Configuration { get; }

		/// <summary>
		/// Configure and register services.
		/// </summary>
		/// <param name="services">Services Collection.</param>
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddApplication();
			services.AddInfrastructure(Configuration);

			services.AddControllersWithViews()
				.AddNewtonsoftJson(options =>
				options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

			// In production, the React files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp";
			});

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
				options.Cookie.MaxAge = TimeSpan.FromHours(7 * 24);
				options.LoginPath = "/Identity/Account/Login";
				options.SlidingExpiration = true;
			});

			services.AddScoped<DataSeedService, DataSeedService>();
			//services.AddScoped<CrudService, CrudService>();
		}

		/// <summary>
		/// Use this method to configure the HTTP request pipeline.
		/// </summary>
		/// <param name="app">The Application Builder.</param>
		/// <param name="env">Web Hosting Environment.</param>
		/// <param name="serviceProvider">The Service Provider.</param>
		/// <param name="logger">Logger.</param>
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider, ILogger<Startup> logger)
		{
			app.UseForwardedHeaders(new ForwardedHeadersOptions
			{
				ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
			});

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseDatabaseErrorPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");

				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseStaticFiles();

			if (!env.IsDevelopment())
			{
				app.UseSpaStaticFiles();
			}

			app.UseMiddleware<ExceptionHandler>();
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
					spa.Options.SourcePath = Configuration.GetValue<string>("ClientSettings:SourcePath");
					var isProxyEnabled = Configuration.GetValue<bool>("ClientSettings:enabled");
					if (isProxyEnabled)
					{
						var proxyUrl = Configuration.GetValue<string>("ClientSettings:ProxyUrl");
						spa.UseProxyToSpaDevelopmentServer(proxyUrl);
					}
					else
					{
						spa.UseReactDevelopmentServer(npmScript: "start");
					}
				}
			});

			var dataSeed = serviceProvider.GetRequiredService<DataSeedService>();
			try
			{
				dataSeed.SeedRolesAsync().Wait();
			}
			catch (Exception)
			{
				logger.LogInformation($"Failed to seed users, perhaps the database is not instantiated?");
			}

			if (env.IsDevelopment())
			{
				dataSeed.SeedUsersAsync().Wait();
			}
		}
	}
}