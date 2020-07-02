namespace LanguageApp.Api.ApiManagers
{
    using System;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;

    using Microsoft.Extensions.Configuration;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    public class YaApiManager
    {
        private readonly IConfiguration configuration;

        private readonly string key;

        private readonly string url;

        public YaApiManager(IConfiguration configuration)
        {
            this.configuration = configuration;
            key = configuration["Api:YaKey"];
            url = configuration["Api:YaUrl"];
        }

        public async Task<string> TranslateTextAsync(string text)
        {
            WebRequest request = WebRequest.Create(url + $"?key={key}&lang=ru-en&text={text}");
            WebResponse response = request.GetResponse();
            using (Stream stream = response.GetResponseStream())
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    string json = reader.ReadToEnd();
                    Console.WriteLine(json);
                    var jObject = (JObject)JsonConvert.DeserializeObject(json);
                    return jObject["text"].Values<string>().First();
                }
            }
        }
    }
}
