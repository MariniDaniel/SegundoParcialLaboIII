namespace Autito{

    export class Auto extends Vehiculo{

        public cantidadPuertas:number;

        //Constructor
        constructor(marca:string,modelo:string,precio:number,cantidadPuertas:number,id:number) {
            super(marca,modelo,precio,id);
            this.cantidadPuertas = cantidadPuertas;
            
        }


    }


}