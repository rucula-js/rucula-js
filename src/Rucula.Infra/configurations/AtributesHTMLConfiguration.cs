using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class AtributesHTMLConfiguration : IEntityTypeConfiguration<AtributesHTML>
{
    public void Configure(EntityTypeBuilder<AtributesHTML> builder)
    {

        builder.HasKey(k => k.Code).HasName("PrimaryKey_AtributesHTMLCode");
        builder
        .Property(p => p.Description)
        .HasMaxLength(100);

        builder
        .Property(p => p.IsAtributeClass)
        .HasColumnType("boolean");
    }
}