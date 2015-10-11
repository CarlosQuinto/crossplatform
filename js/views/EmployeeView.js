var EmployeeView = function(employee) {

  this.initialize = function() {
      this.$el = $('<div/>');
      this.$el.on('click', '.add-location-btn', this.addLocation); //registramos el listener de geolocalizacion
      this.$el.on('click', '.add-contact-btn', this.addToContacts); //registramos el listener de añadir contacto
      this.$el.on('click', '.change-pic-btn', this.changePicture); //registramos el listener de cambiar foto
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

  this.addToContacts = function(event) {
    event.preventDefault();
    console.log('addToContacts');
    if (!navigator.contacts) { //comprobamos que existe la funcion de contactos
        alert("Funcion no soportada", "Error");
        return;
    }
    var contact = navigator.contacts.create(); //llamamos a la api de contactos
    contact.name = {givenName: employee.firstName, familyName: employee.lastName}; //asignamos los valores con la informacion del contacto
    var phoneNumbers = []; //creamos un arreglo
    phoneNumbers[0] = new ContactField('work', employee.officePhone, false); //le asignamos el numero de trabajo
    phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); //le asignamos el numero de celular
    contact.phoneNumbers = phoneNumbers; //añadimos los numeros
    contact.save(); //guardamos el contacto
    return false;
};

this.changePicture = function(event) {
  event.preventDefault();
  if (!navigator.camera) { //comprobamos que existe la funcion de camara
      alert("Funcion de camara no soportada", "Error");
      return;
  }
  var options =   {   quality: 50, //calidad de la imagen
                      destinationType: Camera.DestinationType.DATA_URL, //destino temporal
                      sourceType: 1,      // 0:Galeria, 1=Camara, 2=Imagenes Guardadas
                      encodingType: 0     // 0=JPG 1=PNG
                  };

  navigator.camera.getPicture( //llamamos a la camara
      function(imgData) {
          $('.media-object', this.$el).attr('src', "data:image/jpeg;base64,"+imgData); //ponemos la foto en el contacto
      },
      function() {
          alert('Error al tomar la foto', 'Error');
      },
      options);

  return false;
};

  this.initialize();

}
