import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaysPageComponent } from './replays-page.component';

describe('ReplaysPageComponent', () => {
  let component: ReplaysPageComponent;
  let fixture: ComponentFixture<ReplaysPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplaysPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplaysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
