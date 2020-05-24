import {Injectable} from '@angular/core';
import {TranslationService} from "./translation.service";
import {StorageService} from "./storage.service";
import {Observable, Observer, of} from 'rxjs';
import {WordWithTranslation} from "../model/WordWithTranslation";
import {WordWithTranslations} from "../model/WordWithTranslations";
import IWordWithTranslation from "../model/IWordWithTranslation";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private translationService: TranslationService, private  storageService: StorageService) {
  }

  getWordsFromDictionary(lang: string) : Array<WordWithTranslation> {
    let words = this.storageService.getWords();
    return words.map(value => {
      return new WordWithTranslation(value, lang);
    }).filter(x => x.translation != null);
  }

  addWordsToDictionary(text: string, lang: string) {
    text.split(' ');
    let wordsArray = text.split(/\s+/);

    return new Observable((observer: Observer<IWordWithTranslation>) => {
      let w = wordsArray[0];

      wordsArray.forEach(w => {
        this.translationService.translate('ru', lang, w).subscribe(value => {
          let translation = value["text"].length > 0 ? value["text"][0] : "";
          let wordWithTranslations = new WordWithTranslations(w, lang, translation);
          this.storageService.addWord(wordWithTranslations);

          observer.next(new WordWithTranslation(wordWithTranslations, lang));
        });
      });

      //observer.complete();
    });
  }
}
