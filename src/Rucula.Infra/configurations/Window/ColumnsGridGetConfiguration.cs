using Rucula.Domain.Window;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ColumnsGridGetConfiguration : IEntityTypeConfiguration<ColumnsGridGet>
{
    public void Configure(EntityTypeBuilder<ColumnsGridGet> builder)
    {

        builder.HasKey(k => new {k.Id, k.WindowFk}).HasName("PrimaryKey_ColumnsGridGet_Id_Window");
        builder
            .Property(p => p.Id)
            .HasMaxLength(10)
            .IsRequired();
        
        builder
            .Property( c=> c.ParameterGrid)
            .HasMaxLength(40)
            .IsRequired();

        builder
            .Property( c=> c.ParameterUrl)
            .HasMaxLength(40)
            .IsRequired();


        builder.HasOne( c=> c.Window)
            .WithMany( c=> c.ColumnsGridGet)
            .HasForeignKey( c=> c.WindowFk)
            .HasConstraintName("ForeignKey_ColumnsGridGet_Window")
            .OnDelete(DeleteBehavior.NoAction);

    }
}