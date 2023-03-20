namespace Rucula.Domain;
public static class ThrowExceptionDomain
{
    public static void AddThrowExceptionDomain(this bool condition, string message){

        if (condition)
            throw new DomainExeption(message);
    } 
   
}
