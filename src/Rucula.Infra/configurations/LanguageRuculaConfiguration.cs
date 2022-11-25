using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class LanguageRuculaConfiguration : IEntityTypeConfiguration<LanguageRucula>
{
    public void Configure(EntityTypeBuilder<LanguageRucula> builder)
    {
        builder.HasKey(k => k.Code).HasName("PrimaryKey_LAnguageRuculaCode");
        builder.Property(p => p.Description)
            .HasMaxLength(200);

        builder.Property(p => p.Description2)
            .HasMaxLength(200);
        
        builder.Property(p => p.AtributesDefaut)
            .HasMaxLength(350);
    }
}