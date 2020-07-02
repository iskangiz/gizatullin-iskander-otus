namespace LanguageApp.Api.SignalR
{
    using Microsoft.AspNetCore.SignalR;

    public class CustomUserIdProvider : IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection) => connection.User?.Identity.Name;
    }
}
