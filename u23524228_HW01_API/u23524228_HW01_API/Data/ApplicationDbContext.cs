using Microsoft.EntityFrameworkCore;
using u23524228_HW01_API.Models;

namespace u23524228_HW01_API.Data
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }//name that will appear in SSMS table, Pasing in the product model ( so it is based on that) 

/*        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           base.OnModelCreating(modelBuilder)
        }*/



    }
}
