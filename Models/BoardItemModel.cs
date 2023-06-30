using System.ComponentModel.DataAnnotations;

namespace Team_Decision_Maker.Models
{
    public class BoardItemModel
    {
        [Key] public int Item_Id { get; set; }
        public string Title { get; set; }
        public int Weight { get; set; }
        public int Score { get; set; }

        public BoardModel Id { get; set; }




    }
}
