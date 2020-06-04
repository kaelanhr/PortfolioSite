using System;
using System.ComponentModel.DataAnnotations;

namespace PersonalSite.Models
{
	/// <summary>
	/// All shared model attributes.
	/// </summary>
	public interface IAbstractModel
	{
		/// <summary>
		/// Gets or sets the primary key of the entity.
		/// </summary>
		Guid Id { get; set; }
	}
}