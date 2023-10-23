import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsnvFormInfoComponent } from './mrsnv-form-info.component';

describe('MrsnvFormInfoComponent', () => {
  let component: MrsnvFormInfoComponent;
  let fixture: ComponentFixture<MrsnvFormInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsnvFormInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsnvFormInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
