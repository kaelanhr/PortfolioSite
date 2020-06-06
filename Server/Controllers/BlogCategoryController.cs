using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PersonalSite.Models;
using PersonalSite.Services;

namespace PersonalSite.Controllers
{
	/// <summary>
	/// Manage user accounts login, register, forgot password etc.
	/// </summary>
	[Authorize]
	[ApiController]
	[Route("/Api/Blog")]
	public class BlogCategoryController : Controller
	{
		private readonly ILogger _logger;
		private readonly CrudService _crudService;

		/// <summary>
		/// Initializes a new instance of the <see cref="BlogCategoryController"/> class.
		/// </summary>
		/// <param name="loggerFactory">Log controller actions.</param>
		/// <param name="crudService">The crud service used.</param>
		public BlogCategoryController(
			ILoggerFactory loggerFactory,
			CrudService crudService)
		{
			_crudService = crudService;
			_logger = loggerFactory.CreateLogger<BlogCategoryController>();
		}

		/// <summary>
		/// Create a blog.
		/// </summary>
		/// <param name="blogCategory">A blog category entity.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpPost]
		[Authorize]
		[Route("Create")]
		public async Task<IActionResult> CreateBlogAsync([FromBody] BlogCategory blogCategory)
		{
			_logger.LogInformation(4, "creating a blog.");
			await _crudService.CreateAsync(blogCategory);
			return Ok();
		}

		/// <summary>
		/// gets all blogs.
		/// </summary>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpGet]
		[AllowAnonymous]
		[Route("")]
		public async Task<IEnumerable<BlogCategory>> GetBlogAsync()
		{
			return await _crudService.Get<BlogCategory>().ToListAsync();
		}
	}
}