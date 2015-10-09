//Usamos una "Immediate Function" para iniciar la aplicacion sin dejar que nada este fuera del scope global
(function () {

    /* ---------------------------------- Variables Locales ---------------------------------- */
    var service = new EmployeeService();
    service.initialize().done(function () {
        renderHomeView();
    });

    /* --------------------------------- Registro de Eventos -------------------------------- */
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

    /* ----------------------------------------- Vistas ---------------------------------------- */
    function renderHomeView() { //renderiza la vista home
    var html =
      "<h1>Directorio</h1>" +
      "<input class='search-key' type='search' placeholder='Escribe aqui'/>" +
      "<ul class='employee-list'></ul>"; //codigo html a injectar en el DOM
    $('body').html(html); //injectamos el codigo en el dom
    $('.search-key').on('keyup', findByName); //añadimos el listener al campo de busqueda
}

}());
