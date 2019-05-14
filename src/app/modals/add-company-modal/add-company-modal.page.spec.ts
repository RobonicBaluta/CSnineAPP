import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyModalPage } from './add-company-modal.page';

describe('AddCompanyModalPage', () => {
  let component: AddCompanyModalPage;
  let fixture: ComponentFixture<AddCompanyModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompanyModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
