import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContentBrowseComponent } from './home-content-browse.component';

describe('HomeContentFormComponent', () => {
  let component: HomeContentBrowseComponent;
  let fixture: ComponentFixture<HomeContentBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeContentBrowseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
