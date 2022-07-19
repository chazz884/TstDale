using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 


[Route("api/[controller]")]  
[ApiController]  
public class LoginController : Controller  
{  
    private readonly TiendaDb _context;

    public LoginController(TiendaDb context)
    {
        _context = context;
    }
    
    [HttpPost]  
    public async Task<ActionResult<Contacto>> Login([FromBody] Contacto item)  
    {  
        if(item.email==null)
        {
            return BadRequest();
        }

        if (string.IsNullOrEmpty(item.username) || string.IsNullOrEmpty(item.Password)){
            return null;
        }

        var user = _context.User.SingleOrDefault(x => x.username == item.username);

        if (user == null){
            return null;
        }

        var pass = _context.Contacto.SingleOrDefault(x => x.Password == item.Password);

        if (pass == null){
            return null;
        }

        return  await _context.Contacto.FindAsync(user.id);  

    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Contacto>> GetById(int id)
    {
        var item = await _context.Contacto.FindAsync(id);
        if(item==null)
        {
            return NotFound();
        }

        return item;
    }

    [HttpPost("register")]
    public async Task<ActionResult<Contacto>> Create([FromBody] Contacto item)
    {
        if(item==null)
        {
            return BadRequest();
        }

        _context.Contacto.Add(item);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new {id = item.id}, item);
    } 
}