using System;
using System.ComponentModel.DataAnnotations;

namespace PersonalSite.Models
{
	public abstract class AbstractModel
	{
		[Key]
		public Guid Id
		{
			get;
			set;
		}
	}
}