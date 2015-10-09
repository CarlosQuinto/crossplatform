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
