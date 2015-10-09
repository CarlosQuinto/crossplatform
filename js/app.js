//Usamos una "Immediate Function" para iniciar la aplicacion sin dejar que nada este fuera del scope global
(function () {

    /* ---------------------------------- Variables Locales ---------------------------------- */
    var service = new EmployeeService();
    service.initialize().done(function () {
        console.log("Servicio Iniciado");
    });

    /* --------------------------------- Registro de Eventos -------------------------------- */
    $('.search-key').on('keyup', findByName);
    $('.help-btn').on('click', function() {
        alert("App de contactos 1.0");
    });

    document.addEventListener('deviceready', function () {
      FastClick.attach(document.body); //registramos el script para implementarse cuando el dispositivo este listo
      if (navigator.notification) { // remplaza la notificacion nativa de html con la nativa del dispositivo
          window.alert = function (message) {
              navigator.notification.alert(
                  message,    // mensaje
                  null,       // callback (esto es magia pura, pero es mas avanzado ;)
                  "Taller", // Titulo
                  'OK'        // Nombre del boton
              );
          };
      }
    }, false);

    /* ---------------------------------- Funciones Locales ---------------------------------- */
    function findByName() {
        service.findByName($('.search-key').val()).done(function (employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i = 0; i < l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    }

}());
