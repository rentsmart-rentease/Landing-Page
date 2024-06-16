import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarCasaComponent } from './publicar-casa.component';

describe('PublicarCasaComponent', () => {
  let component: PublicarCasaComponent;
  let fixture: ComponentFixture<PublicarCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicarCasaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicarCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
// src/app/publicar-casa/publicar-casa.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CasaService } from '../services/casa.service';

@Component({
  selector: 'app-publicar-casa',
  templateUrl: './publicar-casa.component.html',
  styleUrls: ['./publicar-casa.component.css']
})
export class PublicarCasaComponent implements OnInit {
  casaForm: FormGroup;

  constructor(private fb: FormBuilder, private casaService: CasaService) { }

  ngOnInit(): void {
    this.casaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      ubicacion: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.casaForm.valid) {
      this.casaService.publicarCasa(this.casaForm.value).subscribe(
        success => {
          if (success) {
            // Redirigir o mostrar mensaje de éxito
          } else {
            // Manejar error
          }
        }
      );
    }
  }
}
