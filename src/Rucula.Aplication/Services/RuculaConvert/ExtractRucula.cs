using System.Text.RegularExpressions;
using Rucula.Domain;

namespace Rucula.Aplication;
public class ExtractRucula : IExtractRucula
 {
    private string _sintaxRucula;
    private readonly ILanguageRuculaRepository _languageRuculaRepository;
    private readonly ILanguageRuculaParameterRepository _languageRuculaParameterRepository;

    private List<LanguageRucula> ListLanguageRucula;
    private List<ModeloAtributo> ListModeloAtributo;
    public ExtractRucula()
    {   
    }
    public ExtractRucula(ILanguageRuculaRepository languageRuculaRepository,ILanguageRuculaParameterRepository languageRuculaParameterRepository)
    {
        _languageRuculaRepository = languageRuculaRepository;
        _languageRuculaParameterRepository = languageRuculaParameterRepository;
    }
    public string ConvertSintaxRucula(string sintaxRucula)
    {
        this.ListLanguageRucula = new List<LanguageRucula>();
        this._sintaxRucula = sintaxRucula; 
        PrepareMatchGroups();
        return this._sintaxRucula;
    }
    public MatchCollection GetMatchCollection(ref string sintaxRucula)
    {
        Regex rx = new Regex($@"{RegexSintaxRucula.RegularExpressionSyntaxRucula}", RegexOptions.Compiled);
        return rx.Matches(sintaxRucula);
    }
    public void PrepareMatchGroups()
    {  
        MatchCollection matches = GetMatchCollection(ref this._sintaxRucula); // Gets all valid Rucula syntaxes
        if(matches.Count  < 1)
        {
            return;
        }
        if (matches.Count >= 1 )
        {
            foreach (Match match in matches)
            {
                PrepareHTML(match.Groups,ref this._sintaxRucula); 
            }
        }
        /*  The innermost syntax breaks the outermost syntaxes, 
            after converting the innermost rucula syntax, the polymorph works on the outermost syntaxes.
        */
        PrepareMatchGroups();
    }
    public void  PrepareHTML(GroupCollection groups, ref string text){
        LanguageRucula mappingModelo =  GetLanguageRepresentation(groups[1].Value); // Buscar Identificador no banco de dados
 
        if (mappingModelo is null)
        {
            ReplaceModelo(groups[0].Value,AddNonexistentIndicator(groups[0].Value),ref text);
            return;
        }
        string atributos = "";
        string HTML = "";

        atributos = PreparaAtributos(groups[3].Value!,mappingModelo.AtributesDefaut?.Split(","));

        if(atributos != "")
            HTML = $"<{mappingModelo?.LanguageRuculaRepresentation.Code}{atributos}>{groups[4].Value}</{mappingModelo?.LanguageRuculaRepresentation.Code}>";
        if(atributos == "")
            HTML = $"<{mappingModelo?.LanguageRuculaRepresentation.Code}>{groups[4].Value}</{mappingModelo?.LanguageRuculaRepresentation.Code}>";

        ReplaceModelo(groups[0].Value,HTML,ref text);   
   }
    public void ReplaceModelo(string Mathfuncao,string html,ref string modelo){
        modelo = modelo.Replace(Mathfuncao,html);
    }
    public string AddNonexistentIndicator(string grupo){
        Regex  rx = new Regex(@"^[A-Z]+", RegexOptions.Compiled);
        var math = rx.Match(grupo);
        return Regex.Replace(grupo,@"^[A-Z]+",$"{math.Groups[0].Value}????");
    }

    public string PreparaAtributos(string modeloAtributos, string[] atributosDefaut)
    {
              
        Atribute Atributo = new Atribute(){
                AtributoClass = "",
                AtributosHTML = ""
        };
        Atribute ReturnAtributo;

        if (atributosDefaut is not null)
        {
            foreach (var defaut in atributosDefaut)
            {
                ReturnAtributo =  GetAtribute(defaut);   
                Atributo.AtributoClass+= $" {ReturnAtributo.AtributoClass}"; 
                Atributo.AtributosHTML+= $" {ReturnAtributo.AtributosHTML}"; 
            }
        }
        foreach(string atr in modeloAtributos.Split(","))
        {
            if (atr == "")
            {
                break;
            }
            ReturnAtributo =  GetAtribute(atr);   
            Atributo.AtributoClass+= $" {ReturnAtributo.AtributoClass}"; 
            Atributo.AtributosHTML+= $" {ReturnAtributo.AtributosHTML}"; 
        }
        if(Atributo.AtributoClass != ""){
            return Atributo.AtributosHTML+= $" class=\"{Atributo.AtributoClass}\"";
        }
        return Atributo.AtributosHTML;
    }

    public Atribute GetAtribute(string atributo){
        
        string AtributosHTML = "";
        string AtributoClass = "";

        if (atributo is not null)
        {
            string identificador ="";
            string conteudo = "";

            Int32 posiscao = atributo.IndexOf("=");

            if ( posiscao > -1)
            {
                identificador = atributo.Substring(0,posiscao);
                posiscao+=1;
                conteudo = atributo.Substring(posiscao);
            }
            else
            {
                identificador = atributo;
            }

            ModeloAtributo atributoHTML =  GetAtributeRepresentation(identificador);

            if (atributoHTML is not null)
            {
                if (atributoHTML.IsClass)
                {
                    AtributoClass += $"{atributoHTML.AtributCode} ";    
                }
                if (!atributoHTML.IsClass && conteudo == "")
                {
                    AtributosHTML+= $" {atributoHTML.AtributeRepresentation}";
                }
                if (!atributoHTML.IsClass && conteudo != "")
                {
                    AtributosHTML+= $" {atributoHTML.AtributeRepresentation}=\"{conteudo}\""; 
                }        
            }
        }
        return new Atribute {AtributosHTML = AtributosHTML, AtributoClass = AtributoClass};
    }
    private  LanguageRucula GetLanguageRepresentation(string identificador)
    {   
        LanguageRucula langRucula = this.ListLanguageRucula.Find(l => l.Code == identificador);
        if (langRucula is null)
        {
            langRucula = GetLanguageRepresentationDataBase(identificador);
            if (langRucula is not null)
            {
                this.ListLanguageRucula.Add(langRucula);
                return langRucula;
            } 
        }
        return langRucula;
    }
    private  ModeloAtributo GetAtributeRepresentation(string atributo){
        
        var Atribute =  this._languageRuculaParameterRepository.GetByIdAsync(atributo);

        return new ModeloAtributo
        {
            AtributCode = Atribute.Result.Code,
            AtributeRepresentation = Atribute.Result.Representation,
            IsClass= Atribute.Result.IsCSSClass
        };
    }
    private LanguageRucula GetLanguageRepresentationDataBase(string identificador)
    {
        Task<LanguageRucula> lr = _languageRuculaRepository.GetByIdAsync(identificador);
        lr.Wait();
        return lr.Result;
    }

 }
 
 
 