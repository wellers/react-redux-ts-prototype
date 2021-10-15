using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace Web
{
	public class Startup
	{
		public const string TypeScriptMountVirtualPath = "/App";
		public const string ApiVirtualPath = "/Api";
		public const string TypeScriptMountPhysicalPath = "/";

		public void ConfigureServices(IServiceCollection services)
		{
			services
				.AddControllers()
				.AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNamingPolicy = null);
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
				app.UseDeveloperExceptionPage();

			app.Use(async (context, next) =>
			{
				await next();
				var path = context.Request.Path.Value;
				if (!path.StartsWith(ApiVirtualPath, System.StringComparison.OrdinalIgnoreCase))
				{
					if (path.StartsWith(TypeScriptMountVirtualPath, System.StringComparison.OrdinalIgnoreCase))
					{
						var pathWithoutVirtualPathPrefix = path.Substring(TypeScriptMountVirtualPath.Length);
						path = Path.Combine(TypeScriptMountPhysicalPath, pathWithoutVirtualPathPrefix);
					}

					context.Request.Path = Path.HasExtension(path) ? path : Path.Combine(TypeScriptMountPhysicalPath, "/index.html");				
					await next();
				}
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
