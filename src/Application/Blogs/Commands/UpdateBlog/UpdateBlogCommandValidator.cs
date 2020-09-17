using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using PersonalSite.Application.Common.Interfaces;

namespace PersonalSite.Application.Blogs.UpdateBlog
{
	public class UpdateBlogCommandValidator : AbstractValidator<UpdateBlogCommand>
	{

		private readonly IDbContext _context;

		public UpdateBlogCommandValidator(IDbContext context)
		{
			_context = context;

			RuleFor(v => v.Id).NotEmpty();
			RuleFor(v => v.Title)
				.NotEmpty()
				.WithMessage("Title is required.")
				.MustAsync(BeUniqueTitle).WithMessage("The specified title already exists.");
		}

		public async Task<bool> BeUniqueTitle(UpdateBlogCommand model, string title, CancellationToken cancellationToken)
		{
			return await _context.Blog
				.Where(l => l.Id != model.Id)
				.AllAsync(l => l.Title != title);
		}
	}
}