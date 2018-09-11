/* eslint-env browser */
/*global GifGenerator*/

/**
 * @namespace FrameExtractor
 * @memberOf! GifGenerator
 * @description Wandelt canvas in ein Image() um
 * <p>Der <code>FrameExtractor</code> wandelt die auf ein Canvas gezeichneten Bilder
 * in Image-Instanzem um und versendet diese.
 * <p>Options-Objekt:</p>
 * <ul>
 * <li><code>options.canvas</code> DOM-Referenz auf das Canvas auf das gezeichnet wurde</li>
 * </ul>
 * </p>
 */
var GifGenerator = GifGenerator || {};
GifGenerator.FrameExtractor = function(options){
	"use strict";	

	let that = new EventTarget(),
		canvas,	
		frame;

	/**
	* @function init
	* @public
	* @memberOf! GifGenerator
	* @instance   	
	* @description Setzt die Variable canvas
	*/	
	function init(){
		canvas = options.canvas;		
	}

	/**
	* @function extractFrame
	* @public
	* @memberOf! GifGenerator
	* @instance   	
	* @description Erzeugt ein neues Image Element, setzt URL aus dem Canvas als src und versendet das Bild 
	*/	
	function extractFrame(){
		let uri,
			frame = new Image(); 
		uri = canvas.toDataURL("image/jpeg");
		frame.src = uri; 
		dispatchFrameEvent(frame);	
	}

	/**
	* @function dispatchFrameEvent
	* @private
	* @memberOf! GifGenerator
	* @instance
	* @param {Object} frame Bild das versendet werden soll	
	* @description Versendet das Bild  mittels Event
	*/	
	function dispatchFrameEvent(frame){
		let event = new Event("onFrameExtracted");
		event.detail = {frame : frame};
		that.dispatchEvent(event);
	}

	that.init = init;
	that.extractFrame = extractFrame;
	return that;
};