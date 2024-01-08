using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;

        public UsersController(DataContext context) : base(context)  // Make sure to call the base constructor with the context parameter
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

     
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(); // Return 404 if the user is not found
            }

            return user;
        }
        [AllowAnonymous]
        [HttpGet("by-role")]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsersByRole([FromQuery] string UserRolle)
{
    var users = await _context.Users.Where(u => u.UserRolle == UserRolle).ToListAsync();

    if (users == null || !users.Any())
    {
        return NotFound($"No users found with role '{UserRolle}'.");
    }

    return users;
}

        
    }
}
