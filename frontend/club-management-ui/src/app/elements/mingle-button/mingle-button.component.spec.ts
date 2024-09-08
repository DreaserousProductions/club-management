import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MingleButtonComponent } from './mingle-button.component';

describe('MingleButtonComponent', () => {
  let component: MingleButtonComponent;
  let fixture: ComponentFixture<MingleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MingleButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MingleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
