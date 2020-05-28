import { Component, OnInit } from '@angular/core';
import {TranslationService} from "../../services/translation.service";
import {StorageService} from "../../services/storage.service";
import {DictionaryService} from "../../services/dictionary.service";
import {Settings} from "../../model/Settings";
import {WordWithTranslation} from "../../model/WordWithTranslation";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit {

  settings: Settings;
  words: Array<WordWithTranslation>;
  currentWord: WordWithTranslation;
  currentIndex: number = 0;

  form: FormGroup;

  get checkWordControl(): FormControl {
    return this.form.get('checkWord') as FormControl;
  }

  constructor(private translationService: TranslationService,
              private storageService: StorageService,
              private dictionaryService: DictionaryService) {
    this.form = new FormGroup({
      checkWord: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.settings = this.storageService.getSettings();
    if (this.settings !== null) {
      const shuffledWords = this.dictionaryService.getWordsFromDictionary(this.settings.language.code).sort(() => 0.5 - Math.random());
      this.words = shuffledWords.slice(0, this.settings.numberOfWords);
      this.currentWord = this.words[this.currentIndex];
    }
  }

  checkWord() {
    if (this.form.valid) {
      const result = this.checkWordControl.value.toString().toLowerCase() === this.currentWord.translation.text.toLowerCase();
      alert((result) ? 'Correct' : `Incorrect. Correct answer - ${this.currentWord.translation.text}`);

      this.currentIndex++;
      this.checkWordControl.setValue('');
      this.checkWordControl.markAsPristine();

      if (this.currentIndex === this.words.length) {
        alert('All words!');
        this.currentWord = null;
        return;
      } else {
        this.currentWord = this.words[this.currentIndex];
      }
    } else {
      this.checkWordControl.markAsDirty();
    }
  }
}
