using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Team_Decision_Maker.Models
{
    public class FactorModel
    {
        [Key]
        public int FactorId { get; set; }
        public string FactorName { get; set; }
        public int Weight { get; set; }

        public int BoardId { get; set; }

        public bool Hidden { get; set; }

        [ForeignKey("BoardId")]
        public BoardModel BoardModel { get; set; } // Navigation property

    }
}
