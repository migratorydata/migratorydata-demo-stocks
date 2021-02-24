function createStockTable() {
	table = new DynamicTable("tableId", FIELDS.length + 2, ACTIVE_SYMBOLS.length + 1);
	table.setRemoveRowCallback(removeRow);

	table.drawBoldText(0, 0, "SYMBOL");
	for (var i = 0; i < FIELDS.length; i++) {
		table.drawBoldText(i + 1, 0, FIELDS[i]);
	}
	table.drawBoldText(FIELDS.length + 1, 0, "");

	for (var i = 0; i < ACTIVE_SYMBOLS.length; i++) {
		table.drawText(0, i + 1, ACTIVE_SYMBOLS[i], ACTIVE_SYMBOLS[i]);
		table.drawButton(FIELDS.length + 1, i + 1, ACTIVE_SYMBOLS[i]);
	}
}

function updateSelectableStocks() {
	var select = document.getElementById("subscribeMenu");
	select.length = 0;

	var selectableSymbols = [];
	var index = 0;
	var test = true;
	for (i = 0; i < SYMBOLS.length; i++) {
		for (j = 0; j < ACTIVE_SYMBOLS.length; j++) {
			if (SYMBOLS[i] == ACTIVE_SYMBOLS[j]) {
				test = false;
				break;
			}
		}
		if (test == true) {
			selectableSymbols[index] = SYMBOLS[i];
			index++;
		}
		test = true;
	}

    select.add(new Option("- add symbol -"));
    for (i = 0; i < selectableSymbols.length; i++) {
        select.add(new Option(selectableSymbols[i], selectableSymbols[i]));
    }
}

function addRow(selection) {
	var symbol = selection.value;
	if (symbol == "- add symbol -") {
		alert("add a new symbol");
		return;
	}
	for (var i = 0; i < ACTIVE_SYMBOLS.length; i++) {
		if (symbol == ACTIVE_SYMBOLS[i]) {
			alert("symbol already subscribed");
			return;
		}
	}
	ACTIVE_SYMBOLS[ACTIVE_SYMBOLS.length] = symbol;

	table.addRow();
	table.drawText(0, ACTIVE_SYMBOLS.length, symbol);
	table.drawButton(FIELDS.length + 1, ACTIVE_SYMBOLS.length, symbol);
	updateSelectableStocks();

	MigratoryDataClient.subscribe([symbol]);
}

function removeRow(symbol) {
	var itemIndex = -1;
	for (var i = 0; i < ACTIVE_SYMBOLS.length; i++) {
		if (symbol == ACTIVE_SYMBOLS[i]) {
			itemIndex = i;
			break;
		}
	}
	if (itemIndex == -1) {
		alert("invalid symbol: '" + symbol + "'");
		return;
	}
	delete ACTIVE_SYMBOLS[itemIndex];
	for (var i = itemIndex; i < ACTIVE_SYMBOLS.length - 1; i++) {
		ACTIVE_SYMBOLS[i] = ACTIVE_SYMBOLS[i + 1];
	}
	ACTIVE_SYMBOLS.pop();

	table.removeRow(itemIndex + 1);
	updateSelectableStocks();
	
	MigratoryDataClient.unsubscribe([symbol]);
}
