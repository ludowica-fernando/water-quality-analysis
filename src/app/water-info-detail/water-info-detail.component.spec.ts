import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterInfoDetailComponent } from './water-info-detail.component';

describe('WaterInfoDetailComponent', () => {
  let component: WaterInfoDetailComponent;
  let fixture: ComponentFixture<WaterInfoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterInfoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
