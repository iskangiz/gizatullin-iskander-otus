import ITranslation from "./ITranslation";
import IWordWithTranslations from "./IWordWithTranslations";

export class WordWithTranslations implements IWordWithTranslations {
  translations: Array<ITranslation>;
  word: string;

  constructor(word: string, lang: string, translation: string) {
    this.word = word;
    this.translations = [{language: lang, text: translation}];
  }
}
