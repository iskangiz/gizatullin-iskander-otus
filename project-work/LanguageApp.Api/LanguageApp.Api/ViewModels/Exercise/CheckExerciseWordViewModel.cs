using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LanguageApp.Api.ViewModels.Exercise
{
    public class CheckExerciseWordViewModel
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public bool Hidden { get; set; }

        public string Answer { get; set; }
    }
}
