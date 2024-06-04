import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FighterCardComponent } from './fighter-card.component';

describe('FighterCardComponent', () => {
  let component: FighterCardComponent;
  let fixture: ComponentFixture<FighterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FighterCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FighterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
