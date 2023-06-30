using System.ComponentModel.DataAnnotations;

namespace Team_Decision_Maker.Models
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }






    }
}
