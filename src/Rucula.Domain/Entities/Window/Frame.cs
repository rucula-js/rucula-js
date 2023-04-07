namespace Rucula.Domain.Window;
public class Frame : Entity<string>
{
    public Frame(string id, string name, string type, string objectDto,short sequence)
    {
        Validation(id, name, type, objectDto,sequence);
    }
    public string Name { get;  private set; }
    public string Type { get; private set; }
    public string ObjectDto { get; private set; }
    public short  Sequence { get; private set; }
    public List<Field> Fields { get; set; }
    public List<Line> Line { get; set; }
    public Window Window { get; set; }
    public string WindowFk { get; set; }
    private void Validation(string id, string name, string type, string objectDto,short sequence)
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
        sequence.Smalle(0).AddThrowExceptionDomain("sequence can't be negative");
        this.Id = id;
        this.Name = name;
        this.Type = type;
        this.ObjectDto = objectDto;
        this.Sequence = sequence;


    }
}