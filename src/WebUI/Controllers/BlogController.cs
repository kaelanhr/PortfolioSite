using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PersonalSite.Application.Blogs.Queries.GetBlogs;
using PersonalSite.Domain.Entities;
using PersonalSite.Services;

namespace PersonalSite.Controllers
{
	/// <summary>
	/// api for crud operations on a blog category.
	/// </summary>
	[Authorize]
	[ApiController]
	[Route("/Api/Blogs")]
	public class BlogController : Controller, IEntityController<BlogDto>
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
		/// <param name="blog">The blog being created.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpPost]
		[Authorize]
		[Route("")]
		public async Task<BlogDto> CreateAsync([BindRequired, FromBody] BlogDto blog)
		{
			// cannot specify the guid.
			if (blog.Id != Guid.Empty)
			{
				Response.StatusCode = (int)HttpStatusCode.BadRequest;
				return null;
			}

			_logger.LogInformation(4, "creating a project.");
			try
			{
				return new BlogDto(await _crudService.CreateAsync(blog.ToEntity()));
			}
			catch (Exception)
			{
				Response.StatusCode = (int)HttpStatusCode.BadRequest;
				throw;
			}
		}

		/// <summary>
		/// edit a blog.
		/// </summary>
		/// <param name="project">A blog entity.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpPut]
		[Authorize]
		[Route("")]
		public async Task<BlogDto> EditAsync([BindRequired, FromBody] BlogDto blog)
		{
			if (blog.Id == Guid.Empty)
			{
				Response.StatusCode = (int)HttpStatusCode.BadRequest;
				return null;
			}

			return new BlogDto(await _crudService.UpdateAsync(blog.ToEntity()));
		}

		/// <summary>
		/// gets all blogs.
		/// </summary>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpGet]
		[AllowAnonymous]
		[Route("")]
		public async Task<IEnumerable<BlogDto>> GetAsync()
		{
			var result = _crudService.Get<Blog>();
			return await result.Select(b => new BlogDto(b)).ToListAsync();
		}

		/// <summary>
		/// Gets a single blog, given an id.
		/// </summary>
		/// <param name="id">The id of the blog.</param>
		/// <returns>The DTO of the blog which matches the id.</returns>
		[HttpGet]
		[AllowAnonymous]
		[Route("{id}")]
		public async Task<BlogDto> GetByIdAsync(Guid id)
		{
			var result = _crudService.GetById<Blog>(id).Include(s => s.BlogPosts);
			return await result.Select(b => new BlogDto(b)).FirstOrDefaultAsync();
		}

		/// <summary>
		/// deletes a particular blog.
		/// </summary>
		/// <param name="id">the id of the blog to delete.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpDelete]
		[Route("{id}")]
		public async Task<Guid> DeleteAsync(Guid id)
		{
			return await _crudService.DeleteAsync<Blog>(id);
		}
	}
}