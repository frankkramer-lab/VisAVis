import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisAspectComponent } from './vis-aspect.component';

describe('MrsnvComponent', () => {
  let component: VisAspectComponent;
  let fixture: ComponentFixture<VisAspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisAspectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisAspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
