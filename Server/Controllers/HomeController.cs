using System;
using System.Web;
using System.Web.Mvc;

namespace Server.Controllers
{
	public class HomeController : Controller
	{		
		public string TypeScriptMountVirtualPath = $"/App";
		public const string TypeScriptMountPhysicalPath = "/Content/Generated";		

		public ActionResult TypeScriptOutputPath()
		{
			var path = HttpContext.Request.Url.PathAndQuery;
			// If the requested resource begins with the virtual path then replace the path with the physical path name.
			if (path.StartsWith(TypeScriptMountVirtualPath, StringComparison.OrdinalIgnoreCase))
			{
				var pathWithOutVirtualPathPrefix = path.Substring(TypeScriptMountVirtualPath.Length);
				path = $"{Server.MapPath(TypeScriptMountPhysicalPath)}{pathWithOutVirtualPathPrefix}";
			}
			// If it's a static file on disk then serve it up.
			if (System.IO.File.Exists(path))
				return new FilePathResult(path, MimeMapping.GetMimeMapping(path));

			// If the resource doesn't exist on disk then serve up index.html and let the client side routing handle requests from here.
			return new FilePathResult($"{Server.MapPath(TypeScriptMountPhysicalPath)}/index.html", "text/html");
		}
		
	}
}
