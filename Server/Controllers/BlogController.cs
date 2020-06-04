using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PersonalSite.Models;
using PersonalSite.Services;
using System.Collections.Generic;
using System.Threading.Tasks;



namespace PersonalSite.Controllers
{
	/// <summary>
	/// Manage user accounts login, register, forgot password etc.
	/// </summary>
	[Authorize]
	[ApiController]
	[Route("/Api/Blog")]
	public class BlogController : Controller
	{
		private readonly SiteDbContext _dbContext;
		private readonly ILogger _logger;

		private readonly CrudService _crudService;

		/// <summary>
		/// Initializes a new instance of the <see cref="BlogController"/> class.
		/// </summary>
		/// <param name="loggerFactory">Log controller actions.</param>
		public BlogController(
			ILoggerFactory loggerFactory,
			SiteDbContext siteDbContext,
			CrudService crudService
			)
		{
			_crudService = crudService;
			_logger = loggerFactory.CreateLogger<AccountController>();
			_dbContext = siteDbContext;
		}

		/// <summary>
		/// Create a blog.
		/// </summary>
		/// <param name="blog">A blog model entity.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpPost]
		[Authorize]
		[Route("")]
		public async Task<IActionResult> CreateBlogAsync([FromBody] Blog blog)
		{
			_dbContext.Blog.Add(blog);
			_logger.LogInformation(4, "creating a blog.");
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		/// <summary>
		/// gets all blogs.
		/// </summary>
		/// <param name="blog">A blog model entity.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpGet]
		[AllowAnonymous]
		[Route("")]
		public async Task<IEnumerable<Blog>> GetBlogAsync()
		{
			return await _crudService.Get<Blog>().ToListAsync();
		}
	}
}