import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContentInfoComponent } from './home-content-info.component';

describe('HomeContentInfoComponent', () => {
  let component: HomeContentInfoComponent;
  let fixture: ComponentFixture<HomeContentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeContentInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeContentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
