using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class CollumnsConfiguration : IEntityTypeConfiguration<Columns>
{
    public void Configure(EntityTypeBuilder<Columns> builder)
    {

        builder.HasKey(k => new {k.Id, k.WindowFk}).HasName("PrimaryKey_Columns_Id");
        builder
            .Property(p => p.Id)
            .HasMaxLength(10)
            .IsRequired();
        
        builder
            .Property( c=> c.Name)
            .HasMaxLength(40)
            .IsRequired();

        builder.HasOne( c=> c.Window)
            .WithMany( c=> c.Columns)
            .HasForeignKey( c=> c.WindowFk)
            .HasConstraintName("ForeignKey_Collums_Window")
            .OnDelete(DeleteBehavior.NoAction);
    }
}