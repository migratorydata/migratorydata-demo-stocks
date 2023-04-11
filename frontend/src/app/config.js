export let config = {
    TOKEN: "some-token",

    SERVERS: [
        "https://demo.migratorydata.com",
    ],
    
    SYMBOLS: [
        "/AWERQ", 
        "/WERZF", 
        "/QWZAF", 
        "/TEYDF", 
        "/TYUII", 
        "/XCVSD", 
        "/POUVB", 
        "/TYEWD", 
        "/WYWUI",
    ],
    
    ACTIVE_SYMBOLS: [
        "/AWERQ", 
        "/WERZF", 
        "/QWZAF", 
        "/TEYDF", 
        "/TYUII",
    ],
    
    FIELDS: [
        "TIME", 
        "PRICE",
        "CHANGE", 
    ],
    
    table: null,
    blinkTimer: null,
    client: null
}