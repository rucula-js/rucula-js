using FluentAssertions;
using Rucula.Domain.Window;
namespace Rucula.Application.Domain.Test;

[TestClass]
public class WindowTest
{
    #region Id
    [TestMethod]
    public void Throw_Exception_When_Id_Is_Requerid(){
        Action act = () => new Window("","products","192.168.100.11:4200","","","crud");
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("id is requerid");
    }
    [TestMethod]
    public void Throw_Exception_When_Id_Contain_More_Than_10_Characteres(){
        Action act = () => new Window(new String('a',11),"products","","","","crud");
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("id must be a maximum of 10 characters");
    }
    #endregion
    #region Name
    [TestMethod]
    public void Throw_Exception_When_Name_Is_Requerid(){
        Action act = () => new Window("1515","","192.168.100.11:4200","","","crud");
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("name is requerid");
    }
    [TestMethod]
    public void Throw_Exception_When_Name_Contain_More_Than_20_Characteres(){
        Action act = () => new Window("1515",new String('a',22),"www.test.com","","","crud");
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("name must be a maximum of 20 characters");
    }
    #endregion  
    #region URLRoot
    [TestMethod]
    public void Throw_Exception_When_URLRoot_Contain_More_Than_20_Characteres(){
        Action act = () => new Window("1515","products",new String('a',22),"","","crud");
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("uRLRoot must be a maximum of 20 characters");
    }
    #endregion     
    #region URLGetAll
    [TestMethod]
    public void Throw_Exception_When_URLGetAll_Contain_More_Than_20_Characteres(){
        Action act = () => new Window("1515","products","",new String('a',22),"","crud");
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("uRLGetAll must be a maximum of 20 characters");
    }
    #endregion  
    #region URLGetId
    [TestMethod]
    public void Throw_Exception_When_URLGetId_Contain_More_Than_20_Characteres(){
        Action act = () => new Window("1515","products","","",new String('a',22),"crud");
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("uRLGetId must be a maximum of 20 characters");
    }
    #endregion
     #region Type
    [TestMethod]
    public void Throw_Exception_When_Type_Is_Requerid(){
        Action act = () => new Frame("1505","frame","","frame");
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("type is requerid");
    }
    [TestMethod]
    public void Throw_Exception_When_Type_Contain_More_Than_10_Characteres(){
        Action act = () => new Frame("5454","frame",new String('a',11),"frame");
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("type must be a maximum of 10 characters");
    }    
    #endregion     
}