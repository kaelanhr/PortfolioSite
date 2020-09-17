using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Application.Blogs.Commands.CreateBlog
{

	public class CreateBlogCommand : IRequest<Guid>
	{
		public string Title { get; set; }
	}

	public class CreateBlogCommandHandler : IRequestHandler<CreateBlogCommand, Guid>
	{
		private readonly IDbContext _context;

		public CreateBlogCommandHandler(IDbContext context)
		{
			_context = context;
		}

		public async Task<Guid> Handle(CreateBlogCommand request, CancellationToken cancellationToken)
		{
			var entity = new Blog
			{
				Title = request.Title
			};

			_context.Blog.Add(entity);

			await _context.SaveChangesAsync(cancellationToken);

			return entity.Id;
		}
	}
}