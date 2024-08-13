export enum Status {
    CONCLUIDO = 'CONCLUIDO',
    AGUARDANDO = 'AGUARDANDO',
    NAO_INICIADO = 'NAO INICIADO',
    EM_ANDAMENTO = 'EM ANDAMENTO'
}

export namespace Status {
    export const options: any = [
        { label: 'concluído', value: 'CONCLUIDO', severity: 'success' },
        { label: 'aguardando', value: 'AGUARDANDO', severity: 'warning' },
        { label: 'não iniciado', value: 'NAO_INICIADO', severity: 'danger' },
        { label: 'em andamento', value: 'EM_ANDAMENTO', severity: 'info' }
    ];

    export function getOptions() {
        return options;
    }
}
