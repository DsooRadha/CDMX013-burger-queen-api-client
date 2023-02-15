# Burger Queen (API Client)
![LoginBQ](https://user-images.githubusercontent.com/101679628/219097765-c4771f83-f539-445b-aa64-f7777ad357ed.png)

Una app para restaurant, diseñada para tablet, creada con React, donde se realiza un ruteo condicionado dependiendo del tipo de usuario que ingresa (administradores, meseros y cocina). 

El registro se realiza con correo y contraseña ,ostrando mensajes de error en caso de no llenar los campos o si los datos ingresados son incorrectos.

![MessageError](https://user-images.githubusercontent.com/101679628/219098695-7ea8ea23-d961-40cb-b390-9fda5101d0ae.png)

Cada usuario tiene distintas funcionalidades que se llevan acabo gracias al uso de los hooks y del consumo de API's, a través de axios. 
El administador puede crear, eliminar y editar usuarios y/o productos. Estos se muestran a través de una tabla respectivamente. La tabla de empleados se realizo usando una librería y la la tabla de productos fue creada manualmente. 

![tableUsers](https://user-images.githubusercontent.com/101679628/219099634-16e493e4-3a22-41cb-bdc7-6891f8459890.png)

Para la tabla de ususarios. Se edita y elimina directamente sobre la tabla, se agregan usuarios a traves del llenado de inputs colocados en la parte superior. 

![error and Edit data](https://user-images.githubusercontent.com/101679628/219100464-0fe6ae29-a8d7-419e-b500-0034c065b031.png)

Para eliminar usuarios o productos se despliega un modal de confirmación personalizado dependiendo de lo que desees eliminar.

![modalError Table](https://user-images.githubusercontent.com/101679628/219100861-0283305a-4edc-4b75-8b07-4c018f6ca27a.png)

Para la edicion de productos, se empleo un metodo diferente al usado en usuarios. A través del uso de useParam al dar click en el boton de editar del determinado producto  te redirecciona a otra pagina donde  se puede modificar dicho producto. Y la Url de dicha pagina corresponde al id del producto.

![edit Product](https://user-images.githubusercontent.com/101679628/219101428-ea44542d-e0d6-4341-9b4b-54042a9cc8f7.png)


En el rol de meseros, se pueden acceder a los dos tipos de menu con los que se cuentan (desayunos y 24hrs). del lado derecho se van agregando los productos en tiempo real a una comanda asi como mostrando el total de la compra, y un input para ingresar los datos del cliente. Antes de enviar la order se muestra un modal de confirmación, asi como un mensaje de error en caso de no llenar el input del cliente o que la orden este vacia.

![viewWaiter](https://user-images.githubusercontent.com/101679628/219103160-1d8c79c9-b2e8-448c-94d1-f598d3ce3f66.png)

En a vista de cocina se van mostrando en tiempo real las ordenes que mandan los meseros, con la hora en que se mando y se van ordenando de la mas antigua a la mas reciente. Al tener lista la orden los cocineros dan clic al boton de acierto y esta orden deja de mostrarse en la lista de pendientes y pasa a la parte de listos.

![KitchenView](https://user-images.githubusercontent.com/101679628/219104318-762edd97-7a13-44c7-b38b-cb67af304d87.png)

En la parte de pedidos listos, se pueden visualizar las ordenes conforme van saliendo y cuentan con un boton (i) donde al hacer clic se despliega la informacion del pedido: hora de llegada, de termino y total de tiempo.

![readyview](https://user-images.githubusercontent.com/101679628/219105493-44ccb68a-25a4-4ead-aeb2-7886dd69a774.png)

En los tres tipos de usuario se cuenta con un boton para cerrar sesión.

 >_dsoocg@gmail.com_  
 >Adei Cabañas