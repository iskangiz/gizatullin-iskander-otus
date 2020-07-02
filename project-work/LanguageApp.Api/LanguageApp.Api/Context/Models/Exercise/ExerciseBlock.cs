namespace LanguageApp.Api.Context.Models.Exercise
{
    using System.Collections.Generic;

    public class ExerciseBlock
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public virtual ICollection<Exercise> Exercises { get; set; }
    }
}