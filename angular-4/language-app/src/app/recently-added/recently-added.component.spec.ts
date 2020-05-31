import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyAddedComponent } from './recently-added.component';
import {TranslationService} from "../../services/translation.service";
import {DictionaryService} from "../../services/dictionary.service";
import {StorageService} from "../../services/storage.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RecentlyAddedComponent', () => {
  let component: RecentlyAddedComponent;
  let fixture: ComponentFixture<RecentlyAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ RecentlyAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
