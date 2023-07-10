namespace Rucula.Domain;

public class Columns : Entity<string>
{
    public Columns(string id, string name)
    {
        Validation(id,name);
    }
    public string Name { get; private set; }
    public Window Window { get; set; }
    public string WindowFk { get; set; }
    public void Validation(string id, string name){
        #region Id
        id.IsRequerid().AddThrowExceptionDomain("id is requerid");
        id.MaxLength(10).AddThrowExceptionDomain("id must be a maximum of 10 characters");
        #endregion
        #region Name
        name.IsRequerid().AddThrowExceptionDomain("name is requerid");
        name.MaxLength(40).AddThrowExceptionDomain("name must be a maximum of 40 characters");
        #endregion
        this.Id = id;
        this.Name = name;
    }
}