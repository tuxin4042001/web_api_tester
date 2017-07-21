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
let loadtestConfig = {
    loraDevCtrl: {
        devEUI: "",
        devicetype: "plugbase",
        applicationID: 0000000000000001,
        loadtestUrl: "http://" + config.hostMachine + "/" + config.hostMachine + "/api/lora/" + loadtestConfig.loraDevCtrl.devicetype + 
             "/" + loatestConfig.loraDevCtrl.applicationID + "/" + "currentstatus",
        loadtestQuery: loadtestUrl + "?dev_eui=" + loadtestConfig.loraDevCtrl.devEUI,
        loadtestMethod: "GET",
        loadtestMaxRequest: 1000,
        loadtestMaxseconds: 50,
        loadtestConcurrency: 20
    }
}

//MONITOR CONFIG
let dataMonitorConfig = {
    loraDevCtrl: {
        devEUI: "",
        devicetype: "plugbase",
        applicationID: 0000000000000001,
        monitorUrl: "http://" + config.hostMachine + "/" + config.hostMachine + "/api/lora/" + loadtestConfig.loraDevCtrl.devicetype +
        "/" + loatestConfig.loraDevCtrl.applicationID + "/" + "currentstatus",
        monitorQuery: loadtestUrl + "?dev_eui=" + loadtestConfig.loraDevCtrl.devEUI
    }
}


// ----------------------------------------------------------------------------------------
// ---------------------------------- DO NOT MODIFY ---------------------------------------
// ----------------------------------------------------------------------------------------


module.exports = config;
