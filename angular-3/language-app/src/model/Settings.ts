import {Language} from "./Language";

export class Settings {
  language: Language;
  numberOfWords: number;

  constructor(language: Language, numberOfWords: number) {
    this.language = language;
    this.numberOfWords = numberOfWords;
  }
}
