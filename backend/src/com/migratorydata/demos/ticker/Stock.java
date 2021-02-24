package com.migratorydata.demos.ticker;

import java.util.Random;

public class Stock {
    private final Random random = new Random();

    private float absolutePrice; // used to generate the referencePrice, closePrice, and maxChange
    private float referencePrice; // used to generate all the others fields of the stock
    private float closePrice; // to generate once a cycle (day)
    private float maxChange; // represent the maximum amount of the reference price variation

    private String symbol;
    private float lastPrice;
    private float change;
    private float changePercent;

    public Stock(String symbol) {
        this.symbol = symbol;
    }

    public void updateStock() {
        referencePrice += ((random.nextFloat() > 0.5f) ? random.nextFloat() : -random.nextFloat()) * maxChange;
        lastPrice = referencePrice + (2 * random.nextFloat() - 1) * maxChange;
        change = lastPrice - closePrice;
        changePercent = 100f * (change / closePrice);
    }

    public void initStock() {
        absolutePrice = 10 + random.nextInt(100) + random.nextFloat();
        maxChange = absolutePrice / 500f;
        closePrice = absolutePrice + (2 * random.nextFloat() - 1)  * maxChange;

        referencePrice = absolutePrice;
        lastPrice = referencePrice + (2 * random.nextFloat() - 1) * maxChange;
        change = lastPrice - closePrice;
        changePercent = 100f * (change / closePrice);
    }

    public float getChange() {
        return change;
    }

    public float getChangePercent() {
        return changePercent;
    }

    public float getLastPrice() {
        return lastPrice;
    }

    public String getSymbol() {
        return symbol;
    }
}