using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using PersonalSite.Application.Common.Interfaces;

namespace PersonalSite.Application.Blogs.Commands.CreateBlog
{
	public class CreateBlogCommandValidator : AbstractValidator<CreateBlogCommand>
	{
		private readonly IDbContext _context;

		public CreateBlogCommandValidator(IDbContext context)
		{
			_context = context;

			RuleFor(v => v.Title)
				.MaximumLength(100)
				.WithMessage("Title cannot exceed 100 characters.")
				.MustAsync(BeUniqueTitle).WithMessage("The specified title already exists.")
				.NotEmpty();
		}

		public async Task<bool> BeUniqueTitle(string title, CancellationToken cancellationToken)
		{
			return await _context.Project
				.AllAsync(l => l.Title != title);
		}
	}
}