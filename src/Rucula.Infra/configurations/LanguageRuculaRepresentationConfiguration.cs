using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class LanguageRuculaRepresentationConfiguration : IEntityTypeConfiguration<LanguageRuculaRepresentation>
{
    public void Configure(EntityTypeBuilder<LanguageRuculaRepresentation> builder)
    {
        builder.HasKey(k => k.Code).HasName("PrimaryKey_LanguageRuculaRepresentationCode");
        builder.Property(p => p.Description).HasMaxLength(100);

        builder
        .HasOne(lr => lr.LanguageRucula)
        .WithOne(lrr => lrr.LanguageRuculaRepresentation)
        .HasForeignKey<LanguageRuculaRepresentation>(b => b.CodeRuculaForeKey)
        .IsRequired();
        
}
}   