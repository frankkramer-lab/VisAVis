import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NdexSubmissionSuccessComponent } from './ndex-submission-success.component';

describe('NdexSubmissionSuccessComponent', () => {
  let component: NdexSubmissionSuccessComponent;
  let fixture: ComponentFixture<NdexSubmissionSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NdexSubmissionSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NdexSubmissionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
