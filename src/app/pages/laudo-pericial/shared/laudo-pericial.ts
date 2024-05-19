import { ExameDaMateria } from "../../exame-da-materia/shared/exame.model";
import { Processo } from "../../processos/shared/processo.model";
import { Quesito } from "../../quesito/shared/quesito.model";

export class LaudoPericial {

    public id?: string;
    public processo?: Processo;
    public objetivo?: string;
    public metodologiaAplicada?: string;
    public historico?: string;
    public conclusao?: string;
    public introducao?: string;
    public dataDoLaudo?: Date;
    public exameDaMateria?: ExameDaMateria;
    // public quesitos?: Quesito;
    //public status?: string;

  constructor(

  ) { }
}
