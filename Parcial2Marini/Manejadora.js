"use strict";
var Autito;
(function (Autito) {
    window.addEventListener("load", function () {
        var _a, _b;
        (_a = document.getElementById("vehiculos")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", verTipos);
        (_b = document.getElementById("filtroVehiculos")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", filtrarVehiculos);
    });
    function filtrarVehiculos() {
        //Utilizo Filter dependiendo del tipo que se selecciona auto o camioneta
        var tipoAuto = document.getElementById("filtroVehiculos").value;
        if (tipoAuto == "Auto") {
            var filtrados = vehiculos.filter(function (item) { return item instanceof Autito.Auto; });
            agregarVehiculo(filtrados);
        }
        else {
            var filtrados = vehiculos.filter(function (item) { return item instanceof Autito.Camioneta; });
            agregarVehiculo(filtrados);
        }
    }
    Autito.filtrarVehiculos = filtrarVehiculos;
    var vehiculos = new Array();
    function verTipos() {
        var tipoVehiculo = document.getElementById("vehiculos").value;
        if (tipoVehiculo == "Camioneta") {
            document.getElementById("contTipoCamioneta").hidden = false;
            document.getElementById("contTipoAuto").hidden = true;
        }
        else {
            document.getElementById("contTipoAuto").hidden = false;
            document.getElementById("contTipoCamioneta").hidden = true;
        }
    }
    Autito.verTipos = verTipos;
    function abrirGrilla() {
        document.getElementById("contGrilla").style.display = "block";
        var contAgregar = document.getElementById("contGrilla");
        contAgregar.classList.add("verForm");
    }
    Autito.abrirGrilla = abrirGrilla;
    function cerrarGrilla() {
        document.getElementById("contGrilla").style.display = "none";
        var contGrilla = document.getElementById("contGrilla");
        document.getElementById("contTipoCamioneta").hidden = true;
        document.getElementById("contTipoAuto").hidden = true;
        document.getElementById("Idehiculo").value = "";
        document.getElementById("marcaVehiculo").value = "";
        document.getElementById("modeloVehiculo").value = "";
        document.getElementById("precioVehiculo").value = "";
        document.getElementById("cantidadPuertas").value = "";
        contGrilla.classList.remove("verForm");
    }
    Autito.cerrarGrilla = cerrarGrilla;
    function agregar() {
        var id;
        if (vehiculos.length == 0) {
            id = 1;
        }
        else {
            //Reduce para buscar el id mas alto y sumarle 1
            var auxVehiculos = vehiculos;
            id = auxVehiculos.reduce(function (max, item) {
                if (item.id >= max) {
                    return item.id + 1;
                }
                return max;
            }, 0);
            if (id == 0) {
                id + 1;
            }
        }
        var marca = document.getElementById("marcaVehiculo").value;
        var modelo = document.getElementById("modeloVehiculo").value;
        var precio = document.getElementById("precioVehiculo").value;
        var tipoVehiculo = document.getElementById("vehiculos").value;
        var tipoCamioneta = document.getElementById("tipoCamioneta").value;
        var puertas = document.getElementById("cantidadPuertas").value;
        if (tipoVehiculo === "Auto") {
            var auto = new Autito.Auto(marca, modelo, parseInt(precio), parseInt(puertas), id);
            vehiculos.push(auto);
        }
        else if (tipoVehiculo === "Camioneta") {
            if (tipoCamioneta == "Es4X4") {
                var camioneta = new Autito.Camioneta(marca, modelo, parseInt(precio), true, id);
                vehiculos.push(camioneta);
            }
            else {
                var camioneta = new Autito.Camioneta(marca, modelo, parseInt(precio), false, id);
                vehiculos.push(camioneta);
            }
        }
        agregarVehiculo(vehiculos);
        cerrarGrilla();
    }
    Autito.agregar = agregar;
    function agregarVehiculo(vehiculos) {
        var marca = "";
        var modelo = "";
        var precio;
        var id;
        var detalle;
        var tipoVehiculo = "";
        var tCuerpo = document.getElementById("tCuerpo");
        while (tCuerpo.rows.length > 0) {
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }
        var _loop_1 = function (item) {
            id = item.id;
            marca = item.marca;
            modelo = item.modelo;
            precio = item.precio;
            if (item instanceof Autito.Auto) {
                tipoVehiculo = "Auto";
                detalle = item.cantidadPuertas;
            }
            else if (item instanceof Autito.Camioneta) {
                tipoVehiculo = "Camioneta";
                if (item.cuatroXcuatro) {
                    detalle = "4X4";
                }
                else {
                    detalle = "No es 4x4";
                }
            }
            btnDel = document.createElement('input');
            btnDel.type = 'button';
            btnDel.className = 'botonEliminar';
            btnDel.value = "Eliminar";
            btnDel.onclick = function () { eliminarGrilla(vehiculos.indexOf(item)); };
            tr = document.createElement("tr");
            td1 = document.createElement("td");
            nodoTexto = document.createTextNode(id);
            td1.appendChild(nodoTexto);
            tr.appendChild(td1);
            td2 = document.createElement("td");
            nodoTexto = document.createTextNode(marca);
            td2.appendChild(nodoTexto);
            tr.appendChild(td2);
            td3 = document.createElement("td");
            nodoTexto = document.createTextNode(modelo);
            td3.appendChild(nodoTexto);
            tr.appendChild(td3);
            td4 = document.createElement("td");
            nodoTexto = document.createTextNode(precio);
            td4.appendChild(nodoTexto);
            tr.appendChild(td4);
            td5 = document.createElement("td");
            nodoTexto = document.createTextNode(tipoVehiculo);
            td5.appendChild(nodoTexto);
            tr.appendChild(td5);
            td6 = document.createElement("td");
            nodoTexto = document.createTextNode(detalle);
            td6.appendChild(nodoTexto);
            tr.appendChild(td6);
            td7 = document.createElement("td");
            td7.appendChild(btnDel);
            tr.appendChild(td7);
            tCuerpo.appendChild(tr);
        };
        var btnDel, tr, td1, nodoTexto, td2, nodoTexto, td3, nodoTexto, td4, nodoTexto, td5, nodoTexto, td6, nodoTexto, td7;
        for (var _i = 0, vehiculos_1 = vehiculos; _i < vehiculos_1.length; _i++) {
            var item = vehiculos_1[_i];
            _loop_1(item);
        }
    }
    function eliminarGrilla(id) {
        vehiculos.splice(id, 1);
        agregarVehiculo(vehiculos);
    }
    /* No llegue a realizar el reduce
    let calcAGE = (<HTMLInputElement>document.getElementById("calcAGE"));
    calcAGE.addEventListener('click', calcPromedio);
    var listaVehiculo: Array<Vehiculo> = new Array<Vehiculo>();
    var filterTipo: HTMLInputElement;
    //reduce
    export function calcPromedio() {
        avgage.value = (listaVehiculo.filter(item => {
            return filterTipo.value === Vehiculo.Auto ?
                (<Vehiculo>item). === Vehiculo.Auto :
                (<Vehiculo>item).sexo === Vehiculo.Camioneta;
        }).reduce((total: number, item: Persona) => {
            return total = total + (<Vehiculo>item).edad;
        }, 0) / listaVehiculo.filter(item => {
            return filterTipo.value === Vehiculo.Auto ?
                (<Vehiculo>item).sexo === Vehiculo.Auto :
                (<Vehiculo>item).sexo === Vehiculo.Camioneta;
        }).length).toFixed(2).toString()
    }

    */
    /* CODIGO SI SE NECESITA USAR AJAX-
       
     
   
      //json representa objeto en java script,con atributo key, con valor value, y atributo numero con valor 1
      var obj= {"key":"value","numero":1}//objetos en java script, son objetos clave valor, separados por :
      alert(obj.key);
      alert(obj.numero);
      console.log(obj.numero);//llaves es jason
   
      var letras = ["a","b","c"];//corchetes array, puedo tener array de jason tambien.
      for(var i=0 ; i<letras.length;i++){
          console.log(letras[i]);
      }
      
   
      
      var peticionHttp = new XMLHttpRequest(); //Generamos objeto xmlhttprequest Nos permite hacer peticiones a los servidores
      
      peticionHttp.onreadystatechange= function(){
          if (peticionHttp.readyState ==4 && peticionHttp.status==200){
      
              //console.log(peticionHttp.responseText);//Respuesta de servidor en string(responseText)
             alert(peticionHttp.responseText);
          }
   
      }
      peticionHttp.open("POST","http://localhost:3000/nuevaPersona",true);
      peticionHttp.setRequestHeader("Content-type","application/json");
     
      var personaJson={nombre:"Daniel",apellido:"Marini",telefono:"4129323",fecha:"1988/05/11"};//arme objeto json
      var stringPersona = JSON.stringify(personaJson);//transformo de json a string
      
      peticionHttp.send(stringPersona);//recibejson en formato string
      
   
      ejecutarGet();
   
      function ejecutarGet()
      {
   
          peticionHttp.onreadystatechange= function(){
          console.log("Llego la respuesta",peticionHttp.readyState,peticionHttp.status);//Lo mostro 4 veces, la 4 es cuando esta lista la respuesta para ser evaluada. Con status nos muestra como esta el servidor 0->establecimos, (200 va bien siempre esperamos este, 400 cuando tenemos estas dos , esta para ser consultada), 500 error
          
          if (peticionHttp.readyState ==4 && peticionHttp.status==200){
              //console.log(peticionHttp.responseText);//Respuesta de servidor en string(responseText)
              var listaPersonas= JSON.parse(peticionHttp.responseText);
              for (var i = 0; i < listaPersonas.length; i++)
              {
                  console.log(listaPersonas[i].nombre, listaPersonas[i].apellido,listaPersonas[i].telefono);//para ver id, necesito pasarlo a formato json
              
              }
              
          }
      
      
      } //Este parametro, es donde vamos a guardar . es como un evento, cuando haya un cambio . cuando se ejecute esa funcion vamos a tener una respuesta.-
      // este anda de diez   peticionHttp.open("GET","https://607eee2c02a23c0017e8c685.mockapi.io/users",true);//Abre conexion a un servidor o Api , nos pide metodo Y Ruta URL URi, 3er parametro anecdotico(async). (true va por default igual, false lo frenaria, no sirve)La ejecucion continua no frena programa, no se queda esperando respuesta es asincronico
      peticionHttp.open("GET","http://localhost:3000/personas",true);//con esto levanto la api que me paso mati, apijson2021
      //peticionHttp.setRequestHeader("key","value");//Pasamos en la cabecera Key y value , indicamos que esta peticion va a tener json
      peticionHttp.send();//hacemos send para que envie informacion, si recibe algo recibe en este body
      
      }
      
       </script>
    */
})(Autito || (Autito = {}));
