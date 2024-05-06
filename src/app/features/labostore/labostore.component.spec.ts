import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabostoreComponent } from './labostore.component';

describe('LabostoreComponent', () => {
  let component: LabostoreComponent;
  let fixture: ComponentFixture<LabostoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabostoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabostoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
