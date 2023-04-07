using Rucula.Domain.Window;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class LineConfiguration : IEntityTypeConfiguration<Line>
{
    public void Configure(EntityTypeBuilder<Line> builder)
    {

        builder.HasKey(k => k.Id).HasName("PrimaryKey_Line_Id");
        builder
            .Property(p => p.Id)
            .HasMaxLength(10)
            .IsRequired();
              
        builder
            .HasOne(c=> c.Frame)
            .WithMany( c=> c.Line)
            .HasForeignKey( f => f.FrameFk)
            .OnDelete(DeleteBehavior.NoAction);
    }
}