import { Status } from "../../../model/status";
import { ExameDaMateria } from "../../exame-da-materia/shared/exame.model";
import { Processo } from "../../processos/shared/processo.model";
import { Quesito } from "../../quesito/shared/quesito.model";

export class LaudoPericial {

  public id?: string;
  public objetivo?: string;
  public historico?: string;
  public conclusao?: string;
  public introducao?: string;
  public dataDoLaudo?: Date;
  public metodologiaAplicada?: string;
  public exameDaMateria?: ExameDaMateria;
  public quesitos?: Quesito[];
  public ativo?: boolean;
  public processo?: Processo;
  public status?: Status;
  public numero?: string;

  constructor(

  ) { }
}
