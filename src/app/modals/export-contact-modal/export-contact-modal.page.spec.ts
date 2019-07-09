import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportContactModalPage } from './export-contact-modal.page';

describe('ExportContactModalPage', () => {
  let component: ExportContactModalPage;
  let fixture: ComponentFixture<ExportContactModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportContactModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportContactModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
