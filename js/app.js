//Usamos una "Immediate Function" para iniciar la aplicacion sin dejar que nada este fuera del scope global
(function () {

    /* ---------------------------------- Variables Locales ---------------------------------- */
    var homeTpl = Handlebars.compile($("#home-tpl").html()); // Guarda el template home
    var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html()); // Guarda el template empleados
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
          $('.content').html(employeeListTpl(employees));
      });
    }

    /* ----------------------------------------- Vistas ---------------------------------------- */
    function renderHomeView() { //renderiza la vista home
    $('body').html(homeTpl); //injectamos el codigo en el dom
    $('.search-key').on('keyup', findByName); //añadimos el listener al campo de busqueda
}

}());
