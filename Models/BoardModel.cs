using System.ComponentModel.DataAnnotations;

namespace Team_Decision_Maker.Models
{
    public class BoardModel
    {
        [Key] public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }


    }
}
