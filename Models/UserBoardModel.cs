using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Team_Decision_Maker.Models
{
    public class UserBoardModel
    {
        [Key] public int UBID { get; set; }
        public int UserId { get; set; }
        public int BoardId { get; set; }



        [ForeignKey("UserId")]
        public UserModel UserModelFK { get; set; }

        [ForeignKey("BoardId")]
        public BoardModel BoardModelFK { get; set; }

    }
}
