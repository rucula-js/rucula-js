using FluentAssertions;
using System.Text.RegularExpressions;
using Rucula.Domain;

namespace Rucula.Application.Domain.Test;

[TestClass]
public class ExtractRuculaTest
{
    private string sintaxRucula = "T(c=red){introdução ao HTML}";

    [TestMethod]
    public void  ExtractRuculaTest_GetMatchCollection_CountEqualsOne()
    {         
        var Ruc = new ExtractRucula();
        MatchCollection matches = Ruc.GetMatchCollection(ref sintaxRucula); 
        matches.Should()
        .HaveCount(c => c == 1);
    }
    [TestMethod]
    public void  ExtractRuculaTest_GetMatchCollection_ValidGroupsMath()
    { 
        var Ruc = new ExtractRucula();
        MatchCollection matches = Ruc.GetMatchCollection(ref sintaxRucula); 
        foreach (Match match in matches)
        {
            match.Groups[1].Value.Should().Be("T");
            match.Groups[2].Value.Should().Be("(c=red){");
            match.Groups[3].Value.Should().Be("c=red");
            match.Groups[4].Value.Should().Be("introdução ao HTML");
            match.Groups[5].Value.Should().Be("}");
        }
    }
    
}