using System;
using System.ComponentModel.DataAnnotations;

namespace PersonalSite.Models
{
	/// <summary>
	/// Any general site content which can be updated by site admins.
	/// </summary>
	public class SiteContent : AbstractModel
	{
		/// <summary>
		/// Gets or sets title of the content.
		/// </summary>
		public string ContentLabel { get; set; }

		/// <summary>
		/// Gets or sets the content.
		/// </summary>
		public string Content { get; set; }
	}
}