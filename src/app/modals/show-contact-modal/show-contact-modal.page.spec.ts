import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContactModalPage } from './show-contact-modal.page';

describe('ShowContactModalPage', () => {
  let component: ShowContactModalPage;
  let fixture: ComponentFixture<ShowContactModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowContactModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowContactModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
