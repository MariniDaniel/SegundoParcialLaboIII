namespace Autito {


    window.addEventListener("load", function () {

        document.getElementById("vehiculos")?.addEventListener("change", verTipos);

        document.getElementById("filtroVehiculos")?.addEventListener("change", filtrarVehiculos);

   

    });

    export function filtrarVehiculos(){

        //Utilizo Filter dependiendo del tipo que se selecciona auto o camioneta
        var tipoAuto = (<HTMLInputElement>document.getElementById("filtroVehiculos")).value;

        if (tipoAuto=="Auto") {
            
            var filtrados = vehiculos.filter(item=> item instanceof Auto);
            agregarVehiculo(filtrados);
        } else {
            
            var filtrados = vehiculos.filter(item=> item instanceof Camioneta);
            agregarVehiculo(filtrados);
        }



    }
    var vehiculos: Array<Vehiculo> = new Array<Vehiculo>();

    export function verTipos() {

        var tipoVehiculo: string = (<HTMLInputElement>document.getElementById("vehiculos")).value;

        if (tipoVehiculo == "Camioneta") {

            (<HTMLInputElement>document.getElementById("contTipoCamioneta")).hidden = false;
            (<HTMLInputElement>document.getElementById("contTipoAuto")).hidden = true;
        }
        else {

            (<HTMLInputElement>document.getElementById("contTipoAuto")).hidden = false;
            (<HTMLInputElement>document.getElementById("contTipoCamioneta")).hidden = true;
        }



    }


    export function abrirGrilla() {


        (<HTMLInputElement>document.getElementById("contGrilla")).style.display = "block";

        var contAgregar: any = <HTMLInputElement>document.getElementById("contGrilla");
        contAgregar.classList.add("verForm");


    }

    export function cerrarGrilla() {

        (<HTMLInputElement>document.getElementById("contGrilla")).style.display = "none";
        var contGrilla = (<HTMLInputElement>document.getElementById("contGrilla"));

        (<HTMLInputElement>document.getElementById("contTipoCamioneta")).hidden = true;
        (<HTMLInputElement>document.getElementById("contTipoAuto")).hidden = true;

        (<HTMLInputElement>document.getElementById("Idehiculo")).value = "";
        (<HTMLInputElement>document.getElementById("marcaVehiculo")).value = "";
        (<HTMLInputElement>document.getElementById("modeloVehiculo")).value = "";
        (<HTMLInputElement>document.getElementById("precioVehiculo")).value = "";
        (<HTMLInputElement>document.getElementById("cantidadPuertas")).value = "";
        
        contGrilla.classList.remove("verForm");
        
    }
    
    
    export function agregar() {
        
        var id;
        if(vehiculos.length == 0)
        {
            id = 1;
        }
        else
        {   
            //Reduce para buscar el id mas alto y sumarle 1
            var auxVehiculos = vehiculos;
            id = auxVehiculos.reduce(function (max, item)
            {
                if(item.id >= max) {
                    return item.id + 1;
                }
                return max;
            }, 0);
            if(id == 0)
            {
                id + 1;
            }
        }
        
        var marca = (<HTMLInputElement>document.getElementById("marcaVehiculo")).value;
        var modelo = (<HTMLInputElement>document.getElementById("modeloVehiculo")).value;
        var precio = (<HTMLInputElement>document.getElementById("precioVehiculo")).value;
        var tipoVehiculo = (<HTMLInputElement>document.getElementById("vehiculos")).value;
        var tipoCamioneta = (<HTMLInputElement>document.getElementById("tipoCamioneta")).value;
        var puertas = (<HTMLInputElement>document.getElementById("cantidadPuertas")).value;
        
        
        
        if (tipoVehiculo === "Auto") {
            
            
            var auto: Auto = new Auto(marca, modelo, parseInt(precio), parseInt(puertas),id);
            vehiculos.push(auto);
            
        }
        else if (tipoVehiculo === "Camioneta") {


            if (tipoCamioneta == "Es4X4") {

                var camioneta: Camioneta = new Camioneta(marca, modelo, parseInt(precio), true,id);
                vehiculos.push(camioneta);
            }
            else {
                var camioneta: Camioneta = new Camioneta(marca, modelo, parseInt(precio), false,id);
                vehiculos.push(camioneta);
            }
        }
        agregarVehiculo(vehiculos);

        cerrarGrilla();

    }



    function agregarVehiculo(vehiculos: Array<Vehiculo>) {

        var marca: string = "";
        var modelo: string = "";
        var precio: any;
        var id: any;
        var detalle: any;
        var tipoVehiculo: string = "";

        var tCuerpo: HTMLTableElement = <HTMLTableElement>document.getElementById("tCuerpo");

        while (tCuerpo.rows.length > 0) {
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }



        for (const item of vehiculos) {

            id = item.id;
            marca = item.marca;
            modelo = item.modelo;
            precio = item.precio;

            if (item instanceof Auto) {
                tipoVehiculo = "Auto"
                detalle = item.cantidadPuertas;

            }

            else if (item instanceof Camioneta) {
                tipoVehiculo = "Camioneta"

                if (item.cuatroXcuatro) {

                    detalle = "4X4";
                }
                else {
                    detalle = "No es 4x4";
                }

            }

            var btnDel = document.createElement('input');
            btnDel.type = 'button';
            btnDel.className = 'botonEliminar';
            btnDel.value = "Eliminar";            
            btnDel.onclick = function(){eliminarGrilla(vehiculos.indexOf(item))};

            var tr: HTMLTableRowElement = document.createElement("tr");

            var td1: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(id);
            td1.appendChild(nodoTexto);
            tr.appendChild(td1);

            var td2: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(marca);
            td2.appendChild(nodoTexto);
            tr.appendChild(td2);

            var td3: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(modelo);
            td3.appendChild(nodoTexto);
            tr.appendChild(td3);

            var td4: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(precio);
            td4.appendChild(nodoTexto);
            tr.appendChild(td4);

            var td5: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(tipoVehiculo);
            td5.appendChild(nodoTexto);
            tr.appendChild(td5);

            var td6: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(detalle);
            td6.appendChild(nodoTexto);
            tr.appendChild(td6);

            var td7: HTMLTableDataCellElement = document.createElement("td");
            td7.appendChild(btnDel);
            tr.appendChild(td7);

            tCuerpo.appendChild(tr);

        }

    }




    function eliminarGrilla(id: number) {

        vehiculos.splice(id , 1);
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



}