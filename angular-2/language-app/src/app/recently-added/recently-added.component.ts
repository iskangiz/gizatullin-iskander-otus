import { Component, OnInit } from '@angular/core';
import {TranslationService} from "../../services/translation.service";
import {StorageService} from "../../services/storage.service";
import IWordWithTranslation from "../../model/IWordWithTranslation"

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  constructor(private translationService: TranslationService, private  storageService: StorageService) {
  }

  testService() {
    console.log('old words');
    console.log(this.storageService.getWords());
    let newWord = {} as IWordWithTranslation;
    newWord.word = 'тест';
    newWord.translations = [{language: "em", text: "test"}];
    this.storageService.addWord(newWord);
    console.log('new words');
    console.log(this.storageService.getWords());

    this.translationService.translate("ru", "en", "задача").subscribe(data => {
      console.log(data["text"])
    });
  }

  ngOnInit(): void {
  }

}
