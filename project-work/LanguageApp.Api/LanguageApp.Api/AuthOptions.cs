namespace LanguageApp.Api
{
    using System.Text;

    using Microsoft.IdentityModel.Tokens;

    internal class AuthOptions
    {
        internal const string Issuer = "MyAuthServer"; // издатель токена

        internal const string Audience = "MyAuthClient"; // потребитель токена

        internal const string Key = "mysupersecret_secretkey!123"; // ключ для шифрации

        internal const int Lifetime = 120; // время жизни токена - 1 минута

        internal static SymmetricSecurityKey GetSymmetricSecurityKey() => new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
    }
}
