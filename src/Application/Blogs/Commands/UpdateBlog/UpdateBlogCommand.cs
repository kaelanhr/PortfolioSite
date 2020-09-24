using System;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Http;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Application.Services;

namespace PersonalSite.Application.Blogs.UpdateBlog
{
	public class UpdateBlogCommand : IRequest
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public IFormFile file { get; set; }
	}

	public class UpdateBlogCommandHandler : IRequestHandler<UpdateBlogCommand>
	{
		private readonly IDbContext _context;
		private readonly FileService _fileService;

		public UpdateBlogCommandHandler(IDbContext context, FileService fileService)
		{
			_context = context;
			_fileService = fileService;
		}

		public async Task<Unit> Handle(UpdateBlogCommand request, CancellationToken cancellationToken)
		{
			var entity = await _context.Blog.FindAsync(request.Id);

			if (entity == null)
			{
				throw new NotFoundException(nameof(Blogs), request.Id);
			}

			entity.Title = request.Title;
			entity.Header = _fileService.ProcessFile(request.file, "blog");

			await _context.SaveChangesAsync(cancellationToken);
			await _fileService.SaveFile(entity.Header);

			return Unit.Value;
		}
	}
}
