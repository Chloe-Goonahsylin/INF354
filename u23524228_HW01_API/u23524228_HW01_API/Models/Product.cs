using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace u23524228_HW01_API.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }//primary key in the DB

        [Required]
        public string Name { get; set; } = string.Empty;//name

        [Required]
        public string Description { get; set; } = string.Empty;//decription

        [Required]
        public double Price { get; set; }//double 

    }
}
