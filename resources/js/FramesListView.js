/* eslint-env browser */
/*global _, GifGenerator*/

/*Die Vorlage zu diesem Code basiert auf Drag&Drop List Items, von retrofuturistic, abrufbar unter: https://codepen.io/retrofuturistic/pen/tlbHE,
zuletzt abgerufen am 22.06.2018
*/

/**
 * @namespace FramesListView
 * @memberOf! GifGenerator
 * @description View-Controller Element zur Darstellung und Verwaltung der ausgwählten Frames
 * <p>Die <code>FramesListView</code> verwaltet die Referenz auf das DOM-Element zur Darstellung der einzelnen Bilder
 * <p>Options-Objekt:</p>
 * <ul>
 * <li><code>options.framesList</code> DOM-Referenz auf die unsortierte Liste frames</li>
 * <li><code>options.listTemplate</code> template zur Erzeugung neuer ListenElemente</li>
 * </ul>
 * </p>
 */

var GifGenerator = GifGenerator || {};
GifGenerator.FramesListView = function (options) {
    "use strict";

    var that = new EventTarget(),
        framesList,
        createEntryTemplate,
        dragElement;

  /**
   * @function init
   * @public
   * @memberof! GifGenerator.GifEncoder   
   * @instance
   * @description Insatanziert dieses Modul. Setzt die DOM-Referenz und das Template.
   */
    function init(){
        framesList = options.framesList;
        createEntryTemplate = _.template(options.listTemplate);
    }

  /**
  * @function addFrame
  * @public
  * @memberOf! GifGenerator
  * @instance
  * @param {Object} frame Object das id und src als properties enthält. 
  * @description Fügt mittels des Templates und dem frame Object eine neuen ListenEintrag in die unsortiere Liste framesList 
  */ 
    function addFrame(frame){
        var div,
          child; 
        div = document.createElement("div");
        div.innerHTML = createEntryTemplate(frame);
        child = div.children[0];
        addListeners(child);
        framesList.appendChild(child);
    }

  /**
  * @function addFrame
  * @private
  * @memberOf! GifGenerator
  * @instance
  * @param {Object} div HTML-ELement an dass die Listener gesetzt werden
  * @description Fügt Listener an das übergeben div, dass das Frame enthält, so dass dieses verschoben und gelöscht werden kann
  */ 
    function addListeners(div){
      let deleteButton = div.getElementsByClassName("button delete-frame")[0];
        div.addEventListener("dragstart", handleDragStart, false);        
        div.addEventListener("dragover", handleDragOver, false);
        div.addEventListener("drop", handleDrop, false);
        deleteButton.addEventListener("click", handleClick, false);       
    }

  /**
  * @function handleDragStart
  * @private
  * @memberOf! GifGenerator
  * @instance
  * @param {Event} event Event des Listeners
  * @description Beim Start des draggend wird festgelegt, dass das Bild bewegt werden kann und die zu übertragenen Daten des Drags werden gesetzt.
  */ 
    function handleDragStart(event) {
        dragElement = this;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/html", this.outerHTML);
    }

  /**
  * @function handleDragOver
  * @private
  * @memberOf! GifGenerator
  * @instance
  * @param {Event} event Event des Listeners
  * @description Ändert dass default verhalten, so dass nun Elemente aufeinandner gedropped werden können. 
  */ 
    function handleDragOver(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        event.dataTransfer.dropEffect = "move";
        return false;
    }

  /**
  * @function handleDrop
  * @private
  * @memberOf! GifGenerator
  * @instance
  * @param {Event} event Event des Listeners
  * @description Verhindert dass das Event an die Elternlemente weitergegeben wird und fügt das Frame-div ein
  */ 
    function handleDrop(event) {
      if (event.stopPropagation) {
          event.stopPropagation(); 
      }
      if (dragElement !== this) {
        insertFrame(this, event);
      }
      return false;
    }

  /**
  * @function insertFrame
  * @private
  * @memberOf! GifGenerator
  * @instance
  * @param {Object} that, Referenz auf das bewegte Frame
  * @param {Event} event Event des Listeners
  * @description Löscht das alte div mit dem Frame und fügt ein neues ein.
  */ 
    function insertFrame(that, event){
      let data,
          dropElemement;
      that.parentNode.removeChild(dragElement);
      data = event.dataTransfer.getData("text/html");
      that.insertAdjacentHTML("beforebegin",data);
      dropElemement = that.previousSibling;
      addListeners(dropElemement);    
    }

  /**
  * @function getCurrentListOrder
  * @public
  * @memberOf! GifGenerator
  * @instance
  * @description Erzeugt ein Array der ids der ListenEinträge in deren Reihenfolge und gibt es zurück. 
  */ 
    function getCurrentListOrder(){
      let listElements = framesList.children,
        ids = [];
      for(let i = 0; i < listElements.length; i++){
        let id = listElements[i].getElementsByTagName("img")[0].getAttribute("frame");
        ids.push(id);
      }
      return ids;         
    }

  /**
  * @function handleClick
  * @private
  * @memberOf! GifGenerator
  * @instance
  * @param {Event} event Event des Listeners
  * @description Löscht den angelickten Listeneintrag
  */ 
    function handleClick(event){
       let i = event.target,
          li = i.closest("li"),
          id = li.getElementsByTagName("img")[0].getAttribute("frame");
          deleteFrameById(id);
          li.remove();  
    }

  /**
  * @function deleteFrameById
  * @private
  * @memberOf! GifGenerator
  * @instance
  * @param {String} id Event des Listeners
  * @description Versendet ein Event, dass die übergebene id enthält
  */ 
    function deleteFrameById(id){
      let event = new Event("onDeltedFrame");
      event.data = id;
      that.dispatchEvent(event);
    }

    that.init = init;
    that.addFrame = addFrame;
    that.getCurrentListOrder = getCurrentListOrder;
    return that;
};