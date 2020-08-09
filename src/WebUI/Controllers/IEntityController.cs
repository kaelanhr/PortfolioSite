using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace PersonalSite.Controllers
{
	public interface IEntityController<T>
	{
		Task<T> CreateAsync([BindRequired, FromBody] T entity);
		Task<T> EditAsync([BindRequired, FromBody] T entity);
		Task<Guid> DeleteAsync(Guid id);
		Task<IEnumerable<T>> GetAsync();
		Task<T> GetByIdAsync(Guid id);
	}
}