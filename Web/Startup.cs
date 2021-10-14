using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace Web
{
	public class Startup
	{
		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllers();
		}
		
		public string TypeScriptMountVirtualPath = $"/App";
		public const string TypeScriptMountPhysicalPath = "/";

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			//var path = httpcontext.request.url.pathandquery;
			//// if the requested resource begins with the virtual path then replace the path with the physical path name.
			//if (path.startswith(typescriptmountvirtualpath, stringcomparison.ordinalignorecase))
			//{
			//	var pathwithoutvirtualpathprefix = path.substring(typescriptmountvirtualpath.length);
			//	path = $"{server.mappath(typescriptmountphysicalpath)}{pathwithoutvirtualpathprefix}";
			//}
			//// if it's a static file on disk then serve it up.
			//if (system.io.file.exists(path))
			//	return new filepathresult(path, mimemapping.getmimemapping(path));

			//// if the resource doesn't exist on disk then serve up index.html and let the client side routing handle requests from here.
			//return new filepathresult($"{server.mappath(typescriptmountphysicalpath)}/index.html", "text/html");

			app.Use(async (context, next) =>
			{
				await next();
				var path = context.Request.Path.Value;

				if (path.StartsWith("/api", System.StringComparison.OrdinalIgnoreCase))
				{					
					return;
				}

				if (path.StartsWith(TypeScriptMountVirtualPath, System.StringComparison.OrdinalIgnoreCase))
				{
					var pathWithoutVirtualPathPrefix = path.Substring(TypeScriptMountVirtualPath.Length);
					path = $"{TypeScriptMountPhysicalPath}{pathWithoutVirtualPathPrefix}";					
				}

				if (Path.HasExtension(path))
				{
					context.Request.Path = path;
					await next();
					return;
				}

				context.Request.Path = $"{TypeScriptMountPhysicalPath}/index.html";
				await next();
			});

			app.UseDefaultFiles();
			app.UseStaticFiles();

			app.UseRouting();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
