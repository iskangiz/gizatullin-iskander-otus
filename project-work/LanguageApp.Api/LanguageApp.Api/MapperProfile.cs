using System;

namespace LanguageApp.Api
{
    using AutoMapper;

    using LanguageApp.Api.Context.Models.Exercise;
    using LanguageApp.Api.Context.Models.Vocabulary;
    using LanguageApp.Api.ViewModels;
    using LanguageApp.Api.ViewModels.Exercise;

    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<BaseWordViewModel, Word>();
            CreateMap<CategoryViewModel, Category>();

            CreateMap<Word, BaseWordViewModel>()
                .ForMember(
                    dest => dest.HasImage,
                    opt => opt.MapFrom(src => src.Image != null && src.Image.Length > 0))
                .ForMember(
                    dest => dest.HasAudio,
                    opt => opt.MapFrom(src => src.Voice != null && src.Voice.Length > 0));
            CreateMap<Category, CategoryViewModel>();

            CreateMap<Word, TrainingWordViewModel>().AfterMap(
                (word, model) =>
                    {
                        Array values = Enum.GetValues(typeof(TrainingType));
                        Random random = new Random();
                        model.Type = (TrainingType)values.GetValue(random.Next(values.Length));
                    });

            CreateMap<ExerciseWord, ExerciseWordViewModel>();
            CreateMap<Exercise, ExerciseViewModel>();
            CreateMap<ExerciseBlock, ExerciseBlockViewModel>();
            CreateMap<AddExerciseViewModel, Exercise>();
            CreateMap<AddExerciseWordViewModel, ExerciseWord>();
        }
    }
}
