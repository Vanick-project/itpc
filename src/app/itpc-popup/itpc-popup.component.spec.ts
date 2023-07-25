import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItpcPopupComponent } from './itpc-popup.component';

describe('ItpcPopupComponent', () => {
  let component: ItpcPopupComponent;
  let fixture: ComponentFixture<ItpcPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItpcPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItpcPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
