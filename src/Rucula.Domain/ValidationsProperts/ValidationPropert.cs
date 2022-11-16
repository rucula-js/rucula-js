public sealed class ValidationPropert
{
    public static void ValidPropert(bool condition, string message)
    {
        if (condition)
            throw new RuculaExeption(message);
    }
}