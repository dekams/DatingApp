using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        public BuggyController(DataContext context): base(context) {}

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret() => "Secret Text";

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = Context.Users.Find(-1);

            if (thing == null) return NotFound();

            return Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var thing = Context.Users.Find(-1);

            var thingToReturn = thing.ToString();

            return thingToReturn;
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest() => BadRequest("This is not a good request");

    }
}
