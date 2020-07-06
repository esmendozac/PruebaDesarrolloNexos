import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctoresComponent } from './edit-doctores.component';

describe('EditDoctoresComponent', () => {
  let component: EditDoctoresComponent;
  let fixture: ComponentFixture<EditDoctoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDoctoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
