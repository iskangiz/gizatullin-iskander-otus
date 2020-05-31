import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoComponent } from './go.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('GoComponent', () => {
  let component: GoComponent;
  let fixture: ComponentFixture<GoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ GoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
