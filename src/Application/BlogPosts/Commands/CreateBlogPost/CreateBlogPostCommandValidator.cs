using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using PersonalSite.Application.Common.Interfaces;

namespace PersonalSite.Application.BlogPosts.CreateBlogPost
{
	public class CreateBlogPostCommandValidator : AbstractValidator<CreateBlogPostCommand>
	{

		private readonly IDbContext _context;


		public CreateBlogPostCommandValidator(IDbContext context)
		{
			_context = context;

			RuleFor(v => v.BlogId).NotEmpty();

			RuleFor(v => v.Content)
				.MaximumLength(1500)
				.WithMessage("Content cannot exceed 1500 characters.")
				.NotEmpty();
			RuleFor(v => v.Title)
				.NotEmpty()
				.WithMessage("Title is required.")
				.MustAsync(BeUniqueTitle).WithMessage("The specified title already exists.");
		}

		public async Task<bool> BeUniqueTitle(string title, CancellationToken cancellationToken)
		{
			return await _context.BlogPost
				.AllAsync(l => l.Title != title);
		}
	}
}
