using System;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using MediatR;
using PersonalSite.Application.Common.Interfaces;

namespace PersonalSite.Application.BlogPosts.UpdateBlogPost
{
	public class UpdateBlogPostCommand : IRequest
	{
		public Guid BlogId { get; set; }
		public Guid Id { get; set; }
		public string Content { get; set; }
		public string Title { get; set; }
	}

	public class UpdateBlogPostCommandHandler : IRequestHandler<UpdateBlogPostCommand>
	{
		private readonly IDbContext _context;

		public UpdateBlogPostCommandHandler(IDbContext context)
		{
			_context = context;
		}

		public async Task<Unit> Handle(UpdateBlogPostCommand request, CancellationToken cancellationToken)
		{
			var entity = await _context.BlogPost.FindAsync(request.Id);

			if (entity == null)
			{
				throw new NotFoundException(nameof(BlogPosts), request.Id);
			}

			entity.Content = request.Content;
			entity.BlogId = request.BlogId;
			entity.Title = request.Title;

			await _context.SaveChangesAsync(cancellationToken);

			return Unit.Value;
		}
	}
}
