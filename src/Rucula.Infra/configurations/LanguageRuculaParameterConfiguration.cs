using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class LanguageRuculaParameterConfiguration : IEntityTypeConfiguration<LanguageRuculaParameter>
{
    public void Configure(EntityTypeBuilder<LanguageRuculaParameter> builder)
    {
        builder.Property( p => p.Code)
            .IsRequired()
            .HasMaxLength(50);       
        builder
            .HasKey(k => k.Code)
            .HasName("PrimaryKey_LanguageRuculaParameterCode");
       
        builder.Property( p => p.Representation)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(p => p.Description)
            .HasMaxLength(100);
    }
}