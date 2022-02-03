'use strict';

var contratistas = ['SITELCO','DYMCOM','Weber, Martín - Peña, Daniel','Costas, Fernando', 'Tedesco, Guillermo'];

class Pedido{
    constructor(materiales, contratista, cellID, fecha, estado){
        this.materiales = materiales;
        this.contratista = contratista;
        this.cellID = cellID;
        this.fecha = fecha;
        this.estado = estado;
    };
};
let LocalStorageStock = JSON.parse(localStorage.getItem('stock'));
//añadir materiales al pedido
$('#addMat').on('click', (e) =>{
    e.preventDefault();
    if(LocalStorageStock !== null){
        var row = $("tr").length;
        $("#tableBody").append(
            `<tr>
                <td id="rowIndex">${row}</td>
                <td><select id="material${row}"><option selected></option></select></td>
                <td><img id="img${row}" src=""></td>
                <td><input type="number" id="qtyRow${row}" min="0" required></td>
                <td><input type="text" id="obs${row}" placeholder="Ingrese observación"></td>
                <td><button id="Washer${row}"class="btn btn-danger">Eliminar</button></td>
             </tr>`
             );
            //APPEND DE OPCIONES AL SELECT
            for(let stock of LocalStorageStock){
                $('select').append(
                    `<option id="op${stock.id}"  "value="${stock.img}">${stock.nombre}</option>`
                );
            };
            //CAMBIO DE IMAGEN AL CAMBIAR SELECCCIÓN DE MATERIAL
            $(`#material${row}`).on('change', () => {
                let value = $(`#material${row} option:selected`).val();
                let filtro  = LocalStorageStock.filter((element) => {return element.nombre === value});
                $(`#img${row}`).attr('src', filtro[0].img);
            }); 
        //Eliminar Filas
        $(`#Washer${row}`).on('click', function(){
            $(this).closest('tr').remove();
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'No hay stock disponible en LocalStorage',
        }); 
    };
});
//ENVIO DE PEDIDO
$('#sendPedido').on('click', async () =>{
    let rows = $("tr").length;

    function rowChecker(){
        for(let i = 1 ; i < rows ; i++){
            let material =  $(`#material${i} :selected`).text();
            let cantidad =  $(`#qtyRow${i}`).val();
            if(material == "" || (cantidad < 1 || cantidad == "")){
                return true;
            }else{
                return false;
            };
        };
    }; 

    if(rows == 1){
        Swal.fire({
            icon: 'error',
            title: 'No Añadio ningún material',
        }); 
    }else if(rowChecker()){
        Swal.fire({
            icon: 'info',
           title: 'Existen campos de nombre o cantidad sin completar',
        });
    }else{
        let date = new Date();
        let fecha = date.getDate()+'/'+parseInt(date.getUTCMonth()+1)+'/'+date.getUTCFullYear();


        const steps = ['1', '2', '3']
        const Queue = Swal.mixin({
            confirmButtonText: 'Siguiente',
            showCancelButton: true,
            progressSteps: steps,          // optional classes to avoid backdrop blinking between steps
            showClass: { backdrop: 'swal2-noanimation' },
            hideClass: { backdrop: 'swal2-noanimation' }
        })
        
        const {value: contratista} = await Queue.fire({
          title: 'Ingrese Contratista',
          currentProgressStep: 0,
          // optional class to show fade-in backdrop animation which was disabled in Queue mixin
          showClass: { backdrop: 'swal2-noanimation' },
          html: `<select class="form-control selectpicker" id="selectContratista"><option hidden selected ">Seleccione un contratista...</option></select>`,
          didOpen: function (){
            $.ajax({
                url: '../jsonData/contratistas.json',
                type: 'GET',
                dataType: 'json',
                success: function (response){
                    response.forEach((element) => {
                        $('#selectContratista').append(`<option>${element.text}</option>`)
                    })
                }
            })
          },
          preConfirm: () => {
              return [
                $('#selectContratista :selected').val()
            ]
          }
        })
        console.log(contratista)
        const {value: celda} = await Queue.fire({
          title: 'Ingrese CELDA',
          currentProgressStep: 1,
          html: `<select class="form-control selectpicker" id="selectCelda"></select>`,
          didOpen: function (){
            $.ajax({
                url: '../jsonData/celdas.json',
                type: 'GET',
                dataType: 'json',
                success: async function (response){
                    await response.forEach((element) => {
                        $('#selectCelda').append(`<option>${element.SITIO}</option>`)
                    })
                }
            })
          },
          preConfirm: () => {
            return [
              $('#selectCelda :selected').val()
          ]
        }
        })
        console.log(celda)
        await Queue.fire({
          title: 'Resumen del pedido',
          currentProgressStep: 2,
          confirmButtonText: 'OK',
          // optional class to show fade-out backdrop animation which was disabled in Queue mixin
          showClass: { backdrop: 'swal2-noanimation' },
          
        })

       // let contratista = prompt("Ingrese contratista: ");
       // let CellID = prompt("Ingrese CellID");
        let materiales = [];
        let estado = 'PENDIENTE';
        
        for(let i = 1 ; i < rows ; i++){
            let material =  $(`#material${i} :selected`).text();
            let img = $(`#img${i}`).attr('src');
            let cantidad =  $(`#qtyRow${i}`).val();
            let obs =  $(`#obs${i}`).val();
            //CALCULO DE PRECIO UNITARIO * CANTIDAD DE CADA MATERIAL SELECCIONADO
            let materialFilter = LocalStorageStock.find((element) => {return element.nombre == material});
            let precioTotal = materialFilter.precioUnitario * cantidad;
            //PUSH DE VARIABLES DENTRO DE ARRAY MATERIALES
            materiales.push({material, img, cantidad, obs, precioTotal});
        };

        //INSTANCIO LA CLASE Pedido pasandole los materiales como array y demás...
        let pedido = new Pedido(materiales, contratista, celda, fecha, estado);

        //GUARDADO EN LOCAL STORAGE EL PEDIDO   
        let pedidosStorage = [];
        if(!localStorage.getItem('pedidos')){
            pedidosStorage.push(pedido);
            localStorage.setItem('pedidos', JSON.stringify(pedidosStorage));
            location.reload();
            }else{
            pedidosStorage = JSON.parse(localStorage.getItem('pedidos'));
            pedidosStorage.push(pedido);
            localStorage.setItem('pedidos', JSON.stringify(pedidosStorage));
            location.reload();
        };
    };
});






// AGREGADO DE CONTRATISTAS AL SELECT

