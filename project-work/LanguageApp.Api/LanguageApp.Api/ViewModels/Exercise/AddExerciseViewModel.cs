using System.Collections.Generic;

namespace LanguageApp.Api.ViewModels.Exercise
{
    public class AddExerciseViewModel
    {
        public int ExerciseBlockId { get; set; }

        public ICollection<AddExerciseWordViewModel> Words { get; set; }
    }
}
