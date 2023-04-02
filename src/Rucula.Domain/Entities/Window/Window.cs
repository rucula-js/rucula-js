namespace Rucula.Domain.Window;

public class Window : Entity<string>
{
    public Window(string id,string name, string uRLRoot, string uRLGetAll, string uRLGetId, string Type)
    {
        Validation( id,name, uRLRoot, uRLGetAll, uRLGetId, Type);
    }
    public string Name { get; private  set; }
    public string URLRoot { get; private  set; }
    public string URLGetAll { get; private  set; }
    public string URLGetId { get; private  set; }
    public string Type { get; private  set; }

    public List<Frame> Frames { get; set; }
    
    private void Validation(string id, string name, string uRLRoot, string uRLGetAll, string uRLGetId, string type)
    {
        #region Id
        id.IsRequerid().AddThrowExceptionDomain("id is requerid");
        id.MaxLength(10).AddThrowExceptionDomain("id must be a maximum of 10 characters");
        #endregion
        #region Name
        name.IsRequerid().AddThrowExceptionDomain("name is requerid");
        name.MaxLength(20).AddThrowExceptionDomain("name must be a maximum of 20 characters");
        #endregion
        #region URLRoot
        uRLRoot.MaxLength(60).AddThrowExceptionDomain("uRLRoot must be a maximum of 60 characters");
        #endregion
        #region URLGetAll
        uRLGetAll.MaxLength(20).AddThrowExceptionDomain("uRLGetAll must be a maximum of 20 characters");
        #endregion
        #region URLGetId
        uRLGetId.MaxLength(20).AddThrowExceptionDomain("uRLGetId must be a maximum of 20 characters");
        #endregion
         #region Type
        type.IsRequerid().AddThrowExceptionDomain("type is requerid");
        type.MaxLength(10).AddThrowExceptionDomain("type must be a maximum of 10 characters");
        #endregion
        this.Id = id;
        this.Name = name;
        this.URLRoot = uRLRoot;
        this.URLGetAll = uRLGetAll;
        this.URLGetId = uRLGetId;
        this.Type = type;
    }
    
}