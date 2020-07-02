using System;

namespace PersonalSite.Models
{
	/// <summary>
	/// Abstract class for model dto's. Containing shared properties.
	/// </summary>
	/// <typeparam name="T">The generic model type.</typeparam>
	public abstract class ModelDto<T>
	{
		/// <summary>
		/// Gets or sets the primary key of the entity.
		/// </summary>
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
