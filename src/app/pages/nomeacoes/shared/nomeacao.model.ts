import { Processo } from "../../processos/shared/processo.model";

export class Nomeacao {

  id?: string;
  processo?: Processo;
  dataNomeacao?: Date;
  prazo?: Date;
  dataAceite?: Date;
  aceite?: string;
}
