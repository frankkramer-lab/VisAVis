import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsnvComponent } from './mrsnv.component';

describe('MrsnvComponent', () => {
  let component: MrsnvComponent;
  let fixture: ComponentFixture<MrsnvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsnvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
