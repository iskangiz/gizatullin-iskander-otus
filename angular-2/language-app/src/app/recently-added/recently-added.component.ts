import { Component, OnInit } from '@angular/core';
import {TranslationService} from "../../services/translation.service";
import {StorageService} from "../../services/storage.service";
import {DictionaryService} from "../../services/dictionary.service";
import IWordWithTranslation from "../../model/IWordWithTranslation"

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  words:Array<IWordWithTranslation>;

  wordsTxt: string;

  constructor(private translationService: TranslationService,
              private storageService: StorageService,
              private dictionaryService: DictionaryService) {
  }

  testService() {
    this.dictionaryService.addWordsToDictionary(this.wordsTxt).subscribe(value => {
      this.words.push(value)
    }, error => {}, () => {console.log('fin')})
  }

  ngOnInit(): void {
    this.words = this.dictionaryService.getWordsFromDictionary('en');
    this.wordsTxt = '';
  }
}
