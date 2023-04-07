using FluentAssertions;
using Rucula.Domain.Window;
namespace Rucula.Application.Domain.Test;

[TestClass]
public class FrameTest
{
    #region Id
    [TestMethod]
    public void Throw_Exception_When_Id_Is_Requerid(){
        Action act = () => new Frame("","frame","block","frame",1);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("id is requerid");
    }
    [TestMethod]
    public void Throw_Exception_When_Id_Contain_More_Than_10_Characteres(){
        Action act = () => new Frame(new String('a',11),"frame","block","frame",1);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("id must be a maximum of 10 characters");
    }
    #endregion
    #region Name
    [TestMethod]
    public void Throw_Exception_When_Name_Is_Requerid(){
        Action act = () => new Frame("1505","","block","frame",1);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("name is requerid");
    }
    [TestMethod]
    public void Throw_Exception_When_Name_Contain_More_Than_20_Characteres(){
        Action act = () => new Frame("5454",new String('a',22),"block","frame",1);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("name must be a maximum of 20 characters");
    }
    #endregion
    #region Type
    [TestMethod]
    public void Throw_Exception_When_Type_Is_Requerid(){
        Action act = () => new Frame("1505","frame","","frame",1);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("type is requerid");
    }
    [TestMethod]
    public void Throw_Exception_When_Type_Contain_More_Than_10_Characteres(){
        Action act = () => new Frame("5454","frame",new String('a',11),"frame",1);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("type must be a maximum of 10 characters");
    }    
    #endregion
    #region ObjectDto
    [TestMethod]
    public void Throw_Exception_When_ObjectDto_Is_Requerid(){
        Action act = () => new Frame("1505","frame","list","",1);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("objectDto is requerid");
    }
    [TestMethod]
    public void Throw_Exception_When_ObjectDto_More_Than_20_Characteres(){
        Action act = () => new Frame("5454","frame","list",new String('a',22),1);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("objectDto must be a maximum of 20 characters");
    }    
    #endregion
}