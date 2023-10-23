import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContentNdexComponent } from './home-content-ndex.component';

describe('HomeContentNdexComponent', () => {
  let component: HomeContentNdexComponent;
  let fixture: ComponentFixture<HomeContentNdexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeContentNdexComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentNdexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
