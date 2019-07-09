import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectServerPage } from './select-server.page';

describe('SelectServerPage', () => {
  let component: SelectServerPage;
  let fixture: ComponentFixture<SelectServerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectServerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectServerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
