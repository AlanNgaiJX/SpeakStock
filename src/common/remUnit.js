export default {
  install(Vue) {
    (function(doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function() {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          Vue.prototype.$docElFontSize = 100 * (clientWidth / 750);
          docEl.style.fontSize = Vue.prototype.$docElFontSize + "px";
        };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener("DOMContentLoaded", recalc("DOMContentLoaded"), false);
    })(document, window);

    Vue.prototype.$remToPx = function(remSize) {
      var baseFontSize = parseFloat(document.documentElement.style.fontSize.slice(0, -2));
      return remSize * baseFontSize;
    };
  }
};
