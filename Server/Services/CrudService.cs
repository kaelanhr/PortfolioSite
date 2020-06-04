using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using PersonalSite.Models;

namespace PersonalSite.Services
{
	public class CrudService
	{
		private readonly ILogger _logger;
		private readonly SiteDbContext _dbContext;
		private readonly RoleManager<SiteRole> _roleManager;
		private readonly SignInManager<SiteUser> _signInManager;
		private readonly UserManager<SiteUser> _userManager;


		public CrudService(
			UserManager<SiteUser> userManager,
			SignInManager<SiteUser> signInManager,
			SiteDbContext dbContext,
			RoleManager<SiteRole> roleManager,
			ILoggerFactory loggerFactory)
		{
			_dbContext = dbContext;
			_userManager = userManager;
			_signInManager = signInManager;
			_roleManager = roleManager;
			_logger = loggerFactory.CreateLogger<DataSeedService>();
		}

		public IQueryable<T> Get<T>() where T : class, IAbstractModel, new()
		{
			return _dbContext.Blog as IQueryable<T>;
		}
	}
}