using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using PersonalSite.Application.Common.Interfaces;

namespace PersonalSite.Application.Projects.CreateProject
{
	public class CreateProjectCommandValidator : AbstractValidator<CreateProjectCommand>
	{

		private readonly IDbContext _context;


		public CreateProjectCommandValidator(IDbContext context)
		{
			_context = context;

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
			return await _context.Project
				.AllAsync(l => l.Title != title);
		}
	}
}
