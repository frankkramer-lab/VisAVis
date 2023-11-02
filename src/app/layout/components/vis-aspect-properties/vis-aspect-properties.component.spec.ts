import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisAspectPropertiesComponent } from './vis-aspect-properties.component';

describe('MrsnvFormPropertiesComponent', () => {
  let component: VisAspectPropertiesComponent;
  let fixture: ComponentFixture<VisAspectPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisAspectPropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisAspectPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
