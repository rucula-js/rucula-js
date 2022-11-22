using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class TagMetaHTMLConfigurations : IEntityTypeConfiguration<TagMetaHTML>
{
    public void Configure(EntityTypeBuilder<TagMetaHTML> builder)
    {
        builder
        .HasKey(k => k.Guuid)
        .HasName("PrimaryKey_TagMetaHTMLGuuid");

        builder
            .HasOne( a => a.ContentHTML)
            .WithMany(b => b.TagMetaHTML)
            .HasForeignKey(a => a.ContentHTMLFk)
            .HasPrincipalKey(b => b.Guuid);
            
        builder
            .Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(30);
        builder
            .Property(p => p.Propert)
            .HasMaxLength(30);
          builder
            .Property(p => p.Content)
            .HasMaxLength(200);
        builder
            .Property(p => p.Description)
            .HasMaxLength(100);
    }
}