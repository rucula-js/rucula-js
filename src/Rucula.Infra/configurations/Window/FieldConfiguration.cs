using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class FieldConfiguration : IEntityTypeConfiguration<Field>
{
    public void Configure(EntityTypeBuilder<Field> builder)
    {

        builder.HasKey(k => new {k.Id, k.FrameFk}).HasName("PrimaryKey_Field_Id");
        builder
            .Property(p => p.Id)
            .HasMaxLength(10)
            .IsRequired();
        
        builder
            .Property( c=> c.PropertDto)
            .HasMaxLength(20)
            .IsRequired();

        builder
            .Property( c=> c.Description)
            .HasMaxLength(20)
            .IsRequired();

         builder
            .Property( c=> c.Information)
            .HasMaxLength(20);
            
        builder
            .Property( c=> c.Type)
            .HasMaxLength(10)
            .IsRequired();
        
        builder
            .Property( c=> c.Sequence);
        
        builder
            .HasOne( c=> c.Frame)
            .WithMany( c=> c.Fields)
            .HasForeignKey(f => f.FrameFk)
            .OnDelete(DeleteBehavior.Cascade);
    }
}