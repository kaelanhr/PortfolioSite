using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace PersonalSite.Application.Blogs.Commands.CreateBlog
{

	public class CreateBlogFormCommand : IRequest<Guid>
	{
		public string Title { get; set; }
		public IFormFile File {get; set;}
	}

	public class CreateBlogFormCommandHandler : IRequestHandler<CreateBlogFormCommand, Guid>
	{
		private readonly IDbContext _context;

		public CreateBlogFormCommandHandler(IDbContext context)
		{
			_context = context;
		}

		public async Task<Guid> Handle(CreateBlogFormCommand request, CancellationToken cancellationToken)
		{

			using var transaction = _context.BeginTransaction();

			var fileEntity = new UploadedFile
			{
				Container = "Blog",
				ContentType = request.File.ContentType,
				FileLength	= request.File.Length,
				FileName = request.File.FileName,
			};

			var entity = new Blog
			{
				Title = request.Title,
				Header = fileEntity
			};

			//_context.UploadedFile.Add(fileEntity);
			_context.Blog.Add(entity);

			transaction.Commit();
			await _context.SaveChangesAsync(cancellationToken);

			return entity.Id;
		}
	}
}