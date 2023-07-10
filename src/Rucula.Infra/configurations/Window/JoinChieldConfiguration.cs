using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class JoinChieldConfiguration : IEntityTypeConfiguration<JoinChield>
{
    public void Configure(EntityTypeBuilder<JoinChield> builder)
    {

        builder.HasKey(k => new {k.Id, k.WindowFk}).HasName("PrimaryKey_JoinChield_Id");
        builder
            .Property(p => p.Id)
            .HasMaxLength(10)
            .IsRequired();
        builder
            .Property( c=> c.Key)
            .HasMaxLength(30);
        builder
            .Property( c=> c.Value)
            .HasMaxLength(30)
            .IsRequired();
        builder.HasOne( c=> c.Window)
            .WithMany( c=> c.JoinChield)
            .HasForeignKey( c=> c.WindowFk)
            .HasConstraintName("ForeignKey_JoinChield_Window")
            .OnDelete(DeleteBehavior.NoAction);
    }
}