generator = require 'loopback-angular-sdk'

{ defaults } = require 'lodash'

mountAdmin = (loopbackApplication, opts) ->
  loopback = loopbackApplication.loopback

  router = new loopback.Router()
  configJS = services loopbackApplication, name: 'loopback.sdk'

  resourcePath = opts.resourcePath

  if resourcePath[0] isnt '/'
    resourcePath = '/' + resourcePath

  router.get resourcePath, (req, res) ->
    res.status(200).send configJS
    return

  router

module.exports = (loopbackApplication, options) ->
  options = defaults {}, options,
    mountPaths: [ '/' ]
    resourcePath: '/js/services.js'

  routePath = mountAdmin loopbackApplication, options

  for mountPath in options.mountPaths
    loopbackApplication.use mountPath, routePath

  return