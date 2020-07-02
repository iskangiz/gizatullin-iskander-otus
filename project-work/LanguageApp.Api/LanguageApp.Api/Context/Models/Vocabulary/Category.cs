namespace LanguageApp.Api.Context.Models.Vocabulary
{
    using System.Collections.Generic;

    public class Category
    {
        public Category() => Words = new HashSet<Word>();

        public int Id { get; set; }

        public string Title { get; set; }

        public virtual ICollection<Word> Words { get; set; }
    }
}
