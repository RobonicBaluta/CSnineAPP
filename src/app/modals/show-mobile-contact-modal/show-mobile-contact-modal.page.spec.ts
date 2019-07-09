import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMobileContactModalPage } from './show-mobile-contact-modal.page';

describe('ShowMobileContactModalPage', () => {
  let component: ShowMobileContactModalPage;
  let fixture: ComponentFixture<ShowMobileContactModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMobileContactModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMobileContactModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
