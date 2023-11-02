import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisAspectPropertyListComponent } from './vis-aspect-property-list.component';

describe('MrsnvPropertyListComponent', () => {
  let component: VisAspectPropertyListComponent;
  let fixture: ComponentFixture<VisAspectPropertyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisAspectPropertyListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisAspectPropertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
