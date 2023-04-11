var MigratoryDataClient = require("migratorydata-client");

import {config} from './app/config.js';
import * as ui from './app/ui.js';

ui.createStockTable();
ui.updateSelectableStocks();

// init the MigratoryData client
var client = new MigratoryDataClient();
config.client = client;

client.setEntitlementToken(config.TOKEN);
client.setServers(config.SERVERS);
client.setStatusHandler(function(event) {
	console.log("Status : " + event.type + " : " + event.info);
});
client.setMessageHandler(function(message) {
	var subject = message.subject;
	var fields = JSON.parse(message.content);

	var stockIndex = config.ACTIVE_SYMBOLS.indexOf(subject);
	if ( stockIndex >= 0) {
		for (var fieldName in fields) {
			ui.updateField(stockIndex, fieldName, fields[fieldName]);
		}
	}
});	

client.subscribe(config.ACTIVE_SYMBOLS);

client.connect();

// init the blink timer
config.blinkTimer = setInterval(ui.blink, 100);