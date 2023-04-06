namespace Rucula.Domain.Window;
public class ColumnsGridGet : Entity<string>
{
    public ColumnsGridGet(string id, string parameterUrl, string parameterGrid)
    {
        Validation(id, parameterUrl, parameterGrid);
    }
    public string ParameterUrl { get; private set; }
    public string ParameterGrid { get; private set; }
    public Window Window { get; set; }
    public string WindowFk { get; set; }
    public void Validation(string id,string parameterUrl, string parameterGrid)
    {
        #region Id
        id.IsRequerid().AddThrowExceptionDomain("id is requerid");
        id.MaxLength(10).AddThrowExceptionDomain("id must be a maximum of 10 characters");
        #endregion  
        #region ParameterUrl
        parameterUrl.IsRequerid().AddThrowExceptionDomain("parameterUrl is requerid");
        parameterUrl.MaxLength(40).AddThrowExceptionDomain("parameterUrl must be a maximum of 40 characters");
        #endregion  
        #region ParameterGrid
        parameterGrid.IsRequerid().AddThrowExceptionDomain("parameterGrid is requerid");
        parameterGrid.MaxLength(40).AddThrowExceptionDomain("parameterGrid must be a maximum of 40 characters");
        #endregion   
        this.Id = id;
        this.ParameterGrid = parameterGrid;
        this.ParameterUrl = parameterUrl;
    }
}