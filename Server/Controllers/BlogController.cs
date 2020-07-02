using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PersonalSite.Models;
using PersonalSite.Services;

namespace PersonalSite.Controllers
{
	/// <summary>
	/// api for crud operations on a blog category.
	/// </summary>
	[Authorize]
	[ApiController]
	[Route("/Api/Blog")]
	public class BlogController : Controller
	{
		private readonly ILogger _logger;
		private readonly CrudService _crudService;

		/// <summary>
		/// Initializes a new instance of the <see cref="BlogController"/> class.
		/// </summary>
		/// <param name="loggerFactory">Log controller actions.</param>
		/// <param name="crudService">The crud service used.</param>
		public BlogController(
			ILoggerFactory loggerFactory,
			CrudService crudService)
		{
			_crudService = crudService;
			_logger = loggerFactory.CreateLogger<BlogController>();
		}

		/// <summary>
		/// Create a blog.
		/// </summary>
		/// <param name="blogCategory">A blog category entity.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpPost]
		[Authorize]
		[Route("Create")]
		public async Task<Blog> CreateBlogAsync([BindRequired, FromBody] Blog blogCategory)
		{
			// cannot specify the guid.
			if (blogCategory.Id != Guid.Empty)
			{
				Response.StatusCode = (int)HttpStatusCode.BadRequest;
				return null;
			}

			_logger.LogInformation(4, "creating a blog.");
			return await _crudService.CreateAsync(blogCategory);
		}

		/// <summary>
		/// gets all blogs.
		/// </summary>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpGet]
		[AllowAnonymous]
		[Route("")]
		public async Task<IEnumerable<Blog>> GetBlogAsync()
		{
			return await _crudService.Get<Blog>().ToListAsync();
		}

		/// <summary>
		/// deletes a particular blog.
		/// </summary>
		/// <param name="id">the id of the blog to delete.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpDelete]
		[Route ("{id}")]
		public async Task<Guid> DeleteBlogAsync(Guid id){
			return await _crudService.DeleteAsync<Blog>(id);
		}
	}
}