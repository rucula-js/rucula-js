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
        .HasMaxLength(30);
        
        
        builder.HasData(new Language(1,"C#"));
        builder.HasData(new Language(2,"Adonix"));
        builder.HasData(new Language(3,"Java"));
        builder.HasData(new Language(4,"JavaScript"));
        builder.HasData(new Language(5,"TypScript"));
        builder.HasData(new Language(6,"C"));
        builder.HasData(new Language(7,"C++"));
    }
}