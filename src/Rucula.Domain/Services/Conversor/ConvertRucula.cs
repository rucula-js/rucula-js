using System.Text.RegularExpressions;

namespace Rucula.Domain;
public class ExtractRucula : IExtractRucula
 {
    private string _sintaxRucula;
    private readonly ILanguageRuculaRepresentationRepository _languageRuculaRepresentationRepository;
    public ExtractRucula()
    {   
    }
    public ExtractRucula(ILanguageRuculaRepresentationRepository languageRuculaRepresentationRepository)
    {
        _languageRuculaRepresentationRepository = languageRuculaRepresentationRepository;
    }
    public string ConvertSintaxRucula(string sintaxRucula){
        this._sintaxRucula = sintaxRucula; 
        PreparaMatchGroups();
        return this._sintaxRucula;
    }
    public MatchCollection GetMatchCollection(ref string sintaxRucula)
    {
        Regex rx = new Regex($@"{RegexSintaxRucula.RegularExpressionSyntaxRucula}", RegexOptions.Compiled);
        return rx.Matches(sintaxRucula);
    }
    public void PreparaMatchGroups()
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
                PreparaHTML(match.Groups,ref this._sintaxRucula); 
            }
        }
        /*  The innermost syntax breaks the outermost syntaxes, 
            after converting the innermost rucula syntax, the polymorph works on the outermost syntaxes.
        */
        PreparaMatchGroups();
    }
    public string  PreparaHTML(GroupCollection groups, ref string text){
        ModeloHTML mappingModelo =  GetLanguageRepresentation(groups[1].Value); // Buscar Identificador no banco de dados
 
        if (mappingModelo is null)
        {
            ReplaceModelo(groups[0].Value,AddNonexistentIndicator(groups[0].Value),ref text);
            return "";
        }
        string atributos = "";
        string HTML = "";

        atributos = PreparaAtributos(groups[3].Value!,mappingModelo.AtributosDefaut!);

        if(atributos != "")
            HTML = $"<{mappingModelo?.TagHtml} {atributos}>{groups[4].Value}</{mappingModelo?.TagHtml}>";
        if(atributos == "")
            HTML = $"<{mappingModelo?.TagHtml}>{groups[4].Value}</{mappingModelo?.TagHtml}>";

        ReplaceModelo(groups[0].Value,HTML,ref text);   
        
        return "";   
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
                    AtributoClass += $"{atributoHTML.Identificador} ";    
                }
                if (!atributoHTML.IsClass && conteudo == "")
                {
                    AtributosHTML+= $" {atributoHTML.AtributoHtml}";
                }
                if (!atributoHTML.IsClass && conteudo != "")
                {
                    AtributosHTML+= $" {atributoHTML.AtributoHtml}=\"{conteudo}\""; 
                }        
            }
            
        }
        return new Atribute {AtributosHTML = AtributosHTML, AtributoClass = AtributoClass};
    }
    public  ModeloHTML GetLanguageRepresentation(string identificador)
    {
        var LanguageRucula = _languageRuculaRepresentationRepository.GetByCodeAsync(identificador);

        if (LanguageRucula.IsCompletedSuccessfully)
        {
            return new ModeloHTML 
            {
                TagHtml  = LanguageRucula.Result.Code,
                AtributosDefaut = LanguageRucula.Result.AtributosDefaut
            };
        }
        return null;
    }
    public ModeloAtributo GetAtributeRepresentation(string atributo){
        // Buscar no banco de dados;
        return null;
    }

 }
 
 
 