using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace PersonalSite
{
	/// <summary>
	/// The application starts here.
	/// </summary>
	public class Program
	{
		/// <summary>
		/// Entry point of the web application.
		/// </summary>
		/// <param name="args">Additional arguments passed in when the program runs.</param>
		public static void Main(string[] args)
		{
			CreateHostBuilder(args).Build().Run();
		}

		/// <summary>
		/// Create the web host and load configuration.
		/// </summary>
		/// <param name="args">Arguments passed from main function.</param>
		/// <returns>The Web Host builder.</returns>
		public static IHostBuilder CreateHostBuilder(string[] args) =>
			Host.CreateDefaultBuilder(args)
				.ConfigureAppConfiguration((builderContext, config) =>
				{
					var env = builderContext.HostingEnvironment;
					config.SetBasePath(env.ContentRootPath);
					config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
					config.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);
					config.AddEnvironmentVariables();
					config.AddCommandLine(args);
				})
				.ConfigureWebHostDefaults(webBuilder =>
				{
					int maxRequestLimit = 3000000;
					webBuilder.ConfigureKestrel((context, options) =>
					{
						// Handle requests up to 3 MB
						options.Limits.MaxRequestBodySize = maxRequestLimit;
					});

					webBuilder.UseStartup<Startup>();
					webBuilder.UseSetting("https_port", "443");
				});
	}
}
