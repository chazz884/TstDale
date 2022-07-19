using Microsoft.EntityFrameworkCore;

public class TiendaDb : DbContext
{
    public TiendaDb(DbContextOptions<TiendaDb> options)
        : base(options) { }

    public DbSet<Producto> Productos => Set<Producto>();
    public DbSet<User> User {get; set;}
    public DbSet<Contacto> Contacto {get; set;}
}