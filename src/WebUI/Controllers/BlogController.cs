using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PersonalSite.Application.Blogs.Commands.CreateBlog;
using PersonalSite.Application.Blogs.DeleteBlog;
using PersonalSite.Application.Blogs.Queries.GetBlogs;
using PersonalSite.Application.Blogs.UpdateBlog;

namespace PersonalSite.WebUI.Controllers
{
	/// <summary>
	/// api for crud operations on a blog category.
	/// </summary>
	[Authorize]
	[ApiController]
	[Route("/Api/Blogs")]
	public class BlogController : ApiController
	{
		private readonly ILogger _logger;

		/// <summary>
		/// Initializes a new instance of the <see cref="BlogController"/> class.
		/// </summary>
		/// <param name="loggerFactory">Log controller actions.</param>
		/// <param name="crudService">The crud service used.</param>
		public BlogController(
			ILoggerFactory loggerFactory)
		{
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
		public async Task<Guid> CreateAsync(CreateBlogCommand command)
		{
			return await Mediator.Send(command);
		}

		/// <summary>
		/// edit a blog.
		/// </summary>
		/// <param name="project">A blog entity.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpPut]
		[Authorize]
		[Route("{id}")]
		public async Task<ActionResult> EditAsync(Guid Id, UpdateBlogCommand command)
		{
			if (Id != command.Id)
			{
				return BadRequest();
			}
			await Mediator.Send(command);
			return NoContent();
		}

		/// <summary>
		/// gets all blogs.
		/// </summary>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpGet]
		[AllowAnonymous]
		[Route("")]
		public async Task<ActionResult<IEnumerable<BlogDto>>> GetAsync()
		{
			return Ok(await Mediator.Send(new GetBlogsQuery()));
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
			return await Mediator.Send(new GetBlogByIdQuery { Id = id });
		}

		/// <summary>
		/// deletes a particular blog.
		/// </summary>
		/// <param name="id">the id of the blog to delete.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpDelete]
		[Route("{id}")]
		public async Task<ActionResult> DeleteAsync(Guid id)
		{
			await Mediator.Send(new DeleteBlogCommand { Id = id });
			return NoContent();
		}
	}
}