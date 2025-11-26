import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TareaService } from './tarea';
import { Tarea } from '../models/tarea';

describe('TareaService', () => {
  let service: TareaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TareaService]
    });

    service = TestBed.inject(TareaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tareas via GET', () => {
    const mockTareas: Tarea[] = [
      { _id: '1', titulo: 'A', descripcion: 'x', completada: false },
      { _id: '2', titulo: 'B', descripcion: 'y', completada: true }
    ];

    service.obtenerTareas().subscribe(tareas => {
      expect(tareas.length).toBe(2);
      expect(tareas).toEqual(mockTareas);
    });

    const request = httpMock.expectOne('http://localhost:3000/api/tareas');
    expect(request.request.method).toBe('GET');
    request.flush(mockTareas);
  });

});
