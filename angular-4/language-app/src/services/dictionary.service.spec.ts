import { TestBed } from '@angular/core/testing';

import { DictionaryService } from './dictionary.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DictionaryService', () => {
  let service: DictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getWordsFromDictionary method should return filtered by language result', () => {
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getWords']);
    storageServiceSpy.getWords.and.returnValues([
      {word: "1", translations: [{language: "en", text: ""}]},
      {word: "2", translations: [{language: "en", text: ""}]},
      {word: "3", translations: [{language: "fr", text: ""}]},
      {word: "4", translations: [{language: "fr", text: ""}]},
      {word: "5", translations: [{language: "fr", text: ""}]}]);
    const dictionaryService = new DictionaryService(null, storageServiceSpy);
    const lang = 'en';

    const result = dictionaryService.getWordsFromDictionary(lang);

    expect(result.filter(x => x.translation.language !== lang)).toEqual([]);
  });
});
