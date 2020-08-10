namespace PersonalSite.Application.Common.Interfaces
{
	public interface IModelDto<T>
	{
		public abstract T ToEntity();

		public abstract ModelDto<T> LoadEntity(T model);
	}
}
