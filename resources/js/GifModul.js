/* eslint-env browser */
/*global GifGenerator*/

/**
 * @namespace GifModul
 * @memberOf! GifGenerator
 * @description Daten-Model der Anwendung
 * <p>Das <code>GifModul</code> verwaltet die Liste der vom Nutzer gewählten Frames. 
 * Alle ausgewählten Frames werden hier gespeichert. 
 * Das Modell enthält eines Instanz des Moduls GifEncoder gibt ihm die Frames in der richtigen Reihenfolge.
 * GifEncoder gibt dem Modul ein Gif zurück. Dieses Gif verwendet das Modul. Es kann kein zweites erstellt werden</p>
 */

var GifGenerator = GifGenerator || {};

GifGenerator.GifModul = function(){
	"use strict";
	const MIN_PICS = 2;

	let that = new EventTarget(),
		currentState,
		enoughPictures = false,
		frames = [],
		frameObjects = [],
		orderedFrames = [],
		gif,
		gifEncoder,
		states = {};

	/**
   * @function init
   * @public
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Initialisiert das Model. Initialisiert die states und den GifEncoder. Setzt den startstate. 
   * Notwendig, um Modul überhaupt verwenden zu können
   */
	function init(){
		initStates();
		initGifEncoder();
		switchState(states.noVideo);
	}

	/**
   * @function initStates
   * @private
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Initialisiert das states - Objekt. States werden verwendet, um zu verhindern, dass Methoden
   * zum falschen Zeitpunkt ausgeführt werden, un dem Code eine nachvollziehbare Struktur zu geben.
   */
	function initStates(){
		states = {
			noVideo: "noVideo",
			videoDropped: "videoDropped",
			enoughPictures: "enoughPicturesSelected",
			gifCreated: "gifCreated",
		};
	}

	/**
   * @function initGifEncoder
   * @private
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Initialisiert die Instanz des GifEncoders. Dieser wird dazu verwendet das gif zu erzeugen
   * und gibt es bei "onGofCreated" zurück
   */
	function initGifEncoder(){
		gifEncoder = new GifGenerator.GifEncoder();
		gifEncoder.addEventListener("onGifCreated", handleGif);
	}

	/**
   * @function handleGif
   * @private
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Setzt die gif-Variable und veresendet die url in einem Event
   */
	function handleGif(event){
		let newGif = event.detail.gif,
			url = 	event.detail.url;	
		gif = newGif;		
		dispatchGifEvent(url);
	}

	/**
   * @function dispatchGifEvent
   * @private
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Veresendet die url in einem Event, damit andere Module dieses gif verwenden können
   */
	function dispatchGifEvent(url){
		let data = { 			
			url: url,
		};
		dispatchDataEvent("onGifSended", data);
		switchState(states.gifCreated);
	}

	/**
   * @function dispatchDataEvent
   * @private
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Hilfsmethode, um Events mit Daten zu versenden. Dient dazu Wiederholungen im Code zu verhindern.
   */
	function dispatchDataEvent(type, data){
		let event = new Event(type);
		event.detail = data;
		that.dispatchEvent(event);	
	}

	/**
   * @function switchState
   * @private
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Hilfsmethode, den currenState zu setzen.Dient dazu den Code lesbarer zu machen.
   */
	function switchState(state){
		currentState = state;
	}

	/**
   * @function videoIsDropped
   * @public
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Switcht den currentState zu videoDropped, um das setzen von Bildern zu ermöglichen 
   */
	function videoIsDropped(){		
		switchState(states.videoDropped);
	}

	/**
   * @function setFrame
   * @public
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Fügt Frame an Array frames. Versendet Frame im Event. Prüft ob genügend Bilder für gif vorhanden sind.
   * Funktioniert nur, wenn ein Video gedropped wurde und das Gif noch nicht erstellt worden ist. 
   */
	function setFrame(frame){
		if(!noVideoDropped() && !isGifAllReadyCreated()){
			frames.push(frame);
			dispatchFrameData(frame);
			checkIfEnoughPicturesForGif();
		}		
	}

	/**
   * @function isGifAllReadyCreated
   * @private
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Prüft ob der derzeitige state nicht state.gifCreated ist.
   */
	function isGifAllReadyCreated(){
		if(currentState !== states.gifCreated){
			return false;
		}
		return true;
	}

	/**
   * @function noVideoDropped
   * @private
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Prüft ob der derzeitige state nicht state.noVideo ist.
   */
	function noVideoDropped(){
		if(currentState !== states.noVideo){
			return false;
		}
		return true;
	}

	/**
   * @function dispatchFrameData
   * @private
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Erstellt frameObject und speichert es in frameObjects. Versendet es in einem Event.
   * damit andere Module es verwenden können.
   */
	function dispatchFrameData(frame){
		let frameObject = createFrameObject(frame),
			data = {};
		frameObjects.push(frameObject);
		data.frameObject = frameObject;
		dispatchDataEvent("onFrameSended", data);
	}

	/**
   * @function createFrameObject
   * @private
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Erstellt ein frameObject. Jedes FrameObject hat eine id und die src des frames.
   * Die id wird nie zweimal vergeben, auch wenn das Bild gelöscht wurde.
   */
	function createFrameObject(frame){
		let frameObject = {};	
		frameObject.id = frames.indexOf(frame);
		frameObject.src = frame.src;
		return frameObject;
	}

	/**
   * @function checkIfEnoughPicturesForGif
   * @private
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Überprüft, ob genügend Bilder für ein Gif erzeugt wurde und versendet passendes Event.
   */
	function checkIfEnoughPicturesForGif(){
		if(frameObjects.length >= MIN_PICS){
			switchState(states.enoughPictures);
			dispatchThisEvent("enoughPictures");
		}
		else{
			switchState(states.videoDropped);
			dispatchThisEvent("notEnoughPictures");
		}		
	}

	/**
   * @function dispatchThisEvent
   * @private
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Hilfsmethode um einfache Events zu versenden. Dient dazu Widerholungen im Code zu verhindern.
   */	
	function dispatchThisEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);	
	}
	
	/**
   * @function updateFrameOrder
   * @public
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Erhält eine Array von ids in der richtigen Reihenfolge und erstellt ein neues Array
   * in dem die Frames in der richtigen Reihenfolge und Anzahl sind. Wichtig um das Gif korrekt zu erstellen.
   */
	function updateFrameOrder(currentOrder){
		for(let index = 0; index < currentOrder.length; index++){
			let frameId = currentOrder[index];			
			orderedFrames[index] = frames [frameId];
		}
	}
	
	/**
   * @function deleteFrameById
   * @public
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Löscht frameObject aus frameObjects anhand der id. frameObjects entählt dadurch die richtige Anzahl
   * an derzeit gewählten frames.
   */
	function deleteFrameById(id){
		frameObjects = frameObjects.filter(function(frameObject){
			let frameObjectId = frameObject.id;
			return parseInt(frameObjectId) !== parseInt(id); 
		});	
		if(!isGifAllReadyCreated()){		
			checkIfEnoughPicturesForGif();
		}
	}

		/**
   * @function createGif
   * @public
   * @memberof! GifGenerator.GifModul   
   * @instance
   * @description Erzeugt ein Gif mittels des Arrays orderedFrames, falls es genügend Bilder gibt.
   */
	function createGif(){
		if(currentState === states.enoughPictures){	
			gifEncoder.createGif(orderedFrames);
		}		
	}

	that.init = init;
	that.videoIsDropped = videoIsDropped;
	that.setFrame = setFrame;
	that.updateFrameOrder = updateFrameOrder;
	that.deleteFrameById = deleteFrameById;
	that.createGif = createGif;
	return that;
};