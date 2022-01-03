using Azure.Storage.Blobs;
using AzureWebAppLinux.Interface;
using AzureWebAppLinux.Models;
using AzureWebAppLinux.Services;
using DietOwlApi.Interface;
using DietOwlApi.Middleware;
using DietOwlApi.Models;
using DietOwlApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hangfire;

namespace AzureWebAppLinux
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<DatabaseSettings>(Configuration.GetSection(nameof(DatabaseSettings)));
            services.AddSingleton<IDatabaseSettings>(x => x.GetRequiredService<IOptions<DatabaseSettings>>().Value);

            services.Configure<UploadFolderSettings>(Configuration.GetSection(nameof(UploadFolderSettings)));
            services.AddSingleton<IUploadFolderSettings>(x => x.GetRequiredService<IOptions<UploadFolderSettings>>().Value);

            //services.Configure<UploadFolderSettings>(Configuration.GetSection(nameof(UploadFolderSettings)));
            services.AddSingleton<ITokenService, TokenService>();
            services.AddSingleton<IEmailService, EmailService>();

            services.AddSingleton<IFileService, FileService>();
            services.AddSingleton<IAppUserService, AppUserService>();
            services.AddSingleton<BaseURLService>();
            services.AddSingleton<SubscriptionService>();
            services.AddSingleton<AssessmentFormTemplateService>();
            services.AddSingleton<UserAssessmentFormService>();
            services.AddSingleton<UserMealPlanService>();
            services.AddSingleton<FoodCaloriesService>();
            //services.AddHostedService<EmailBackgroundService>();
            services.AddSingleton<UserSubscriptionService>();
            services.AddControllers();

            //services.AddCors();
            services.AddCors(options => options.AddPolicy("AllowAll", p => p.WithOrigins("https://localhost:4200/")
                                                                        .AllowAnyMethod()
                                                                        .AllowAnyHeader()));

            services.AddResponseCompression();
            services.AddHttpContextAccessor();

            //Azure Blob Settings
            services.AddSingleton(x => new BlobServiceClient(Configuration.GetValue<string>("BlobConnection")));
            services.AddSingleton<IBlobService, AzureStorageService>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                    };
                });

            //HangFire settings
            services.AddHangfire(x => x.UseSqlServerStorage("Data Source=localhost;Initial Catalog=hangfire;Integrated Security=True;Pooling=False"));
            services.AddHangfireServer();
        
        }

            // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
            public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //}
            app.UseMiddleware<ExceptionMiddleware>();

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseCors(x => x
           .AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader());

            app.UseHttpsRedirection();

            app.UseRouting();

            //Order of next 3 lines are important
            app.UseAuthentication();

            app.UseAuthorization();

            app.UseHangfireDashboard();


            //app.UseCors("AllowAll");
            //app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://dietowl.selektial.com", "https://dietowl.selektial.com","http://localhost:4200"));
            //app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true).AllowCredentials());

            app.UseResponseCompression();

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapControllers();
                endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
