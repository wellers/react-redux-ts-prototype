using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace Server
{
	public class ServerApplication : System.Web.HttpApplication
	{
		protected void Application_Start()
		{
			AreaRegistration.RegisterAllAreas();

			GlobalConfiguration.Configure(WebApiConfig.Register);
			FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);

			RouteTable.Routes.MapRoute("TypeScriptOutputPath", "{*url}", new { Controller = "Home", Action = "TypeScriptOutputPath" });
		}
	}
}
