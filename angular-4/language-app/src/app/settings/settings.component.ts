import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslationService} from "../../services/translation.service";
import {Language} from "../../model/Language";
import {StorageService} from "../../services/storage.service";
import {Settings} from "../../model/Settings";
import {Location} from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;

  get languageControl (): FormControl {
    return this.settingsForm.get('language') as FormControl;
  }

  get numberOfWordsControl (): FormControl {
    return this.settingsForm.get('numberOfWords') as FormControl;
  }

  languages: Array<Language>;

  constructor(private translationService: TranslationService,
              private storageService: StorageService,
              private location: Location) {
    this.settingsForm = new FormGroup({
      language: new FormControl('', [
        Validators.required
      ]),
      numberOfWords: new FormControl('', [
        Validators.required,
        Validators.pattern("^-{0,1}[0-9]{1,}$"),
        Validators.min(1),
      ])
    });
  }

  ngOnInit(): void {
    const existingSettings = this.storageService.getSettings();
    if (existingSettings != null) {
      this.languageControl.setValue(existingSettings.language);
      this.numberOfWordsControl.setValue(existingSettings.numberOfWords);
    }

    this.translationService.getLanguages().subscribe(value => {
      this.languages = (Object.keys(value).map(x => new Language(value[x], x))).sort(this.compareLanguages);
    });
  }

  settingFormSubmit() {
    if (this.settingsForm.valid) {
      const newSettings = new Settings(this.languageControl.value, this.numberOfWordsControl.value);
      this.storageService.saveSettings(newSettings);
    } else {
      Object.keys(this.settingsForm.controls).forEach(key => {
        this.settingsForm.get(key).markAsDirty();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  compareFn(c1: any, c2:any): boolean {
    return c1 && c2 ? c1.code === c2.code : c1 === c2;
  }

  compareLanguages( a, b ) {
    if ( a.title < b.title ){
      return -1;
    }
    if ( a.title > b.title ){
      return 1;
    }
    return 0;
  }
}
