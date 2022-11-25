using FluentAssertions;
using Rucula.Domain;
namespace Rucula.Application.Domain.Test;

[TestClass]
public class ContentHTMLTest
{
    [TestMethod]
    public void  ContentHTMLTest_Guuid_ExceptionEmpityOrNull()
    { 
        Action act = () => new ContentHTML("","",DateTime.Now,DateTime.Now,"");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("guuid is Invalid");
    }
   
    [TestMethod]
    public void  ContentHTMLTest_Content_ExceptionMaxLen1300()
    { 
        string content = "autor";
        for (int i = 0; i < 1350; i++)
        {
            content+="A";
        }
        Action act = () => new ContentHTML("a9ba47ab-f011-45e8-8532-6ecc38eb6db4",content,DateTime.Now,DateTime.Now,"");

        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("content invalid, maximum character allowed is equal to 1300");
    }    
}