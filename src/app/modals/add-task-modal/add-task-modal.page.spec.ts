import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskModalPage } from './add-task-modal.page';

describe('AddTaskModalPage', () => {
  let component: AddTaskModalPage;
  let fixture: ComponentFixture<AddTaskModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
