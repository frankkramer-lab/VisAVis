import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisAspectEditComponent } from './vis-aspect-edit.component';

describe('MrsnvFormComponent', () => {
  let component: VisAspectEditComponent;
  let fixture: ComponentFixture<VisAspectEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisAspectEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisAspectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
