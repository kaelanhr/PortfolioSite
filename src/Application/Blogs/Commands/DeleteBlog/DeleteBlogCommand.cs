using System;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using MediatR;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Application.Blogs.DeleteBlog
{
	public class DeleteBlogCommand : IRequest
	{
		public Guid Id { get; set; }
	}

	public class DeleteBlogHandler : IRequestHandler<DeleteBlogCommand>
	{
		private readonly IDbContext _context;

		public DeleteBlogHandler(IDbContext context)
		{
			_context = context;
		}

		public async Task<Unit> Handle(DeleteBlogCommand request, CancellationToken cancellationToken)
		{
			var entity = await _context.Blog.FindAsync(request.Id);

			if (entity == null)
			{
				throw new NotFoundException(nameof(Blog), request.Id);
			}

			_context.Blog.Remove(entity);

			await _context.SaveChangesAsync(cancellationToken);

			return Unit.Value;
		}
	}
}
