/* eslint-env browser */
/* global GifGenerator */
/* Dieser Code basier auf der Vorlage SyncPlayer-Lösung, von Alexander Barzo,
* abrufbar unter: https://elearning.uni-regensburg.de/course/view.php?id=33161, zuletzt eingesehen am 22.06.2018
*/

/**
 * @namespace DropTarget
 * @memberOf! GifGenerator
 * @description Klasse, um übergebens Dom-Elemente mit dragg&dopp-Listenern auszustatten
 * <p>Die Klasse <code>DropTarget</code> stattet das übergeben DOM-Element mit dragg&dopp-Listenern aus
 * und legt derem verhalten fest.</p>
 */

var GifGenerator = GifGenerator || {};
GifGenerator.DropTarget = class GifGenerator extends EventTarget {

  /**
  * @function constructor
  * @privta
  * @memberOf! GifGenerator
  * @instance
  * @param {Object} target Object auf das die Listener gesetzt werden
  * @param {string[]} validFileTypes Array das alle File-Types enthält, welche auf das Target gedropped werden dürfen
  * @param {String} hoverClass CSS-Klasse die gesetzt wird, wenn das Target gehovert wird
  * @description Konstruktor der Klasse, ruft SuperKlasse EvenTarget auf
  */  
  constructor(target, validFileTypes, hoverClass) {
    super();
    this.target = target;
    this.validFileTypes = validFileTypes;
    this.target.addEventListener("dragover", this.onDragOver.bind(this), false);
    this.target.addEventListener("dragleave", this.onDragLeave.bind(this), false);
    this.target.addEventListener("drop", this.onDrop.bind(this), false);
    this.hoverClass = hoverClass;
  }

  /**
  * @function onDragOver
  * @public
  * @memberOf! GifGenerator
  * @instance
  * @param {Event} event des Listeners
  * @description Verändert targets Standardeinstellungen mittels stopPropagation und preventDefault
  * so dass auf das Target etwas gedropped werden kann. Ändert CSS-Klasse,
  */ 
  onDragOver(event) {    
    if(event.stopPropagation){      
      event.stopPropagation();
    }
    if(event.preventDefault){
      event.preventDefault();
    }
    this.target.classList.add(this.hoverClass);    
    event.dataTransfer.dropEffect = "copy"; 
    return false;  
  }

  /**
  * @function onDragLeave
  * @public
  * @memberOf! GifGenerator
  * @instance
  * @description Löscht css-hover Class, wenn nicht mehr gehovert wird.
  */ 
  onDragLeave() {
    this.target.classList.remove(this.hoverClass);
  }

  /**
  * @function onDrop
  * @public
  * @memberOf! GifGenerator
  * @instance
  * @param {Event} event des Listeners
  * @description Ließt File aus Event aus und versendet diesen, sobald der File auf das Target gedropped wurde.
  */ 
  onDrop(event) {
    var file = event.dataTransfer.files[0];
    this.target.classList.remove(this.hoverClass);   
    event.stopPropagation();
    event.preventDefault();

    if (file && this.validFileTypes.includes(file.type)) {   
      this.handleFileDrop(file);
    }
    return false;
  }

  /**
  * @function handleFileDrop
  * @public
  * @memberOf! GifGenerator
  * @instance
  * @param {Object} file File der versendet wird
  * @description Versendet übergebenen files mittels Events
  */ 
  handleFileDrop(file) {
    let event = new Event("fileDropped");
    event.data = file;
    this.dispatchEvent(event);
  }

};