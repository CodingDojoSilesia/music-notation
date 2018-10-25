## Podesłane projekty

* [firemark](https://github.com/CodingDojoSilesia/music-notation/tree/fm-solution)
* mój :)
* twój :)

## Jak to uruchomić?

### Instalacja
`npm install`

### Testy
`npm run test`

### Program
`node index.js songs/song1.txt out.wav`

## Uproszczona programistyczna notacja muzyczna

### Wstęp
Zaproponowana notacja bazuje luźno na artykule _(Extending Music Notation Through Programming)[https://pdfs.semanticscholar.org/6c83/e5602e2ba9ef9a16914ba1e35f7256a20d82.pdf]_.

### Format Pliku
Plik z muzyką (przykłady w songs/) są rozdzielone na linie. Każda z linii zaczyna się od słówka kluczowego:

* `play` - generuje melodię np. `play note(A4, Q) | melody`
* `define` - definiuje funkcję (makro) np. `define foobar is note(B4, H)`

### Nuty
Podstawową konstrukcją jest *nuta* zapisywana jako wbudowana funkcja `note(A4,Q)`.

Pierwszy argumentem jest literowa nuta (od C0 do B8)
lub zbiór nut (odzielonych średnikiem, np. `note(A4;B4,Q)`), które mają być zagrane jednocześnie.

Drugi argument oznacza czas odtwarzania dźwięku i może przyjąć nastepujące wartości:
- _N_, cała nuta;
- _H_, półnuta;
- _Q_, ćwierćnuta;
- _E_, ósemka;
- _S_, szesnastka;
- _T_, trzydziestodwójka;
- _HT_, sześćdziesięcioczwórka.

Czas trwania poszczególnych dźwięków wyliczany jest względem całej nuty, domyślnie to około 2 sekundy. Czasy trwania zostały zdefiniowane
jako stałe wartości w pliku `durations.js`. 

Sekwencje nut/funkcji oddzielamy znakiem `|`. Nuty grane są od lewej do prawej, bez przerw, chyba, że zostanie wykorzystana opisana niżej pauza.

### Pauza

Jest to specjalna funkcja `pause(X)` gdzie X jest czasem trwania pauzy (N, H, Q etc).
Zapis:

```
play pause(Q) | note(A4, Q)
```

oznacza że dźwiek A4 zostanie odtworzony po czasie trwania ćwierćnuty

### Pętle

Kolejną konstrukcją jest prosta pętla `repeat {ile razy} times {nuta|funkcja}` oznaczająca powtórzenie nuty lub funkcji wskazaną liczbę razy.

```
play repeat 3 times note(C4,Q) | note(D4,Q)
```

jest odpowiednikiem:

```
play note(C4,Q) | note(C4,Q) | note(C4,Q) | note(D4,Q)
```

### Funkcje
Kolejna konstrukcja to bezargumentowa funkcja definowana za pomocą składni
`define {nazwa funkcji} is {nuta|funkcja}|{nuta|funkcja}|...`.
Funkcje wywołujemy za pomocą jej nazwy, przykładowo:

```
define func is note(E4,Q) | note(E4,Q)
define melody is note(C4,Q) | note(D4,Q) | func
```

jest odpowiednikiem:

```
define melody is note(C4,Q) | note(D4,Q) | note(E4,Q) | note(E4,Q)
```

### Cheat sheet

Więcej w `examples.js`

```
play note(A4, Q) - generuj ton A4 przez czas równy trwaniu ćwierćnuty
play note(A4;C4, H) - generuj równocześnie ton A4 i C4 przez czas równy trwaniu półnuty
play note(A4;C4;B4, H) - generuj równocześnie ton A4, C4 oraz B4 przez czas równy trwaniu półnuty
play note(A4, Q) | note(C4, Q) - generuj ton A4 a zaraz po nim ton C4, sekwencja tonów
play note(A4, Q) | foo - generuj ton A4 a zaraz po sekwencje tonów zapisanych po funkcją o nazwie foo
play pause(Q) | note(A4, Q) - generuj ton A4 po czasie równym trwaniu ćwierćnuty
play repeat 3 times note(C4,Q) - trzykrotnie generuj ton C4 przez czas równy trwaniu ćwierćnuty
define melody is note(E4,Q) | note(E4,Q) - funkcja (makro) o nazwie melody
```

