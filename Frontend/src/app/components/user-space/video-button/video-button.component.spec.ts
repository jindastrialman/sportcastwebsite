import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoButtonComponent } from './video-button.component';

describe('VideoButtonComponent', () => {
  let component: VideoButtonComponent;
  let fixture: ComponentFixture<VideoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
