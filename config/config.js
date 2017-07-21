let config = {};

//LOAD TEST TARGET SERVER
config.environment = "test";

if(config.environment === "test") {
    config.hostMachine = "10.10.10.7";
    config.webApiPortNum = 8100;
}
if(config.environment === "prod") {
    config.hostMachine = "10.10.10.7";
    config.webApiPortNum = 8000;
}

config.acceptedEnvironments = [
    "test",
    "prod"
];
if(config.acceptedEnvironments.includes(config.environment) == false)
    throw new Error("Error: Invalid environment name. Please check your config file.");

//LOADTESTER CONFIG
config.loadtestConfig = {
    loraDevCtrl: {
        devEUI: "",
        devicetype: "plugbase",
        applicationID: 0000000000000001,
        loadtestMethod: "GET",
        loadtestMaxRequest: 1000,
        loadtestMaxseconds: 50,
        loadtestConcurrency: 20
    }
}

//MONITOR CONFIG
config.testInterval = 5000;
config.dataMonitorConfig = {
    loraDevCtrl: {
        devEUI: "",
        devicetype: "plugbase",
        applicationID: 0000000000000001,
        queryContent: "deviceStatuses"
    }
}


// ----------------------------------------------------------------------------------------
// ---------------------------------- DO NOT MODIFY ---------------------------------------
// ----------------------------------------------------------------------------------------


module.exports = config;
