using FluentAssertions;
using Rucula.Domain;
namespace Rucula.Application.Domain.Test;

[TestClass]
public class TagMetaHTMLTest
{
    [TestMethod]
    public void  LanguageTest_Guuid_ExceptionEmpityOrNull()
    { 
        Action act = () => new TagMetaHTML("","author","","","");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("guuid is Invalid");
    }
   
    [TestMethod]
    public void  LanguageTest_Name_ExceptionMaxLen()
    { 
        string name = "autor";
        for (int i = 0; i < 39; i++)
        {
            name+="A";
        }
        Action act = () => new TagMetaHTML("a9ba47ab-f011-45e8-8532-6ecc38eb6db4",name,"","","");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("name Character overflow, max 36");
    }
    [TestMethod]
    public void  LanguageTest_Propert_ExceptionMaxLen()
    { 
        string propert = "propert";
        for (int i = 0; i < 39; i++)
        {
            propert+="A";
        }
        Action act = () => new TagMetaHTML("a9ba47ab-f011-45e8-8532-6ecc38eb6db4","",propert,"","");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("propert Character overflow, max 36");
    }
    [TestMethod]
    public void  LanguageTest_Propert_Name_WithvalueException()
    { 
        Action act = () => new TagMetaHTML("a9ba47ab-f011-45e8-8532-6ecc38eb6db4","autor","og:image","","");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("name and property, only one of the options must have value");
    }
    [TestMethod]
    public void  LanguageTest_Propert_Name_WithNullOrEmpty()
    { 
        Action act = () => new TagMetaHTML("a9ba47ab-f011-45e8-8532-6ecc38eb6db4","","","","https://developer.mozilla.org/static/img/opengraph-logo.png");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("name and property, one of the properties must contain value");
    }
    [TestMethod]
    public void  LanguageTest_Content_MaxValue200()
    { 
        string content = "https://developer.mozilla.org/static/img/opengraph-logo.png";
        for (int i = 0; i < 210; i++)
        {
            content+="A";
        }

        Action act = () => new TagMetaHTML("a9ba47ab-f011-45e8-8532-6ecc38eb6db4","autor","",content,"");
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("content Character overflow, max 200");
    }
     [TestMethod]
    public void  LanguageTest_Description_MaxValue100()
    { 
        string description = "";
        for (int i = 0; i < 110; i++)
        {
            description+="A";
        }

        Action act = () => new TagMetaHTML("a9ba47ab-f011-45e8-8532-6ecc38eb6db4","autor","","",description);
        act
            .Should().Throw<RuculaExeption>()
            .WithMessage("description Character overflow, max 100");
    }


    
    
}