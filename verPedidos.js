'use strict'


//TRAIGO LOS LOCAL STORAGE DE PEDIDOS y STOCK

let LocalStoragePedidos = JSON.parse(localStorage.getItem('pedidos'));
let LocalStorageStock = JSON.parse(localStorage.getItem('stock'))


for (const [index, pedido] of LocalStoragePedidos.entries()){
    var precioTotal = 0;
    for(let material of pedido.materiales){
        precioTotal +=  material.precioTotal;
    };
   
    $(`#verPedidoTableBody`).prepend(
        `<tr class="dropdown">
            <td class="text-center">${pedido.cellID}</td>
            <td class="text-center">${pedido.fecha}</td>
            <td class="text-center">${pedido.contratista}</td>
            <td class="text-center" id="orderState"><button id="OrderState${index}" class="btn btn-warning" style="pointer-events: none;">${pedido.estado}</button></td>
            <td class="text-center">${precioTotal}</td>
            <td class="text-center"><button id="pedido${index}" class="btn btn-lg btn-warning"><i class="fas fa-eye"></i></button></td>
        </tr>
        `
    );

    //CAMBIO BOTON DE ESTADO SI EL PEDIDO SE ENCUENTRA O NO COMPLETO
    if(pedido.estado == 'PENDIENTE'){
        $(`#OrderState${index}`).attr('class','btn btn-warning');


        $(`#pedido${index}`).on('click', ()=>{
            Swal.fire({
                position: 'center',
                grow: 'fullscreen',
                icon: 'info',
                title: 'Visor de pedidos',
                html: `<table class="table table-bordered table-responsive table-sm">
                        <thead>
                            <tr>
                             <th>Material</th>
                             <th>Cantidad</th> 
                             <th>Disponible</th>   
                            </tr>
                        </thead>
                        <tbody id="sweetalertTbody"></tbody>
                       </table>`,
                showDenyButton: true,
                showCancelButton: true,
                denyButtonColor: '#FF0000',
                confirmButtonColor: '#006400',
                confirmButtonText: 'Aceptar',
                denyButtonText: `Rechazar`,
            }).then((result) => {
                if(result.isConfirmed){
                    var info = [];
                    for(let stock of LocalStorageStock){
                        for(let material of pedido.materiales){
                            if(stock.nombre == material.material){
    
                                if((stock.cantidad - material.cantidad)<0){
                                    info.push(`<li>La cantidad requerida de ${stock.nombre} por el pedido es mayor al stock disponible. Se entregará el máximo disponible</li>`);
                                    const nuevaCantidadPedido = material.cantidad - stock.cantidad;
                                
                                }else{
                                    let nuevaCantidad = stock.cantidad - material.cantidad;
                                    LocalStorageStock[stock.id-1].cantidad =  nuevaCantidad;
                                };
                            };
                        }
                    };
                    LocalStoragePedidos[index].estado = "COMPLETADO";
                    const LocalStoragePedidosUpdated = JSON.stringify(LocalStoragePedidos);
                    localStorage.setItem('pedidos', LocalStoragePedidosUpdated);
                    Swal.fire({
                        title: 'Pedido aceptado',
                        icon: 'success',
                        html: `<ul>${info}</ul>`
                    });
                    location.reload();
                }else if(result.isDenied){
                  Swal.fire({title:'Pedido rechazado',footer: 'Se enviará mail de rechazo al contratista', icon: 'error'});
                };
            });
            //COMPROBACIÓN DEL STOCK EN LOCALSTORAGE
    
          
    
            for(let material of pedido.materiales){
    
                //TRAIGO A STOCK LOCALSTORAGE PARA COMPARAR LO REQUERIDO Y LO QUE HAY EN STOCK
                let stockDisponible = LocalStorageStock.filter((element) => {return element.nombre === material.material});
                let stockQty = stockDisponible[0].cantidad
    
                
                $('#sweetalertTbody').append(`
                <tr>
                    <td>${material.material}</td>
                    <td>${material.cantidad}</td>
                    <td id='stockdispo${stockDisponible[0].id}'>${stockQty}<td>
                </tr>`
                );
    
                //CANTIDADES DISPONIBLES EN STOCK Y COMENTARIOS SOBRE EL STOCK
                if((stockQty - material.cantidad) > 0){
                    
                    $(`#stockdispo${stockDisponible[0].id}`).css('color', 'green').append('<h6>Con Stock</h6>');
                    
                }else if((stockQty - material.cantidad) === 0){
                    $(`#stockdispo${stockDisponible[0].id}`).css('color', 'orange').append('<h6>Poco Stock</h6>');
              
                }else{
                    $(`#stockdispo${stockDisponible[0].id}`).css('color', 'red').append('<h6>Sin Stock suficiente</h6>');
                }
            };
        });
    }else{
        $(`#OrderState${index}`).attr('class','btn btn-success');

        $(`#pedido${index}`).on('click', ()=>{
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Visor de pedidos',
                html: `<table class="table table-bordered table-responsive table-sm">
                        <thead>
                            <tr>
                             <th>Material</th>
                             <th>Cantidad</th>   
                            </tr>
                        </thead>
                        <tbody id="sweetalertTbody"></tbody>
                       </table>`,
                showCancelButton: true
            });

            for(let material of pedido.materiales){
    
                //TRAIGO A STOCK LOCALSTORAGE PARA COMPARAR LO REQUERIDO Y LO QUE HAY EN STOCK
                let stockDisponible = LocalStorageStock.filter((element) => {return element.nombre === material.material});
                let stockQty = stockDisponible[0].cantidad
    
                
                $('#sweetalertTbody').append(`
                <tr>
                    <td>${material.material}</td>
                    <td>${material.cantidad}</td>
                </tr>
                `
                );
            };
        });
    };
};