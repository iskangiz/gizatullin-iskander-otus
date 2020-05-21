import { Injectable } from '@angular/core';
import IWordWithTranslations from "../model/IWordWithTranslations"

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private wordsKey = 'words';

  constructor() {
  }

  getWords(): Array<IWordWithTranslations> {
    let words = JSON.parse(localStorage.getItem(this.wordsKey));
    if(words == null)
      return [];
    return words as Array<IWordWithTranslations>;
  }

  addWord(word: IWordWithTranslations) {
    let words = this.getWords();
    if (!words.some(w => w.word == word.word)) {
      words.push(word);
    }
    this.saveWords(words);
  }

  saveWords(words: Array<IWordWithTranslations>) {
    localStorage.setItem(this.wordsKey, JSON.stringify(words));
  }
}
