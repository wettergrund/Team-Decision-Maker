using Microsoft.EntityFrameworkCore;
using System.Linq;
using Team_Decision_Maker.Models;

namespace Team_Decision_Maker.Data
{
    public class DMDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=localhost; Initial Catalog=decisionMKR;Integrated Security=true;TrustServerCertificate=True");
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<BoardModel> Boards { get; set; }
        public DbSet<BoardItemModel> Items { get; set; }

        public DbSet<UserBoardModel> UserBoardLink { get; set; }



    }
}
