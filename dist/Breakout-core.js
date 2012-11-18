/***
	Breakout - 0.2.0

    Copyright (c) 2011-2012 Jeff Hoefs <soundanalogous@gmail.com>
    Released under the MIT license. See LICENSE file for details.
	http.//breakoutjs.com
	***/
'use strict';var BO=BO||{},BREAKOUT=BREAKOUT||BO;BREAKOUT.VERSION="0.2.0";BO.enableDebugging=!1;var JSUTILS=JSUTILS||{};JSUTILS.namespace=function(a){var a=a.split("."),d=window,b;for(b=0;b<a.length;b+=1)"undefined"===typeof d[a[b]]&&(d[a[b]]={}),d=d[a[b]];return d};JSUTILS.inherit=function(a){function d(){}if(null===a)throw TypeError();if(Object.create)return Object.create(a);var b=typeof a;if("object"!==b&&"function"!==b)throw TypeError();d.prototype=a;return new d};
if(!Function.prototype.bind)Function.prototype.bind=function(a){if("function"!==typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var d=Array.prototype.slice.call(arguments,1),b=this,g=function(){},c=function(){return b.apply(this instanceof g?this:a||window,d.concat(Array.prototype.slice.call(arguments)))};g.prototype=this.prototype;c.prototype=new g;return c};JSUTILS.namespace("JSUTILS.Event");
JSUTILS.Event=function(){var a;a=function(a){this._type=a;this._target=null;this.name="Event"};a.prototype={get type(){return this._type},set type(a){this._type=a},get target(){return this._target},set target(a){this._target=a}};a.CONNECTED="connected";a.CHANGE="change";a.COMPLETE="complete";return a}();JSUTILS.namespace("JSUTILS.EventDispatcher");
JSUTILS.EventDispatcher=function(){var a;a=function(a){this._target=a||null;this._eventListeners={};this.name="EventDispatcher"};a.prototype={addEventListener:function(a,b){this._eventListeners[a]||(this._eventListeners[a]=[]);this._eventListeners[a].push(b)},removeEventListener:function(a,b){for(var g=0,c=this._eventListeners[a].length;g<c;g++)this._eventListeners[a][g]===b&&this._eventListeners[a].splice(g,1)},hasEventListener:function(a){return this._eventListeners[a]&&0<this._eventListeners[a].length?
!0:!1},dispatchEvent:function(a,b){a.target=this._target;var g=!1,c;for(c in b)b.hasOwnProperty(c)&&(a[c.toString()]=b[c]);if(this.hasEventListener(a.type)){c=0;for(var j=this._eventListeners[a.type].length;c<j;c++)try{this._eventListeners[a.type][c].call(this,a),g=!0}catch(p){console.log("error: Error calling event handler. "+p)}}return g}};return a}();JSUTILS.namespace("JSUTILS.TimerEvent");
JSUTILS.TimerEvent=function(){var a,d=JSUTILS.Event;a=function(a){this.name="TimerEvent";d.call(this,a)};a.TIMER="timerTick";a.TIMER_COMPLETE="timerComplete";a.prototype=JSUTILS.inherit(d.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("JSUTILS.Timer");
JSUTILS.Timer=function(){var a,d=JSUTILS.TimerEvent,b=JSUTILS.EventDispatcher;a=function(a,c){b.call(this,this);this.name="Timer";this._count=0;this._delay=a;this._repeatCount=c||0;this._isRunning=!1;this._timer=null};a.prototype=JSUTILS.inherit(b.prototype);a.prototype.constructor=a;a.prototype.__defineGetter__("delay",function(){return this._delay});a.prototype.__defineSetter__("delay",function(a){this._delay=a;this._isRunning&&(this.stop(),this.start())});a.prototype.__defineGetter__("repeatCount",
function(){return this._repeatCount});a.prototype.__defineSetter__("repeatCount",function(a){this._repeatCount=a;this._isRunning&&(this.stop(),this.start())});a.prototype.__defineGetter__("running",function(){return this._isRunning});a.prototype.__defineGetter__("currentCount",function(){return this._count});a.prototype.start=function(){if(null===this._timer)this._timer=setInterval(this.onTick.bind(this),this._delay),this._isRunning=!0};a.prototype.reset=function(){this.stop();this._count=0};a.prototype.stop=
function(){if(null!==this._timer)clearInterval(this._timer),this._timer=null,this._isRunning=!1};a.prototype.onTick=function(){this._count+=1;0!==this._repeatCount&&this._count>this._repeatCount?(this.stop(),this.dispatchEvent(new d(d.TIMER_COMPLETE))):this.dispatchEvent(new d(d.TIMER))};return a}();JSUTILS.namespace("JSUTILS.SignalScope");
JSUTILS.SignalScope=function(){var a;a=function(a,b,g,c,j,p,l){this.name="SignalScope";this._canvas=document.getElementById(a);this._ctx=this._canvas.getContext("2d");this._width=b;this._height=g;this._rangeMin=c;this._rangeMax=j;this._ch1Color=p||"#FF0000";this._ch2Color=l||"#0000FF";this._markers=null;this._ch1Values=Array(b);this._ch2Values=Array(b);for(a=0;a<b;a++)this._ch1Values[a]=0,this._ch2Values[a]=0;this._range=100*(1/(j-c))};a.prototype.update=function(a,b){this._ctx.clearRect(0,0,this._width,
this._height);this._ch1Values.push(a);this._ch1Values.shift();this.drawChannel(this._ch1Values,this._ch1Color);void 0!==b&&(this._ch2Values.push(b),this._ch2Values.shift(),this.drawChannel(this._ch2Values,this._ch2Color));this.drawMarkers()};a.prototype.drawChannel=function(a,b){var g=0;this._ctx.strokeStyle=b;this._ctx.lineWidth=1;this._ctx.beginPath();this._ctx.moveTo(0,this._height);for(var c=0,j=a.length;c<j;c++)g=(this._rangeMax-a[c])*this._range,this._ctx.lineTo(c,g);this._ctx.stroke()};a.prototype.drawMarkers=
function(){var a=0;if(null!==this._markers)for(var b=0,g=this._markers.length;b<g;b++)a=(this._rangeMax-this._markers[b][0])*this._range,this._ctx.strokeStyle=this._markers[b][1],this._ctx.lineWidth=0.5,this._ctx.beginPath(),this._ctx.moveTo(0,a),this._ctx.lineTo(this._width,a),this._ctx.stroke()};a.prototype.addMarker=function(a,b){if(null===this._markers)this._markers=[];this._markers.push([a,b])};a.prototype.removeAllMarkers=function(){this._markers=null};return a}();JSUTILS.namespace("BO.IOBoardEvent");
BO.IOBoardEvent=function(){var a,d=JSUTILS.Event;a=function(a){this.name="IOBoardEvent";d.call(this,a)};a.ANALOG_DATA="analogData";a.DIGITAL_DATA="digitalData";a.FIRMWARE_VERSION="firmwareVersion";a.FIRMWARE_NAME="firmwareName";a.STRING_MESSAGE="stringMessage";a.SYSEX_MESSAGE="sysexMessage";a.PIN_STATE_RESPONSE="pinStateResponse";a.READY="ioBoardReady";a.CONNECTED="ioBoardConnected";a.DISCONNECTED="ioBoardDisonnected";a.prototype=JSUTILS.inherit(d.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.WSocketEvent");
BO.WSocketEvent=function(){var a,d=JSUTILS.Event;a=function(a){this.name="WSocketEvent";d.call(this,a)};a.CONNECTED="webSocketConnected";a.MESSAGE="webSocketMessage";a.CLOSE="webSocketClosed";a.prototype=JSUTILS.inherit(d.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.WSocketWrapper");
BO.WSocketWrapper=function(){var a,d=JSUTILS.EventDispatcher,b=BO.WSocketEvent;a=function(a,c,b){this.name="WSocketWrapper";d.call(this,this);this._host=a;this._port=c;this._protocol=b||"default-protocol";this._socket=null;this._readyState="";this.init(this)};a.prototype=JSUTILS.inherit(d.prototype);a.prototype.constructor=a;a.prototype.init=function(a){if("undefined"!==typeof io){a._socket=io.connect("http://"+a._host+":"+a._port);try{a._socket.on("connect",function(){a._socket.socket.options.reconnect=
!1;a.dispatchEvent(new b(b.CONNECTED));a._socket.on("message",function(c){a.dispatchEvent(new b(b.MESSAGE),{message:c})})})}catch(c){console.log("Error "+c)}}else try{if("MozWebSocket"in window)a._socket=new MozWebSocket("ws://"+a._host+":"+a._port+"/websocket",a._protocol);else if("WebSocket"in window)a._socket=new WebSocket("ws://"+a._host+":"+a._port+"/websocket");else throw console.log("Websockets not supported by this browser"),"Websockets not supported by this browser";a._socket.onopen=function(){a.dispatchEvent(new b(b.CONNECTED));
a._socket.onmessage=function(c){a.dispatchEvent(new b(b.MESSAGE),{message:c.data})};a._socket.onclose=function(){a._readyState=a._socket.readyState;a.dispatchEvent(new b(b.CLOSE))}}}catch(j){console.log("Error "+j)}};a.prototype.send=function(a){this.sendString(a)};a.prototype.sendString=function(a){this._socket.send(a.toString())};a.prototype.__defineGetter__("readyState",function(){return this._readyState});return a}();JSUTILS.namespace("BO.generators.GeneratorEvent");
BO.generators.GeneratorEvent=function(){var a,d=JSUTILS.Event;a=function(a){d.call(this,a);this.name="GeneratorEvent"};a.prototype=JSUTILS.inherit(d.prototype);a.prototype.constructor=a;a.UPDATE="update";return a}();JSUTILS.namespace("BO.generators.GeneratorBase");
BO.generators.GeneratorBase=function(){var a,d=JSUTILS.EventDispatcher;a=function(){d.call(this,this);this.name="GeneratorBase";this._value=void 0};a.prototype=JSUTILS.inherit(d.prototype);a.prototype.constructor=a;a.prototype.__defineGetter__("value",function(){return this._value});a.prototype.__defineSetter__("value",function(a){this._value=a});return a}();JSUTILS.namespace("BO.PinEvent");
BO.PinEvent=function(){var a,d=JSUTILS.Event;a=function(a){this.name="PinEvent";d.call(this,a)};a.CHANGE="pinChange";a.RISING_EDGE="risingEdge";a.FALLING_EDGE="fallingEdge";a.prototype=JSUTILS.inherit(d.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.Pin");
BO.Pin=function(){var a,d=JSUTILS.EventDispatcher,b=BO.PinEvent,g=BO.generators.GeneratorEvent;a=function(a,b){this.name="Pin";this._type=b;this._capabilities={};this._number=a;this._analogNumber=void 0;this._maxPWMValue=255;this._value=0;this._lastValue=-1;this._average=this._preFilterValue=0;this._minimum=Math.pow(2,16);this._numSamples=this._sum=this._maximum=0;this._generator=this._filters=null;this._autoSetValueCallback=this.autoSetValue.bind(this);this._evtDispatcher=new d(this)};a.prototype=
{setAnalogNumber:function(a){this._analogNumber=a},get analogNumber(){return this._analogNumber},get number(){return this._number},setMaxPWMValue:function(a){this._maxPWMValue=a},get maxPWMValue(){return this._maxPWMValue},get average(){return this._average},get minimum(){return this._minimum},get maximum(){return this._maximum},get value(){return this._value},set value(a){this._lastValue=this._value;this._preFilterValue=a;this._value=this.applyFilters(a);this.calculateMinMaxAndMean(this._value);
this.detectChange(this._lastValue,this._value)},get lastValue(){return this._lastValue},get preFilterValue(){return this._preFilterValue},get filters(){return this._filters},set filters(a){this._filters=a},get generator(){return this._generator},getType:function(){return this._type},setType:function(c){if(0<=c&&c<a.TOTAL_PIN_MODES)this._type=c},getCapabilities:function(){return this._capabilities},setCapabilities:function(a){this._capabilities=a},detectChange:function(a,j){a!==j&&(this.dispatchEvent(new b(b.CHANGE)),
0>=a&&0!==j?this.dispatchEvent(new b(b.RISING_EDGE)):0!==a&&0>=j&&this.dispatchEvent(new b(b.FALLING_EDGE)))},clearWeight:function(){this._sum=this._average;this._numSamples=1},calculateMinMaxAndMean:function(a){var b=Number.MAX_VALUE;this._minimum=Math.min(a,this._minimum);this._maximum=Math.max(a,this._maximum);this._sum+=a;this._average=this._sum/++this._numSamples;this._numSamples>=b&&this.clearWeight()},clear:function(){this._minimum=this._maximum=this._average=this._lastValue=this._preFilterValue;
this.clearWeight()},addFilter:function(a){if(null!==a){if(null===this._filters)this._filters=[];this._filters.push(a)}},addGenerator:function(a){this.removeGenerator();this._generator=a;this._generator.addEventListener(g.UPDATE,this._autoSetValueCallback)},removeGenerator:function(){null!==this._generator&&this._generator.removeEventListener(g.UPDATE,this._autoSetValueCallback);this._generator=null},removeAllFilters:function(){this._filters=null},autoSetValue:function(){this.value=this._generator.value},
applyFilters:function(a){if(null===this._filters)return a;for(var b=this._filters.length,d=0;d<b;d++)a=this._filters[d].processSample(a);return a},addEventListener:function(a,b){this._evtDispatcher.addEventListener(a,b)},removeEventListener:function(a,b){this._evtDispatcher.removeEventListener(a,b)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,b){return this._evtDispatcher.dispatchEvent(a,b)}};a.HIGH=1;a.LOW=0;a.ON=1;a.OFF=0;a.DIN=0;a.DOUT=
1;a.AIN=2;a.AOUT=3;a.PWM=3;a.SERVO=4;a.SHIFT=5;a.I2C=6;a.TOTAL_PIN_MODES=7;return a}();JSUTILS.namespace("BO.PhysicalInputBase");
BO.PhysicalInputBase=function(){var a,d=JSUTILS.EventDispatcher;a=function(){this.name="PhysicalInputBase";this._evtDispatcher=new d(this)};a.prototype={addEventListener:function(a,d){this._evtDispatcher.addEventListener(a,d)},removeEventListener:function(a,d){this._evtDispatcher.removeEventListener(a,d)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,d){return this._evtDispatcher.dispatchEvent(a,d)}};return a}();JSUTILS.namespace("BO.I2CBase");
BO.I2CBase=function(){var a,d=BO.Pin,b=JSUTILS.EventDispatcher,g=BO.IOBoardEvent;a=function(c,j,p){if(void 0!==c){this.name="I2CBase";this.board=c;var l=p||0,p=l&255,l=l>>8&255;this._address=j;this._evtDispatcher=new b(this);j=c.getI2cPins();2==j.length?(c.getPin(j[0]).getType()!=d.I2C&&(c.getPin(j[0]).setType(d.I2C),c.getPin(j[1]).setType(d.I2C)),c.addEventListener(g.SYSEX_MESSAGE,this.onSysExMessage.bind(this)),c.sendSysex(a.I2C_CONFIG,[p,l])):console.log("Error, this board does not support i2c")}};
a.prototype={get address(){return this._address},onSysExMessage:function(b){var b=b.message,d=this.board.getValueFromTwo7bitBytes(b[1],b[2]),g=[];if(b[0]==a.I2C_REPLY&&d==this._address){for(var d=3,l=b.length;d<l;d+=2)g.push(this.board.getValueFromTwo7bitBytes(b[d],b[d+1]));this.handleI2C(g)}},sendI2CRequest:function(b){var d=[],g=b[0];d[0]=b[1];d[1]=g<<3;for(var g=2,l=b.length;g<l;g++)d.push(b[g]&127),d.push(b[g]>>7&127);this.board.sendSysex(a.I2C_REQUEST,d)},update:function(){},handleI2C:function(){},
addEventListener:function(a,b){this._evtDispatcher.addEventListener(a,b)},removeEventListener:function(a,b){this._evtDispatcher.removeEventListener(a,b)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,b){return this._evtDispatcher.dispatchEvent(a,b)}};a.I2C_REQUEST=118;a.I2C_REPLY=119;a.I2C_CONFIG=120;a.WRITE=0;a.READ=1;a.READ_CONTINUOUS=2;a.STOP_READING=3;return a}();JSUTILS.namespace("BO.IOBoard");
BO.IOBoard=function(){var a=224,d=240,b=247,g=111,c=107,j=BO.Pin,p=JSUTILS.EventDispatcher,l=BO.PinEvent,z=BO.WSocketEvent,O=BO.WSocketWrapper,k=BO.IOBoardEvent;return function(P,Q,R){function D(a){i.removeEventListener(k.FIRMWARE_NAME,D);var f=10*a.version;q("debug: Firmware name = "+a.name+"\t, Firmware version = "+a.version);23<=f?i.send([d,c,b]):console.log("error: You must upload StandardFirmata version 2.3 or greater from Arduino version 1.0 or higher")}function E(){q("debug: IOBoard ready");
F=!0;i.dispatchEvent(new k(k.READY));i.enableDigitalPins()}function G(a){a=a.substring(0,1);return a.charCodeAt(0)}function H(a){var f=a.target.getType(),b=a.target.number,a=a.target.value;switch(f){case j.DOUT:I(b,a);break;case j.AOUT:J(b,a);break;case j.SERVO:f=i.getDigitalPin(b),f.getType()==j.SERVO&&f.lastValue!=a&&J(b,a)}}function x(a){if(a.getType()==j.DOUT||a.getType()==j.AOUT||a.getType()==j.SERVO)a.hasEventListener(l.CHANGE)||a.addEventListener(l.CHANGE,H);else if(a.hasEventListener(l.CHANGE))try{a.removeEventListener(l.CHANGE,
H)}catch(b){q("debug: Caught pin removeEventListener exception")}}function J(h,f){var e=i.getDigitalPin(h).maxPWMValue,f=f*e,f=0>f?0:f,f=f>e?e:f;if(15<h||f>Math.pow(2,14)){var e=f,c=[];if(e>Math.pow(2,16))throw console.log("error: Extended Analog values > 16 bits are not currently supported by StandardFirmata"),"error: Extended Analog values > 16 bits are not currently supported by StandardFirmata";c[0]=d;c[1]=g;c[2]=h;c[3]=e&127;c[4]=e>>7&127;e>=Math.pow(2,14)&&(c[5]=e>>14&127);c.push(b);i.send(c)}else i.send([a|
h&15,f&127,f>>7&127])}function I(a,b){var e=Math.floor(a/8);if(b==j.HIGH)s[e]|=b<<a%8;else if(b==j.LOW)s[e]&=~(1<<a%8);else{console.log("warning: Invalid value passed to sendDigital, value must be 0 or 1.");return}i.sendDigitalPort(e,s[e])}function q(a){S&&console.log(a)}this.name="IOBoard";var i=this,r,m=[],s=[],t,A=[],K=[],L=[],n=[],u=0,M=19,F=!1,y="",v=0,w,N=!1,B=!1,S=BO.enableDebugging,C=!1;w=new p(this);r=new O(P,Q,R);r.addEventListener(z.CONNECTED,function(){q("debug: Socket Status: (open)");
i.dispatchEvent(new k(k.CONNECTED));i.addEventListener(k.FIRMWARE_NAME,D);i.reportFirmware()});r.addEventListener(z.MESSAGE,function(h){var f="";if(h.message.match(/config/))f=h.message.substr(h.message.indexOf(":")+2),"multiClient"===f&&(q("debug: Multi-client mode enabled"),N=!0);else if(h=h.message,h*=1,m.push(h),f=m.length,128<=m[0]&&m[0]!=d){if(3===f){var h=m,f=h[0],e;240>f&&(f&=240,e=h[0]&15);switch(f){case 144:var c=8*e;e=c+8;h=h[1]|h[2]<<7;f={};e>=u&&(e=u);for(var g=0,l=c;l<e;l++){f=i.getDigitalPin(l);
if(void 0===f)break;if(f.getType()==j.DIN&&(c=h>>g&1,c!=f.value))f.value=c,i.dispatchEvent(new k(k.DIGITAL_DATA),{pin:f});g++}break;case 249:v=h[1]+h[2]/10;i.dispatchEvent(new k(k.FIRMWARE_VERSION),{version:v});break;case a:if(f=h[1],h=h[2],e=i.getAnalogPin(e),void 0!==e)e.value=i.getValueFromTwo7bitBytes(f,h)/1023,e.value!=e.lastValue&&i.dispatchEvent(new k(k.ANALOG_DATA),{pin:e})}m=[]}}else if(m[0]===d&&m[f-1]===b){e=m;e.shift();e.pop();switch(e[0]){case 121:for(f=3;f<e.length;f+=2)h=String.fromCharCode(e[f]),
h+=String.fromCharCode(e[f+1]),y+=h;v=e[1]+e[2]/10;i.dispatchEvent(new k(k.FIRMWARE_NAME),{name:y,version:v});break;case 113:h="";g=e.length;for(c=1;c<g;c+=2)f=String.fromCharCode(e[c]),f+=String.fromCharCode(e[c+1]),h+=f.charAt(0);i.dispatchEvent(new k(k.STRING_MESSAGE),{message:h});break;case 108:if(!B){for(var f={},g=1,c=h=0,l=e.length,o;g<=l;)if(127==e[g]){K[h]=h;o=void 0;if(f[j.DOUT])o=j.DOUT;if(f[j.AIN])o=j.AIN,A[c++]=h;o=new j(h,o);o.setCapabilities(f);x(o);n[h]=o;o.getCapabilities()[j.I2C]&&
L.push(o.number);f={};h++;g++}else f[e[g]]=e[g+1],g+=2;t=Math.ceil(h/8);q("debug: Num ports = "+t);for(e=0;e<t;e++)s[e]=0;u=h;q("debug: Num pins = "+u);i.send([d,105,b])}break;case 110:C&&(h=e[2],f=n[e[1]],4<e.length&&i.getValueFromTwo7bitBytes(e[3],e[4]),f.getType()!=h&&(f.setType(h),x(f)),C=!1,i.dispatchEvent(new k(k.PIN_STATE_RESPONSE),{pin:f}));break;case 106:if(!B){h=e.length;for(f=1;f<h;f++)127!=e[f]&&(A[e[f]]=f-1,i.getPin(f-1).setAnalogNumber(e[f]));if(N){e=i.getPinCount();for(h=0;h<e;h++)i.queryPinState(i.getDigitalPin(h));
setTimeout(E,500);B=!0}else q("debug: System reset"),i.send(255),setTimeout(E,500)}break;default:i.dispatchEvent(new k(k.SYSEX_MESSAGE),{message:e})}m=[]}else 128<=h&&128>m[0]&&(console.log("warning: Malformed input data... resetting buffer"),m=[],h!==b&&m.push(h))});r.addEventListener(z.CLOSE,function(){q("debug: Socket Status: "+r.readyState+" (Closed)");i.dispatchEvent(new k(k.DISCONNECTED))});this.__defineGetter__("samplingInterval",function(){return M});this.__defineSetter__("samplingInterval",
function(a){10<=a&&100>=a?(M=a,i.send([d,122,a&127,a>>7&127,b])):console.log("warning: Sampling interval must be between 10 and 100")});this.__defineGetter__("isReady",function(){return F});this.getValueFromTwo7bitBytes=function(a,b){return b<<7|a};this.getSocket=function(){return r};this.reportVersion=function(){i.send(249)};this.reportFirmware=function(){i.send([d,121,b])};this.disableDigitalPins=function(){for(var a=0;a<t;a++)i.sendDigitalPortReporting(a,j.OFF)};this.enableDigitalPins=function(){for(var a=
0;a<t;a++)i.sendDigitalPortReporting(a,j.ON)};this.sendDigitalPortReporting=function(a,b){i.send([208|a,b])};this.enableAnalogPin=function(a){i.send([192|a,j.ON]);i.getAnalogPin(a).setType(j.AIN)};this.disableAnalogPin=function(a){i.send([192|a,j.OFF]);i.getAnalogPin(a).setType(j.AIN)};this.setDigitalPinMode=function(a,b){i.getDigitalPin(a).setType(b);x(i.getDigitalPin(a));i.send([244,a,b])};this.enablePullUp=function(a){I(a,j.HIGH)};this.getFirmwareName=function(){return y};this.getFirmwareVersion=
function(){return v};this.getPinCapabilities=function(){for(var a=[],b={"0":"input",1:"output",2:"analog",3:"pwm",4:"servo",5:"shift",6:"i2c"},e=0;e<n.length;e++){var d=[],c=0,i=n[e].getCapabilities(),g;for(g in i)if(i.hasOwnProperty(g)){var j=[];0<=g&&(j[0]=b[g],j[1]=n[e].getCapabilities()[g]);d[c]=j;c++}a[e]=d}return a};this.queryPinState=function(a){i.send([d,109,a.number,b]);C=!0};this.sendDigitalPort=function(a,b){i.send([144|a&15,b&127,b>>7])};this.sendString=function(a){for(var b=[],e=0,d=
a.length;e<d;e++)b.push(G(a[e])&127),b.push(G(a[e])>>7&127);this.sendSysex(113,b)};this.sendSysex=function(a,f){var e=[];e[0]=d;e[1]=a;for(var c=0,g=f.length;c<g;c++)e.push(f[c]);e.push(b);i.send(e)};this.sendServoAttach=function(a,f,e){var c=[],f=f||544,e=e||2400;c[0]=d;c[1]=112;c[2]=a;c[3]=f%128;c[4]=f>>7;c[5]=e%128;c[6]=e>>7;c[7]=b;i.send(c);a=i.getDigitalPin(a);a.setType(j.SERVO);x(a)};this.getPin=function(a){return n[a]};this.getAnalogPin=function(a){return n[A[a]]};this.getDigitalPin=function(a){return n[K[a]]};
this.getPins=function(){return n};this.analogToDigital=function(a){return i.getAnalogPin(a).number};this.getPinCount=function(){return u};this.getI2cPins=function(){return L};this.reportCapabilities=function(){for(var a={"0":"input",1:"output",2:"analog",3:"pwm",4:"servo",5:"shift",6:"i2c"},b=0,c=n.length;b<c;b++){var d=n[b].getCapabilities(),g;for(g in n[b].getCapabilities())d.hasOwnProperty(g)&&console.log("Pin "+b+"\tMode: "+a[g]+"\tResolution (# of bits): "+n[b].getCapabilities()[g])}};this.send=
function(a){r.sendString(a)};this.close=function(){r.close()};this.addEventListener=function(a,b){w.addEventListener(a,b)};this.removeEventListener=function(a,b){w.removeEventListener(a,b)};this.hasEventListener=function(a){return w.hasEventListener(a)};this.dispatchEvent=function(a,b){return w.dispatchEvent(a,b)}}}();
