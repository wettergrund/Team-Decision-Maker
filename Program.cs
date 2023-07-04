using Team_Decision_Maker.Data;
using Team_Decision_Maker.Models;

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


            // Add board
            app.MapPost("API/board/new", (string Title, string Description) =>
            {
                BoardModel newBoard = new BoardModel();

                newBoard.Title = Title;
                newBoard.Description = Description;

                using (var dbContext = new DMDbContext())
                {
                    dbContext.Boards.Add(newBoard);
                    dbContext.SaveChanges();
                }

                return Results.Json(newBoard);


            });

            // Add item to board

            app.MapPost("API/item/new", (string itemTitle, int Weight, int BoardID) =>
            {
                BoardItemModel newItem = new BoardItemModel
                {
                    Title = itemTitle,
                    BoardModelId = BoardID
                };



                using (var dbContext = new DMDbContext())
                {
                    dbContext.Items.Add(newItem);
                    dbContext.SaveChanges();
                }

                return Results.Json(newItem);


            });



            app.Run();
        }
    }
}