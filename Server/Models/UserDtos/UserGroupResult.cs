using System.ComponentModel.DataAnnotations;

namespace PersonalSite.UserDtos
{
	/// <summary>
	/// user group attributes for a user.
	/// </summary>
	public class UserGroupResult
	{
		/// <summary>
		/// Gets or sets the name of the user group.
		/// </summary>
		[Required]
		[Display(Name = "Name")]
		public string Name { get; set; }
	}
}