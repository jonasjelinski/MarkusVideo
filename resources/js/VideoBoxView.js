/* eslint-env browser */
/*global GifGenerator*/

/**
 * @namespace VideoBoxView
 * @memberOf! GifGenerator
 * @description Daten-Model der Anwendung
 * <p>Die <code>VideoBoxView</code> ist für die Darsetllung Box
 * verantwortlich in der das Video dargestellt wird.
 * <p>Options-Objekt:</p>
 * <ul>
 * <li><code>options.videoBox</code> Box in der das Video abgespielt wird</li>
 * <li><code>options.getFrameButton</code> Button um einen Frame aus dem Video zu kopieren</li>
 * <li><code>options.videoPrompt</code> Text der angezeigt wird, wo das Video gedropped werden soll</li>
 * </ul></p>
 */

var GifGenerator = GifGenerator || {};
GifGenerator.VideoBoxView = function (options) {
	"use strict";
	const PLAYING_CLASS = "playing",
		HIDDEN_CLASS = "hidden";

	var that = {},
		videoBox,
		getFrameButton,
		videoPrompt;

	/**
	 * @namespace init
	 * @public
	 * @memberOf! GifGenerator.VideoBoxView
	 * @description Initialisert dieses Modul
	 */	
	function init(){
		videoBox = options.videoBox;
		getFrameButton = options.getFrameButton;
		videoPrompt = options.videoPrompt;			
	}
	
	/**
	 * @namespace changeBoxView
	 * @public
	 * @memberOf! GifGenerator.VideoBoxView
	 * @description Ändert das Aussehen der View, indem es die CSS-Klassen der DOM-ELemente verändert. 
	 */	
	function changeBoxView(){
		setVideoBoxPlaying();
		setFrameButtonVisible();
		hideVideoPrompt();	
	}

	/**
	 * @namespace setVideoBoxPlaying
	 * @public
	 * @memberOf! GifGenerator.VideoBoxView
	 * @description Fügt das Attribute "playing" zur css-Klasse der videoBox
	 */	
	function setVideoBoxPlaying(){
		videoBox.classList.add(PLAYING_CLASS);    
	}

	/**
	 * @namespace setFrameButtonVisible
	 * @public
	 * @memberOf! GifGenerator.VideoBoxView
	 * @description Entfernt das Attribute "hidden" von der css-Klasse des getFrameButtons so das er angezeigt wird
	 */	
	function setFrameButtonVisible(){
		getFrameButton.classList.remove(HIDDEN_CLASS);
	}

	/**
	 * @namespace setFrameButtonVisible
	 * @public
	 * @memberOf! GifGenerator.VideoBoxView
	 * @description Fügt das Attribute "hidden" zur css-Klasse des videoPrompts, so dass der Schrifzu verschwindet
	 */	
	function hideVideoPrompt(){
		videoPrompt.classList.add(HIDDEN_CLASS);    
	}

	that.init = init;
	that.changeBoxView = changeBoxView;
	return that;
};