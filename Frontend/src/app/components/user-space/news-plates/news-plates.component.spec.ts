import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPlatesComponent } from './news-plates.component';

describe('NewsPlatesComponent', () => {
  let component: NewsPlatesComponent;
  let fixture: ComponentFixture<NewsPlatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsPlatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsPlatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
