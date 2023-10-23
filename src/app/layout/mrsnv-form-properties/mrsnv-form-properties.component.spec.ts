import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsnvFormPropertiesComponent } from './mrsnv-form-properties.component';

describe('MrsnvFormPropertiesComponent', () => {
  let component: MrsnvFormPropertiesComponent;
  let fixture: ComponentFixture<MrsnvFormPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsnvFormPropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsnvFormPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
