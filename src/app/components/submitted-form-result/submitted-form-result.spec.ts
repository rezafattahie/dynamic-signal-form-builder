import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedFormResult } from './submitted-form-result';

describe('SubmittedFormResult', () => {
  let component: SubmittedFormResult;
  let fixture: ComponentFixture<SubmittedFormResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmittedFormResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmittedFormResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
