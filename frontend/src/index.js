var MigratoryDataClient = require("migratorydata-client");

import * as ui from './app/ui.js';

export function beginStocksDemo() {

	ui.createStockTable();
	ui.updateSelectableStocks();

	// init the MigratoryData client
	client = new MigratoryDataClient();

	client.setEntitlementToken(TOKEN);
	client.setServers(SERVERS);
	client.setStatusHandler(function (event) {
		console.log("Status : " + event.type + " : " + event.info);
	});
	client.setMessageHandler(function (message) {
		var subject = message.subject;
		var fields = JSON.parse(message.content);

		var stockIndex = ACTIVE_SYMBOLS.indexOf(subject);
		if (stockIndex >= 0) {
			for (var fieldName in fields) {
				ui.updateField(stockIndex, fieldName, fields[fieldName]);
			}
		}
	});

	client.subscribe(ACTIVE_SYMBOLS);

	client.connect();

	// init the blink timer
	blinkTimer = setInterval(ui.blink, 100);
}

window.beginStocksDemo = beginStocksDemo;