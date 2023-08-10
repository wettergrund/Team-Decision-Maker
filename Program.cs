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
            builder.Services.AddCors(options => options.AddDefaultPolicy(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

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

            app.MapPost("API/users/new", (string mail, string firstName, string lastname) =>
            {
                UserModel newUser = new UserModel {
                
                    FirstName = firstName,
                    LastName = lastname,
                    Email = mail

                };

                using (var dbContext = new DMDbContext())
                {
                    dbContext.Users.Add(newUser);
                    dbContext.SaveChanges();
                }

                return Results.Json(newUser);


            });

           

            app.MapGet("API/board={id}", (int boardId) =>
            {
                using (var dbContext = new DMDbContext())
                {
                    var board = dbContext.Boards.FirstOrDefault(id => id.Boar_Id == boardId);
                    var items = dbContext.Items.Where(args => args.BoardId == boardId).ToList();
                    var factors = dbContext.Factors.Where(args => args.BoardId == boardId).ToList();


                    var response = new
                    {
                        Board = board,
                        factors = factors,
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

            app.MapPost("API/item/new", (string itemTitle, int BoardID) =>
            {
                BoardItemModel newItem = new BoardItemModel
                {
                    Title = itemTitle,
                    BoardId = BoardID
                };



                using (var dbContext = new DMDbContext())
                {
                    dbContext.Items.Add(newItem);
                    dbContext.SaveChanges();
                }

                return Results.Json(newItem);


            });

            // Add a factor

            app.MapPost("API/factor/new", (string factorTitle, int Weight, int BoardID) =>
            {
                FactorModel newFactor = new FactorModel
                {
                    FactorName = factorTitle,
                    Weight = Weight,
                    BoardId = BoardID
                    
                };



                using (var dbContext = new DMDbContext())
                {
                    dbContext.Factors.Add(newFactor);
                    dbContext.SaveChanges();
                }

                return Results.Json(newFactor);


            });

            // Change factor

            app.MapPost("API/factor/update", (int newWeight, int factorId) =>
            {


                using (var dbContext = new DMDbContext())
                {
                    FactorModel existingFactor = dbContext.Factors.FirstOrDefault(f => f.FactorId == factorId);
                    existingFactor.Weight = newWeight;

                    dbContext.Factors.Update(existingFactor);
                    dbContext.SaveChanges();
                    return Results.Json(existingFactor);
                }



            });



            app.UseCors();

            app.Run();
        }
    }
}