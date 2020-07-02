using Microsoft.AspNetCore.Mvc;

namespace LanguageApp.Api.Controllers
{
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using LanguageApp.Api.Context;
    using LanguageApp.Api.Context.Models.Exercise;
    using LanguageApp.Api.ViewModels.Exercise;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.EntityFrameworkCore;

    [ApiController]
    [Route("[controller]")]
    public class ExerciseBlockController : Controller
    {
        private readonly VocabularyContext vocabularyContext;

        private readonly IMapper mapper;

        public ExerciseBlockController(VocabularyContext vocabularyContext, IMapper mapper)
        {
            this.vocabularyContext = vocabularyContext;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("addExerciseBlock")]
        [Authorize(Roles = "admin")]
        public IActionResult AddExerciseBlock(string description)
        {
            var exerciseBlock = new ExerciseBlock() { Description = description };
            vocabularyContext.ExerciseBlock.Add(exerciseBlock);
            vocabularyContext.SaveChanges();
            return Ok(exerciseBlock.Id);
        }

        [HttpGet]
        [Route("getAllExerciseBlocks")]
        [Authorize]
        public IActionResult GetAllExerciseBlocks()
        {
            var blocks = vocabularyContext.ExerciseBlock.Include(x => x.Exercises).ThenInclude(x => x.Words)
                .AsNoTracking().ToList();
            return Json(mapper.Map<List<ExerciseBlockViewModel>>(blocks));
        }

        [HttpGet]
        [Route("getExerciseBlockById")]
        [Authorize]
        public IActionResult GetExerciseBlockById(int exerciseBlockId)
        {
            var block = vocabularyContext.ExerciseBlock.Include(x => x.Exercises).ThenInclude(x => x.Words).AsNoTracking()
                .First(x => x.Id == exerciseBlockId);
            return Json(mapper.Map<ExerciseBlockViewModel>(block));
        }

        [HttpDelete]
        [Route("deleteExerciseBlock")]
        [Authorize(Roles = "admin")]
        public IActionResult DeleteExerciseBlock(int id)
        {
            var block = vocabularyContext.ExerciseBlock.AsNoTracking().FirstOrDefault(x => x.Id == id);
            vocabularyContext.ExerciseBlock.Remove(block);
            vocabularyContext.SaveChanges();
            return Ok();
        }
    }
}