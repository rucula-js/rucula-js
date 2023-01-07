using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ContentEstrutureConfiguration : IEntityTypeConfiguration<ContentEstruture>
{
    public void Configure(EntityTypeBuilder<ContentEstruture> builder)
    {
        builder.Property(p => p.Guuid)
            .IsRequired()
            .HasMaxLength(36);
        builder
            .HasKey(k => k.Guuid)
            .HasName("PrimaryKey_ContentEstrutureGuuid");
        builder
            .Property(p => p.Description)
            .HasMaxLength(100)
            .IsRequired();
        builder
            .Property(p => p.Next)
            .HasMaxLength(150);

        builder
            .Property(p => p.Previous)
            .HasMaxLength(150);

        builder.HasOne( p => p.ContentHTMLFk)
                .WithOne(b => b.ContentEstruture)
                .HasForeignKey<ContentHTML>(b => b.ContentEstrutureForeignKey);



    }
}