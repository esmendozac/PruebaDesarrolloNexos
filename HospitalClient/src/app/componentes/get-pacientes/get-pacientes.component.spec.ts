import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPacientesComponent } from './get-pacientes.component';

describe('GetPacientesComponent', () => {
  let component: GetPacientesComponent;
  let fixture: ComponentFixture<GetPacientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetPacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
