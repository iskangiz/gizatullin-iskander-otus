namespace LanguageApp.Api.Context.Models.Exercise
{
    using System.Collections.Generic;

    public class Exercise
    {
        public int Id { get; set; }

        public virtual ICollection<ExerciseWord> Words { get; set; }

        public int ExerciseBlockId { get; set; }

        public virtual ExerciseBlock ExerciseBlock { get; set; }
    }
}