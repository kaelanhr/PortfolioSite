using System;
using Microsoft.AspNetCore.Identity;

namespace PersonalSite.Infrastructure.Identity
{
	/// <summary>
	/// A registered user of the site.
	/// </summary>
	public class SiteRole : IdentityRole<Guid>
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="SiteRole"/> class.
		/// </summary>
		/// <param name="roleName">user role name.</param>
		public SiteRole(string roleName) : base(roleName)
		{
		}

		/// <summary>
		/// Initializes a new instance of the <see cref="SiteRole"/> class.
		/// </summary>
		public SiteRole() : base()
		{
		}
	}
}