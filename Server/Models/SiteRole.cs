using System;
using Microsoft.AspNetCore.Identity;

namespace PersonalSite.Models
{
	/// <summary>
	/// A registered user of the site.
	/// </summary>
	public class SiteRole : IdentityRole<Guid>
	{

		public SiteRole(string roleName) : base(roleName)
		{

		}

		public SiteRole() : base()
		{

		}


	}
}