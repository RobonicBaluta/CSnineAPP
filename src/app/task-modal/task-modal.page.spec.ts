import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalPage } from './task-modal.page';

describe('TaskModalPage', () => {
  let component: TaskModalPage;
  let fixture: ComponentFixture<TaskModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
