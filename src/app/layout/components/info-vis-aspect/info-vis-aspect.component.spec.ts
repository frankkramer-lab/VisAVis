import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVisAspectComponent } from './info-vis-aspect.component';

describe('VisAspectInfoComponent', () => {
  let component: InfoVisAspectComponent;
  let fixture: ComponentFixture<InfoVisAspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoVisAspectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoVisAspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
