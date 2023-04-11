import {DynamicTable} from './dynamic-table';
import {config} from './config';

export function createStockTable() {
	var table = new DynamicTable("tableId", config.FIELDS.length + 2, config.ACTIVE_SYMBOLS.length + 1);
	config.table = table;
	table.setRemoveRowCallback(removeRow);

	table.drawBoldText(0, 0, "SYMBOL");
	for (var i = 0; i < config.FIELDS.length; i++) {
		table.drawBoldText(i + 1, 0, config.FIELDS[i]);
	}
	table.drawBoldText(config.FIELDS.length + 1, 0, "");

	for (var i = 0; i < config.ACTIVE_SYMBOLS.length; i++) {
		table.drawText(0, i + 1, config.ACTIVE_SYMBOLS[i], config.ACTIVE_SYMBOLS[i]);
		table.drawButton(config.FIELDS.length + 1, i + 1, config.ACTIVE_SYMBOLS[i]);
	}
}

export function updateSelectableStocks() {
	var select = document.getElementById("subscribeMenu");
	select.length = 0;

	var selectableSymbols = [];
	var index = 0;
	for (var i = 0; i < config.SYMBOLS.length; i++) {
		if (config.ACTIVE_SYMBOLS.indexOf(config.SYMBOLS[i]) == -1) {
			selectableSymbols[index] = config.SYMBOLS[i];
			index++;
		}
	}

    select.add(new Option("- add symbol -"));
    for (var i = 0; i < selectableSymbols.length; i++) {
        select.add(new Option(selectableSymbols[i], selectableSymbols[i]));
    }
}

export function addRow(selection) {
	var symbol = selection.value;

	config.ACTIVE_SYMBOLS[config.ACTIVE_SYMBOLS.length] = symbol;

	var table = config.table;

	table.addRow();
	table.drawText(0, config.ACTIVE_SYMBOLS.length, symbol);
	table.drawButton(config.FIELDS.length + 1, config.ACTIVE_SYMBOLS.length, symbol);
	updateSelectableStocks();

	config.client.subscribe([symbol]);
}

export function removeRow(symbol) {
	var itemIndex = config.ACTIVE_SYMBOLS.indexOf(symbol);
	config.ACTIVE_SYMBOLS.splice(itemIndex, 1);

	config.table.removeRow(itemIndex + 1);
	updateSelectableStocks();
	
	config.client.unsubscribe([symbol]);
}

export function updateField(stockIndex, fieldName, value) {
	var table = config.table;
	var fieldIndex = config.FIELDS.indexOf(fieldName);
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

export function blink() {
	var now = new Date();
	for (var i = 0; i < config.FIELDS.length; i++) {
		for (var j = 0; j < config.ACTIVE_SYMBOLS.length; j++) {
			var timestamp = config.table.getTimestamp(i + 1, j + 1);
			if (timestamp != null && timestamp != 0) {
				if (now - timestamp > 1000) {
					config.table.setBlankColor(i + 1, j + 1);
				}
			}
		}
	}
}

window.addRow = addRow;