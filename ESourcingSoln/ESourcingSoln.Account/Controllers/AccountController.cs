using ESourcingSoln.Account.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ESourcingSoln.Account.Controllers
{
    [ApiController, Route("api/v1/[controller]")]

    public class AccountController : ControllerBase
    {

        #region Variables
        private readonly IAccountRepository _accountRepository;
        private readonly ILogger<AccountController> _logger;
        #endregion

        public AccountController(IAccountRepository accountRepository, ILogger<AccountController> logger)
        {
            _accountRepository = accountRepository;
            _logger = logger;
        }

        [HttpGet("{id:length(24)}", Name = "GetAccount")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(Entities.Account), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Entities.Account>> GetAccount(string id)
        {
            var account = await _accountRepository.GetAccount(id);
            if (account == null)
            {
                _logger.LogError($"Account with id : {id}, hasn't been found in database");
                return NotFound();
            }
            return Ok(account);
        }

        [HttpGet("Login")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(Entities.Account), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Entities.Account>> Login(string name,string password)
        {
            var account = await _accountRepository.GetAccountByUserNameAndPassword(name, password);
            if (account == null)
            {
                _logger.LogError($"Account with id : {name},{password} hasn't been found in database");
                return NotFound();
            }
            return Ok(account);
        }

        [HttpPost("SignUp")]
        [ProducesResponseType(typeof(Entities.Account), (int)HttpStatusCode.Created)]
        public async Task<ActionResult<Entities.Account>> SignUp([FromBody] Entities.Account account)
        {
            await _accountRepository.Create(account);
            return CreatedAtRoute("GetAccount", new { id = account.Id }, account);
        }
    }
}
