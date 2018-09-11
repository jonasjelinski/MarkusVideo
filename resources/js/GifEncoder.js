/* eslint-env browser */
/*global GifGenerator*/

/**
 * @namespace GifEncoder
 * @memberOf! GifGenerator
 * @description Daten-Model der Anwendung
 * <p>Der <code>GifEncoder</code> wandelt ein Array von Frames in ein Gif um
 * nutzt dazu die Bibliothek gif.js und gif.worker.js
 * </p>
 */
var GifGenerator = GifGenerator || {};
GifGenerator.GifEncoder = function() {
  "use strict";

  const WORKERS = 2,
  QUALITY = 10,
  WIDTH = 480,
  HEIGHT = 300;

  let that = new EventTarget(),
    gif;
    
  /**
   * @function createGif
   * @public
   * @memberof! GifGenerator.GifEncoder   
   * @instance
   * @param {frames} Array von einzelnen Bildern
   * @description Erzeugt aus dem Array frames ein nues Gif
   */
  function createGif(frames){
    initGif();
    addFrames(frames);  
    createURL();
    gif.render();    
  }

    /**
   * @function initGif
   * @private
   * @memberof! GifGenerator.GifEncoder   
   * @instance
   * @description initalisiert das GIF. Hier wird die Qualität festgelegt und das workerskript übergeben.
   */
  function initGif(){
    gif = new GIF({
      width : WIDTH,
      height: HEIGHT,
      worker : WORKERS,
      quality : QUALITY,
      workerScript: "/vendors/gifjs/gif.worker.js",
    });    
  }

  /**
   * @function addFrames
   * @private
   * @memberof! GifGenerator.GifEncoder   
   * @instance
   * @param {frames} Array von einzelnen Bildern
   * @description Liest einzelnen Frames aus dem Array frames und übergibt sie der Methode addFrame von gif.js 
   */
  function addFrames(frames){  
    for(let i = 0; i < frames.length; i++){      
      let frame = frames[i],      
        imageElement = frame;
      gif.addFrame(imageElement); 
    }
  }

  /**
   * @function createURL
   * @private
   * @memberof! GifGenerator.GifEncoder   
   * @instance
   * @description Erzeugt eine URL aus dem Blob-Element der gif und versendet diese URL mittels eines Events
   */
  function createURL(){    
    gif.on("finished", function(blob) {
      let url = URL.createObjectURL(blob); 
      dispatchGif(url);
     
    });   
  }

  /**
   * @function dispatchGif
   * @private
   * @memberof! GifGenerator.GifEncoder   
   * @instance
   * @param {url} ULR des Gif blobs
   * @description Versendet URL des gif-blobs und das gif selbst, so dass es andere Module verwenden können
   */
  function dispatchGif(url){   
    let event = new Event("onGifCreated");
    event.detail = {
      gif: gif,
      url: url,  
    };
    that.dispatchEvent(event);
  }

  that.createGif = createGif;
  return that;
};
