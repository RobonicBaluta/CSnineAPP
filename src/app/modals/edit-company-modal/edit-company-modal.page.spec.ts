import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyModalPage } from './edit-company-modal.page';

describe('EditCompanyModalPage', () => {
  let component: EditCompanyModalPage;
  let fixture: ComponentFixture<EditCompanyModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompanyModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
