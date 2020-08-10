using System.Collections.Generic;

namespace PersonalSite.Application.Users
{
	/// <summary>
	/// type returned to the client as a user result.
	/// </summary>
	public class UserDto
	{
		/// <summary>
		/// Gets or sets the email of the user.
		/// </summary>
		public string Email { get; set; }

		/// <summary>
		/// Gets or sets username of user.
		/// </summary>
		public string UserName { get; set; }

		/// <summary>
		/// Gets or sets users first name.
		/// </summary>
		public string FirstName { get; set; }

		/// <summary>
		/// Gets or sets users last name.
		/// </summary>
		public string LastName { get; set; }

		/// <summary>
		/// Gets or sets an enumerable object of the users groups.
		/// </summary>
		public IEnumerable<UserGroupResult> UserGroups { get; set; }
	}
}