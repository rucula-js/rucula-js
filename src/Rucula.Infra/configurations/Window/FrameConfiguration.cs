using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class FrameConfiguration : IEntityTypeConfiguration<Frame>
{
    public void Configure(EntityTypeBuilder<Frame> builder)
    {

        builder.HasKey(k => k.Id).HasName("PrimaryKey_Frame_Id");
        builder
            .Property(p => p.Id)
            .HasMaxLength(10)
            .IsRequired();
        
        builder
            .Property( c=> c.Name)
            .HasMaxLength(20)
            .IsRequired();

        builder
            .Property( c=> c.Type)
            .HasMaxLength(10)
            .IsRequired();

        builder
            .Property( c=> c.ObjectDto)
            .IsRequired()
            .HasMaxLength(20);
        
        builder
            .Property( c=> c.Sequence);
        
        builder
            .HasOne(c=> c.Window)
            .WithMany( c=> c.Frames)
            .HasForeignKey( f => f.WindowFk)
            .OnDelete(DeleteBehavior.NoAction);
    }
}