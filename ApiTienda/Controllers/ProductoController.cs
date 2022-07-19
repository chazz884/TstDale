using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Authorization;  

[Route("api/[controller]")]
[ApiController]
public class ProductoController : ControllerBase
{
    private readonly TiendaDb _context;

    public ProductoController(TiendaDb context)
    {
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Producto> GetAll()
    {
        return _context.Productos.ToList();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Producto>> GetById(int id)
    {
        var item = await _context.Productos.FindAsync(id);
        if(item==null)
        {
            return NotFound();
        }

        return item;
    }

    [HttpPost]
    public async Task<ActionResult<Producto>> Create([FromBody] Producto item)
    {
        if(item==null)
        {
            return BadRequest();
        }

        _context.Productos.Add(item);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new {id = item.id}, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Producto item)
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
        var producto = await _context.Productos.FindAsync(id);

        if(producto==null)
        {
            return NotFound();
        }

        _context.Productos.Remove(producto);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}