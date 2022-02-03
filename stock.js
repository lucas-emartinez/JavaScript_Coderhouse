'use strict'

//Materiales
var materiales = [
    {nombre: 'Cable 4mm2 V/A', img: '../img/cable4mmva.png' ,cantidad: 0, id: 1, precioUnitario: 0},
    {nombre: 'Cable 10mm2 Celeste', img: '../img/cable10mmceleste.png' ,cantidad: 0, id: 2, precioUnitario: 0},
    {nombre: 'Cable 10mm2 Marrón', img: '../img/cable10mmmarron.png' ,cantidad: 0, id: 3, precioUnitario: 0},
    {nombre: 'Cable 10mm2 Negro', img: '../img/cable10mmnegro.png' ,cantidad: 0, id: 4, precioUnitario: 0},
    {nombre: 'Cable 10mm2 Rojo', img: '../img/cable10mmrojo.png' ,cantidad: 0, id: 5, precioUnitario: 0},
    {nombre: 'Cable 16mm2 Celeste', img: '../img/cable16mmceleste.png' ,cantidad: 0, id: 6, precioUnitario: 0},
    {nombre: 'Cable 16mm2 Negro', img: '../img/cable16mmnegro.png' ,cantidad: 0, id: 7, precioUnitario: 0},
    {nombre: 'Cable 16mm2 V/A', img: '../img/cable16mmva.png' ,cantidad: 0, id: 8, precioUnitario: 0},
    {nombre: 'Cable 25mm2 Celeste', img: '../img/cable25mmceleste.png' ,cantidad: 0, id: 9, precioUnitario: 0},
    {nombre: 'Cable 25mm2 Negro', img: '../img/cable25mmnegro.png' ,cantidad: 0, id: 10, precioUnitario: 0},
    {nombre: 'Cable 35mm2 Celeste', img: '../img/cable35mmceleste.png' ,cantidad: 0, id: 11, precioUnitario: 0},
    {nombre: 'Cable tipo Taller 2x6mm2', img: '../img/cabletipotaller26.png' ,cantidad: 0, id: 12, precioUnitario: 0},
    {nombre: 'Cable tipo Taller 2x1.5mm2', img: '../img/cabletipotaller215.png' ,cantidad: 0, id: 13, precioUnitario: 0},
    {nombre: 'Conector 1"', img: '../img/conector1.png' ,cantidad: 0,  id: 14, precioUnitario: 0},
    {nombre: 'Conector 3/4"', img: '../img/conector34.png' ,cantidad: 0,  id: 15, precioUnitario: 0},
    {nombre: 'C-TAP', img: '../img/ctap.png' ,cantidad: 0, id: 16, precioUnitario: 0},
    {nombre: 'Morceto peine', img: '../img/morceto.png' ,cantidad: 0, id: 17, precioUnitario: 0},
    {nombre: 'Terminal 10mm2', img: '../img/terminal10mm.png' ,cantidad: 0, id: 18, precioUnitario: 0},
    {nombre: 'Terminal 16mm2', img: '../img/terminal16mm.png' ,cantidad: 0, id: 19, precioUnitario: 0},
    {nombre: 'Terminal 25mm2', img: '../img/terminal25mm.png' ,cantidad: 0, id: 20, precioUnitario: 0},
    {nombre: 'Terminal 35mm2', img: '../img/terminal35mm.png' ,cantidad: 0, id: 21, precioUnitario: 0},
    {nombre: 'Tiff 6mm2', img: '../img/tiff6mm.png' ,cantidad: 0, id: 22, precioUnitario: 0},
    {nombre: 'Tiff 10mm2', img: '../img/tiff10mm.png' ,cantidad: 0, id: 23, precioUnitario: 0},
    {nombre: 'Tiff 16mm2', img: '../img/tiff16mm.png' ,cantidad: 0, id: 24, precioUnitario: 0},
    {nombre: 'Tiff 25mm2', img: '../img/tiff25mm.png' ,cantidad: 0, id: 25, precioUnitario: 0},
    {nombre: 'Tuflex 1"', img: '../img/tuflex1.png' ,cantidad: 0, id: 26, precioUnitario: 0},
    {nombre: 'Tuflex 3/4"', img: '../img/tuflex34.png' ,cantidad: 0, id: 27, precioUnitario: 0},
    {nombre: 'Conector RJ45', img: '../img/rj45.png' ,cantidad: 0, id:28, precioUnitario: 0},
    {nombre: 'Cable UTP cat5e', img: '../img/UTP.png' ,cantidad: 0, id:29, precioUnitario: 0}
    ];
    
