namespace Rucula.Domain.Window;
public class Field : Entity<string>
{
    public Field(string id,string propertDto,string description,string information,string type,short maxLength ,short max ,short min,
        bool requerid, bool  disable, short sequence)
    {
        Validate(id, propertDto, description, information, type, maxLength, max, min, requerid, disable, sequence);
    }
    public string PropertDto { get; private set; }
    public string Description { get; private set; }
    public string Information { get; private set; }
    public string Type { get; private set; }
    public short MaxLength { get; private set; }
    public short Max { get; private set; }
    public short Min { get; private set; }
    public bool Requerid { get; private set; }
    public bool  Disable { get; private set; }
    public short  Sequence { get; private set; }
    public Frame Frame { get; set; }
    public string FrameFk { get; set; }
    

    private void Validate(string id, string propertDto,string description,string information,string type,short maxLength ,short max ,short min,
        bool requerid, bool  disable, short sequence)
    {
        #region Id
        id.IsRequerid().AddThrowExceptionDomain("id is requerid");
        id.MaxLength(10).AddThrowExceptionDomain("id must be a maximum of 10 characters");
        #endregion
        #region PropertDto
        propertDto.IsRequerid().AddThrowExceptionDomain("propertDto is requerid");
        propertDto.MaxLength(20).AddThrowExceptionDomain("propertDto must be a maximum of 20 characters");     
        #endregion
        #region Description
        description.IsRequerid().AddThrowExceptionDomain("description is requerid");
        description.MaxLength(20).AddThrowExceptionDomain("description must be a maximum of 20 characters");            
        #endregion
        #region Information
        information.MaxLength(50).AddThrowExceptionDomain("information must be a maximum of 50 characters");            
        #endregion
        #region Type
        type.IsRequerid().AddThrowExceptionDomain("type is requerid");
        type.MaxLength(10).AddThrowExceptionDomain("type must be a maximum of 10 characters");            
        #endregion

        #region MaxLength
        maxLength.SmallerOrEqual(0).AddThrowExceptionDomain("maxLength can't be negative or zero");            
        #endregion
        #region Max
        max.Smalle(0).AddThrowExceptionDomain("max can't be negative");            
        #endregion
        #region Min
        min.Smalle(0).AddThrowExceptionDomain("min can't be negative");            
        #endregion       
        sequence.Smalle(0).AddThrowExceptionDomain("sequence can't be negative");
        this.Id = id;
        this.PropertDto = propertDto;
        this.Description = description;
        this.Type = type;
        this.MaxLength = maxLength;
        this.Max = max;
        this.Min = min;
        this.Requerid = requerid;
        this.Disable = disable;
        this.Sequence = sequence;
    }


}