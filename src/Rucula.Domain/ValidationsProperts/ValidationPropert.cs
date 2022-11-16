public sealed class ValidationsPropert
{
    public static void ValidPropert(bool condition, string message)
    {
        if (condition)
            throw new RuculaExeption(message);
    }
}