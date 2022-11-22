using Rucula.Domain;
namespace Rucula.Aplication;

public class ExtractRuculaService : IExtractRuculaService
{
    private readonly IExtractRucula _extractRucula;
    public ExtractRuculaService(IExtractRucula extractRucula)
    {
        _extractRucula = extractRucula;
    }
    public string ConvertSintaxRucula(string sintaxRucula)
    {
        return this._extractRucula.ConvertSintaxRucula(sintaxRucula);
    }
}