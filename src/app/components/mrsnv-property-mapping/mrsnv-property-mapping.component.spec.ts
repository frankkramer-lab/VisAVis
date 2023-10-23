import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsnvPropertyMappingComponent } from './mrsnv-property-mapping.component';

describe('MrsnvPropertyMappingComponent', () => {
  let component: MrsnvPropertyMappingComponent;
  let fixture: ComponentFixture<MrsnvPropertyMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsnvPropertyMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsnvPropertyMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
