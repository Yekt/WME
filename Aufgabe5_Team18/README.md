# WME Aufgabe 5

## Gruppe 18
Jean-Luc Rudow, 
Lukas Sauter

## Dateien und Ordner
Code-Grundlage und Ordnerstruktur wurde aus der Vorlage für Aufgabe 3 und unserer Lösung für diese übernommen. Für die Bereitstellung der Daten aus der csv Datei, wurde ein NodeJs Server in Kombination mit Ajax verwendet (app.js, Port ist 3000).

## Anmerkungen
* Header wurde entfernt, da er für diese Aufgabe nicht benötigt wurde.
* Ziel war es Balken zu anmimieren, die aussehen, als ob sie auf der Karte stehen würden.
* Quellen im Code zeigen an, dass der folgende Code-Block oder die folgende Funktion aus der angegebenen Quelle stammt und eventuell deutlich angepasst wurden. Mit "from mappa/threejs tutorial" markierte Stellen zeigen an, dass ein Teile des Codes des Tutorials verwendet wurden (Link unten).
* Die Balken reagieren auf Verschiebung, Zoom und Drehung der Kamera in alle Richtungen. Mit einem Problem: bei der Vertikalen Drehung der Kamera, drehen sich die Balken um ihren eigenen Mittelpunkt, was bei extremen Winkeln seltsam aussehen kann.
 
## Quellen und Resourcen
[TU-Dresden] https://mt.inf.tu-dresden.de/study/teaching/ws_18-19/wme_18-19/ueb-wme_18-19/,
[mappa/threejs Tutorial]https://mappa.js.org/docs/simple-map.html,
[StackOverflow]https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value,
[Traversy Media]https://www.youtube.com/watch?v=6ophW7Ask_0,
[Brad Traversy - Codepen]https://codepen.io/bradtraversy/pen/zEOrPp,
[Patrick - Codepen]https://codepen.io/wpdildine/pen/ZGyRVN/,
[threejs]https://threejs.org/docs/#api/en/core/Raycaster