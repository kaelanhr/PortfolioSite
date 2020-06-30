using PersonalSite.Models;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace PersonalSite.Attributes.Validator
{
	/// <summary>
	/// Experimental code to try to get a unique attribute working.
	/// </summary>
	public class ProjectUniqueAttribute : ValidationAttribute
	{
		protected override ValidationResult IsValid(
			object value, ValidationContext validationContext)
		{
			var context = (SiteDbContext)validationContext.GetService(typeof(SiteDbContext));
			var entity = context.Project.SingleOrDefault(e => e.Title == value.ToString());

			return entity != null ? new ValidationResult(GetErrorMessage(value.ToString())) : ValidationResult.Success;
		}

		public string GetErrorMessage(string title)
		{
			return $"Project title must be unique.";
		}
	}
}
