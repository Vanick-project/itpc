import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItpcContainerComponent } from './itpc-container.component';

describe('ItpcContainerComponent', () => {
  let component: ItpcContainerComponent;
  let fixture: ComponentFixture<ItpcContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItpcContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItpcContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
