document.addEventListener('DOMContentLoaded', function() {
	// init the UI
	createStockTable();
	updateSelectableStocks();

	// init the MigratoryData client
	MigratoryDataClient.setEntitlementToken(TOKEN);
	MigratoryDataClient.setServers(SERVERS);
	MigratoryDataClient.setStatusHandler(function(event) {
        console.log("Status : " + event.type + " : " + event.info);
    });
	MigratoryDataClient.setMessageHandler(function(message) {
		var subject = message.subject;
		var fields = JSON.parse(message.content);

		var stockIndex = ACTIVE_SYMBOLS.indexOf(subject);
		if ( stockIndex >= 0) {
			for (var fieldName in fields) {
				updateField(stockIndex, fieldName, fields[fieldName]);
			}
		}
    });	
	MigratoryDataClient.connect();
	MigratoryDataClient.subscribe(ACTIVE_SYMBOLS);

	// init the blink timer
	blinkTimer = setInterval(blink, 100);
});

function updateField(stockIndex, fieldName, value) {
	var fieldIndex = FIELDS.indexOf(fieldName);
	if (fieldName == "CHANGE") {
		if (value > 0) {
			table.drawText(fieldIndex + 1, stockIndex + 1, value + "&#x25B2;", "green");
		} else if (value < 0) {
			table.drawText(fieldIndex + 1, stockIndex + 1, value + "&#x25BC;", "red");
		} else {
			table.drawText(fieldIndex + 1, stockIndex + 1, value);
		}
	} else {
		table.drawText(fieldIndex + 1, stockIndex + 1, value);
	}
	table.setColor(fieldIndex + 1, stockIndex + 1);
	table.setTimestamp(fieldIndex + 1, stockIndex + 1, new Date());
}

function blink() {
	var now = new Date();
	for (var i = 0; i < FIELDS.length; i++) {
		for (var j = 0; j < ACTIVE_SYMBOLS.length; j++) {
			var timestamp = table.getTimestamp(i + 1, j + 1);
			if (timestamp != null && timestamp != 0) {
				if (now - timestamp > 1000) {
					table.setBlankColor(i + 1, j + 1);
				}
			}
		}
	}
}
