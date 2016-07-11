# huerainbo
Dancing rainbow to control Philips Hue lights

[Huerainbo!](http://kk2j.com/huerainbo/index.html)

#### This application makes use of the following libraries:
* [TWGL.js](https://github.com/greggman/twgl.js) by [Greggman](https://github.com/greggman)
  - A Tiny WebGL helper Library
* [jsHue](https://github.com/blargoner/jshue) by [blargoner](https://github.com/blargoner)
  - A simple JavaScript library for Philips Hue.

#### How?

* huerainbo asks your browser to call the www.meethue.com/api/nupnp Philips API for the bridge on your network
* Your browser talks to the bridge  directly via AJAX (some stupidity around browser settings means that
 the huerainbo webpage must be served over HTTP)
* WebGL fragment shader displays a moving rainbow you can click on to choose a colour. Have fun!
 