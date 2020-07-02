namespace LanguageApp.Api.Context
{
    using LanguageApp.Api.Context.Models.Exercise;
    using LanguageApp.Api.Context.Models.Vocabulary;

    using Microsoft.EntityFrameworkCore;

    public class VocabularyContext : DbContext
    {
        public VocabularyContext(DbContextOptions<VocabularyContext> options)
            : base(options)
        {
        }

        public DbSet<Category> Category { get; set; }

        public DbSet<Word> Word { get; set; }

        public DbSet<ExerciseBlock> ExerciseBlock { get; set; }

        public DbSet<Exercise> Exercise { get; set; }

        public DbSet<ExerciseWord> ExerciseWord { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("lang");

            modelBuilder.Entity<Word>(
                entity =>
                    {
                        entity.HasOne(d => d.Category).WithMany(p => p.Words).HasForeignKey(d => d.CategoryId)
                            .HasConstraintName("FK_Word_Category_CategoryId");
                    });
        }
    }
}
