using System;
using System.ComponentModel.DataAnnotations;

namespace PersonalSite.Models
{
	/// <summary>
	/// All shared model attributes.
	/// </summary>
	public abstract class AbstractModel
	{
		/// <summary>
		/// Gets or sets the primary key of the entity.
		/// </summary>
		[Key]
		public Guid Id { get; set; }
	}
}