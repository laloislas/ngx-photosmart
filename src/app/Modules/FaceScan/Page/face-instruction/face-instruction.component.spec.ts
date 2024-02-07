import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceInstructionComponent } from './face-instruction.component';

describe('FaceInstructionComponent', () => {
  let component: FaceInstructionComponent;
  let fixture: ComponentFixture<FaceInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaceInstructionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaceInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
