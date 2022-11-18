using FluentAssertions;
using Rucula.Domain;
namespace Rucula.Application.Domain.Test;

[TestClass]
public class LanguageRuculaTest
{
    [TestMethod]
    public void  LanguageRuculaTest_Code_ExceptionInSintaxIsNullOrEmpty()
    { 
        Action act = () => new LanguageRucula("","","");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("code is Invalid");
    }
    [TestMethod]
    public void  LanguageRuculaTest_Code_ExceptionMaxLength100()
    { 
        var code = "";
        for (int i = 0; i < 101; i++){ code+="S";}

        Action act = () => new LanguageRucula(code,"","");
        act.Should().Throw<RuculaExeption>()
            .WithMessage("Character overflow, max 100");
    }
    [TestMethod]
    public void  LanguageRuculaTest_Descrition_ExceptionMaxLength200()
    { 
        var descrition = "";
        // Criando uma  string de 210 caracteres
        for (int i = 0; i < 210; i++){ descrition+="S";}
        Action act = () => new LanguageRucula("T",descrition,"");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Character overflow, max 200");
    }
    public void  LanguageRuculaTest_Descrition2_ExceptionMaxLength200()
    { 
        var descrition2 = "";
        // Criando uma  string de 210 caracteres
        for (int i = 0; i < 210; i++){ descrition2+="S";}
        Action act = () => new LanguageRucula("T","",descrition2);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Character overflow, max 200");
    }
}