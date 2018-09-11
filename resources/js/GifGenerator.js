/* eslint-env browser */

/**
 * @namespace GifGenerator
 * @memberOf! GifGenerator
 * @description Daten-Model der Anwendung
 * <p>Der <code>GifGenerator</code> ist der Namespace der App un das Zentrale Modul
 * Es erstellt die notwenigen Views, buttonControlls und Module und lässt sie miteinander
 * Events der unterschiedlichen Komponenten werden hier abgefangen und an die übrigen Komponenten verteilt.</p>
 */

var GifGenerator = GifGenerator || {};
GifGenerator = (function() {
  "use strict";
  const VALID_FILES = ["video/mp4"];

  var that = {},
    video,
    videoPlayer,
    dropTarget,
    modul,
    buttonControlls,
    videoBox,
    videoTarget,
    videoPrompt,
    getFrameButton,
    canvas,
    canvasPlayer,
    frameExtractor,
    gifBoxView,
    frameListView;

  /**
   * @function init
   * @public
   * @memberof! GifGenerator   
   * @instance
   * @description Initialisierung der Anwendung und ihrer Komponenten. Die Methode dient als Einstiegspunkt (entry point) und wird in der Index-Datei aufgerufen. 
   */ 
  function init() {
    getDOMElements();
    initModuls();
    addListeners();
  }

  /**
   * @function getDOMElements
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Greift auf den DOM zu. Speichert DOM-Elemente in Variablen, um die Perfomance zu verbssern.
   */ 
  function getDOMElements(){
    video = document.getElementsByClassName("video")[0];
    videoTarget =document.getElementsByClassName("output video-box")[0];
    getFrameButton = videoTarget.getElementsByClassName("button create-frame")[0];
    videoPrompt = videoTarget.getElementsByClassName("video-prompt")[0];
    canvas = document.getElementsByClassName("canvas")[0];
  }  

  /**
   * @function initModuls
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Initialisierung aller Module.
   */ 
  function initModuls(){
    initVideoPlayer();
    initDropTarget();
    initGifModul();
    initVideoBox();
    initbuttonControlls();
    initCanvasPlayer();
    initFrameExtractor();
    initGifBoxView();  
    initFramesBoxView();  
  }

  /**
   * @function initVideoPlayer
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Initialisierung der Instanz von GifGenerator.VideoPlayer
   */ 
  function initVideoPlayer(){   
    videoPlayer = new GifGenerator.VideoPlayer(video);    
  }

  /**
   * @function initDropTarget
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Initialisierung der Instanz von GifGenerator.DropTarget
   */ 
  function initDropTarget(){    
    dropTarget = new GifGenerator.DropTarget(videoTarget, VALID_FILES, "hover");   
  }

  /**
   * @function initVideoPlayer
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Initialisierung der Instanz von GifGenerator.VideoBoxView
   */ 
  function initVideoBox(){       
        let options = {
            videoBox: videoTarget,
            getFrameButton: getFrameButton,
            videoPrompt: videoPrompt,
        };    
    videoBox = new GifGenerator.VideoBoxView(options);
    videoBox.init();
  }

  /**
   * @function initGifModul
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Initialisierung des Moduls GifGenerator.GifModul
   */ 
  function initGifModul(){
    modul = new GifGenerator.GifModul();
    modul.init();
  }

  /**
   * @function initbuttonControlls
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Initialisierung der Instanz von GifGenerator.ButtonController
   */ 
  function initbuttonControlls(){
    let options = {
        getFrameButton: getFrameButton,
        createGifButton : document.getElementsByClassName("button create-gif")[0],
    };
    buttonControlls = new GifGenerator.ButtonController(options);
    buttonControlls.init();
  }

  /**
   * @function initCanvasPlayer
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Initialisierung der Instanz von GifGenerator.CanvasPlayer
   */ 
  function initCanvasPlayer(){  
    let options = {};
    options.canvas = canvas;
    canvasPlayer = new GifGenerator.CanvasPlayer(options);
    canvasPlayer.init();
  }

  /**
   * @function initFrameExtractor
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Initialisierung der Instanz von GifGenerator.FrameExtractor
   */ 
  function initFrameExtractor(){
    let options = {};
    options.canvas = canvas;
    frameExtractor = GifGenerator.FrameExtractor(options);
    frameExtractor.init(); 
  }
  
  /**
   * @function initGifBoxView
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Initialisierung der Instanz von GifGenerator.GifBoxView
   */ 
  function initGifBoxView(){
    let options = {};
    options.gifBox = document.getElementsByClassName("output gif-box")[0];
    gifBoxView = new GifGenerator.GifBoxView(options);
    gifBoxView.init();
  }

  /**
   * @function initFramesBoxView
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Initialisierung der Instanz von GifGenerator.FramesListView
   */ 
  function initFramesBoxView(){
    let options = {};
    options.framesList = document.getElementsByClassName("frames")[0];
    options.listTemplate = document.getElementById("frame-entry").innerHTML;
    frameListView = new GifGenerator.FramesListView(options);
    frameListView.init();
  }

  /**
   * @function addListeners
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Setzt Listeners auf die Instanzen der verschiedenen Modulen
   */ 
  function addListeners(){
    videoPlayer.addEventListener("fileloaded", handleFilesLoaded);
    dropTarget.addEventListener("fileDropped", handleFileDropped);
    dropTarget.addEventListener("onGetFrame", handleGetFrame);
    buttonControlls.addEventListener("onGetFrame", handleGetFrame);
    buttonControlls.addEventListener("onCreateGif", handleCreateGif);
    frameExtractor.addEventListener("onFrameExtracted", handleFrameExtracted);
    modul.addEventListener("enoughPictures", handleEnoughPictures);
    modul.addEventListener("notEnoughPictures", handleNotEnoughPictures);
    modul.addEventListener("onGifSended", handleoOnGifSended);
    modul.addEventListener("onFrameSended", handleoOnFrameSended);
    frameListView.addEventListener("onDeltedFrame", handleoOnFrameDeleted);
  }

  /**
   * @function handleFilesLoaded
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Dem Modul wird kommuniziert, dass das Video erfolgreich gedropped wurde und nun verabeitet werden kann
   */ 
  function handleFilesLoaded(){
    modul.videoIsDropped();
  }

  /**
   * @function handleFileDropped
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @param {Event} event Event des Listeners, enthält den Video-File
   * @description Setzt den Video-File beim VideoPlayer, so dass es abgespielt werden kann und ändert das Layout der VideoBox
   */ 
  function handleFileDropped(event){
    setVideo(event);
    videoBox.changeBoxView();
  }

  /**
   * @function handleFileDropped
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @param {Event} event Event des Listeners, enthält den Video-File
   * @description Setzt den Video-File beim VideoPlayer, so dass es abgespielt werden kann. Falles es kein File ist, wird
   * der Vorgang abgebrochen.
   */ 
  function setVideo(event) {
    var file = event.data;
    if (!(file instanceof File)) {
      return;
    }   
    videoPlayer.setVideoFile(file);
  }

  /**
   * @function handleGetFrame
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Zeichnet ein Frame auf das Canvas, indem dem Canvas-Player das Video übergeben wird. 
   * Anschließend wird dieses Frame mittels des FrameExtractor in ein Bild (img) verwandelt. 
   * der Vorgang abgebrochen.
   */ 
  function handleGetFrame(){
    canvasPlayer.drawFrame(video);
    frameExtractor.extractFrame();
  }

  /**
   * @function handleCreateGif
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Gibt dem Modul die korrekte Reihenfolge der  asugewählten Bilder in einem Array und lässt anschließend
   * dem Modul mittels dieser Liste  ein Gif aus den Bildern erzeugen.
   */ 
  function handleCreateGif(){
    let currentOrder = frameListView.getCurrentListOrder();
    modul.updateFrameOrder(currentOrder);
    modul.createGif();
  }

  /**
   * @function handleEnoughPictures
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Ändert das Layout des Buttons zum Erstellen vong Gifs, so dass er nun geklickt werden kann.
   */ 
  function handleEnoughPictures(){
    buttonControlls.enableGifButton();   
  }

  /**
   * @function handleNotEnoughPictures
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @description Ändert das Layout des Buttons zum Erstellen vong Gifs, so dass er nicht mehr geklickt werden kann.
   */
  function handleNotEnoughPictures(){   
    buttonControlls.disableGifButton();    
  }

  /**
   * @function handleFrameExtracted
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @param {Event} event Event des Listeners, enthält ein Frame
   * @description Empfängt ein Frame und übergibt dieses Frame dem Modul
   */
  function handleFrameExtracted(event){
    let frame = event.detail.frame;
    modul.setFrame(frame);
  }

  /**
   * @function handleoOnGifSended
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @param {Event} event Event des Listeners, enthält ein Frame
   * @description Empfängt eine URL und übergibt dieses der GifBoxView, so dass das Gif angezeigt wird.
   */
  function handleoOnGifSended(event){
    let url = event.detail.url;
    gifBoxView.setGif(url);
  }

  /**
   * @function handleoOnFrameSended
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @param {Event} event Event des Listeners, enthält ein FrameObject
   * @description Fügt dieses FrameObject der FrameListView zu. Jedes FrameObject enthält eine id und eine src für das Bild.
   * Die ListView fügt dieses Objekt als li in eine ul, um die Bilder nebeneinander anzuzeigen.
   */
  function handleoOnFrameSended(event){
    let frame = event.detail.frameObject;
    frameListView.addFrame(frame);
  }

  /**
   * @function handleoOnFrameDeleted
   * @private
   * @memberof! GifGenerator   
   * @instance
   * @param {Event} event Event des Listeners, enthält ein id
   * @description Empfängt die id eines FrameObjects und übergibt diese dem Modul, so dass dieses gelöscht wird.
   */
  function handleoOnFrameDeleted(event){
    let id = event.data;
    modul.deleteFrameById(id);
  }   

  that.init = init;
  return that;
}());
