// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.14/esri/copyright.txt for details.
//>>built
define("esri/tasks/NAServiceDescription",["dojo/_base/declare","dojo/json","dojo/Deferred","../request"],function(h,n,p,f){return h(null,{declaredClass:"esri.tasks._NAServiceDescription",getServiceDescription:function(k,h){var c=new p;if(this._url&&this._url.orig){var b=this._url.orig,q=(this._url.path.match(/\/solve$/)||[]).length?"Route":(this._url.path.match(/\/solveClosestFacility$/)||[]).length?"ClosestFacility":"ServiceAreas",g,m=function(e){f({url:e+("/"===e[e.length-1]?"":"/")+"GetTravelModes/execute",
content:{f:"json",serviceName:q},callbackParamName:"callback"}).then(function(a){var l=[],e=null;if(a&&a.results&&a.results.length)for(var d=0;d<a.results.length;d++)if("supportedTravelModes"===a.results[d].paramName){if(a.results[d].value&&a.results[d].value.features)for(var b=0;b<a.results[d].value.features.length;b++)if(a.results[d].value.features[b].attributes){var f=n.parse(a.results[d].value.features[b].attributes.TravelMode);l.push(f)}}else"defaultTravelMode"===a.results[d].paramName&&(e=a.results[d].value);
g.supportedTravelModes=l;g.defaultTravelMode=e;c.resolve(g)},function(a){console.log("Could not read from the routingUtilities service.");c.reject(a)})};f({url:b,content:{f:"json"},callbackParamName:"callback"}).then(function(e){g=e;h?c.resolve(e):k?m(k):f({url:b.substring(0,b.indexOf("/rest/")+6)+"info",content:{f:"json"},callbackParamName:"callback"}).then(function(a){a.owningSystemUrl?(b=a.owningSystemUrl,f({url:b+("/"===b[b.length-1]?"":"/")+"sharing/portals/self",content:{f:"json"},callbackParamName:"callback"}).then(function(a){a&&
a.helperServices&&a.helperServices.routingUtilities&&a.helperServices.routingUtilities.url?m(a.helperServices.routingUtilities.url):(console.log("Portal does not have helperServices.routingUtilities defined."),c.resolve(g))},function(a){console.log("Could not get to the portal's self.");c.reject(a)})):c.resolve(g)},function(a){console.log("Could not get to the NAServer service description.");c.reject(a)})},function(b){c.reject(b)})}else c.reject("NA Task has no URL specified.");return c.promise}})});