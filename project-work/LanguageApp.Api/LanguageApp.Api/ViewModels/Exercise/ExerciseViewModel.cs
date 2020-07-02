using System.Collections.Generic;

namespace LanguageApp.Api.ViewModels.Exercise
{
    public class ExerciseViewModel
    {
        public int Id { get; set; }

        public ICollection<ExerciseWordViewModel> Words { get; set; }
    }
}
