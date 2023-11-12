using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly DataContext _context;

        // Constructor to initialize the AccountController with DataContext and ITokenService
        public AccountController(DataContext context, ITokenService tokenService) : base(context)
        {
            _tokenService = tokenService;
            _context = context;
        }

        // Data transfer object (DTO) for user registration
        public class RegisterDto
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        // Data transfer object (DTO) for user login
        public class LoginDto
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        // Endpoint for user registration
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            // Check if the username is already taken
            if (await UserExists(registerDto.Username))
            {
                return BadRequest("Username is taken");
            }

            // Use HMACSHA512 for password hashing
            using var hmac = new HMACSHA512();

            // Create a new AppUser with the provided username and hashed password
            var user = new AppUser
            {
                UserName = registerDto.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            // Add the user to the database and save changes
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return a UserDto containing the username and a JWT token
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        // Endpoint for user login
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            // Find the user with the provided username in the database
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            // If the user is not found, return Unauthorized
            if (user == null) return Unauthorized("Invalid Username");

            // Use the stored password salt to create an HMACSHA512 instance
            using var hmac = new HMACSHA512(user.PasswordSalt);

            // Compute the hash of the provided password
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            // Compare the computed hash with the stored password hash
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

            // If the password is valid, return a UserDto with the username and a JWT token
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        // Private method to check if a user with a given username already exists
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }
    }
}
