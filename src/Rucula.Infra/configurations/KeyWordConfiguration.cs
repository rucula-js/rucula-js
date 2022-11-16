using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class KeyWordConfiguration : IEntityTypeConfiguration<KeyWord>
{
    public void Configure(EntityTypeBuilder<KeyWord> builder)
    {

        builder.HasKey(k => k.Id).HasName("PrimaryKey_KeyWordId");
        builder
        .Property(p => p.Name)
        .HasMaxLength(30)
        .IsRequired();
        
        builder
            .HasOne(l => l.Language)
            .WithMany(k => k.KeyWords)
            .HasForeignKey(l => l.LanguageId)
            .HasPrincipalKey(k => k.Id);
    }
}