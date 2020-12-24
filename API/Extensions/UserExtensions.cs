using API.DTOs;
using API.Entities;
using API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class UserExtensions
    {
        public static UserDto ToUserDto(this AppUser user, ITokenService tokenService) 
            => new UserDto { Username = user.UserName, Token = tokenService.CreateToken(user) };
    }
}
