import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTabLayoutComponent } from './video-tab-layout.component';

describe('VideoTabLayoutComponent', () => {
  let component: VideoTabLayoutComponent;
  let fixture: ComponentFixture<VideoTabLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoTabLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoTabLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
