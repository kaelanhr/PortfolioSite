using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalSite.Models
{
	public abstract class ModelDto<T>
	{
		public Guid Id { get; set; }

		public DateTime Creation { get; set; }

		public DateTime Updated { get; set; }
	}
}
