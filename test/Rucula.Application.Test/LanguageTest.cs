using FluentAssertions;
using Rucula.Domain;
namespace Rucula.Application.Domain.Test;

[TestClass]
public class LanguageTest
{
    [TestMethod]
    public void  LanguageTest_Id_ExceptionInIdLessThanOne()
    { 
        Action act = () => new Language(0,"C#");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Id is Invalid");
    }
    [TestMethod]
    public void  LanguageTest_Name_IsNullOrEmpty()
    { 
        Action act = () => new Language(1,"");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Sintax is Invalid");
    }
    [TestMethod]
    public void  LanguageTest_Descrition_ExceptionMaxLength200()
    { 
        var name = "";
        // Criando uma  string de 210 caracteres
        for (int i = 0; i < 40; i++){ name+="S";}
        Action act = () => new Language(1,name);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Character overflow, max 30");
    }
}