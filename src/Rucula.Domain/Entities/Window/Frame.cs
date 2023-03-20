namespace Rucula.Domain.Window;
public class Frame : Entity<string>
{
    public Frame(string id, string name, string type, string objectDto)
    {
        Validation(id, name, type, objectDto);
    }
    public string Name { get;  private set; }
    public string Type { get; private set; }
    public string ObjectDto { get; private set; }

    private void Validation(string id, string name, string type, string objectDto)
    {
        #region Id
        id.IsRequerid().AddThrowExceptionDomain("id is requerid");
        id.MaxLength(10).AddThrowExceptionDomain("id must be a maximum of 10 characters");
        #endregion
        #region Name
        name.IsRequerid().AddThrowExceptionDomain("name is requerid");
        name.MaxLength(20).AddThrowExceptionDomain("name must be a maximum of 20 characters");
        #endregion
        #region Type
        type.IsRequerid().AddThrowExceptionDomain("type is requerid");
        type.MaxLength(10).AddThrowExceptionDomain("type must be a maximum of 10 characters");
        #endregion
        #region objectDto
        objectDto.IsRequerid().AddThrowExceptionDomain("objectDto is requerid");
        objectDto.MaxLength(20).AddThrowExceptionDomain("objectDto must be a maximum of 20 characters");  
        #endregion
    }
}