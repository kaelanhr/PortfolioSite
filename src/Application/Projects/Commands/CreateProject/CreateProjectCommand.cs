using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Application.Projects.CreateProject
{
	public class CreateProjectCommand : IRequest<Guid>
	{
		public string Content { get; set; }
		public string ProjectUrl { get; set; }
		public string Title { get; set; }
	}

	public class CreateProjectCommandHandler : IRequestHandler<CreateProjectCommand, Guid>
	{
		private readonly IDbContext _context;

		public CreateProjectCommandHandler(IDbContext context)
		{
			_context = context;
		}

		public async Task<Guid> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
		{
			var entity = new Project
			{
				Content = request.Content,
				Title = request.Title,
				ProjectUrl = request.ProjectUrl
			};

			_context.Project.Add(entity);
			await _context.SaveChangesAsync(cancellationToken);

			return entity.Id;
		}
	}
}
