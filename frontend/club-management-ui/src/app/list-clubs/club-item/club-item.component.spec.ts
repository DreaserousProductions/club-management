import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubItemComponent } from './club-item.component';

describe('ClubItemComponent', () => {
  let component: ClubItemComponent;
  let fixture: ComponentFixture<ClubItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
