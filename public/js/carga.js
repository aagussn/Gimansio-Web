$(function(){
 
            $('form').submit( function(){
                //Agregar un div al principio del form
                capa = $('<div class="capaTransparente">').prependTo(this);
                //Le doy opacidad
                capa.animate({'opacity': 0.5});
                //Alguna operacion ajax
                $.get('dos.jsp', function(){
                    //Cuando termina la solicitud le doy opacidad 0
                    capa.animate({'opacity': 0}, function(){
                        //Cuando termina la animacion borro el div
                        $(this).remove();
                    })
                });
 
                return false;
            });
 
        });
 