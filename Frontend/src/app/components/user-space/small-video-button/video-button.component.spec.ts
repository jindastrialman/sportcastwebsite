import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallVideoButtonComponent } from './video-button.component';

describe('VideoButtonComponent', () => {
  let component: SmallVideoButtonComponent;
  let fixture: ComponentFixture<SmallVideoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallVideoButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallVideoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
