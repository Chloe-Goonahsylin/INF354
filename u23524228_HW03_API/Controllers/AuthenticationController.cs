using u23524228_HW03_API.Models;
using u23524228_HW03_API.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace u23524228_HW03_API.Controllers
{
    // Defines the route for the controller as "api/Authentication"
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        // Dependencies injected through constructor
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserClaimsPrincipalFactory<AppUser> _claimsPrincipalFactory;
        private readonly IRepository _repository;
        private readonly IConfiguration _configuration;

        // Constructor for injecting required services
        public AuthenticationController(UserManager<AppUser> userManager, IUserClaimsPrincipalFactory<AppUser> claimsPrincipalFactory, IRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _userManager = userManager;
            _claimsPrincipalFactory = claimsPrincipalFactory;
            _configuration = configuration;
        }

        
        /// Registers a new user if the email does not already exist.
       // UserViewModel containing email and password
        /// <returns>Ok if successful, Forbid if user exists, or 500 on error</returns>
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(UserViewModel uvm)
        {
            // Check if user already exists by email
            var user = await _userManager.FindByIdAsync(uvm.emailaddress);

            if (user == null)
            {
                // Create new user
                user = new AppUser
                {
                    Id = Guid.NewGuid().ToString(),
                    UserName = uvm.emailaddress,
                    Email = uvm.emailaddress
                };

                // Attempt to create user with provided password
                var result = await _userManager.CreateAsync(user, uvm.password);

                // Return error if creation failed
                if (result.Errors.Count() > 0) return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
            else
            {
                // User already exists
                return Forbid("Account already exists.");
            }

            return Ok();
        }


        /// Authenticates a user and returns a JWT token if successful.

        /// <returns>JWT token and username if successful kkkmmmmmmmm NotFound or 500 on error</returns>
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> Login(UserViewModel uvm)
        {
            // Find user by email
            var user = await _userManager.FindByNameAsync(uvm.emailaddress);

            if (user == null)
            {
                // User not found
                return NotFound("Username does not exist.");
            }

            // Validate password
            if (!await _userManager.CheckPasswordAsync(user, uvm.password))
            {
                // Password incorrect
                return Unauthorized("Incorrect password.");
            }

            try
            {
                // Create claims principal (not used further here)
                var principal = await _claimsPrincipalFactory.CreateAsync(user);
                // Generate and return JWT token
                return GenerateJWTToken(user);
            }
            catch (Exception)
            {
                // Internal error during login
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }


        /// Generates a JWT token for the authenticated user.
        // The authenticated AppUser
        /// <returns>Created result with JWT token and username</returns>
        [HttpGet]
        private ActionResult GenerateJWTToken(AppUser user)
        {
            // Define claims for the token
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
            };

            // Create signing credentials using the secret key from configuration
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create the JWT token
            var token = new JwtSecurityToken(
                _configuration["Tokens:Issuer"],
                _configuration["Tokens:Audience"],
                claims,
                signingCredentials: credentials,
                expires: DateTime.UtcNow.AddHours(3)
            );

            // Return the token and username in the response
            return Created("", new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                user = user.UserName
            });
        }

    }
}
