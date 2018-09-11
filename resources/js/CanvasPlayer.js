/* eslint-env browser */
/*global GifGenerator*/

/**
 * @namespace CanvasPlayer
 * @memberOf! GifGenerator
 * @description Daten-Model der Anwendung
 * <p>Der <code>CanvasPlayer</code> verwaltet das übergeben canvas
 * Er zeichnet dass ein Video auf dem Canvas, wenn es ihm übergeben wird.
 * <p>Options-Objekt:</p>
 * <ul>
 * <li><code>options.canvas</code> DOM-Referenz auf das Canvas auf das gezeichnet wurde</li>
 * </ul>
 * </p>
 */
var GifGenerator = GifGenerator || {};
GifGenerator.CanvasPlayer = function (options) {
	"use strict";
	const X = 0,
		Y = 0,
		WIDTH = 200,
		HEIGHT = 200;

	let that = new EventTarget(),
		canvas,
		context;

 /**
  * @function init
  * @public
  * @memberOf! GifGenerator
  * @instance
  * @description Setzt die variable canvas und erzeugt daraus einen 2d context. Dieser ist notwendig zum Zeichnen der Bilder.
  */ 	
	function init(){
		canvas = options.canvas;
		context = canvas.getContext("2d");
	}

  /**
  * @function drawFrame
  * @public
  * @memberOf! GifGenerator
  * @instance
  * @param {Object} video
  * @description Zeichnet übergebenes video auf den canvas.
  */ 
	function drawFrame(video){
		context.drawImage(video, X,Y, WIDTH, HEIGHT);		
	}

	that.init = init;
	that.drawFrame = drawFrame;
	return that;
};	
