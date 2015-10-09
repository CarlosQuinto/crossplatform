//Usamos una "Immediate Function" para iniciar la aplicacion sin dejar que nada este fuera del scope global
(function () {
    //Ya no son variables locales, son objetos de las vistas
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html()); // Guarda el template home
    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html()); // Guarda el template empleados
    /* ---------------------------------- Variables Locales ---------------------------------- */
    var service = new EmployeeService();
    service.initialize().done(function () {
        $('body').html(new HomeView(service).render().$el);
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

}());
