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
        .HasMaxLength(30);
        

        builder
            .HasOne(l => l.Language)
            .WithMany(k => k.KeyWords)
            .HasForeignKey(l => l.LanguageId)
            .HasPrincipalKey(k => k.Id);

        builder.HasData(new KeyWord(1,"class",1));
        builder.HasData(new KeyWord(2,"interface",1));
        builder.HasData(new KeyWord(3,"struct",1));
        builder.HasData(new KeyWord(4,"int",1));
        builder.HasData(new KeyWord(5,"return",1));
        builder.HasData(new KeyWord(6,"wille",1));
        builder.HasData(new KeyWord(7,"else",1));
    }
}