import { Injectable } from '@angular/core';
import IWordWithTranslation from "../model/IWordWithTranslation"

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private wordsKey = 'words';

  constructor() {
  }

  getWords(): Array<IWordWithTranslation> {
    let words = JSON.parse(localStorage.getItem(this.wordsKey));
    if(words == null)
      return [];
    return words as Array<IWordWithTranslation>;
  }

  addWord(word: IWordWithTranslation) {
    let words = this.getWords();
    if (!words.some(w => w.word == word.word)) {
      words.push(word);
    }
    this.saveWords(words);
  }

  saveWords(words: Array<IWordWithTranslation>) {
    localStorage.setItem(this.wordsKey, JSON.stringify(words));
  }
}
