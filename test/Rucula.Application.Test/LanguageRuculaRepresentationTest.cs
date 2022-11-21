using FluentAssertions;
using Rucula.Domain;
namespace Rucula.Application.Domain.Test;

[TestClass]
public class LanguageRuculaRepresentationTest
{
    [TestMethod]
    public void  LanguageRuculaRepresentationTest_Code_ExceptionInSintaxIsNullOrEmpty()
    { 
        Action act = () => new LanguageRuculaRepresentation("","Titulo Nivel 1","T");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("code is Invalid");
    }
    [TestMethod]
    public void  LanguageRuculaRepresentationTest_Code_MaxLength50()
    { 
        string code = "";
        for (int i = 0; i < 60; i++)
        {
                code+="A";
        }

        Action act = () => new LanguageRuculaRepresentation(code,"Titulo Nivel 1","T");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Character overflow, max 50");
    }
    [TestMethod]
    public void  LanguageRuculaRepresentationTest_Descrition_MaxLength100()
    { 
        string description = "";
        for (int i = 0; i < 110; i++)
        {
                description+="A";
        }
        Action act = () => new LanguageRuculaRepresentation("H1",description,"T");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Character overflow, max 100");
    }

    [TestMethod]
    public void  LanguageRuculaRepresentationTest_CodeRucula_ExceptionInSintaxIsNullOrEmpty()
    { 
        Action act = () => new LanguageRuculaRepresentation("H1","Titulo Nivel 1","");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("codeRucula is Invalid");
    }
    [TestMethod]
    public void  LanguageRuculaRepresentationTest_CodeRucula_MaxLength100()
    { 
        string codeRucula = "";
        for (int i = 0; i < 110; i++)
        {
                codeRucula+="A";
        }
        Action act = () => new LanguageRuculaRepresentation("H1","Titulo Nivel 1",codeRucula);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Character overflow, max 100");
    }
    
}