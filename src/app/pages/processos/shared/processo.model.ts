import { Advogado } from "../../advogado/shared/advogado.model";

export class Processo {

  id?: string;
  numero?: string;
  comarca?: string;
  vara?: string;
  assunto?: string;
  nomeAutor?: string;
  nomeReu?: string;
  parteAutora?: string;
  parteReu?: string;
  laudoId?: string;
  advogadoReu?: Advogado;
  advogadoAutor?: Advogado;

}
