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
		for (var fieldName in fields) {
			for (var i = 0; i < ACTIVE_SYMBOLS.length; i++) {
				if (ACTIVE_SYMBOLS[i] == subject) {
					updateField(i, fieldName, fields[fieldName]);
					break;
				}
			}
		}
    });	
	MigratoryDataClient.connect();
	MigratoryDataClient.subscribe(ACTIVE_SYMBOLS);

	// init the blink timer
	blinkTimer = setInterval(blink, 100);
});

function updateField(stockIndex, fieldName, value) {
	for (var i = 0; i < FIELDS.length; i++) {
		if (FIELDS[i] == fieldName) {
			if (fieldName == "CHANGE") {
				if (value > 0) {
					table.drawText(i + 1, stockIndex + 1, value + "&#x25B2;", "green");
				} else if (value < 0) {
					table.drawText(i + 1, stockIndex + 1, value + "&#x25BC;", "red");
				} else {
					table.drawText(i + 1, stockIndex + 1, value);
				}
			} else {
				table.drawText(i + 1, stockIndex + 1, value);
			}
			table.setColor(i + 1, stockIndex + 1);
			table.setTimestamp(i + 1, stockIndex + 1, new Date());
		}
	}
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
