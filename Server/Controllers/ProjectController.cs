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
using PersonalSite.Models;
using PersonalSite.Services;

namespace PersonalSite.Controllers
{
	/// <summary>
	/// Manage the endpoints for projects.
	/// </summary>
	[Authorize]
	[ApiController]
	[Route("/Api/Project")]
	public class ProjectController : Controller
	{
		private readonly ILogger _logger;
		private readonly CrudService _crudService;

		public ProjectController(ILoggerFactory loggerFactory, CrudService crudService)
		{
			_logger = loggerFactory.CreateLogger<ProjectController>();
			_crudService = crudService;
		}

		/// <summary>
		/// Create a project.
		/// </summary>
		/// <param name="project">A project entity.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpPost]
		[Authorize]
		[Route("")]
		public async Task<ProjectDto> CreateBlogAsync([BindRequired, FromBody] ProjectDto project)
		{
			// cannot specify the guid.
			if (project.Id != Guid.Empty)
			{
				Response.StatusCode = (int)HttpStatusCode.BadRequest;
				return null;
			}

			_logger.LogInformation(4, "creating a blog.");
			return new ProjectDto(await _crudService.CreateAsync(project.ToEntity()));
		}

		[HttpGet]
		[AllowAnonymous]
		[Route("")]
		public async Task<IEnumerable<ProjectDto>> GetProjectsAsync()
		{
			var result = _crudService.Get<Project>();
			return await result.Select(m => new ProjectDto(m)).ToListAsync();
		}

		[HttpGet]
		[AllowAnonymous]
		[Route("Highlights")]
		public async Task<IEnumerable<ProjectDto>> GetHighlightedProjectsAsync()
		{
			var result = _crudService.Get<Project>().Where(x => x.Highlight);
			return await result.Select(m => new ProjectDto(m)).ToListAsync();
		}

		[HttpGet]
		[AllowAnonymous]
		[Route("{id}")]
		public async Task<ProjectDto> GetProjectByIdAsync(Guid id)
		{
			var result = _crudService.GetById<Project>(id);
			return await result.Select(m => new ProjectDto(m)).FirstOrDefaultAsync();
		}

		/// <summary>
		/// deletes a particular project.
		/// </summary>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpDelete]
		[Route("{id}")]
		public async Task<Guid> DeleteProjectAsync(Guid id)
		{
			return await _crudService.DeleteAsync<Project>(id);
		}
	}
}