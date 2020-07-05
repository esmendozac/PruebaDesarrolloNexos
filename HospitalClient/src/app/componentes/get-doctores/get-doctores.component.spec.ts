import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDoctoresComponent } from './get-doctores.component';

describe('GetDoctoresComponent', () => {
  let component: GetDoctoresComponent;
  let fixture: ComponentFixture<GetDoctoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetDoctoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
