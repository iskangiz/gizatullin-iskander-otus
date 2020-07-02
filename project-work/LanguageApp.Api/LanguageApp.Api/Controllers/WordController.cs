using Microsoft.AspNetCore.Mvc;

namespace LanguageApp.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using LanguageApp.Api.ApiManagers;
    using LanguageApp.Api.Context;
    using LanguageApp.Api.Context.Models;
    using LanguageApp.Api.Context.Models.Vocabulary;
    using LanguageApp.Api.ViewModels;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;

    using NAudio.Wave;

    [ApiController]
    [Route("[controller]")]
    public class WordController : Controller
    {
        private readonly VocabularyContext vocabularyContext;

        private readonly IMapper mapper;

        private readonly MsApiManager msApiManager;

        private readonly YaApiManager yaApiManager;

        public WordController(
            VocabularyContext vocabularyContext,
            IMapper mapper,
            MsApiManager msApiManager,
            YaApiManager yaApiManager)
        {
            this.vocabularyContext = vocabularyContext;
            this.mapper = mapper;
            this.msApiManager = msApiManager;
            this.yaApiManager = yaApiManager;
        }

        [HttpPost]
        [Route("addWord")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> AddWordAsync(IFormFile file, string word, int categoryId)
        {
            string translation = await yaApiManager.TranslateTextAsync(word).ConfigureAwait(false);
            byte[] voice = await msApiManager.SynthesisToAudioFromTextAsync(translation).ConfigureAwait(false);
            using (var stream = file.OpenReadStream())
            {
                using (var memoryStream = new MemoryStream())
                {
                    stream.CopyTo(memoryStream);

                    var newWord = new Word
                                      {
                                          Title = word,
                                          Image = memoryStream.ToArray(),
                                          CategoryId = categoryId,
                                          Translation = translation,
                                          Voice = voice
                                      };

                    vocabularyContext.Word.Add(newWord);
                    vocabularyContext.SaveChanges();
                }
            }

            return new OkResult();
        }

        [HttpGet]
        [Route("GetImage")]
        public IActionResult GetImage(int id)
        {
            var word = vocabularyContext.Word.Include(x => x.Category).AsNoTracking().FirstOrDefault(x => x.Id == id);
            return File(word.Image, "image/jpeg");
        }

        [HttpGet]
        [Route("GetVoice")]
        public IActionResult GetVoice(int id)
        {
            var word = vocabularyContext.Word.Include(x => x.Category).AsNoTracking().FirstOrDefault(x => x.Id == id);
            return File(word.Voice, "audio/mp3");
        }

        [HttpDelete]
        [Route("DeleteWord")]
        [Authorize(Roles = "admin")]
        public IActionResult DeleteWord(int id)
        {
            var word = vocabularyContext.Word.AsNoTracking().FirstOrDefault(x => x.Id == id);
            vocabularyContext.Word.Remove(word);
            vocabularyContext.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("GetRandomWords")]
        [Authorize]
        public IActionResult GetRandomWords(int maxWords, int? categoryId)
        {
            var words = categoryId != null
                            ? vocabularyContext.Word.Where(x => x.CategoryId == categoryId).ToList().OrderBy(x => Guid.NewGuid())
                                .Take(maxWords).ToList()
                            : vocabularyContext.Word.ToList().OrderBy(x => Guid.NewGuid()).Take(maxWords).ToList();
            return Json(mapper.Map<List<TrainingWordViewModel>>(words));
        }

        [HttpPost]
        [Route("checkWordTranslation")]
        [Authorize]
        public IActionResult CheckWordTranslation(int wordId, string translation)
        {
            var word = vocabularyContext.Word.FirstOrDefault(x => x.Id == wordId);
            return Json(string.Equals(word?.Translation, translation, StringComparison.OrdinalIgnoreCase));
        }

        [HttpPost]
        [Route("checkWordAudio")]
        [Authorize]
        public async Task<IActionResult> CheckWordAudio(IFormFile file, int wordId)
        {
            string filePrefix = DateTime.Now.ToString("ddMMyyyy-hhmmss");
            string rawFileName = filePrefix + "raw";
            string convertedFileName = filePrefix + "converted.wav";
            string recognized = string.Empty;
            try
            {
                using (var stream = file.OpenReadStream())
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        stream.CopyTo(memoryStream);
                        System.IO.File.WriteAllBytes(rawFileName, memoryStream.ToArray());
                    }
                }

                using (var reader = new MediaFoundationReader(rawFileName))
                {
                    WaveFileWriter.CreateWaveFile(convertedFileName, reader);
                }

                recognized = await msApiManager.TranslateSpeechToTextAsync(convertedFileName).ConfigureAwait(false);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            finally
            {
                DeleteFile(rawFileName);
                DeleteFile(convertedFileName);
            }

            var word = vocabularyContext.Word.FirstOrDefault(x => x.Id == wordId);

            return Json(string.Equals(word?.Translation, recognized.Replace(".", string.Empty), StringComparison.OrdinalIgnoreCase));
        }

        private void DeleteFile(string fileUrl)
        {
            if (System.IO.File.Exists(fileUrl))
                System.IO.File.Delete(fileUrl);
        }
    }
}