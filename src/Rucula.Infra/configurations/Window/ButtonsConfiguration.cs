using Rucula.Domain.Window;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ButtonsConfiguration : IEntityTypeConfiguration<Button>
{
    public void Configure(EntityTypeBuilder<Button> builder)
    {

        builder.HasKey(k => new {k.Id, k.WindowFk}).HasName("PrimaryKey_Button_Id");
        builder
            .Property(p => p.Id)
            .HasMaxLength(10)
            .IsRequired();
            
        builder
            .Property( c=> c.Method)
            .HasMaxLength(20);
        builder
            .Property( c=> c.Post)
            .HasMaxLength(20);
        builder
            .Property( c=> c.Link)
            .HasMaxLength(120);
        
        builder
            .Property( c=> c.Icon)
            .HasMaxLength(30);

        builder
            .Property( c=> c.Text)
            .HasMaxLength(20);
    
        builder
            .Property( c=> c.Type)
            .HasMaxLength(20);
        builder
            .Property( c=> c.Color)
            .HasMaxLength(20);
         builder
            .Property( c=> c.Target)
            .HasMaxLength(30);
        builder
            .Property( c=> c.Urlrelative)
            .HasMaxLength(100);
            
        builder.HasOne( c=> c.Window)
            .WithMany( c=> c.Button)
            .HasForeignKey( c=> c.WindowFk)
            .HasConstraintName("ForeignKey_Buttons_Window")
            .OnDelete(DeleteBehavior.NoAction);
    }
}