using FluentAssertions;
using Rucula.Domain;
namespace Rucula.Application.Domain.Test;

[TestClass]
public class KeyWordTest
{
    [TestMethod]
    public void  KeyWordTest_Id_ExceptionInIdLessThanOne()
    { 
        Action act = () => new KeyWord(0,"void");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Id is Invalid");
    }
    [TestMethod]
    public void  KeyWordTest_Name_IsNullOrEmpty()
    { 
        Action act = () => new KeyWord(1,"");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Sintax is Invalid");
    }
    [TestMethod]
    public void  KeyWordTest_Descrition_ExceptionMaxLength200()
    { 
        var name = "";
        // Criando uma  string de 40 caracteres
        for (int i = 0; i < 40; i++){ name+="S";}
        Action act = () => new KeyWord(1,name);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Character overflow, max 30");
    }
    [TestMethod]
    public void  KeyWordTest_LanguageId_ExceptionInIdLessThanOne()
    { 
        Action act = () => new KeyWord(1,"void",0);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("LanguageId is Invalid");
    }
}