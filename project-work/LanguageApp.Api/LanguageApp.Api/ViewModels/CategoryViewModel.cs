namespace LanguageApp.Api.ViewModels
{
    using System.Collections.Generic;

    public class CategoryViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public ICollection<BaseWordViewModel> Words { get; set; }
    }
}
