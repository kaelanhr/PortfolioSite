using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Application.BlogPosts.CreateBlogPost
{
	public class CreateBlogPostCommand : IRequest<Guid>
	{
		public string Content { get; set; }
		public Guid BlogId { get; set; }
		public string Title { get; set; }
	}

	public class CreateBlogPostCommandHandler : IRequestHandler<CreateBlogPostCommand, Guid>
	{
		private readonly IDbContext _context;

		public CreateBlogPostCommandHandler(IDbContext context)
		{
			_context = context;
		}

		public async Task<Guid> Handle(CreateBlogPostCommand request, CancellationToken cancellationToken)
		{
			var entity = new BlogPost
			{
				Content = request.Content,
				Title = request.Title,
				BlogId = request.BlogId
			};

			_context.BlogPost.Add(entity);
			await _context.SaveChangesAsync(cancellationToken);

			return entity.Id;
		}
	}
}
