import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisAspectInfoComponent } from './vis-aspect-info.component';

describe('MrsnvFormInfoComponent', () => {
  let component: VisAspectInfoComponent;
  let fixture: ComponentFixture<VisAspectInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisAspectInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisAspectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
