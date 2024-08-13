import { Processo } from "../../processos/shared/processo.model";

export class Nomeacao {

  id?: string;
  processo?: Processo;
  dataNomeacao?: string;
  prazo?: string;
  dataAceite?: string;
  aceite?: string;
  honorarioHomologado?: number;
  honorarioEnviado?: number
}
