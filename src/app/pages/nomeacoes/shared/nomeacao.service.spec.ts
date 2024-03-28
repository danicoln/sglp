import { TestBed } from '@angular/core/testing';

import { NomeacaoService } from './nomeacao.service';

describe('NomeacaoService', () => {
  let service: NomeacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomeacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
