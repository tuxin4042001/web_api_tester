'use strict';

let http = require('http');
let sleep = require('sleep');
let request = require('then-request');
let config = require('./config/config.js');
let nodemailer = require('nodemailer');
let loadtest = require('loadtest');

let doLoadtest = true;
let doMonitortest = true;
let error = "";

//////////////////////////////////////////////////////////////////////////////
//                  CONFIG FOR LOAD TESTER
//////////////////////////////////////////////////////////////////////////////
// let loadtestUrl = "http://10.10.10.7:8100/api/lora/plugbase/0000000000000001currentstatus";
// let loadtestMethod = "GET";
// let loadtestMaxRequest = 1000;
// let loadtestMaxseconds = 50;
// let loadtestConcurrency = 20;
let loadtestConfig = config.loadtestConfig.loraDevCtrl;
let loadtestUrl = "http://" + config.hostMachine + ":" + config.webApiPortNum + "/api/lora/" + loadtestConfig.devicetype + "/" + loadtestConfig.applicationID + "/" + "currentstatus";
let loadtestQuery = loadtestUrl + "?dev_eui=" + loadtestConfig.devEUI;
let loadtestMethod = loadtestConfig.loadtestMethod;
let loadtestMaxRequest = loadtestConfig.loadtestMaxRequest;
let loadtestMaxseconds = loadtestConfig.loadtestMaxseconds;
let loadtestConcurrency = loadtestConfig.loadtestConcurrency;

if (doLoadtest) {
    //-----------------------------------------------------------------------------------------------------
    //------------- LOAD TEST SECTION----------------------------------------------------------------------
    let options = {
        url: loadtestUrl,
        method: loadtestMethod,
        maxRequests: loadtestMaxRequest, //the maximum request in the load test
        maxSeconds: loadtestMaxseconds,     //max number of seconds to run the test
        concurrency: loadtestConcurrency,    //the "clients" simulated

    };
    loadtest.loadTest(options, function (error, result) {
        console.log("tese for: " + loadtestUrl);
        console.log(loadtestConfig);

        if (result.totalErrors > 0) {
            error = 'Got Errors: ' + result.totalErrors;
            console.error(error);
            sendMail(error);
        } else {
            console.log('Tests run successfully');
            console.log(result);
        }
    });
}

//////////////////////////////////////////////////////////////////////////////
//                  CONFIG FOR LOAD MONITOR
//////////////////////////////////////////////////////////////////////////////
// let urlPrefix = "http://10.10.10.7:8100/api/lora";
// let deviceType = "/plugbase";
// let applicationID = "/0000000000000001";
// let urlSuffix = "/currentstatus";
// let url = urlPrefix + deviceType + applicationID + urlSuffix;
// let queryContent = "deviceStatuses";

let dataMonitorConfig = config.dataMonitorConfig.loraDevCtrl;
let dataMonitorUrl = "http://" + config.hostMachine + ":" + config.webApiPortNum + "/api/lora/" + dataMonitorConfig.devicetype + "/" + dataMonitorConfig.applicationID + "/" + "currentstatus";
let dataMonitorQuery = dataMonitorUrl + "?dev_eui=" + dataMonitorConfig.devEUI;
let dataMonitorQueryContent = dataMonitorConfig.queryContent;

if (doMonitortest) {
    //-----------------------------------------------------------------------------------------------------
    //------------- MONITOR SECTION------------------------------------------------------------------------
    setTimeout(function mainLoop() {
        request("GET", dataMonitorUrl).then((resp) => {
            let response = JSON.parse(resp.body.toString());
            if (resp.statusCode === 404 || response[dataMonitorQueryContent] === undefined) {
                if (resp.statusCode === 404) {
                    error = "404 Error, cannot find this page!";
                    console.log(error);
                    sendMail(error);
                } else if (response.dataMonitorQueryContent === undefined) {
                    error = response.dataMonitorQueryContent + " is empty!";
                    console.log(response.dataMonitorQueryContent + " is empty!");
                    sendMail(error);
                }
                sendMail();
            } else {
                console.log(dataMonitorUrl + ' query successful!');
                console.log(response);
            }
        });
    }, config.testInterval);
}