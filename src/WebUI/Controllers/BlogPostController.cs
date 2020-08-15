//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.ModelBinding;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Logging;
//using PersonalSite.Application.Blogs.Queries.GetBlogs;
//using PersonalSite.Domain.Entities;
//using PersonalSite.Services;

//namespace PersonalSite.Controllers
//{
//	[Authorize]
//	[ApiController]
//	[Route("/Api/BlogPost")]
//	public class BlogPostController : Controller
//	{
//		private readonly ILogger _logger;
//		private readonly CrudService _crudService;

//		/// <summary>
//		/// Initializes a new instance of the <see cref="BlogPostController"/> class.
//		/// </summary>
//		/// <param name="loggerFactory">Log controller actions.</param>
//		/// <param name="crudService">The crud service used.</param>
//		public BlogPostController(
//			ILoggerFactory loggerFactory,
//			CrudService crudService)
//		{
//			_crudService = crudService;
//			_logger = loggerFactory.CreateLogger<BlogPostController>();
//		}

//		[HttpPost]
//		[Authorize]
//		[Route("")]
//		public async Task<BlogPostDto> CreateAsync([BindRequired, FromBody] BlogPostDto blogPost)
//		{
//			// cannot specify the guid.
//			if (blogPost.Id != Guid.Empty)
//			{
//				Response.StatusCode = (int)HttpStatusCode.BadRequest;
//				return null;
//			}

//			_logger.LogInformation(4, "creating a blog post.");
//			try
//			{
//				return new BlogPostDto(await _crudService.CreateAsync(blogPost.ToEntity()));
//			}
//			catch (Exception)
//			{
//				Response.StatusCode = (int)HttpStatusCode.BadRequest;
//				throw;
//			}
//		}

//		[HttpDelete]
//		[Authorize]
//		[Route("{id}")]
//		public async Task<Guid> DeleteAsync(Guid id)
//		{
//			return await _crudService.DeleteAsync<BlogPost>(id);
//		}

//		[HttpPut]
//		[Authorize]
//		[Route("")]
//		public async Task<BlogPostDto> EditAsync([BindRequired, FromBody] BlogPostDto blogPost)
//		{
//			if (blogPost.Id == Guid.Empty)
//			{
//				Response.StatusCode = (int)HttpStatusCode.BadRequest;
//				return null;
//			}

//			return new BlogPostDto(await _crudService.UpdateAsync(blogPost.ToEntity()));
//		}

//		[HttpGet]
//		[AllowAnonymous]
//		[Route("")]
//		public async Task<IEnumerable<BlogPostDto>> GetAsync()
//		{
//			var result = _crudService.Get<BlogPost>();
//			return await result.Select(b => new BlogPostDto(b)).ToListAsync();
//		}

//		[HttpGet]
//		[AllowAnonymous]
//		[Route("{id}")]
//		public async Task<BlogPostDto> GetByIdAsync(Guid id)
//		{
//			var result = _crudService.GetById<BlogPost>(id);
//			return await result.Select(b => new BlogPostDto(b)).FirstOrDefaultAsync();
//		}
//	}
//}
