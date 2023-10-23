import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContentBrowseDescriptionComponent } from './home-content-browse-description.component';

describe('HomeContentFormDescriptionComponent', () => {
  let component: HomeContentBrowseDescriptionComponent;
  let fixture: ComponentFixture<HomeContentBrowseDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeContentBrowseDescriptionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentBrowseDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
