import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentarySectionComponent } from './commentary-section.component';

describe('CommentarySectionComponent', () => {
  let component: CommentarySectionComponent;
  let fixture: ComponentFixture<CommentarySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentarySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentarySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
