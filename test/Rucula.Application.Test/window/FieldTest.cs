using Rucula.Domain.Window;
using FluentAssertions;

namespace Rucula.Application.Domain.Test;

[TestClass]
public class FieldTest
{
    #region Id
    [TestMethod]
    public void Throw_Exception_When_Id_Is_Requerid(){
        Action act = () => new Field("","idade","Idade da pessoa","","number",1,0,0,true,false);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("id is requerid");
    }
    [TestMethod]
    public void Throw_Exception_When_Id_Contain_More_Than_10_Characteres(){
        Action act = () => new Field(new String('a',11),"idade","Idade da pessoa","","number",1,0,0,true,false);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("id must be a maximum of 10 characters");
    }
    #endregion
    #region PropertDto
    [TestMethod]
    public void Throw_Exception_When_Propert_Is_Requerid(){
        Action act = () => new Field("445654","","Idade da pessoa","","number",1,0,0,true,false);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("propertDto is requerid");
    }
    [TestMethod]
    public void Throw_Exception_When_PropertDto_Contain_More_Than_20_Characteres(){
        Action act = () => new Field("55554",new String('a',25),"Idade da pessoa","","number",1,0,0,true,false);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("propertDto must be a maximum of 20 characters");
    }
    #endregion
    #region Description
    [TestMethod]
    public void Throw_Exception_When_Description_Is_Requerid(){
        Action act = () => new Field("445654","id","","","number",1,0,0,true,false);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("description is requerid");
    }
    [TestMethod]
    public void Throw_Exception_When_Description_Contain_More_Than_20_Characteres(){
        Action act = () => new Field("55554","id",new String('a',25),"","number",1,0,0,true,false);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("description must be a maximum of 20 characters");
    }
    #endregion
    #region Information
     public void Throw_Exception_When_Information_Contain_More_Than_20_Characteres(){
        Action act = () => new Field("55554","id","id de teste",new String('a',55),"number",1,0,0,true,false);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("information must be a maximum of 50 characters");
    }
    #endregion
    #region Type
    [TestMethod]
    public void Throw_Exception_When_Type_Is_Requerid(){
        Action act = () => new Field("445654","id","id teste","","",1,0,0,true,false);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("type is requerid");
    }
    [TestMethod]
    public void Throw_Exception_When_Type_Contain_More_Than_10_Characteres(){
        Action act = () => new Field("55554","id","id teste","",new String('a',12),1,0,0,true,false);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("type must be a maximum of 10 characters");
    }
    #endregion
    #region MaxLenght
    [TestMethod]
    public void Throw_Exception_When_Maxlength_Is_Less_Than_Or_Equal_To_0(){
        Action act = () => new Field("15","idade","Idade da pessoa","","number",0,0,0,true,false);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("maxLength can't be negative or zero");
    }
    #endregion
    #region Max
    [TestMethod]
    public void Throw_Exception_When_Max_Is_Less_0(){
        Action act = () => new Field("15","idade","Idade da pessoa","","number",1,-1,0,true,false);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("max can't be negative");
    }
    #endregion
    #region Min
    [TestMethod]
    public void Throw_Exception_When_Min_Is_Less_0(){
        Action act = () => new Field("15","idade","Idade da pessoa","","number",1,0,-1,true,false);
        act
        .Should()
        .Throw<DomainExeption>()
        .WithMessage("min can't be negative");
    }
    #endregion
}