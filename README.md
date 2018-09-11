![Coverbild der Aufgabe](/docs/cover.png)

# Übungsaufgabe: Gif Generator

In dieser Aufgabe implementieren Sie eine Editor, der aus benutzerdefinierten Einzelbildern eines Videos *Animated GIFs* erzeugen kann. Der Nutzer kann Videos per *Drag & Drop* in den Browser ziehen, das im dafür vorgesehenen `video`-Element abgespielt wird. Über einen entsprechenden *Button* können Einzelbilder aus dem Video extrahiert werden. Diese *Frames* werden in einer Liste dargestellt und können individuell gelöscht und per *Drag & Drop* neu angeordnet werden. Anschließend hat der Nutzer die Möglichkeit, aus der aktuellen Reihenfolge der extrahierten Einzelbilder ein animiertes GIF zu erstellen, das nach Fertigstellung neben dem Video in einem `img`-Element angezeigt wird. 

**Lesen Sie sich zu Beginn die komplette Aufgabenstellung durch. Ihre Aufgabe beschränkt sich auf die Implementierung der Programmlogik mit Javascript. Sie müssen keine Änderungen am vorgegebenen CSS-Dokument oder der HTML-Datei vornehmen. Erweitern Sie nur den bereits vorhanden Javascript-Code.**

![Screenshot der finalen Anwendung](/docs/screenshot-complete.png)

