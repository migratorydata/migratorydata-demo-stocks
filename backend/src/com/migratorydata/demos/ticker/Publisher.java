package com.migratorydata.demos.ticker;

import com.migratorydata.client.*;

import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class Publisher {
    private volatile boolean connected = false;

    private final MigratoryDataClient client = new MigratoryDataClient();

    public Publisher(String serverAddress, int serverPort, String token, boolean encryption) {
        // define the handler for processing the logs triggered by the MigratoryData library
        client.setLogListener(new MigratoryDataLogListener() {
            @Override
            public void onLog(String log, MigratoryDataLogLevel level) {
                System.out.println(String.format("[%1$s] [%2$s] %3$s", new Date(System.currentTimeMillis()), level, log));
            }
        }, MigratoryDataLogLevel.DEBUG);

        // define the entitlement token
        client.setEntitlementToken(token);

        // specify whether to connect using encryption or not
        if (encryption) {
            client.setEncryption(true);
        }

        // define the handler for processing the messages received by the MigratoryData client as well as the status notifications
        client.setListener(new MigratoryDataListener() {
            @Override
            public void onStatus(String status, String info) {
                System.out.println(String.format("[%1$s] [APP] Got Status: %2$s %3$s", new Date(System.currentTimeMillis()), status, info));

                if (status.equals(MigratoryDataClient.NOTIFY_SERVER_UP)) {
                    connected = true;
                } else if (status.equals(MigratoryDataClient.NOTIFY_SERVER_DOWN)) {
                    connected = false;
                }
            }
            @Override
            public void onMessage(MigratoryDataMessage message) {
                // not called because this demo app is a publisher only
                System.out.println(String.format("[%1$s] [APP] Got Message: %2$s", new Date(System.currentTimeMillis()), message));
            }
        });

        // define where the client should connect to
        client.setServers(new String[]{serverAddress + ":" + serverPort});
    }

    public void connect() {
        client.connect();
    }

    public void disconnect() {
        client.disconnect();
        connected = false;
    }

    public boolean isConnected() {
        return connected;
    }

    public void publish(Stock stock) {
        StringBuilder builder = new StringBuilder();

        builder.append("{");
        // add last price
        builder.append('"').append("PRICE").append('"').append(":");
        builder.append('"').append(String.format(Locale.US, "%1$.2f", stock.getLastPrice())).append('"').append(",");
        // add change
        builder.append('"').append("CHANGE").append('"').append(":");
        builder.append('"').append(String.format(Locale.US, "%1$.2f", stock.getChange())).append('"').append(",");
        // add timestamp
        builder.append('"').append("TIME").append('"').append(":");
        builder.append('"').append(String.format(Locale.US, "%1$tT", Calendar.getInstance())).append('"');
        builder.append("}");

        client.publish(new MigratoryDataMessage(stock.getSymbol(), builder.toString().getBytes()));
    }
}
