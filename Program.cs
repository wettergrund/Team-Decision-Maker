using Team_Decision_Maker.Data;

namespace Team_Decision_Maker
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            // APIs here 



            app.MapGet("API/users/all", () =>
            {
                using (var dbContext = new DMDbContext())
                {
                    var users = dbContext.Users.ToList();
                    return Results.Json(users);
                }

            });

            app.MapGet("API/board={id}", (int boardId) =>
            {
                using (var dbContext = new DMDbContext())
                {
                    var board = dbContext.Boards.FirstOrDefault(id => id.Boar_Id == boardId);
                    var items = dbContext.Items.Where(args => args.BoardModelId == boardId).ToList();

                    var response = new
                    {
                        Board = board,
                        Items = items
                    };
                    
                    return Results.Json(response);
                }

               

            });



            app.Run();
        }
    }
}