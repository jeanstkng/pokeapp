import { elements } from "./elements.type";

export interface Pokemon {
    id: number;
    name: string;
    image: string;
    type: elements;
    hp: number;
    attack: number;
    defense: number;
    idAuthor: number;
    created_at: string;
    updated_at: string;
}