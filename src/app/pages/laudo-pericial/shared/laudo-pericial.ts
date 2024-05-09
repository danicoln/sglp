import { ExameDaMateria } from "../../exame-da-materia/shared/exame.model";
import { ObjetoLaudo } from "../../objeto-laudo/shared/objeto-laudo.model";
import { Processo } from "../../processos/shared/processo.model";
import { Quesito } from "../../quesito/shared/quesito.model";

export class LaudoPericial {

    public id?: string;
    public processo?: Processo;
    public objetivo?: string;
    public objeto?: ObjetoLaudo;
    public metodologiaAplicada?: string;
    public exame?: ExameDaMateria;
    public historico?: string;
    public quesitos?: Quesito;
    public conclusao?: string;
    public introducao?: string;
    public dataDoLaudo?: Date;
    public status?: string;

  constructor(

  ) { }
}
