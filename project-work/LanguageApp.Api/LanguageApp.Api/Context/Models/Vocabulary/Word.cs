namespace LanguageApp.Api.Context.Models.Vocabulary
{
    public class Word
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Translation { get; set; }

        public byte[] Image { get; set; }

        public byte[] Voice { get; set; }

        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
    }
}
