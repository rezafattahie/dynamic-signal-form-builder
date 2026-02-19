import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderFields } from './builder-fields';

describe('BuilderFields', () => {
  let component: BuilderFields;
  let fixture: ComponentFixture<BuilderFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
