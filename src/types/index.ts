export enum Type_zone {
    Pays,
    Region,
    Departement,
    Commune,
}

export type Projet = {
    id: string | number,
    numero?: number,
    name: string,
    description: string,
    localite?: string | Localite,
    objectifsDeDeveloppement: Odd[],
    indicateurs: Indicateur[],
    allIndicateurs: Indicateur[],
}

export type Odd = {
    id_odd: string | number,
    name: string,
    indicateurs: Indicateur[],
}

export type Indicateur = {
    id_indicateur: string | number,
    name: string,
    odd?: Odd,
    projet?: Projet,
    donneeAdoption: DonneeEvaluation,
    donneTotal: DonneeEvaluation,
}

export type DonneeEvaluation = {
    name: string,
    valeur: number,
}

export type Localite = {
    id: string | number,
    name: string,
    projets: Projet[],
}