Fragen zur Übungsaufgabe können Sie in das [GRIPS-Forum](https://elearning.uni-regensburg.de/mod/forum/view.php?id=947470) *posten* oder diese per Mail (mi.mme@mailman.uni-regensburg.de) stellen.

**Abgabetermin ist der 2. Juli 2018. Wir bewerten den letzten Commit, der an diesem Abgabetag in das Repository *gepusht* wird.**

## Bewertungskriterien

Wir werden Ihre Abgabe hinsichtlich der folgenden Kriterien bewerten:
* Ist die Aufgabenstellung vollständig erfüllt worden?
* Ist die Aufgabe fehler- und bugfrei implementiert worden?
* Lässt sich eine ausreichend hohe Codequalität feststellen?
* Sind die verschiedenen Komponenten der Anwendung nach einem sinnvollen Muster strukturiert?
* Wurde (im Rahmen der Aufgabenstellung) auf eine gute Bedienbarkeit der Anwendung geachtet?
* Ist der Code Ihrer Lösung vollständig kompatibel zu der mitgelieferten ESLint-Regeldatei?

Sie müssen die Aufgabenstellung nicht erweitern. Es reicht völlig, wenn Sie die geforderten Anforderungen implementieren. Unabhängig davon können Sie gerne weitere Features, Verbesserungsvorschläge oder andere Inhalte ergänzen.

## Aufgabenstellung
Versuchen Sie die folgenden Features möglichst komplett und fehlerfrei umzusetzen. Achten Sie dabei darauf, die vorgeschlagenen Architektur und die Aufgabenverteilung bezüglich der Modulstruktur einzuhalten. Vermeiden Sie fehlerhafte Implementierungen und stellen Sie eine funktionierende Bedienung der Anwendung sicher. Denken Sie daran, dass auch die qualitative Gestaltung des Quellcodes in die Bewertung einfließt. 

Ein Video der gewünschten Funktionalität finden Sie hier:

![Screencast der finalen Anwendung](/docs/screencast.gif)

### Import des Videos in den Browser

Per *Drag & Drop* kann der Nutzer Videodateien auf dem Video-Element ablegen, die daraufhin in diesem abgespielt werden. Nach dem erfolgreichen Import wird der Hinweistext aus- und die Schaltfläche zum Erzeugen von Einzelbildern eingeblendet. Versehen Sie das Ausgabeelement (`video-box`) mit der CSS-Klasse `playing` um die auf den Screenshots dargestellte Gestaltung zu erreichen. Es reicht, wenn Ihre Anwendung mit dem unter `videos` mitgelieferten Video `HarmonicAirshow.mp4` funktioniert.

### Export und Darstellung der Einzelbilder

Beim Betätigen des entsprechenden *Buttons* wird das aktuelle Bild des Videos extrahiert und als `image`-Element der Liste der exportierte *Frames* hinzugefügt. Die Einzelbilder werden als Listenelemente dargestellt, nutzen Sie diesen Aufbau, um die gewünschte Darstellung zu erreichen:

```html
<ul class="frames">
  <li draggable="true">
      <img height="{{height}}" width="{{width}}" frame="{{id}}" src="{{src}}">
      <span class="button delete-frame">remove</span>
    </li>
</ul>
```

Über den *remove*-Button kann ein *Frame* aus der Liste entefernt werden. Sorgen Sie dafür, dass der Nutzer einzelne Bilder per *Drag & Drop* innerhalb der Liste verschieben kann. Dabei gilt: Wird ein *Frame* auf einen anderen geschoben, wird das Bild innerhalb der Liste vor den darunterliegenden *Frame* einsortiert.

### Erzeugen des *Animated GIFs*

Beim Klick auf den entsprechenden Button wird aus den Einzelbildern ein *Animated GIFs* erzeugt. Diese Funktion ist erst zugänglich, wenn mindestens zwei Einzelbilder exportiert wurden (CSS-Klasse `disabled` des Buttons). Die Reihenfolge der Einzelbilder basiert auf der Sortierung innerhalb der oben beschriebenen Liste. Wählen Sie eine sinnvolle *Frame Rate* für das GIF. Nach Fertigstellung wird das *Animated GIF* im linken Bereich der Anwendung (`gif-box`) angezeigt. Nutzen Sie diesen Aufbau, um die gewünschte Darstellung zu erreichen:
```html
<img class="gif" src="{{src}}">
```

## Vorgaben 

Die HTML-Struktur sowie eine CSS-Datei sind vorgegeben. Machen Sie sich mit beiden Punkten vertraut und versuchen Sie das auf den Screenshots zu sehenden Design korrekt umzusetzen. Beachten Sie dazu auch die Kommentare innerhalb der CSS-Datei. Für die interne Kommunikation können Sie das bereits bekannte `EventTarget`  aus dem Browserkontext verwenden. Gerne können Sie zusätzlich auch die aus der ersten Aufgabe bekannte *underscore*-Bibliothek ergänzen, um etwa *Templating* für die dynamische Generierung der notwendigen HTML-Strukturen zu verwenden. Die *Drag & Drop*-Komponente können Sie selbstständig, oder auf Basis der im Kurs vorgestellten Lösung implementieren.

Für die Generierung des *Animated GIFs* verwenden Sie bitte die *gif.js*-Bibliothek, die bereits in das Projekt eingebunden wird. Die Dokumentation zur Verwendung der Bibliothek finden Sie [hier](https://github.com/jnordberg/gif.js). Bitte beachten Sie, dass *gif.js* in der Regel die Verwendung eines Webservers voraussetzt. Nutzen Sie daher zum Testen Ihrer Anwendung z.B. die *Preview*-Funktion des Brackets-Editor oder einen lokalen Webserver ([XAMP](https://www.apachefriends.org/de/index.html), [Express](http://expressjs.com/de/starter/static-files.html) oder [Python](https://docs.python.org/2/library/simplehttpserver.html)).


## Modul-Struktur der Anwendung

Die Code-Struktur der Anwendung basiert auf dem [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)-Ansatz. Die unterschiedlichen Aufgabenbereiche sollen durch separate Module abgebildet, die jeweils in einer eigenen Datei implementiert werden. Wo notwendig, können Sie auch Prototypen verwenden. Teilen Sie die drei Hauptbereiche des MVC-Ansatzes ggf. auf Subkomponenten auf (z.B. zwei Prototypen/Module, die jeweils unterschiedliche *View*-Koponenten verwalten). Vorgegeben ist nur das `GifGenerator`-Modul, das als Einstiegs- und Initialisierungspunkt für die Anwendung dient. Versuchen Sie selbstständig eine geeignete Aufteilung der Funktionalitäten auf verschiedene Module zu erreichen. Trennen Sie dabei das *User Interface* vom restlichen Teil der Anwendung. Überlegen Sie sich, welche Aspekte der Anwendung für die Gestaltung des *Models* relevant sind. 
