/* eslint-env browser */
/* global GifGenerator */

/**
 * @namespace VideoPlayer
 * @memberOf! GifGenerator
 * @description Daten-Model der Anwendung
 * <p>Der <code>GifGenerator</code> verwaltet das übergeben videoEl
 * Es setzt die src der html-Elements und stellt es stumm.
 * Anschließend versendet es das Event <code>fileloaded</code>
 * </p>
 */
var GifGenerator = GifGenerator || {};
GifGenerator.VideoPlayer = function(videoEl) {
  "use strict";

  var that = new EventTarget();

  /**
  * @function setVideoFile
  * @public
  * @memberOf! GifGenerator
  * @instance
  * @param {Object} file
  * @description Erzeugt URL aus dem übergebenen File und setzt es als Ressource des VideoElements
  * Stellt das Video stimtm und versendet das Event "fileloaded"
  */ 
  function setVideoFile(file) {
    let src = URL.createObjectURL(file);
    videoEl.src = src;
    videoEl.muted = false;
    videoEl.autoplay  = true;
    distpatchFileLoadedEvent();
  }

  /**
  * @function distpatchFileLoadedEvent
  * @public
  * @memberOf! GifGenerator
  * @instance
  * @description Versendet das Event "fileloaded", um andere Modul zu informieren, dass das Video-Element nun Zugriff auf den File hat 
  */ 
  function distpatchFileLoadedEvent(){
    let event = new Event("fileloaded");
      that.dispatchEvent(event);
  }

  that.setVideoFile = setVideoFile;
  return that;
};