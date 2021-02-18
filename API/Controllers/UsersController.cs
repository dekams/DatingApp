using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUSerRepository uSerRepository;
        private readonly IMapper mapper;

        public UsersController(IUSerRepository uSerRepository, IMapper mapper)
        {
            this.uSerRepository = uSerRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            //var users = await uSerRepository.GetUsersAsync();
            //var usersToReturn = mapper.Map<IEnumerable<MemberDto>>(users);

            //return Ok(usersToReturn);

            return Ok(await uSerRepository.GetMembersAsync());
        }

        // api/Users/1
        //[HttpGet("{id}")]
        //public async Task<ActionResult<AppUser>> GetUser(int id)
        //    => await uSerRepository.GetUserByIdAsync(id);

        //api/Users/lisa
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            //var user = await uSerRepository.GetUserByUsernameAsync(username);
            //var userToReturn = mapper.Map<MemberDto>(user);

            return await uSerRepository.GetMemberAsync(username);
        }
    }
}
