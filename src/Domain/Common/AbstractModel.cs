using System;

namespace PersonalSite.Domain.Common
{
	/// <summary>
	/// All shared model attributes.
	/// </summary>
	public abstract class AbstractModel : IModel
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
		public DateTime LastModified { get; set; }
	}
}