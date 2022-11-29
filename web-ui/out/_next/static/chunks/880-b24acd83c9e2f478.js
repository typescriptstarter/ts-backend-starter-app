"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[880],{7880:function(e,t,o){o.r(t),o.d(t,{default:function(){return v}});var r=o(5893),n=o(7294),s=(o(9008),o(445)),i=function(e,t){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])},i(e,t)};var l=function(){return l=Object.assign||function(e){for(var t,o=1,r=arguments.length;o<r;o++)for(var n in t=arguments[o])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},l.apply(this,arguments)};var a="Pixel",c="Percent",h={unit:c,value:.8};function p(e){return"number"===typeof e?{unit:c,value:100*e}:"string"===typeof e?e.match(/^(\d*(\.\d+)?)px$/)?{unit:a,value:parseFloat(e)}:e.match(/^(\d*(\.\d+)?)%$/)?{unit:c,value:parseFloat(e)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),h):(console.warn("scrollThreshold should be string or number"),h)}(function(e){function t(t){var o=e.call(this,t)||this;return o.lastScrollTop=0,o.actionTriggered=!1,o.startY=0,o.currentY=0,o.dragging=!1,o.maxPullDownDistance=0,o.getScrollableTarget=function(){return o.props.scrollableTarget instanceof HTMLElement?o.props.scrollableTarget:"string"===typeof o.props.scrollableTarget?document.getElementById(o.props.scrollableTarget):(null===o.props.scrollableTarget&&console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      "),null)},o.onStart=function(e){o.lastScrollTop||(o.dragging=!0,e instanceof MouseEvent?o.startY=e.pageY:e instanceof TouchEvent&&(o.startY=e.touches[0].pageY),o.currentY=o.startY,o._infScroll&&(o._infScroll.style.willChange="transform",o._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},o.onMove=function(e){o.dragging&&(e instanceof MouseEvent?o.currentY=e.pageY:e instanceof TouchEvent&&(o.currentY=e.touches[0].pageY),o.currentY<o.startY||(o.currentY-o.startY>=Number(o.props.pullDownToRefreshThreshold)&&o.setState({pullToRefreshThresholdBreached:!0}),o.currentY-o.startY>1.5*o.maxPullDownDistance||o._infScroll&&(o._infScroll.style.overflow="visible",o._infScroll.style.transform="translate3d(0px, "+(o.currentY-o.startY)+"px, 0px)")))},o.onEnd=function(){o.startY=0,o.currentY=0,o.dragging=!1,o.state.pullToRefreshThresholdBreached&&(o.props.refreshFunction&&o.props.refreshFunction(),o.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame((function(){o._infScroll&&(o._infScroll.style.overflow="auto",o._infScroll.style.transform="none",o._infScroll.style.willChange="unset")}))},o.onScrollListener=function(e){"function"===typeof o.props.onScroll&&setTimeout((function(){return o.props.onScroll&&o.props.onScroll(e)}),0);var t=o.props.height||o._scrollableNode?e.target:document.documentElement.scrollTop?document.documentElement:document.body;o.actionTriggered||((o.props.inverse?o.isElementAtTop(t,o.props.scrollThreshold):o.isElementAtBottom(t,o.props.scrollThreshold))&&o.props.hasMore&&(o.actionTriggered=!0,o.setState({showLoader:!0}),o.props.next&&o.props.next()),o.lastScrollTop=t.scrollTop)},o.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:t.dataLength},o.throttledOnScrollListener=function(e,t,o,r){var n,s=!1,i=0;function l(){n&&clearTimeout(n)}function a(){var a=this,c=Date.now()-i,h=arguments;function p(){i=Date.now(),o.apply(a,h)}function d(){n=void 0}s||(r&&!n&&p(),l(),void 0===r&&c>e?p():!0!==t&&(n=setTimeout(r?d:p,void 0===r?e-c:e)))}return"boolean"!==typeof t&&(r=o,o=t,t=void 0),a.cancel=function(){l(),s=!0},a}(150,o.onScrollListener).bind(o),o.onStart=o.onStart.bind(o),o.onMove=o.onMove.bind(o),o.onEnd=o.onEnd.bind(o),o}(function(e,t){function o(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)})(t,e),t.prototype.componentDidMount=function(){if("undefined"===typeof this.props.dataLength)throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),"number"===typeof this.props.initialScrollY&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),"function"!==typeof this.props.refreshFunction))throw new Error('Mandatory prop "refreshFunction" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage\'')},t.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},t.prototype.componentDidUpdate=function(e){this.props.dataLength!==e.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},t.getDerivedStateFromProps=function(e,t){return e.dataLength!==t.prevDataLength?l(l({},t),{prevDataLength:e.dataLength}):null},t.prototype.isElementAtTop=function(e,t){void 0===t&&(t=.8);var o=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,r=p(t);return r.unit===a?e.scrollTop<=r.value+o-e.scrollHeight+1:e.scrollTop<=r.value/100+o-e.scrollHeight+1},t.prototype.isElementAtBottom=function(e,t){void 0===t&&(t=.8);var o=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,r=p(t);return r.unit===a?e.scrollTop+o>=e.scrollHeight-r.value:e.scrollTop+o>=r.value/100*e.scrollHeight},t.prototype.render=function(){var e=this,t=l({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),o=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),r=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return n.createElement("div",{style:r,className:"infinite-scroll-component__outerdiv"},n.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(t){return e._infScroll=t},style:t},this.props.pullDownToRefresh&&n.createElement("div",{style:{position:"relative"},ref:function(t){return e._pullDown=t}},n.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!o&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))}})(n.Component),o(1930);var d=o(1664),u=o.n(d),m=(o(7583),o(2473),o(381),o(3906)),f=o(1163),g=o(8563);var v=function(e){var t=e.data,o=e.recent,i=e.error,l=e.loading,a=(0,n.useState)([]),c=a[0],h=a[1],p=(0,f.useRouter)(),d=(0,g.H)().authenticated,v=(0,m.M)(),w=v.startTimestamp,x=v.tag;v.setTag;(0,n.useEffect)((function(){(t||!i&&!l&&t)&&h(t.posts||t.questions||t.answers||t.events),console.log(t,l,i)}),[t,c,p,w]);var y=function(e){switch(e){case"":p.push("/",void 0,{shallow:!0});break;case"question":p.push("/questions",void 0,{shallow:!0});break;case"answer":p.push("/answers",void 0,{shallow:!0});break;case"project":p.push("/projects",void 0,{shallow:!0});break;case"test":p.push("/test",void 0,{shallow:!0});break;default:console.log("unknown tag")}};return(0,r.jsx)(s.JS,{children:(0,r.jsxs)("div",{className:"col-span-12 lg:col-span-6 min-h-screen",children:["answer"!==x&&(0,r.jsx)("div",{className:"hidden lg:block mt-8",children:(0,r.jsx)(s.ad,{})}),(0,r.jsx)("div",{className:"px-4 mt-2",children:(0,r.jsx)("div",{className:"flex my-6",children:(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)("div",{onClick:function(){return y("question")},className:"question"===x?"text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap":"text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap",children:"Questions"}),(0,r.jsx)("div",{onClick:function(){return y("answer")},className:"answer"===x?"text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap":"text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap",children:"Answers"})]})})}),(0,r.jsx)("div",{className:"w-full",children:(0,r.jsxs)("div",{className:"relative",children:[l&&(0,r.jsx)(s.aN,{}),!l&&!i&&c.map((function(e){return e.txid?(0,r.jsx)(s.OE,{post:e},e.txid):(0,r.jsx)(s.a6,{post:e},e.tx_id)})),o&&(0,r.jsxs)("div",{className:"flex py-5 items-center",children:[(0,r.jsx)("div",{className:"grow border border-bottom border-gray-600 dark:border-gray-300"}),(0,r.jsx)("div",{className:"mx-5 font-semibold text-lg",children:"Recent"}),(0,r.jsx)("div",{className:"grow border border-bottom border-gray-600 dark:border-gray-300"})]}),null===o||void 0===o?void 0:o.map((function(e){return(0,r.jsx)(s.a6,{post:e},e.tx_id)}))]})}),d&&(0,r.jsx)(u(),{href:"/compose",children:(0,r.jsx)("div",{className:" lg:hidden fixed bottom-[73px] right-[14px] h-14 w-14 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center cursor-pointer",children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})})})})]})})}}}]);