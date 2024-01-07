
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string username {get; set;}

        [Required]
        public string Password {get; set;}

          [Required]
        public string UserRolle { get; set; }
    }
}