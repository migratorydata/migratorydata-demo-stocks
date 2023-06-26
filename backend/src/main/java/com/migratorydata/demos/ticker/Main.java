package com.migratorydata.demos.ticker;

public class Main {
	public static void main(String[] args) throws Exception {
		if (args.length != 6) {
			System.err.println("USAGE: java -jar ticker.jar ServerAddress ServerPort EntitlementToken Encryption Symbols GetSymbols");
			System.err.println("EXAMPLE: java -jar ticker.jar 127.0.0.1 8800 some-token false '/AWERQ,/WERZF,/QWZAF,/TEYDF,/TYUII,/XCVSD,/POUVB,/TYEWD,/WYWUI' '/GET_SYMBOLS'");
			System.exit(1);
		}

		String serverAddress = args[0];
		int serverPort = Integer.parseInt(args[1]);
		String entitlementToken = args[2];
		boolean useEncryption = Boolean.parseBoolean(args[3]);
		Publisher publisher = new Publisher(serverAddress, serverPort, entitlementToken, useEncryption);
		publisher.connect();

		String[] symbols = args[4].split("\\s*,\\s*");
		String getSymbols = args[5];
		StockFeed stockFeed = new StockFeed(publisher, symbols, getSymbols);
		stockFeed.start();

		// Add a shutdown hook that will catch CTRL-C and will cleanly shutdown this publisher application
		Runtime.getRuntime().addShutdownHook(new Thread() {
			public void run() {
				try {
					stockFeed.interrupt();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
}

