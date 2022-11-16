using FluentAssertions;
using Rucula.Domain;
namespace Rucula.Application.Domain.Test;

[TestClass]
public class LanguageRuculaTest
{
    LanguageRucula language;

    [TestMethod]
    public void  LanguageRuculaTestExceptionInIdLessThanOne()
    { 
        Action act = () => new LanguageRucula(0,"T","");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("Id is Invalid");
    }
}