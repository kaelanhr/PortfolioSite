using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using PersonalSite.Application.Common.Interfaces;

namespace PersonalSite.Application.Projects.UpdateProject
{
	public class UpdateProjectCommandValidator : AbstractValidator<UpdateProjectCommand>
	{

		private readonly IDbContext _context;

		public UpdateProjectCommandValidator(IDbContext context)
		{
			_context = context;

			RuleFor(v => v.Id).NotEmpty();
			RuleFor(v => v.Content)
				.MaximumLength(1500)
				.WithMessage("Content cannot exceed 1500 characters.")
				.NotEmpty();
			RuleFor(v => v.Title)
				.NotEmpty()
				.WithMessage("Title is required.")
				.MustAsync(BeUniqueTitle).WithMessage("The specified title already exists.");
		}

		public async Task<bool> BeUniqueTitle(UpdateProjectCommand model, string title, CancellationToken cancellationToken)
		{
			return await _context.Project
				.Where(l => l.Id != model.Id)
				.AllAsync(l => l.Title != title);
		}
	}
}