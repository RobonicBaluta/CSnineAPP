import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RememberPage } from './remember.page';

describe('RememberPage', () => {
  let component: RememberPage;
  let fixture: ComponentFixture<RememberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RememberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RememberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
