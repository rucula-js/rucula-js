using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class LanguageRuculaConfiguration : IEntityTypeConfiguration<LanguageRucula>
{
    public void Configure(EntityTypeBuilder<LanguageRucula> builder)
    {

        builder.HasKey(k => k.Id).HasName("PrimaryKey_KeyWordId");
        builder
        .Property(p => p.Sintax)
        .HasMaxLength(200)
        .IsRequired();
    }
}