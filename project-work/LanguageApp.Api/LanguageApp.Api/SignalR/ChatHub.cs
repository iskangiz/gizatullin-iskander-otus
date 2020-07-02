namespace LanguageApp.Api.SignalR
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.SignalR;

    [Authorize]
    public class ChatHub : Hub
    {
        private static List<string> connectedUsersIds = new List<string>();

        private static List<string> connectedAdminsIds = new List<string>();

        private static Dictionary<string, string> userAdminConnected = new Dictionary<string, string>();

        public async Task Send(string message, string toWhom)
        {
            await Clients.User(toWhom).SendAsync("Send", message).ConfigureAwait(false);
        }

        public async Task ConnectToUser(string user)
        {
            string userIdentifier = Context.UserIdentifier;
            if (Context.User.IsInRole("admin"))
            {
                if (userAdminConnected.ContainsKey(userIdentifier))
                {
                    userAdminConnected[userIdentifier] = user;
                } 
                else
                {
                    userAdminConnected.Add(userIdentifier, user);
                }

                await Clients.User(user).SendAsync("SomeoneConnected", userIdentifier).ConfigureAwait(false);
            }
        }

        public async Task SendBlockId(string toWhom, int blockId)
        {
            await Clients.User(toWhom).SendAsync("ReceiveBlockId", blockId).ConfigureAwait(false);
        }

        public override async Task OnConnectedAsync()
        {
            string userIdentifier = Context.UserIdentifier;
            if (Context.User.IsInRole("admin"))
            {
                if (!connectedAdminsIds.Contains(userIdentifier))
                    connectedAdminsIds.Add(userIdentifier);

                await Clients.User(userIdentifier).SendAsync("ListOfUsers", connectedUsersIds).ConfigureAwait(false);
            }
            else
            {
                if (!connectedUsersIds.Contains(userIdentifier))
                    connectedUsersIds.Add(userIdentifier);

                await Clients.Users(connectedAdminsIds).SendAsync("ListOfUsers", connectedUsersIds)
                    .ConfigureAwait(false);
            }
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string userIdentifier = Context.UserIdentifier;

            if (Context.User.IsInRole("admin"))
            {
                var user = connectedAdminsIds.FirstOrDefault(x => x == userIdentifier);
                if (user != null)
                    connectedAdminsIds.Remove(userIdentifier);
            }
            else
            {
                var user = connectedUsersIds.FirstOrDefault(x => x == userIdentifier);
                if (user != null)
                    connectedUsersIds.Remove(userIdentifier);

                await Clients.Users(connectedAdminsIds).SendAsync("ListOfUsers", connectedUsersIds)
                    .ConfigureAwait(false);
            }
        }
    }
}
