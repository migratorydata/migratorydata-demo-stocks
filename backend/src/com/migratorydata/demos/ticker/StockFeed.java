package com.migratorydata.demos.ticker;

import java.util.*;
import java.lang.Exception;

public class StockFeed extends Thread {
	private final Random random = new Random();

	private final Stock[] stocks;
	private final Publisher publisher;

	public StockFeed(Publisher publisher, String[] symbols) {
		this.publisher = publisher;
		this.stocks = new Stock[symbols.length];
		for (int i = 0; i < symbols.length; i++) {
			stocks[i] = new Stock(symbols[i]);
		}
	}

	@Override
	public void run() {
		boolean init = true;

		while (true) {
			if (isInterrupted()) {
				break;
			}

			if (publisher.isConnected()) {
				if (init) {
					for (int i = 0; i < stocks.length; i++) {
						Stock stock = stocks[i];
						stock.initStock();
						publisher.publish(stock);
					}
					init = false;
				} else {
					Stock stock = stocks[random.nextInt(stocks.length)];
					stock.updateStock();
					publisher.publish(stock);
				}
			}

			try {
				Thread.sleep(300);
			} catch (Exception e) {
			}
		}
	}
}
