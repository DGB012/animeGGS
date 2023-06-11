import { episodios } from './episodios';
export interface anime {
    $key?: string;
    nombre: string;
    caratula: string;
    img: string;
    descripcion: number;
    generos: number;
    tipo: string;
    estudio: string;
    episodios: Array<episodios>
}