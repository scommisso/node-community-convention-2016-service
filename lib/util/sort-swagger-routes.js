'use strict';

module.exports = sortSwaggerRoutes;

function getRouteDefinition(spec) {
  var path = spec.path;
  var paramRegex = /[^\\]\{([^\}]+)\}/g;
  var params = [];
  var match;
  while (!!(match = paramRegex.exec(path))) {
    params.push(match[1]);
  }
  // path without the parameters placeholders
  var normalizedPath = path.replace(paramRegex, '');
  return {
    path: path,
    arity: params.length,
    params: params,
    normalizedPath: normalizedPath
  };
}

function flattenModules(modules) {
  // Load all routes from the swagger schema files
  var routes = [];
  modules.forEach(function (resource) {
    // make sure we have only one route per object
    for (var name in resource) {
      var obj = {};
      obj[name] = resource[name];
      routes.push(obj);
    }
  });
  return routes;
}

function sortSwaggerRoutes(modules) {
  var routes = flattenModules(modules);
  var sorted = routes.sort(function (a, b) {
    var specA = a[Object.keys(a)[0]].spec;
    var specB = b[Object.keys(b)[0]].spec;
    var defA = getRouteDefinition(specA);
    var defB = getRouteDefinition(specB);

    if (defA.path < defB.path) {
      return -1;
    } else if (defA.path > defB.path) {
      return 1;
    }

    return 0;
  });

  return sorted;
}
