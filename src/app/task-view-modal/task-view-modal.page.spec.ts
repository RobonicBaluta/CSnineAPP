import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewModalPage } from './task-view-modal.page';

describe('TaskViewModalPage', () => {
  let component: TaskViewModalPage;
  let fixture: ComponentFixture<TaskViewModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
