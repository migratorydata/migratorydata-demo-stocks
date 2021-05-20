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
	for (i = 0; i < SYMBOLS.length; i++) {
		if (ACTIVE_SYMBOLS.indexOf(SYMBOLS[i]) == -1) {
			selectableSymbols[index] = SYMBOLS[i];
			index++;
		}
	}

    select.add(new Option("- add symbol -"));
    for (i = 0; i < selectableSymbols.length; i++) {
        select.add(new Option(selectableSymbols[i], selectableSymbols[i]));
    }
}

function addRow(selection) {
	var symbol = selection.value;

	ACTIVE_SYMBOLS[ACTIVE_SYMBOLS.length] = symbol;

	table.addRow();
	table.drawText(0, ACTIVE_SYMBOLS.length, symbol);
	table.drawButton(FIELDS.length + 1, ACTIVE_SYMBOLS.length, symbol);
	updateSelectableStocks();

	MigratoryDataClient.subscribe([symbol]);
}

function removeRow(symbol) {
	var itemIndex = ACTIVE_SYMBOLS.indexOf(symbol);
	ACTIVE_SYMBOLS.splice(itemIndex, 1);

	table.removeRow(itemIndex + 1);
	updateSelectableStocks();
	
	MigratoryDataClient.unsubscribe([symbol]);
}
