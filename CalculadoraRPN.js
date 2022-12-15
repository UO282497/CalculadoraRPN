"use strict";
class PilaLIFO { 
    constructor (nombre){ 
        this.nombre = nombre;
        this.pila = new Array();
    }
    apilar(valor){
        this.pila.push(valor);
    }
    desapilar(){
        return (this.pila.pop());
    }
    mostrar(){
        var stringPila = "<h2>" +this.nombre +"</h2>" + "<ul>";
        for (var i in this.pila) stringPila += "<li>Pila[" + i + "] = " + this.pila[i] + "</li>";
        stringPila += "</ul>"
        return stringPila;
    }
}




"use strict";
class CalculadoraRPN{
    constructor(){
        this.deg ="D";
        this.rep="F";
        this.m = "";
        this.current = ""
        this.mode = "N";
        this.pila = new PilaLIFO("Pila:");
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            //alert('keydown event\n\n' + 'key: ' + keyName);
            this.pulsacionTecla(event.key)
          });
    }
    pulsacionTecla(key){
        if (Number.isNaN(parseInt(key))){
            //SIGNO

            switch(key){

                case "+":
                    this.suma();
                    break;
                case "-":
                    this.resta();
                    break;
                case "x":
                    this.multiplicacion();
                    break;
                case "/":
                    this.division();
                    break;
                case ".":
                    this.punto();
                    break;
                case "Enter":
                    this.enter();
                    break;
                case "m":
                    this.mReturn()
                    break;
                case "n":
                    this.mMas();
                    break;
                case "ñ":
                    this.mMenos();
                    break;
                case "v":
                    this.raiz();
                    break;
                case "c":
                    this.borrar();
                    break;
                case "o":
                    this.encender();
                    break;
                case "s":
                    this.cambiarsigno();
                    break;
                case "p":
                    this.pi();
                    break;
                case "Backspace":
                    this.borrarDigito();
                    break;
                
                    
            }

        }
        else{
            this.digitos(key);
        }

    }

    digitos(n){
        this.current+="" +  n;
        this.actualizar();
        
        
    }
    punto(){
        this.current+=".";
        this.actualizar();
        
        
    }
    suma(){
        var a = this.pila.desapilar();
        var b = this.pila.desapilar();
        var c = Number(a) + Number(b);
        this.pila.apilar(c);
        this.current="";
        this.actualizar();
        document.getElementsByTagName("textarea")[0].value = this.mostrar();


    }
    enter(){
        this.pila.apilar(this.current);
        
        if (this.rep=="F"){
            document.getElementsByTagName("textarea")[0].value = this.mostrar();
        }
        else{
            document.getElementsByTagName("textarea")[0].value = Number(this.mostrar()).toExponential();
        }

        this.current="";
        this.actualizar();
    }
    actualizar(){

        if (this.rep=="E"){
            document.getElementsByTagName("input")[0].value = Number(this.current).toExponential();
        }else{
            document.getElementsByTagName("input")[0].value = Number(this.current);
        }

    }
    mostrar(){
        var stringPila = "";
        for (var i in this.pila.pila) {
                stringPila+="\n" + this.pila.pila[i];
        }
        return stringPila;


    }
    resta(){
        var a = this.pila.desapilar();
        var b = this.pila.desapilar();
        var c = Number(b) - Number(a);
        this.pila.apilar(c);
        this.current="";
        this.actualizar();
        document.getElementsByTagName("textarea")[0].value = this.mostrar();


    }
    elevar(){
        var a = this.pila.desapilar();
        var b = this.pila.desapilar();
        var c = Number(b) ** Number(a);
        this.pila.apilar(c);
        this.current="";
        this.actualizar();
        document.getElementsByTagName("textarea")[0].value = this.mostrar();


    }
    multiplicacion(){
        var a = this.pila.desapilar();
        var b = this.pila.desapilar();
        var c = Number(b) * Number(a);
        this.pila.apilar(c);
        this.current="";
        this.actualizar();
        document.getElementsByTagName("textarea")[0].value = this.mostrar();


    }
    division(){
        var a = this.pila.desapilar();
        var b = this.pila.desapilar();
        var c = Number(b) / Number(a);
        this.pila.apilar(c);
        this.current="";
        this.actualizar();
        document.getElementsByTagName("textarea")[0].value = this.mostrar();


    }
    cambiarsigno(){
        this.current = Number(this.current) * -1;
        this.actualizar();
    }
    borrarDigito(){
        this.current = this.current.slice(0,-1); 
        this.actualizar();        
    }
    sin(){
        if(this.deg == "D"){
            this.current = this.current  * Math.PI / 180;
        }
        if (this.mode == "N"){
            this.current = Math.sin(Number(this.current));
        }
        if (this.mode=="H"){
            this.current = Math.sinh(Number(this.current));
        }
        if (this.mode=="A"){
            this.current = Math.asin(Number(this.current));
        }
        this.actualizar();
    }
    cos(){
        if(this.deg == "D"){
            this.current = this.current  * Math.PI / 180;
        }
        if (this.mode == "N"){
            this.current = Math.cos(Number(this.current));
        }
        if (this.mode=="H"){
            this.current = Math.cosh(Number(this.current));
        }
        if (this.mode=="A"){
            this.current = Math.acos(Number(this.current));
        }
        this.actualizar();
    }

    tan(){
        if(this.deg == "D"){
            this.current = this.current  * Math.PI / 180;
        }
        if (this.mode == "N"){
            this.current = Math.tan(Number(this.current));
        }
        if (this.mode=="H"){
            this.current = Math.tanh(Number(this.current));
        }
        if (this.mode=="A"){
            this.current = Math.atan(Number(this.current));
        }
        this.actualizar();
    }
    exp(){

        this.current = Math.exp(Number(this.current));
        this.actualizar();
    }
    cuadrado(){

        this.current = Number(this.current) **2;
        this.actualizar();
    }
    raiz(){

        this.current = Number(this.current) **(1/2);
        this.actualizar();
    }
    mod(){
        var a = this.pila.desapilar();
        var b = this.pila.desapilar();
        var c = Number(b) % Number(a);
        this.pila.apilar(c);
        this.current="";
        this.actualizar();
        document.getElementsByTagName("textarea")[0].value = this.mostrar();


    }
    mClear(){
        this.m = "0";
    }
    mReturn(){
        this.current = this.m;
        this.actualizar();
    }
    mMenos(){
        this.m = this.m - Number(this.current);
    }
    mMas(){
        this.m = Number(this.m)+ Number(this.current);
    }
    mSave(){
        this.m = this.current;
    }
    borrar(){
        this.current ="";
        this.actualizar();
    }
    pi(){
        this.current = Math.PI;
        this.actualizar();
    }
    setA(){
        if (this.mode== "N" || this.mode=="H"){
            var buttons = document.getElementsByTagName('input'); 
            buttons[11].value = "Asin";
            buttons[12].value = "Acos";
            buttons[13].value = "Atan";
            this.mode = "A";
        }
        else if (this.mode =="A"){
            var buttons = document.getElementsByTagName('input'); 
            buttons[11].value = "sin";
            buttons[12].value = "cos";
            buttons[13].value = "tan";
            this.mode = "N";
        }

    }

    setH(){
        
        if (this.mode=="N" || this.mode=="A"){
            var buttons = document.getElementsByTagName('input'); 
            buttons[11].value = "sinh";
            buttons[12].value = "cosh";
            buttons[13].value = "tanh";
            this.mode = "H";
        }
        else if (this.mode =="H"){
            var buttons = document.getElementsByTagName('input'); 
            buttons[11].value = "sin";
            buttons[12].value = "cos";
            buttons[13].value = "tan";
            this.mode = "N";
        }

    }
    toggleRep(){
        if (this.rep=="F"){
            this.rep="E";
        }
        else{
            this.rep="F";
        }
        this.actualizar();
    }
    toggleDeg(){
        if (this.deg=="D"){
            this.deg="R";
            var buttons = document.getElementsByTagName('input'); 
            buttons[1].value = "RAD";
        }else{
            this.deg="D";
            var buttons = document.getElementsByTagName('input'); 
            buttons[1].value = "DEG";
        }
    }
    media(){
        var a = 0;
        var c = 0;
        for (var i in this.pila.pila) {
            a+= Number(this.pila.pila[i]);
            c+= 1;
        }
        var b = a/c;
        this.pila=new PilaLIFO("Pila");
        this.pila.apilar(b);
        this.current="";
        this.actualizar();
        document.getElementsByTagName("textarea")[0].value = this.mostrar();
    }

    mediana(){
        var a = 0;
        var c = Math.trunc(this.pila.pila.length/2);
        var b = "error";
        for (var i in this.pila.pila) {
            if (a==c){
                b = this.pila.pila[i];
            }

            a++;
        }
        this.pila=new PilaLIFO("Pila");
        this.pila.apilar(b);
        this.current="";
        this.actualizar();
        document.getElementsByTagName("textarea")[0].value = this.mostrar();
    }
    varianza(){
        var a = 0;
        var c = 0;
        for (var i in this.pila.pila) {
            a+= Number(this.pila.pila[i]);
            c+= 1;
        }
        var s2 = 0;
        var b = a/c;
        for (var i in this.pila.pila) {
            s2 +=(Number(this.pila.pila[i])-b)**2; 
        }

        this.pila=new PilaLIFO("Pila");
        this.pila.apilar(s2);
        this.current="";
        this.actualizar();
        document.getElementsByTagName("textarea")[0].value = this.mostrar();

    }
    desv(){
        var a = 0;
        var c = 0;
        for (var i in this.pila.pila) {
            a+= Number(this.pila.pila[i]);
            c+= 1;
        }
        var s2 = 0;
        var b = a/c;
        for (var i in this.pila.pila) {
            s2 +=(Number(this.pila.pila[i])-b)**2; 
        }

        s2 = s2**(1/2);

        this.pila=new PilaLIFO("Pila");
        this.pila.apilar(s2);
        this.current="";
        this.actualizar();
        document.getElementsByTagName("textarea")[0].value = this.mostrar();

    }



}

var calculadora = new CalculadoraRPN();