using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[Route("api/[controller]")]
[ApiController]
public class ContactController : ControllerBase
{
    private readonly TiendaDb _context;

    public ContactController(TiendaDb context)
    {
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Contacto> GetAll()
    {
        return _context.Contacto.ToList();
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

    [HttpPost]
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

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Contacto item)
    {
        if(item == null || id==0)
        {
            return BadRequest();
        }

        _context.Entry(item).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var contact = await _context.Contacto.FindAsync(id);

        if(contact==null)
        {
            return NotFound();
        }

        _context.Contacto.Remove(contact);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}