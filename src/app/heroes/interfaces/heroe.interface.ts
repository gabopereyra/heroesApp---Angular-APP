export interface Heroe {
    id?:              string;
    superhero:        string;
    publisher:        Publisher | undefined;
    alter_ego:        string;
    first_appearance: string;
    characters:       string;
    alt_imagen:       string;
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}
