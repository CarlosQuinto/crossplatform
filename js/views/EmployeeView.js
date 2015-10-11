var EmployeeView = function(employee) {

  this.initialize = function() {
      this.$el = $('<div/>');
      this.$el.on('click', '.add-location-btn', this.addLocation); //registramos el listener de geolocalizacion
  };

  this.render = function() {
      this.$el.html(this.template(employee));
      return this;
  };

    this.addLocation = function(event) {
    event.preventDefault(); //evitamos el comportamiento por default de la geolocalizacion
    navigator.geolocation.getCurrentPosition( //obtenemos la posicion actual
        function(position) {
            alert(position.coords.latitude + ',' + position.coords.longitude); //mostramos las cordenadas
        },
        function() {
            alert('Error obteniendo la geolocalizacion');
        });
    return false;
  };

  this.initialize();

}