class Stock{

    constructor(nombre, img, cantidad, id, precioUnitario){
        this.nombre = nombre;
        this.img = img;
        this.cantidad = cantidad;
        this.id = id;
        this.precioUnitario = precioUnitario;
    };

    getAndUpdateStock(){
        stockUpdater();
    };
};

//Función que busca si hay LocalStorage, si lo hay se procede con el Eventlistener para actualizar la carga de stock.
//Si no hay LocalStorage se procede a utilizar el array JSON que contiene los materiales con su stock inicial en 0
function stockUpdater(){
    if (localStorage.getItem('stock') !== null){
        let LocalStorageStock = JSON.parse(localStorage.getItem('stock'));
        for(let [index,stock] of LocalStorageStock.entries()){
            $("#tableBody").append(
                `<tr id="row${index}">
                    <td id="stockId${stock.id}">${stock.id}</td>
                    <td id="${stock.img}"><img src="${stock.img}"></td>
                    <td id="stockName${stock.id}">${stock.nombre}</td>
                    <td id="stockQty${index}"><input  class="form-control" type="number" min="0" value="${stock.cantidad}" disabled></td>
                    <td><input  class="form-control" type="number" min="0"  value="0" id="chargueQty${stock.id}" ></td>
                    <td><input  class="form-control" placeholder="$" type="number" id="precioUnitario${stock.id}" value="${stock.precioUnitario}"></td>
                </tr>`
            );
            if(stock.cantidad < 50 && stock.cantidad>10){
                $(`#stockQty${index}`).append(`<div class="progress">
                                                    <div class="bg-warning progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width:${stock.cantidad}%" aria-pressed="true" aria-valuenow="${stock.cantidad}" aria-valuemin="0" aria-valuemax="100"></div>
                                              </div>`);
            }else if(stock.cantidad <= 10 ){
                $(`#stockQty${index}`).append(`<div class="progress">
                                                    <div class="bg-danger progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width:${stock.cantidad}%" aria-pressed="true" aria-valuenow="${stock.cantidad}" aria-valuemin="0" aria-valuemax="100"></div>
                                               </div>`);
            }else{
                $(`#stockQty${index}`).append(`<div class="progress">
                                                    <div class="bg-success gprogress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width:${stock.cantidad}%" aria-pressed="true" aria-valuenow="${stock.cantidad}" aria-valuemin="0" aria-valuemax="100"></div>
                                               </div>`);
            }
        };
        let saveStock = document.getElementById("stockSubmit");
        saveStock.addEventListener('click', () =>{
        let loadedQty = $("tr");
        for (let i = 1 ; i < loadedQty.length; i++){
            let nuevaCantidad = parseInt($(`#chargueQty${i}`).val());
            let nuevoPrecioUnitario = $(`#precioUnitario${i}`).val();
            LocalStorageStock[i-1].cantidad += nuevaCantidad;
            LocalStorageStock[i-1].precioUnitario = nuevoPrecioUnitario;
        };
        let updatedStockJSON = JSON.stringify(LocalStorageStock);
        if(updatedStockJSON == localStorage.getItem('stock')){
            Swal.fire({
                icon: 'error',
                title: 'No se realizó ningún cambio',
            });
        }else{
            localStorage.setItem('stock', updatedStockJSON);
            Swal.fire({
                icon: 'success',
                title: 'Se actualizó el Stock!'
                }).then((result) =>{
                    location.reload();
                })
            }
    });
    }
    else{
        let initialStock = [];
        for(let material of materiales){
            initialStock.push(new Stock(material.nombre, material.img, material.cantidad, material.id, material.precioUnitario));
            $("#tableBody").append(
                `<tr>
                    <td id="stockId${material.id}">${material.id}</td>
                    <td id="${material.img}"><img src="${material.img}"></td>
                    <td id="stockName${material.nombre}">${material.nombre}</td>
                    <td><input type="number" value="${material.cantidad}" disabled></td>
                    <td><input type="number" value="0"></td>
                    <td><input type="number" id="precioUnitario${material.id}" value="${material.precioUnitario}"></td>
                </tr>` 
            );
        };     
        let initialStockJSON = JSON.stringify(initialStock);   
        localStorage.setItem("stock", initialStockJSON);
        location.reload();
    };
};



//FILTRO DE BUSQUEDA

$(document).ready(function(){
    $("#searchMat").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#tableBody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


//**************************************************************************************************** */
let inicio = new Stock();
inicio.getAndUpdateStock();