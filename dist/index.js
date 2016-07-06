var defaults, fs, generator, mountAdmin, path;

generator = require('loopback-angular-sdk');

fs = require('fs');

path = require('path');

defaults = require('lodash').defaults;

mountAdmin = function(loopbackApplication, opts) {
  var configJS, loopback, resourcePath, router;
  loopback = loopbackApplication.loopback;
  router = new loopback.Router();
  configJS = services(loopbackApplication, {
    name: 'loopback.sdk'
  });
  resourcePath = opts.resourcePath;
  if (resourcePath[0] !== '/') {
    resourcePath = '/' + resourcePath;
  }
  router.get(resourcePath, function(req, res) {
    res.status(200).send(configJS);
  });
  return router;
};

module.exports = function(loopbackApplication, options) {
  var i, len, mountPath, ref, routePath;
  options = defaults({}, options, {
    mountPaths: ['/'],
    resourcePath: '/js/services.js'
  });
  routePath = mountAdmin(loopbackApplication, options);
  ref = options.mountPaths;
  for (i = 0, len = ref.length; i < len; i++) {
    mountPath = ref[i];
    loopbackApplication.use(mountPath, routePath);
  }
};
