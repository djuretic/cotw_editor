/*! modernizr 3.12.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-typedarrays-xhrresponsetypearraybuffer-setclasses !*/
!function(e,n,s,o){function a(e,n){return typeof e===n}var t=[],r={_version:"3.12.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var s=this;setTimeout(function(){n(s[e])},0)},addTest:function(e,n,s){t.push({name:e,fn:n,options:s})},addAsyncTest:function(e){t.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=r,Modernizr=new Modernizr;var i=[],f=s.documentElement,l="svg"===f.nodeName.toLowerCase();Modernizr.addTest("typedarrays","ArrayBuffer"in n);Modernizr.addTest("xhrresponsetypearraybuffer",function(e){if("undefined"==typeof XMLHttpRequest)return!1;var n=new XMLHttpRequest;n.open("get","/",!0);try{n.responseType=e}catch(e){return!1}return"response"in n&&n.responseType===e}("arraybuffer")),function(){var e,n,s,o,r,f,l;for(var u in t)if(t.hasOwnProperty(u)){if(e=[],n=t[u],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(s=0;s<n.options.aliases.length;s++)e.push(n.options.aliases[s].toLowerCase());for(o=a(n.fn,"function")?n.fn():n.fn,r=0;r<e.length;r++)f=e[r],l=f.split("."),1===l.length?Modernizr[l[0]]=o:(Modernizr[l[0]]&&(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean)||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=o),i.push((o?"":"no-")+l.join("-"))}}(),function(e){var n=f.className,s=Modernizr._config.classPrefix||"";if(l&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");n=n.replace(o,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(e.length>0&&(n+=" "+s+e.join(" "+s)),l?f.className.baseVal=n:f.className=n)}(i),delete r.addTest,delete r.addAsyncTest;for(var u=0;u<Modernizr._q.length;u++)Modernizr._q[u]();e.Modernizr=Modernizr}(window,window,document);