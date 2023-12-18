import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsListComponent } from './levels-list.component';

describe('LevelsListComponent', () => {
  let component: LevelsListComponent;
  let fixture: ComponentFixture<LevelsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevelsListComponent]
    });
    fixture = TestBed.createComponent(LevelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
