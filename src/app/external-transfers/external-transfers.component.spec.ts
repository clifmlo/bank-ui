import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalTransfersComponent } from './external-transfers.component';

describe('ExternalTransfersComponent', () => {
  let component: ExternalTransfersComponent;
  let fixture: ComponentFixture<ExternalTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalTransfersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
