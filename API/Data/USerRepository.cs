using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Data
{
    public class USerRepository : IUSerRepository
    {
        private readonly DataContext ctx;
        private readonly IMapper mapper;

        public USerRepository(DataContext ctx, IMapper mapper)
        {
            this.ctx = ctx;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync() => await ctx.Users.Include(u => u.Photos).ToListAsync();

        public async Task<AppUser> GetUserByIdAsync(int id) 
            => await ctx.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Id == id);

        public async Task<AppUser> GetUserByUsernameAsync(string username)
            => await ctx.Users.Include(u => u.Photos).SingleOrDefaultAsync(u => u.UserName.ToLower() == username);

        public async Task<bool> SaveAllAsync() => await ctx.SaveChangesAsync() > 0;

        public void Update(AppUser user)
            => ctx.Entry<AppUser>(user).State = EntityState.Modified;

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await ctx
                .Users
                .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await ctx
                .Users
                .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(u => u.Username.ToLower() == username);
        }
    }
}
