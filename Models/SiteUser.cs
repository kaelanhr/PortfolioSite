using System;
using Microsoft.AspNetCore.Identity;

namespace PersonalSite.Models
{
	/// <summary>
	/// A registered user of the site.
	/// </summary>
	public class SiteUser : IdentityUser<Guid>
	{
		/// <summary>
		/// Gets or sets first name of the user.
		/// </summary>
		public string FirstName { get; set; }

		/// <summary>
		/// Gets or sets last name of the user.
		/// </summary>
		public string LastName { get; set; }
	}
}