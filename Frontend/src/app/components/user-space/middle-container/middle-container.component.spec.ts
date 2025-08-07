import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleContainerComponent } from './middle-container.component';

describe('MiddleContainerComponent', () => {
  let component: MiddleContainerComponent;
  let fixture: ComponentFixture<MiddleContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiddleContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiddleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
