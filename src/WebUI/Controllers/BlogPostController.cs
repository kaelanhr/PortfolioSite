using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PersonalSite.Application.BlogPosts.CreateBlogPost;
using PersonalSite.Application.BlogPosts.DeleteBlogPost;
using PersonalSite.Application.BlogPosts.Queries.GetBlogPosts;
using PersonalSite.Application.BlogPosts.UpdateBlogPost;
using PersonalSite.Application.Blogs.Queries.GetBlogs;
using PersonalSite.Domain.Entities;
using PersonalSite.Services;

namespace PersonalSite.WebUI.Controllers
{
	[Authorize]
	[ApiController]
	[Route("/Api/BlogPost")]
	public class BlogPostController : ApiController
	{
		private readonly ILogger _logger;

		/// <summary>
		/// Initializes a new instance of the <see cref="BlogPostController"/> class.
		/// </summary>
		/// <param name="loggerFactory">Log controller actions.</param>
		/// <param name="crudService">The crud service used.</param>
		public BlogPostController(
			ILoggerFactory loggerFactory)
		{
			_logger = loggerFactory.CreateLogger<BlogPostController>();
		}

		[HttpPost]
		[Authorize]
		[Route("")]
		public async Task<Guid> CreateAsync(CreateBlogPostCommand command)
		{
			return await Mediator.Send(command);
		}

		[HttpDelete]
		[Authorize]
		[Route("{id}")]
		public async Task<ActionResult> DeleteAsync(Guid id)
		{
			await Mediator.Send(new DeleteBlogPostCommand { Id = id });
			return NoContent();
		}

		[HttpPut]
		[Authorize]
		[Route("{id}")]
		public async Task<ActionResult> EditAsync(Guid Id, UpdateBlogPostCommand command)
		{
			if (Id != command.Id)
			{
				return BadRequest();
			}

			await Mediator.Send(command);
			return NoContent();
		}

		[HttpGet]
		[AllowAnonymous]
		[Route("{id}")]
		public async Task<BlogPostDto> GetByIdAsync(Guid id)
		{
			return await Mediator.Send(new GetBlogPostByIdQuery { Id = id });
		}
	}
}
