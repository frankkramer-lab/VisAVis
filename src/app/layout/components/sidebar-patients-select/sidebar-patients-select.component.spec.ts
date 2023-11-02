import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPatientsSelectComponent } from './sidebar-patients-select.component';

describe('SidebarPatientsSelectComponent', () => {
  let component: SidebarPatientsSelectComponent;
  let fixture: ComponentFixture<SidebarPatientsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPatientsSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPatientsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
