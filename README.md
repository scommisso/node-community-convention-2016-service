node-community-convention-2016-service
=================================

An associated slide deck is available
[here](http://prezi.com/i2td-9dox_or/?utm_campaign=share&utm_medium=copy). 

This project is a demonstration of the following modules: 

[swagger-node-express](https://www.npmjs.com/package/swagger-node-express)
--------------------------------------------------------------------------
[Swagger](http://swagger.io/) is a specification for a RESTful API.
[swagger-node-express](https://www.npmjs.com/package/swagger-node-express) is an
implementation of the specification for Node using Express. Routes are
declaratively defined in JSON files (or YAML if using Swagger 2.x), which are
used to provide both the validation logic as well as a test harness. It is a 
lightweight alternative to something like hapi.js or koa. The documentation
can also be used to generate Swagger clients in a variety of platforms
(JS, C#, Java). 

[swagger-node-express](https://www.npmjs.com/package/swagger-node-express)
generates a UI to work with a Swagger API, as well as provides an
[Express](http://expressjs.com/)-compatible wrapper for Swagger.

[swagger-validation](https://github.com/wonderlic/swagger-validation) uses
the swagger models in order to provide basic data validation for API requests.

[nconf](https://github.com/indexzero/nconf)
-------------------------------------------
A configuration management utility. Used in this case to store both plain-text
and encrypted configuration values.

[flipr](https://github.com/godaddy/node-flipr)
----------------------------------------------
A layer on top of the standard configuration that provides both a/b test
and feature-flipping capabilities.

[cluster-service](https://github.com/godaddy/node-cluster-service)
------------------------------------------------------------------
Runs a node application as a multi-process service. Provides REST and CLI
management tools.

[winston](https://github.com/winstonjs/winston)
-----------------------------------------------
A logger that supports multiple transports.
