# ICEVW

ICEVW es una solución para poder realizar ciertas tareas que requieran utilizar recursos del equipo desde la web.
Podría de cierta manera considerarse como un plugin aunque en realidad no es un plugin.
La motivación para hacer ICEVW es una alternativa segura multiplataforma que no dependa del navegador para poder utilizar recursos del equipo. Plugins como Java u otros plugins NPAPI, ahora se consideran obsoletos, y no son soportados por navegadores modernos como chrome.

ICEVW nace como la alternativa a estos plugins permitiendo realizar tareas directamente en el equipo sin la preocupación de si el navegador soporta el plugin, que si su código es compatible con la versión del plugin disponible, o que si el navegador bloquea el acceso al plugin



## NOTA

ICEVW está en una etapa muy prematura. Por favor pueden comunicarse con mi perfil de github para saber como funciona.
Faltan algunos ajustes para hacerlo funcional.

Quiero que se comuniquen conmigo, xtreme.maicolxt94@gmail.com deseo hacer lo siguiente y me gustaría recibir ayuda:

1. Un mejor ícono de la aplicación. El nombre ICE de Hielo, y VW es por voxwebit la plataforma en la que está desarrollado (https://www.npmjs.com/package/vw)
2. Necesito alguien que sepa de linux y pueda decirme como puedo fácilmente colocar que se ejecute automáticamente un programa al iniciar el sistema. Para Windows ya está.
3. VW está basado en Electron, quisiera saber si alguien sabe como crear un ícono Tray con Electron. Esto es para cuando haga la etapa de un manejador GUI que aún no está.
4. Modificar el archivo server/assets/icevw.js cuan sea necesario pues mi idea es que funcione en la mayoría de navegadores,si es posible desde IE8.
5. Si alguien sabe como funciona los scheme handlers osea que desde el navegador se pudiera ejecutar algo como icevw://.... le agradezco mucho. Y que sea multiplataforma
6. Quiero saber como puedo hacer que despúes de instalarse iceVW se ejecute automáticamente pero ojo, que sea detached, y segundo que aún si se usa sudo en Linux, se ejecute con el usuario normal.

Les agradezco de antemano, algunas de estas he tratado de hacerlas por mi cuenta, pero no he podido lograr, además por mi falta de tiempo. Espero que con ayuda de buenos desarrolladores puedan colaborarme en las cosas que pido.


#### Cómo usar

En poco tiempo se estará poniendo ejemplos concretos de como usar ICEVW desde su página web.

#### Instalación

Para instalar ICEVW debe instalar VW (https://www.npmjs.com/package/vw). En Windows abra una ventana del cmd con permisos de administrador. En linux puede usar el comando sudo:


En Windows utilice vw-cmd
```sh
vw-cmd --g --install icevw
```

En Unix coloque simplemente vw
```sh
$ sudo vw --g --install icevw
```


#### Ejecutar ICEVW

En dado caso que ICEVW no se esté ejecutando correctamente por favor desde cmd en Windows,o su consola en Unix puede ejecutar:


```sh
icevw
```

En windows si quiere ver la traza de la aplicación debe usar:

```sh
icevw-cmd
```
