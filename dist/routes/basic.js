"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../utils/parser");
class BasicRoutes {
}
BasicRoutes.filePath = "./rabbitmq.json";
/**
 * Applies all REST user routes
 */
BasicRoutes.applyTo = (router) => {
    router.get("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let parsedData = parser_1.default.parse(BasicRoutes.filePath);
        res.render('pages/index', {
            allRequests: parsedData.allRequests,
            allConsumes: parsedData.allConsumes
        });
    }));
    router.get('/perService', function (req, res) {
        let parsedData = parser_1.default.parse(BasicRoutes.filePath);
        res.render('pages/perService', {
            services: parsedData.services
        });
    });
    router.get('/models', function (req, res) {
        let parsedData = parser_1.default.parse(BasicRoutes.filePath);
        res.render('pages/models', {
            models: parsedData.models,
            singleModel: undefined,
            singleModelName: undefined
        });
    });
    router.get('/models/:name', function (req, res) {
        let parsedData = parser_1.default.parse(BasicRoutes.filePath);
        let modelName = req.params.name;
        res.render('pages/models', {
            models: parsedData.models,
            singleModel: parsedData.models[modelName],
            singleModelName: modelName
        });
    });
};
exports.BasicRoutes = BasicRoutes;
/*const express = require('express');
const router = express.Router();
var metrics = require('express-node-metrics').metrics;
var _ = require('lodash');

router.get('/', function (req, res) {
  if(req.query.reset){
    metrics.apiMetrics(true);
    res.render('pages/index', {
      groupedData: {}
    });
  } else{
    res.render('pages/index', {
      groupedData: parseApiMetricsGrouped(metrics.apiMetrics(false))
    });
  }
});

router.get('/apiMeter', function (req, res) {
  if(req.query.reset){
    metrics.apiMetrics(true);
    res.render('pages/apiMeter', {
      groupedData: {}
    });
  } else{
    res.render('pages/apiMeter', {
      groupedData: parseApiMetricsGrouped(metrics.apiMetrics(false))
    });
  }
});

router.get('/process', function (req, res) {
  if(req.query.reset){
    metrics.processMetrics(true);
    res.render('pages/process', {
      processData: {}
    });
  } else{
    var dataJSON = metrics.processMetrics(false) ? JSON.parse(metrics.processMetrics(false)) : {};
    if(dataJSON){
      dataJSON.run.uptime = Math.round(dataJSON.run.uptime / 1000);
      if(!dataJSON.run.activeRequests) dataJSON.run.activeRequests = 0;
      if(!dataJSON.cpu.usage) dataJSON.cpu.usage = 0;
    }
    res.render('pages/process', {
      processData: dataJSON
    });
  }
});

router.get('/errors', function (req, res) {
  if(req.query.reset){
    metrics.getAll(true);
    res.render('pages/errors', {
      errorsData: {}
    });
  } else{
    var dataJSON = metrics.getAll(false) ? JSON.parse(metrics.getAll(false)) : {};
    dataJSON = dataJSON.parDdj ? dataJSON.parDdj : {};
    res.render('pages/errors', {
      errorsData: dataJSON
    });
  }
});

parseApiMetricsGrouped = function (metricsData) {
  var dataJSON = metricsData ? JSON.parse(metricsData) : {};
  var groupedData = {};
  for(var e in dataJSON.endpoints) {
    if (e.toString().startsWith('/api/')){
      var wholeName = e.toString().substring(5);
      var nextSlashIndex = wholeName.indexOf('/');
      var endIndex = wholeName.indexOf('|');
      var groupName = wholeName.substring(0, nextSlashIndex);
      var routeName = wholeName.substring(nextSlashIndex, endIndex);
      if(routeName && groupName){
        if(groupedData[groupName]){
          groupedData[groupName][routeName] = {meter: dataJSON.endpoints[e].meter, histogram: dataJSON.endpoints[e].histogram};
        } else{
          groupedData[groupName] = {};
          groupedData[groupName][routeName] = {meter: dataJSON.endpoints[e].meter, histogram: dataJSON.endpoints[e].histogram};
        }
      }
    } else{
      if(groupedData['others']){
        groupedData['others'][e.toString()] = {meter: dataJSON.endpoints[e].meter, histogram: dataJSON.endpoints[e].histogram};
      } else{
        groupedData['others'] = {};
        groupedData['others'][e.toString()] = {meter: dataJSON.endpoints[e].meter, histogram: dataJSON.endpoints[e].histogram};
      }
    }
  }
  return groupedData;
};

module.exports = router;*/
