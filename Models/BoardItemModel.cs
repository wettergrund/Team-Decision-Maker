using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Team_Decision_Maker.Models
{
    public class BoardItemModel
    {
        [Key] public int Item_Id { get; set; }
        public string Title { get; set; }
        public int Weight { get; set; }
        public int Score { get; set; }

        public int BoardModelId { get; set; }


        [ForeignKey("BoardModelId")]
        [NotMapped]
        public BoardModel BoardModel { get; set; } // Navigation property

    }
}
