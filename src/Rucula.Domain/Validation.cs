public static class Validation
{
     public static bool IsRequerid(this string o){
        if( String.IsNullOrEmpty(o)){
            return true;
        }
        return false;
    }
    public static bool MaxLength(this string o, short maxLength){
        if(o.Length > maxLength){
            return true;
        }
        return false;
    }

    public static bool SmallerOrEqual(this short o, short valueSmaller) 
    {      
        return o <= valueSmaller;
    }
    public static bool Smalle(this short o, short valueSmaller) 
    {       
        return o < valueSmaller;
    }

}