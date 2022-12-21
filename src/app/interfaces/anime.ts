import { episodios } from './episodios';
export interface anime {
    $key?: string;
    nombre: string;
    caratula: string;
    img: string;
    descripcion: number;
    generos: number;
    tipo: string;
    estudio: boolean;
    episodios: Array<episodios>
}