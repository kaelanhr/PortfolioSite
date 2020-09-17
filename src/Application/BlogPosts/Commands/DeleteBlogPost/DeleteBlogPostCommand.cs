using System;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using MediatR;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Application.BlogPosts.DeleteBlogPost
{
	public class DeleteBlogPostCommand : IRequest
	{
		public Guid Id { get; set; }
	}

	public class DeleteBlogPostHandler : IRequestHandler<DeleteBlogPostCommand>
	{
		private readonly IDbContext _context;

		public DeleteBlogPostHandler(IDbContext context)
		{
			_context = context;
		}

		public async Task<Unit> Handle(DeleteBlogPostCommand request, CancellationToken cancellationToken)
		{
			var entity = await _context.BlogPost.FindAsync(request.Id);

			if (entity == null)
			{
				throw new NotFoundException(nameof(BlogPost), request.Id);
			}

			_context.BlogPost.Remove(entity);

			await _context.SaveChangesAsync(cancellationToken);

			return Unit.Value;
		}
	}
}
