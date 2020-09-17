using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using PersonalSite.Application.Common.Interfaces;

namespace PersonalSite.Application.BlogPosts.UpdateBlogPost
{
	public class UpdateBlogPostCommandValidator : AbstractValidator<UpdateBlogPostCommand>
	{

		private readonly IDbContext _context;

		public UpdateBlogPostCommandValidator(IDbContext context)
		{
			_context = context;

			RuleFor(v => v.Id).NotEmpty();
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

		public async Task<bool> BeUniqueTitle(UpdateBlogPostCommand model, string title, CancellationToken cancellationToken)
		{
			return await _context.BlogPost
				.Where(l => l.Id != model.Id)
				.AllAsync(l => l.Title != title);
		}
	}
}