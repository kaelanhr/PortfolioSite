using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalSite.Models
{
	public interface IModelDto<T>
	{
		public abstract T ToEntity();

		public abstract ModelDto<T> LoadEntity(T model);
	}
}
