using System;
using System.ComponentModel.DataAnnotations;

namespace PersonalSite.Models
{
	/// <summary>
	/// All shared model attributes.
	/// </summary>
	public interface IModel
	{
		/// <summary>
		/// Gets or sets the primary key of the entity.
		/// </summary>
		[Key]
		public Guid Id { get; set; }

		/// <summary>
		/// Gets or sets the creation date of the entity.
		/// </summary>
		public DateTime Creation { get; set; }

		/// <summary>
		/// Gets or sets the last updated date of the entity.
		/// </summary>
		public DateTime Updated { get; set; }
	}
}