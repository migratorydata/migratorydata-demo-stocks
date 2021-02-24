# MigratoryData Stocks Demo

A backend application which simulates a stocks feed. It generates market data 
like messages for a configurable list of stock symbols, and publishes those 
messages to a cluster of MigratoryData servers.

## Build

To compile the application execute:

```bash
./gradlew clean build
```

## Run

Supposing your MigratoryData server accepts client with the entitlement token 
`some-token` over unencrypted connections at the address `127.0.0.1:8800`, then 
to generate market data for the symbols `/stocks/AWERQ`, `/stocks/WERZF`, etc 
run the following command:

```bash
./gradlew run --args="127.0.0.1 8800 some-token false '/stocks/AWERQ,/stocks/WERZF,/stocks/QWZAF,/stocks/TEYDF,/stocks/TYUII,/stocks/XCVSD,/stocks/POUVB,/stocks/TYEWD,/stocks/WYWUI'"
```

```bash
java -jar ./build/libs/backend.jar 127.0.0.1 8800 some-token false '/stocks/AWERQ,/stocks/WERZF,/stocks/QWZAF,/stocks/TEYDF,/stocks/TYUII,/stocks/XCVSD,/stocks/POUVB,/stocks/TYEWD,/stocks/WYWUI'
```
