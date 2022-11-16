using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class LanguageConfiguration : IEntityTypeConfiguration<Language>
{
    public void Configure(EntityTypeBuilder<Language> builder)
    {

        builder.HasKey(k => k.Id);
        builder
        .Property(p => p.Name)
        .HasMaxLength(30)
        .IsRequired();
    }
}