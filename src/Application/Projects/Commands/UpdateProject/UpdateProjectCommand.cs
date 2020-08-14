using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using MediatR;
using PersonalSite.Application.Common.Interfaces;

namespace PersonalSite.Application.Projects.UpdateProject
{
	public class UpdateProjectCommand : IRequest
	{
		public Guid Id { get; set; }
		public string Content { get; set; }
		public string ProjectUrl { get; set; }
		public string Title { get; set; }
	}

	public class UpdateProjectCommandHandler : IRequestHandler<UpdateProjectCommand>
	{
		private readonly IDbContext _context;

		public UpdateProjectCommandHandler(IDbContext context)
		{
			_context = context;
		}

		public async Task<Unit> Handle(UpdateProjectCommand request, CancellationToken cancellationToken)
		{
			var entity = await _context.Project.FindAsync(request.Id);

			if (entity == null)
			{
				throw new NotFoundException(nameof(Projects), request.Id);
			}

			entity.Content = request.Content;
			entity.ProjectUrl = request.ProjectUrl;
			entity.Title = request.Title;

			await _context.SaveChangesAsync(cancellationToken);

			return Unit.Value;
		}
	}
}
