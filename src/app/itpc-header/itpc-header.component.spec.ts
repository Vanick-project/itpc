import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItpcHeaderComponent } from './itpc-header.component';

describe('ItpcHeaderComponent', () => {
  let component: ItpcHeaderComponent;
  let fixture: ComponentFixture<ItpcHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItpcHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItpcHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
