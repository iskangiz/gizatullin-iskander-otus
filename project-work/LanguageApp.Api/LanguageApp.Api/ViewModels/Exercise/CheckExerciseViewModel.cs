using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LanguageApp.Api.ViewModels.Exercise
{
    public class CheckExerciseViewModel
    {
        public int Id { get; set; }

        public ICollection<CheckExerciseWordViewModel> Words { get; set; }
    }
}
