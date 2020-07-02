namespace LanguageApp.Api.ViewModels
{
    public class BaseWordViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Translation { get; set; }

        public bool HasImage { get; set; }

        public bool HasAudio { get; set; }
    }
}
