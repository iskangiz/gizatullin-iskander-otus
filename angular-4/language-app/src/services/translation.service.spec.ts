import { TestBed } from '@angular/core/testing';

import { TranslationService } from './translation.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
