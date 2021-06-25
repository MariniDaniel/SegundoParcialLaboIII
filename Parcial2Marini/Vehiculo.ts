namespace Autito {

    export class Vehiculo {
        //atributos Esto se podia hacer con interface? ni idea
        public id: number;
        public marca: string;
        public modelo: string;
        public precio: number;

        //constructor
        constructor(marca: string, modelo: string, precio: number, id: number) {

            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;

        }


    }

}