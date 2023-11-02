import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisAspectPropertyMappingComponent } from './vis-aspect-property-mapping.component';

describe('MrsnvPropertyMappingComponent', () => {
  let component: VisAspectPropertyMappingComponent;
  let fixture: ComponentFixture<VisAspectPropertyMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisAspectPropertyMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisAspectPropertyMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
