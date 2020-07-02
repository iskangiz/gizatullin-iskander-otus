namespace LanguageApp.Api.Controllers
{
    using System.Linq;

    using AutoMapper;

    using LanguageApp.Api.Context;
    using LanguageApp.Api.Context.Models.Exercise;
    using LanguageApp.Api.ViewModels.Exercise;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.VisualBasic;

    [ApiController]
    [Route("[controller]")]
    public class ExerciseController : Controller
    {
        private readonly VocabularyContext vocabularyContext;

        private readonly IMapper mapper;

        public ExerciseController(VocabularyContext vocabularyContext, IMapper mapper)
        {
            this.vocabularyContext = vocabularyContext;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("addExercise")]
        [Authorize(Roles = "admin")]
        public IActionResult AddExerciseBlock(AddExerciseViewModel model)
        {
            var exercise = mapper.Map<Exercise>(model);
            vocabularyContext.Exercise.Add(exercise);
            vocabularyContext.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        [Route("deleteExercise")]
        [Authorize(Roles = "admin")]
        public IActionResult DeleteExerciseBlock(int id)
        {
            var exercise = vocabularyContext.Exercise.AsNoTracking().FirstOrDefault(x => x.Id == id);
            vocabularyContext.Exercise.Remove(exercise);
            vocabularyContext.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("checkExercise")]
        [Authorize]
        public IActionResult CheckExercise(CheckExerciseViewModel model)
        {
            var exercise = vocabularyContext.Exercise.AsNoTracking().FirstOrDefault(x => x.Id == model.Id);

            var result = true;
            foreach (var word in model.Words)
            {
                if (word.Hidden && !string.Equals(word.Content,word.Answer, System.StringComparison.OrdinalIgnoreCase))
                    result = false;
            }

            return Ok(result);
        }


        //[HttpGet]
        //[Route("getAllExerciseBlocks")]
        //[Authorize]
        //public IActionResult GetAllExerciseBlocks()
        //{
        //    var blocks = vocabularyContext.ExerciseBlock.Include(x => x.Exercises).ThenInclude(x => x.Words)
        //        .AsNoTracking().ToList();
        //    return Json(mapper.Map<List<ExerciseBlockViewModel>>(blocks));
        //}

        //[HttpGet]
        //[Route("getExerciseBlockById")]
        //[Authorize]
        //public IActionResult GetExerciseBlockById(int exerciseBlockId)
        //{
        //    var block = vocabularyContext.ExerciseBlock.Include(x => x.Exercises).ThenInclude(x => x.Words).AsNoTracking()
        //        .First(x => x.Id == exerciseBlockId);
        //    return Json(mapper.Map<ExerciseBlockViewModel>(block));
        //}

        //[HttpDelete]
        //[Route("deleteExerciseBlock")]
        //[Authorize(Roles = "admin")]
        //public IActionResult DeleteExerciseBlock(int id)
        //{
        //    var block = vocabularyContext.ExerciseBlock.AsNoTracking().FirstOrDefault(x => x.Id == id);
        //    vocabularyContext.ExerciseBlock.Remove(block);
        //    vocabularyContext.SaveChanges();
        //    return Ok();
        //}
    }
}
