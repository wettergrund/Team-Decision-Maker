using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Team_Decision_Maker.Models
{
    public class BoardItemModel
    {
        [Key] public int Item_Id { get; set; }
        public string Title { get; set; }

        public int BoardId { get; set; }
        public bool Hidden { get; set; }


        [ForeignKey("BoardId")]
        public BoardModel BoardModel { get; set; } // Navigation property

    }
}
