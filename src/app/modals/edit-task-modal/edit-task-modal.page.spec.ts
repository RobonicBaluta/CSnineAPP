import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskModalPage } from './edit-task-modal.page';

describe('EditTaskModalPage', () => {
  let component: EditTaskModalPage;
  let fixture: ComponentFixture<EditTaskModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaskModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
