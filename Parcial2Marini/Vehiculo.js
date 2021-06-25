"use strict";
var Autito;
(function (Autito) {
    var Vehiculo = /** @class */ (function () {
        //constructor
        function Vehiculo(marca, modelo, precio, id) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        return Vehiculo;
    }());
    Autito.Vehiculo = Vehiculo;
})(Autito || (Autito = {}));
