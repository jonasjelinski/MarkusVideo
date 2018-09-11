/* eslint-env browser */
/*global GifGenerator*/

/**
 * @namespace GifBoxView
 * @memberOf! GifGenerator
 * @description View der GifBox
 * <p>Die <code>GifBoxView</code> zeigt das aus den Bildern erzeugte Gif an, sobald es die URL des Gifs erhält
 * <p>Options-Objekt:</p>
 * <ul>
 * <li><code>options.gifBox</code> DOM-Referenz auf die GifBox</li>
 * </ul>
 * </p>
 */
var GifGenerator = GifGenerator || {};
GifGenerator.GifBoxView = function (options) {
	"use strict";

	let that = {},
		gifBox;

	/**
	* @function init
	* @public
	* @memberOf! GifGenerator
	* @instance   	
	* @description Setzt die gifBox
	*/	
	function init(){
		gifBox = options.gifBox;		
	}

	/**
	* @function setGif
	* @public
	* @memberOf! GifGenerator
	* @instance
   	* @param {String} url URL des Gifs
	* @description Erzeugt neues img-Element und setzt die übergebene URL als src. Hängt dieses Bild an die GifBox.
	*/
	function setGif(url){		
		let child = document.createElement("img");
		child.className = "gif";
		child.src = url;
		gifBox.appendChild(child);	
	}

	that.init = init;
	that.setGif = setGif;
	return that;
};