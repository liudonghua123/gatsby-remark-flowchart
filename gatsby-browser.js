exports.onInitialClientRender = (n, config) => {
  // see https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement
  // https://www.html5rocks.com/en/tutorials/speed/script-loading/
  var importScript = (function (oHead) {
    function loadError (oError) {
      throw new URIError("The script " + oError.target.src + " is not accessible.");
    }
    return function (sSrc, fOnload) {
      var oScript = document.createElement("script");
      oScript.type = "text\/javascript";
      oScript.onerror = loadError;
      if (fOnload) { oScript.onload = fOnload; }
      oHead.appendChild(oScript);
      oScript.src = sSrc;
    }
  })(document.head || document.getElementsByTagName("head")[0]);

importScript("https://cdn.bootcss.com/raphael/2.2.7/raphael.min.js", function () {
  importScript("http://flowchart.js.org/flowchart-latest.js", function () {
    importScript("https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js", function () {
      // $.fn.flowchart = function( options ) {
      //   return this.each(function() {
      //     var $this = $(this);
      //     // should not use innerHTML because its content is escaped!
      //     // document.getElementsByClassName("flowchart")[0].childNodes[0].nodeValue;
      //     var diagram = flowchart.parse($this.text());
      //     $this.html('');
      //     diagram.drawSVG(this, options);
      //   });
      // };
      // $(".flowchart").flowchart();
      var flowchartElements = document.getElementsByClassName("flowchart");
      var flowchartElementsCount = flowchartElements.length;
      for (var i = 0; i < flowchartElementsCount; i++) {
        // https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
        // use childNodes[0].nodeValue instead of text() of jquery
        var diagram = flowchart.parse(flowchartElements[i].childNodes[0].nodeValue);
        flowchartElements[i].childNodes[0].nodeValue="";
        diagram.drawSVG(flowchartElements[i]);
      }
    });
  });
 });
}
