import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaysContainerComponent } from './replays-container.component';

describe('ReplaysContainerComponent', () => {
  let component: ReplaysContainerComponent;
  let fixture: ComponentFixture<ReplaysContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplaysContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplaysContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
