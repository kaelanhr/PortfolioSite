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
	public class ProjectController : Controller, IEntityController<ProjectDto>
	{
		private readonly ILogger _logger;
		private readonly CrudService _crudService;

		/// <summary>
		/// Initializes a new instance of the <see cref="ProjectController"/> class.
		/// </summary>
		/// <param name="loggerFactory">The logger factory being used.</param>
		/// <param name="crudService">The crud service.</param>
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
		public async Task<ProjectDto> CreateAsync([BindRequired, FromBody] ProjectDto project)
		{
			// cannot specify the guid.
			if (project.Id != Guid.Empty)
			{
				Response.StatusCode = (int)HttpStatusCode.BadRequest;
				return null;
			}

			_logger.LogInformation(4, "creating a project.");
			try
			{
				return new ProjectDto(await _crudService.CreateAsync(project.ToEntity()));
			}
			catch (Exception)
			{
				Response.StatusCode = (int)HttpStatusCode.BadRequest;
				throw;
			}
		}

		/// <summary>
		/// edit a project.
		/// </summary>
		/// <param name="project">A project entity.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpPut]
		[Authorize]
		[Route("")]
		public async Task<ProjectDto> EditAsync([BindRequired, FromBody] ProjectDto project)
		{
			if (project.Id == Guid.Empty)
			{
				Response.StatusCode = (int)HttpStatusCode.BadRequest;
				return null;
			}

			return new ProjectDto(await _crudService.UpdateAsync(project.ToEntity()));
		}

		/// <summary>
		/// gets all projects.
		/// </summary>
		/// <returns>All projects.</returns>
		[HttpGet]
		[AllowAnonymous]
		[Route("")]
		public async Task<IEnumerable<ProjectDto>> GetAsync()
		{
			var result = _crudService.Get<Project>();
			return await result.Select(m => new ProjectDto(m)).ToListAsync();
		}

		/// <summary>
		/// Gets all projects which are highlighted.
		/// </summary>
		/// <returns>A list of highlighted projects.</returns>
		[HttpGet]
		[AllowAnonymous]
		[Route("Highlights")]
		public async Task<IEnumerable<ProjectDto>> GetHighlightedProjectsAsync()
		{
			var result = _crudService.Get<Project>().Where(x => x.Highlight);
			return await result.Select(m => new ProjectDto(m)).ToListAsync();
		}

		/// <summary>
		/// Gets a single project, given an id.
		/// </summary>
		/// <param name="id">The id of the project.</param>
		/// <returns>The DTO of the project which matches the id.</returns>
		[HttpGet]
		[AllowAnonymous]
		[Route("{id}")]
		public async Task<ProjectDto> GetByIdAsync(Guid id)
		{
			var result = _crudService.GetById<Project>(id);
			return await result.Select(m => new ProjectDto(m)).FirstOrDefaultAsync();
		}

		/// <summary>
		/// deletes a particular project.
		/// </summary>
		/// <param name="id">The id of the project being deleted.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpDelete]
		[Route("{id}")]
		public async Task<Guid> DeleteAsync(Guid id)
		{
			return await _crudService.DeleteAsync<Project>(id);
		}
	}
}