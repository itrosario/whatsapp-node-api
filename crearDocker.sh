#!/bin/bash
echo "Parando contenedor"
/usr/bin/docker stop web-app
echo "Borrando contenedor"
/usr/bin/docker rm web-app
echo "Ingresando a la carpeta de whatsapp"
cd /root/whatsapp-node
echo "Creando Docker"
/usr/bin/docker build . -t node-whatsapp-app
echo "Creando contenedor"
/usr/bin/docker run -d -p 5000:5000 --name web-app --restart always --privileged node-whatsapp-app
echo "Finalizado"
