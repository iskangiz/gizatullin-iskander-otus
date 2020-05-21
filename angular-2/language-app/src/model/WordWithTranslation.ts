import IWordWithTranslation from "./IWordWithTranslation";
import ITranslation from "./ITranslation";
import IWordWithTranslations from "./IWordWithTranslations";

export class WordWithTranslation implements IWordWithTranslation {
  translation: ITranslation;
  word: string;

  constructor(wordWithTranslations: IWordWithTranslations, lang: string) {
    this.word = wordWithTranslations.word;
    this.translation = wordWithTranslations.translations.find(x => x.language == lang);
  }
}
