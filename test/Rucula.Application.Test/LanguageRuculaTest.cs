using FluentAssertions;
using Rucula.Domain;
namespace Rucula.Application.Domain.Test;

[TestClass]
public class LanguageRuculaTest
{

    [TestMethod]
    public void  LanguageRuculaTest_Id_ExceptionInIdLessThanOne()
    { 
        Action act = () => new LanguageRucula(0,"T","");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Id is Invalid");
    }
    [TestMethod]
    public void  LanguageRuculaTest_Sintaxe_ExceptionInSintaxIsNullOrEmpty()
    { 
        Action act = () => new LanguageRucula(1,"","");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Sintax is Invalid");
    }
    [TestMethod]
    public void  LanguageRuculaTest_Descrition_ExceptionMaxLength200()
    { 
        var descrition = "";
        // Criando uma  string de 210 caracteres
        for (int i = 0; i < 210; i++){ descrition+="S";}
        Action act = () => new LanguageRucula(1,"T",descrition);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Character overflow, max 200");
    }
}