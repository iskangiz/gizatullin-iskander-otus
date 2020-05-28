import { Injectable } from '@angular/core';
import IWordWithTranslations from "../model/IWordWithTranslations"
import {Settings} from "../model/Settings";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private wordsKey = 'words';
  private settingsKey = 'settings';

  constructor() {
  }

  getWords(): Array<IWordWithTranslations> {
    let words = JSON.parse(localStorage.getItem(this.wordsKey));
    if (words == null)
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

  saveSettings(settings: Settings) {
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
  }

  getSettings(): Settings {
    let settings = JSON.parse(localStorage.getItem(this.settingsKey));
    return settings as Settings;
  }
}
