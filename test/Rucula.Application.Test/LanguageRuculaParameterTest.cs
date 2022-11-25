using FluentAssertions;
using Rucula.Domain;
namespace Rucula.Application.Domain.Test;

[TestClass]
public class LanguageRuculaParameterTest
{
    [TestMethod]
    public void  LanguageRuculaParameterTest_Code_ExceptionInSintaxIsNullOrEmpty()
    { 
        Action act = () => new LanguageRuculaParameter("","href","anchor", false);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("code is Invalid");
    }
    [TestMethod]
    public void  LanguageRuculaParameterTest_Code_MaxLength50()
    { 
        string code = "";
        for (int i = 0; i < 60; i++)
        {
                code+="A";
        }

        Action act = () => new LanguageRuculaParameter(code,"href","anchor", false);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Character overflow, max 50");
    }
    [TestMethod]
    public void  LanguageRuculaParameterTest_Representation_ExceptionInSintaxIsNullOrEmpty()
    { 
        Action act = () => new LanguageRuculaParameter("a","","anchor", false);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("representation is Invalid");
    }
    [TestMethod]
    public void  LanguageRuculaParameterTest_Representation_MaxLength50()
    { 
        string representation = "";
        for (int i = 0; i < 60; i++)
        {
                representation+="A";
        }

        Action act = () => new LanguageRuculaParameter("a",representation,"anchor", false);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Character overflow, max 50");
    }

    [TestMethod]
    public void  LanguageRuculaParameterTest_Descrition_ExceptionInSintaxIsNullOrEmpty()
    { 
        Action act = () => new LanguageRuculaParameter("a","a","", false);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("description is Invalid");
    }
    [TestMethod]
    public void  LanguageRuculaParameterTest_Representation_MaxLength100()
    { 
        string description = "";
        for (int i = 0; i < 120; i++)
        {
                description+="A";
        }

        Action act = () =>  new LanguageRuculaParameter("a","a",description, false);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Character overflow, max 100");
    }

 
}