import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisAspectPropertyComponent } from './vis-aspect-property.component';

describe('MrsnvPropertyComponent', () => {
  let component: VisAspectPropertyComponent;
  let fixture: ComponentFixture<VisAspectPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisAspectPropertyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisAspectPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
