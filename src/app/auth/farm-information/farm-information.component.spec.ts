import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmInformationComponent } from './farm-information.component';

describe('FarmInformationComponent', () => {
  let component: FarmInformationComponent;
  let fixture: ComponentFixture<FarmInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
