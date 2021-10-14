using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Client
{
	public class Startup
	{		
		public void ConfigureServices(IServiceCollection _)
		{
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())			
				app.UseDeveloperExceptionPage();

			app.UseDefaultFiles();
			app.UseStaticFiles(new StaticFileOptions
			{
				OnPrepareResponse = ctx =>
				{
					// The home page (index.html) should have a very low freshness time so any updates to dynamically-
					// generated assets can be picked up immediately by browsers (the index.html file's URLs to the
					// assets will change if they're changed)
					if (string.Equals(ctx.File.Name, "index.html", StringComparison.OrdinalIgnoreCase))
					{
						ctx.Context.Response.Headers.Append("Cache-Control", "public, max-age=60");
					}
					// Cache all these files for a whole year because they're generated by webpack and will have hashes
					// in their file names that change whenever the content changes
					else if (ctx.File.Name.EndsWith(".js", StringComparison.OrdinalIgnoreCase))
					{
						ctx.Context.Response.Headers.Append("Cache-Control", "public, max-age=31536000");
					}
				}
			});
		}
	}
}
