using System;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using MediatR;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Application.Projects.DeleteProject
{
	public class DeleteProjectCommand : IRequest
	{
		public Guid Id { get; set; }
	}

	public class DeleteProjectHandler : IRequestHandler<DeleteProjectCommand>
	{
		private readonly IDbContext _context;

		public DeleteProjectHandler(IDbContext context)
		{
			_context = context;
		}

		public async Task<Unit> Handle(DeleteProjectCommand request, CancellationToken cancellationToken)
		{
			var entity = await _context.Project.FindAsync(request.Id);

			if (entity == null)
			{
				throw new NotFoundException(nameof(Project), request.Id);
			}

			_context.Project.Remove(entity);

			await _context.SaveChangesAsync(cancellationToken);

			return Unit.Value;
		}
	}
}
