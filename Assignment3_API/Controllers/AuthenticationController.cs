using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Assignment3_Backend.Models;
using Assignment3_Backend.ViewModels;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

//using identity framework. Clue AppUser: IdentityUser
namespace Assignment3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {//declare items from AppUserClaimsPrincipleFactory 
        private readonly UserManager<AppUser> usermanager;
        private readonly RoleManager<IdentityRole> rolemanager;
        private readonly IOptions<IdentityOptions> optionsaccessor;
        private readonly IUserClaimsPrincipalFactory<AppUser> userclaimsprincipalfactory;
        public AuthenticationController(UserManager<AppUser> userManager, 
            RoleManager<IdentityRole> roleManager, IOptions<IdentityOptions> optionsAccessor, 
            IUserClaimsPrincipalFactory<AppUser> userClaimsPrincipalFactory)
        {
            usermanager = userManager; 
            rolemanager = roleManager;
            optionsaccessor = optionsAccessor;
            userclaimsprincipalfactory = userClaimsPrincipalFactory;
        }

        //login 
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(UserViewModel login)
        {
            var user = await usermanager.FindByNameAsync(login.emailaddress);

            if (user != null && await usermanager.CheckPasswordAsync(user, login.password))
            {
                try
                {
                    var pfactory = await userclaimsprincipalfactory.CreateAsync(user);
                    await HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, pfactory);

                }
                catch (Exception )
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
                }
                
                var userloggedin =  new UserViewModel { emailaddress = login.emailaddress };
                return Ok(userloggedin);
            }
            return Unauthorized();
        }

        //logout
        [HttpGet]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {

            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);

            return Ok("Successfully logged out");
        }


        //register
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(UserViewModel register)
        {
            var checkuser = await usermanager.FindByNameAsync(register.emailaddress);                
            //check if user exists in ^^

            if (checkuser == null) //doesn't exist
            {
                AppUser user = new ()
                {
                    Id = Guid.NewGuid().ToString(),
                    Email = register.emailaddress,
                    //use email adress as user name 
                    UserName = register.emailaddress                    
                };

                //add new user to the user manager 
                var result = await usermanager.CreateAsync(user, register.password);
                 
                if(result.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Account registration failed. Please contact support.");

                }
            }
            else //if user exists
            {                
                return StatusCode(StatusCodes.Status403Forbidden, "This account already exists.");
            }

        }

    }
}
