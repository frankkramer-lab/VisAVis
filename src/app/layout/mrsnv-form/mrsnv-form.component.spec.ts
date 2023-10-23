import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsnvFormComponent } from './mrsnv-form.component';

describe('MrsnvFormComponent', () => {
  let component: MrsnvFormComponent;
  let fixture: ComponentFixture<MrsnvFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsnvFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsnvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
