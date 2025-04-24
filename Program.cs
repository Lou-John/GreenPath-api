
using GreenPath.Models;
using GreenPath.Services;

namespace GreenPath
{
   public class Program
   {
      public static void Main(string[] args)
      {
         var builder = WebApplication.CreateBuilder(args);

         // Add services to the container.
         builder.Services.Configure<DatabaseSettings>(
             builder.Configuration.GetSection("PlantDatabase"));

         builder.Services.AddSingleton<PlantsService>();
         builder.Services.AddSingleton<UsersService>();
         builder.Services.AddSingleton<HousesService>();

         builder.Services.AddControllers();
         // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
         builder.Services.AddEndpointsApiExplorer();

         // Automatically register all controllers in the assembly
         builder.Services.AddSwaggerGen();

         //Enable CORS for the frontend application
         // This is for the frontend application to be able to access the API
         builder.Services.AddCors(options =>
         {
            options.AddPolicy("AllowFrontend",
               policy => policy.WithOrigins("http://localhost:5173") // or 3000 for CRA
                              .AllowAnyHeader()
                              .AllowAnyMethod());
         });

         var app = builder.Build();

         // Configure the HTTP request pipeline.
         //if (app.Environment.IsDevelopment())
         //{
         app.UseSwagger();
         app.UseSwaggerUI();
         //}

         app.UseHttpsRedirection();

         app.UseAuthorization();

         app.UseCors("AllowFrontend");

         app.MapControllers();

         app.Run();
      }
   }
}
