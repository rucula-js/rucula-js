using Rucula.Domain.Window;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class WindowConfiguration: IEntityTypeConfiguration<Window>
{
    public void Configure(EntityTypeBuilder<Window> builder)
    {

        builder.HasKey(k => k.Id).HasName("PrimaryKey_Window_Id");
        builder
            .Property(p => p.Id)
            .HasMaxLength(10)
            .IsRequired();
        
        builder
            .Property( c=> c.Name)
            .HasMaxLength(20)
            .IsRequired();

        builder
            .Property( c=> c.URLRoot)
            .HasMaxLength(20);
        
        builder
            .Property( c=> c.URLGetAll)
            .HasMaxLength(20);
        
        builder
            .Property( c=> c.URLGetId)
            .HasMaxLength(20);

        builder
            .Property( c=> c.Type)
            .IsRequired()
            .HasMaxLength(10);
    }
}