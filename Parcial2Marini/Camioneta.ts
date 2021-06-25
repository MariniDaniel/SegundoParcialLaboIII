namespace Autito{

    export class Camioneta extends Vehiculo{

        public cuatroXcuatro:any;
        //constructor
        constructor(marca:string,modelo:string,precio:number,cuatroXcuatro:any,id:number) {
            super(marca,modelo,precio,id);
            this.cuatroXcuatro = cuatroXcuatro;
            
        }

    }
    
}