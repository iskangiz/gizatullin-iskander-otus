using System.Collections.Generic;

namespace LanguageApp.Api.ViewModels.Exercise
{
    public class ExerciseBlockViewModel
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public ICollection<ExerciseViewModel> Exercises { get; set; }
    }
}
