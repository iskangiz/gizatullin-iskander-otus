import { Component, OnInit } from '@angular/core';
import {TranslationService} from "../../services/translation.service";
import {StorageService} from "../../services/storage.service";
import {DictionaryService} from "../../services/dictionary.service";
import IWordWithTranslation from "../../model/IWordWithTranslation"
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Settings} from "../../model/Settings";

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  words:Array<IWordWithTranslation>;

  wordsTxt: string;
  languageCode: string;
  form: FormGroup;

  get newWordsControl (): FormControl {
    return this.form.get('newWords') as FormControl;
  }

  constructor(private translationService: TranslationService,
              private storageService: StorageService,
              private dictionaryService: DictionaryService) {
    this.form = new FormGroup({
      newWords: new FormControl('', [
        Validators.required,
        Validators.pattern('[\u0401\u0451\u0410-\u044f ]*')
      ])
    });
  }

  addWords() {
    if (this.form.valid) {
      this.dictionaryService.addWordsToDictionary(this.newWordsControl.value, this.languageCode).subscribe(value => {
        this.words.push(value)
      }, error => {}, () => {console.log('fin')})
    } else {
      this.newWordsControl.markAsDirty();
    }
  }

  ngOnInit(): void {
    let settings = this.storageService.getSettings();
    this.languageCode = (settings?.language != null) ? settings.language.code : 'en';

    this.words = this.dictionaryService.getWordsFromDictionary(this.languageCode);
    this.wordsTxt = '';

  }
}
