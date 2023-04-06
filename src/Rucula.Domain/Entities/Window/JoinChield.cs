namespace Rucula.Domain.Window;

public class JoinChield : Entity<string>
{
    public JoinChield(string id, string key, string value)
    {
        Validation(id, key, value);
    }
    public string Key { get;  private set; }
    public string Value { get; private set; }
    public Window Window { get; set; }
    public string WindowFk { get; set; }
    private void Validation(string id, string key, string value)
    {
        #region Id
        id.IsRequerid().AddThrowExceptionDomain("id is requerid");
        id.MaxLength(10).AddThrowExceptionDomain("id must be a maximum of 10 characters");
        #endregion
        #region Key
        key.MaxLength(30).AddThrowExceptionDomain("key must be a maximum of 30 characters");
        #endregion
        #region Value
        value.IsRequerid().AddThrowExceptionDomain("value is requerid");
        value.MaxLength(30).AddThrowExceptionDomain("value must be a maximum of 10 characters");
        #endregion
        this.Id = id;
        this.Key = key;
        this.Value = value;
    }
}