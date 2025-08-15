export interface Succursale {
    Id: number;
    Name: string;
    OwnerColor: string;
}

export interface Comite {
    Id: number;
    Name: string;
    OwnerColor: string;
    SuccursalId: number;
}

export interface Poste {
    Id: number;
    Name: string;
}

export interface Benevole {
    Id: number;
    Name: string;
    ComiteId: number;
}

export interface ReferenceDataState {
    succursales: Succursale[];
    comites: Comite[];
    postes: Poste[];
    benevoles: Benevole[];
}
