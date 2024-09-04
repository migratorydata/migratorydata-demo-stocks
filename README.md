## MigratoryData Stocks Demo

This is a real-time web application built with the MigratoryData client for 
JavaScript. It displays in your browser live market data sent from the backend 
by a MigratoryData server. The MigratoryData server receives the market data 
from a backend stocks feed simulator built with the MigratoryData 
client for Java.

### Requirements

Works with the version 6.0.4 or later of the MigratoryData sever.

### Install & Run without Docker

Check the Readme files in the folders `backend` and respectively `frontend`.

### Run

If there is docker installed on the machine you can see the example running using the `docker compose up` command.

```bash
docker compose up
```

The example can be accessed using a browser at address `http://127.0.0.1:8080`. 

The `docker-compose.yaml` file starts three services. 
* The MigratoryData server used by backend service and frontend service for communication. 
* The backend service is a stocks agent which publishes data on stocks symbols. 
* The frontend service subscribes to stocks and display the data in browser.