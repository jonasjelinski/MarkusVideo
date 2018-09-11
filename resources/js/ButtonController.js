/* eslint-env browser */
/*global GifGenerator*/

/**
 * @namespace ButtonController
 * @memberOf! BirdingApp
 * @description Controller zur Umsetzung der Nutzer-Interaktion mit den Buttons des User Interfaces.
 * <p>Der <code>ButtonController</code> fängt die Interaktion-Events der UI-Buttons ab und reicht diese an registrierte Observer weiter.</p>
 * <p>Options-Objekt:</p>
 * <ul>
 * <li><code>options.getFrameButton</code> DOM-Referenz auf den Button zum Extrahieren von Bildern</li>
 * <li><code>options.createGifButton</code> DOM-Referenz auf den Button zum Erzeugen des Gifs</li>
 * </ul>
 */

var GifGenerator = GifGenerator || {};
GifGenerator.ButtonController = function (options) {
	"use strict";
	var that = new EventTarget(),
		getFrameButton,
		createGifButton,
		isGifenabled = false;

  /**
  * @function init
  * @public
  * @memberOf! GifGenerator
  * @instance
  * @description Initalisiert dieses Modul
  */ 
	function init(){
		initGetFrameButton();
		initCreateGifButton();	
	}

  /**
  * @function initGetFrameButton
  * @public
  * @memberOf! GifGenerator
  * @instance
  * @description Speichert die DOM-Referenz in der Variable getFrameButton und setzt den Click-Listener auf das DOM-Element
  */ 
	function initGetFrameButton(){
		getFrameButton = options.getFrameButton;
		getFrameButton.addEventListener("click", handleFrameButtonClick);
	}

	/**
	* @function handleFrameButtonClick
	* @public
	* @memberOf! GifGenerator
	* @instance
	* @description Versendet Event "onGetFrame"
	*/ 
	function handleFrameButtonClick(){
		dispatchThisEvent("onGetFrame");
	}

  /**
  * @function initCreateGifButton
  * @public
  * @memberOf! GifGenerator
  * @instance
  * @description Speichert die DOM-Referenz in der Variable createGifButton und setzt den Click-Listener auf das DOM-Element
  */ 
	function initCreateGifButton(){
		createGifButton = options.createGifButton;
		createGifButton.addEventListener("click", handleGifButtonClick);
	}

	/**
	* @function handleGifButtonClick
	* @public
	* @memberOf! GifGenerator
	* @instance
	* @description Versendet Event "onCreateGif", falls dies erlaubt ist (isGifenabled === true), 
	* verbietet es anschließend wieder, durch setzen des bools isGifenabled. Dies verhindert mehrfaches klicken des Buttons
	*/ 
	function handleGifButtonClick(){
		if(isGifenabled){
			dispatchThisEvent("onCreateGif");
			disableGifButton();
		}		
	}

	/**
	* @function enableGifButton
	* @public
	* @memberOf! GifGenerator
	* @instance
	* @description Ändert css-Klasse des Gif-Buttons und setzt isGifenabled true, so dass der Gif-Button klickbar ist
	*/ 
	function enableGifButton(){
		isGifenabled = true;
		createGifButton.classList.add("enabled");
		createGifButton.classList.remove("disabled");
	}

	/**
	* @function disableGifButton
	* @public
	* @memberOf! GifGenerator
	* @instance
	* @description Ändert css-Klasse des Gif-Buttons und setzt isGifenabled fakse, so dass der Gif-Button nicht mehr klickbar ist
	*/ 
	function disableGifButton(){
		isGifenabled = false;
		createGifButton.classList.add("disabled");
		createGifButton.classList.remove("enabled");
	}

	/**
	* @function dispatchThisEvent
	* @public
	* @memberOf! GifGenerator
	* @instance
	* @param {String} type, Typ des zu versendenden Events
	* @description Versendet Event mit dem übergebenen type als Event-Type. Hilfsmethode um WIderholungen im Code zu unterbinden.
	*/ 
	function dispatchThisEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	that.init = init;
	that.enableGifButton = enableGifButton;
	that.disableGifButton = disableGifButton;
	return that;
};