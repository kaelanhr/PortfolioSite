using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Domain.Entities;
using Microsoft.AspNetCore.Http;
using PersonalSite.Application.Services;
using PersonalSite.Application.Common.Exceptions;

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
		private readonly FileService _fileService;

		public CreateBlogFormCommandHandler(IDbContext context, FileService fileService)
		{
			_context = context;
			_fileService = fileService;
		}

		public async Task<Guid> Handle(CreateBlogFormCommand request, CancellationToken cancellationToken)
		{

			if (_fileService.ValidateFile(request.File))
			{
				throw new ValidationException();
			}

			var processedFile = await _fileService.ProcessFile(request.File, "blog");
			var entity = new Blog
			{
			Title = request.Title,
			Header = processedFile
			};

			_context.Blog.Add(entity);

			await _context.SaveChangesAsync(cancellationToken);
			await _fileService.SaveFile(processedFile);

			return entity.Id;
		}
	}
}