using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalSite.Models
{
	/// <summary>
	/// Everything contained within a single blog post.
	/// </summary>
	public class ProjectDto : ModelDto<Project>, IModelDto<Project>
	{
		/// <summary>
		/// Gets or sets blog content.
		/// </summary>
		[Column(TypeName = "text")]
		[Required]
		public string Content { get; set; }

		/// <summary>
		/// Gets or sets the header image for the project.
		/// </summary>
		public string HeaderImagePath { get; set; }

		/// <summary>
		/// Gets or sets the title of the project.
		/// </summary>
		[Required]
		public string Title { get; set; }

		/// <summary>
		/// Gets or sets a value indicating whether the project is highlighted or not.
		/// </summary>
		[Required]
		public bool Highlight { get; set; }

		public ProjectDto(Project model)
		{
			LoadEntity(model);
		}

		public ProjectDto() { }

		public ModelDto<Project> LoadEntity(Project model)
		{
			Content = model.Content;
			HeaderImagePath = model.HeaderImagePath;
			Title = model.Title;
			Id = model.Id;
			Highlight = model.Highlight;
			Creation = model.Creation;
			Updated = model.Updated;

			return this;
		}

		public Project ToEntity()
		{
			return new Project
			{
				Content = Content,
				HeaderImagePath = HeaderImagePath,
				Title = Title,
				Id = Id,
				Highlight = Highlight,
				Creation = Creation,
				Updated = Updated,
			};
		}
	}
}