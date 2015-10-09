//Usamos una "Immediate Function" para iniciar la aplicacion sin dejar que nada este fuera del scope global
(function () {
    //Ya no son variables locales, son objetos de las vistas
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html()); // Guarda el template home
    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html()); // Guarda el template empleados
    EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());
    /* ---------------------------------- Variables Locales ---------------------------------- */
    var service = new EmployeeService();
    service.initialize().done(function () {
        $('body').html(new HomeView(service).render().$el);

        router.addRoute('employees/:id', function(id) { //creamos una nueva ruta que acepta un argumento (el id del empleado)
            service.findById(parseInt(id)).done(function(employee) { //convertimos el argumento a un entero
                $('body').html(new EmployeeView(employee).render().$el); //renderisamos la vista rellenando los datos con el empleado
            });
        });

        router.start();
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
