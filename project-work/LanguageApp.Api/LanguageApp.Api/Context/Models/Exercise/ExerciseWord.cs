namespace LanguageApp.Api.Context.Models.Exercise
{
    public class ExerciseWord
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public bool Hidden { get; set; }

        public int ExerciseId { get; set; }

        public virtual Exercise Exercise { get; set; }
    }
}