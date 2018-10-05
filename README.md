## Uproszczona programistyczna notacja muzyczna

Zaproponowana notacja bazuje luźno na artykule _(Extending Music Notation Through Programming)[https://pdfs.semanticscholar.org/6c83/e5602e2ba9ef9a16914ba1e35f7256a20d82.pdf]_.
Podstawową konstrukcją jest *nuta* zapisywana jako wbudowana funkcja `note(A4,Q)`. Pierwszy argumentem jest zapisana literowa nuta lub 
zbiór nut (odzielonych średnikiem, np. `note(A4;B4,Q)`), które mają być zagrane jednocześnie. Drugi argument oznacza czas odtwarzania dźwięku i może przyjąć nastepujące wartości:
- _N_, cała nuta;
- _H_, półnuta;
- _Q_, ćwierćnuta;
- _E_, ósemka;
- _S_, szesnastka.
Czas trwania poszczególnych dźwięków wyliczany jest względem całej nuty, domyślnie to około 2 sekundy.

Kolejna konstrukcja to bezargumentowa funkcja definowana za pomocą składni `define {nazwa funkcji} is {nuta|funkcja}|{nuta|funkcja}|...`. Każdy plik musi zawierać jedną funkcję o  nazwie `melody`, to ona jest
funkcją startową utworu. Funkcje wywołujemy za pomocą jej nazwy, przykładowo:
```
define func is note(E4,Q) | note(E4,Q)
define melody is note(C4,Q) | note(D4,Q) | func
```
jest odpowiednikiem:
```
define melody is note(C4,Q) | note(D4,Q) | note(E4,Q) | note(E4,Q)
```
Sekwencje nut oddzielamy znakiem `|`. Nuty grane są od lewej do prawej, bez przerw, chyba, że zostanie wykorzystana opisana niżej pauza.

Dodanie symbolu po nucie `@` spowoduje dodanie pauzy przed dźwiękiem. Przykładowo `note(A4, Q) @ Q` oznacza, że dźwięk A4 zostanie odtworzony po czasie równym trwaniu ćwierćnuty.

Ostatnią konstrukcją jest prosta pętla `repeat {ile razy} times {nuta|funkcja}` oznaczająca powórzenie nuty lub funkcji wskazaną liczbę razy.
```
define melody is repeat 3 time note(C4,Q) | note(D4,Q)
```
jest odpowiednikiem:
```
define melody is note(C4,Q) | note(C4,Q) | note(C4,Q) | note(D4,Q)
```

Białe znaki w pliku mogą zostać ignorowane, wszystkie skewencje nutowe muszą być zapisane w funkcjach.


