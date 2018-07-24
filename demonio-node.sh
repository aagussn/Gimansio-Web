#!/bin/bash
# This service requires you have forever app installed in your system.
 
 
### CONFIG ZONE
# This is the service name. It cant have any special char or space.
serviceName="my-gim"
 
# Where is located your app
appFilePath="//Gimansio-Web/Gimansio-Web/server.js"
 
# Whats the name of your main app file.
appIndex="index.js"
 
enviroment=production
### END CONFIG ZONE
 
 
###### DO NOT EDIT BELOW THIS LINE ######
# Source function library.
. /lib/lsb/init-functions
 
pidFile="/var/run/$serviceName.pid"
logFile="/var/run/$serviceName.log"
 
command="node"
nodeApp="$appFilePath/$appIndex"
foreverApp="forever"
 
start() {
	echo "Starting $serviceName"
	PATH=/usr/local/bin:$PATH
	export NODE_ENV=$enviroment
	$foreverApp start --pidFile $pidFile -l $logFile -a -d -c "$command" $nodeApp
	RETVAL=$?
}
 
restart() {
	echo -n "Restarting $serviceName"
	$foreverApp restart $nodeApp
	RETVAL=$?
}
 
stop() {
	echo -n "Shutting down $serviceName"
	$foreverApp stop $nodeApp
	RETVAL=$?
}
 
status() {
   echo -n "Status $serviceName"
   $foreverApp list
   RETVAL=$?
}
 
case "$1" in
   start)
        start
        ;;
    stop)
        stop
        ;;
   status)
        status
       ;;
   restart)
   	restart
        ;;
	*)
       echo "Usage:  {start|stop|status|restart}"
       exit 1
        ;;
esac
exit $RETVAL