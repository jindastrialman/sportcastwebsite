import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallVideoTabLayoutComponent } from './video-tab-layout.component';

describe('VideoTabLayoutComponent', () => {
  let component: SmallVideoTabLayoutComponent;
  let fixture: ComponentFixture<SmallVideoTabLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallVideoTabLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallVideoTabLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
