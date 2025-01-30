import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedProductComponent } from './added-product.component';

describe('AddedProductComponent', () => {
  let component: AddedProductComponent;
  let fixture: ComponentFixture<AddedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddedProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
