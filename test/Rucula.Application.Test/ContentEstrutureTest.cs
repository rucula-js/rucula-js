using FluentAssertions;
using Rucula.Domain;
namespace Rucula.Application.Domain.Test;

[TestClass]
public class ContentEstrutureTest
{
    [TestMethod]
    public void  ContentEstrutureTest_Guuid_ExceptionEmpityOrNull()
    { 
        Action act = () => new ContentEstruture("","","");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("guuid is Invalid");
    }

    [TestMethod]
    public void  ContentEstrutureTest_GuuidSmaller_ExceptionLengthNot36()
    { 
        Action act = () => new ContentEstruture("a9ba47ab-f011-45e8","","");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("guuid is Invalid, len not is 36");
    }
    
    [TestMethod]
    public void  ContentEstrutureTest_GuuidLarger_ExceptionLengthNot36()
    { 
        Action act = () => new ContentEstruture("a9ba47ab-f011-45e8-8532-6ecc38eb6db4-44444","","");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("guuid is Invalid, len not is 36");
    }

    [TestMethod]
    public void  ContentEstrutureTest_Next_ExceptionMaxLength150()
    { 
        string next = "";
        for (int i = 0; i < 160; i++)
        {
            next+="A";
        }
        Action act = () => new ContentEstruture("a9ba47ab-f011-45e8-8532-6ecc38eb6db4",next,"");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("next invalid, maximum character allowed is equal to 150");
    }

     [TestMethod]
    public void  ContentEstrutureTest_Previous_ExceptionMaxLength150()
    { 
        string previous = "";
        for (int i = 0; i < 160; i++)
        {
            previous+="A";
        }
        Action act = () => new ContentEstruture("a9ba47ab-f011-45e8-8532-6ecc38eb6db4","",previous);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("previous invalid, maximum character allowed is equal to 150");
    }
}