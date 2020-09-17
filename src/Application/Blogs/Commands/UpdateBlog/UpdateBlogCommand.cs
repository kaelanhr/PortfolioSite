using System;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using MediatR;
using PersonalSite.Application.Common.Interfaces;

namespace PersonalSite.Application.Blogs.UpdateBlog
{
	public class UpdateBlogCommand : IRequest
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
	}

	public class UpdateBlogCommandHandler : IRequestHandler<UpdateBlogCommand>
	{
		private readonly IDbContext _context;

		public UpdateBlogCommandHandler(IDbContext context)
		{
			_context = context;
		}

		public async Task<Unit> Handle(UpdateBlogCommand request, CancellationToken cancellationToken)
		{
			var entity = await _context.Blog.FindAsync(request.Id);

			if (entity == null)
			{
				throw new NotFoundException(nameof(Blogs), request.Id);
			}

			entity.Title = request.Title;

			await _context.SaveChangesAsync(cancellationToken);

			return Unit.Value;
		}
	}
}
