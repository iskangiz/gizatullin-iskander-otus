using Microsoft.AspNetCore.Mvc;

namespace LanguageApp.Api.Controllers
{
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using LanguageApp.Api.Context;
    using LanguageApp.Api.Context.Models.Vocabulary;
    using LanguageApp.Api.ViewModels;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.EntityFrameworkCore;

    [ApiController]
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        private readonly VocabularyContext vocabularyContext;

        private readonly IMapper mapper;

        public CategoryController(VocabularyContext vocabularyContext, IMapper mapper)
        {
            this.vocabularyContext = vocabularyContext;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("addCategory")]
        [Authorize(Roles = "admin")]
        public IActionResult AddCategory(string title)
        {
            var category = new Category() { Title = title };
            vocabularyContext.Category.Add(category);
            vocabularyContext.SaveChanges();
            return Ok(category.Id);
        }

        [HttpGet]
        [Route("getAllCategories")]
        [Authorize]
        public IActionResult GetAllCategories()
        {
            var categories = vocabularyContext.Category.Include(x => x.Words).AsNoTracking().ToList();
            return Json(mapper.Map<List<CategoryViewModel>>(categories));
        }

        [HttpGet]
        [Route("getCategoryById")]
        [Authorize]
        public IActionResult GetCategoryById(int categoryId)
        {
            var category = vocabularyContext.Category.Include(x => x.Words).AsNoTracking()
                .First(x => x.Id == categoryId);
            return Json(mapper.Map<CategoryViewModel>(category));
        }

        [HttpDelete]
        [Route("deleteCategory")]
        [Authorize(Roles = "admin")]
        public IActionResult DeleteCategory(int id)
        {
            var category = vocabularyContext.Category.AsNoTracking().FirstOrDefault(x => x.Id == id);
            vocabularyContext.Category.Remove(category);
            vocabularyContext.SaveChanges();
            return Ok();
        }
    }
}