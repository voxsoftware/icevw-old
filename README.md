# ICEVW

ICEVW es una solución para poder realizar ciertas tareas que requieran utilizar recursos del equipo desde la web.
Podría de cierta manera considerarse como un plugin aunque en realidad no es un plugin.
La motivación para hacer ICEVW es una alternativa segura multiplataforma que no dependa del navegador para poder utilizar recursos del equipo. Plugins como Java u otros plugins NPAPI, ahora se consideran obsoletos, y no son soportados por navegadores modernos como chrome.

ICEVW nace como la alternativa a estos plugins permitiendo realizar tareas directamente en el equipo sin la preocupación de si el navegador soporta el plugin, que si su código es compatible con la versión del plugin disponible, o que si el navegador bloquea el acceso al plugin



#### Cómo usar

En poco tiempo se estará poniendo ejemplos concretos de como usar ICEVW desde su página web.

#### Instalación

Para instalar ICEVW debe instalar VW. En Windows abra una ventana del cmd con permisos de administrador. En linux puede usar el comando sudo:


En Windows utilice vw-cmd
```sh
vw-cmd --install icevw
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


#### NOTA
En Windows los archivos binarios de la aplicación quedan en la carpeta del usuario, en sistemas Unix queda en la carpeta del usuario en el directorio bin
