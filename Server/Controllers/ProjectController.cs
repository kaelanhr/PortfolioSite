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
		[Route("Create")]
		public async Task<Project> CreateBlogAsync([BindRequired, FromBody] Project project)
		{
			// cannot specify the guid.
			if (project.Id != Guid.Empty)
			{
				Response.StatusCode = (int)HttpStatusCode.BadRequest;
				return null;
			}

			_logger.LogInformation(4, "creating a blog.");
			return await _crudService.CreateAsync(project);
		}

		[HttpGet]
		[AllowAnonymous]
		[Route("")]
		public async Task<IEnumerable<Project>> GetProjectsAsync()
		{
			return await _crudService.Get<Project>().ToListAsync();
		}

		[HttpGet]
		[AllowAnonymous]
		[Route("{id}")]
		public async Task<Project> GetProjectByIdAsync(Guid id)
		{
			return await _crudService.GetById<Project>(id).FirstOrDefaultAsync();
		}

		/// <summary>
		/// deletes a particular project.
		/// </summary>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpDelete]
		[Route ("{id}")]
		public async Task<Guid> DeleteProjectAsync(Guid id)
		{
			return await _crudService.DeleteAsync<Project>(id);
		}
	}
}