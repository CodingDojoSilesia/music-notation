/*
 * BMP wyznacza liczbę uderzeń w ciągu minuty, wraz z metrum pozwala wyliczyć liczbę nut, półnut, ćwierćnut w ciągu
 * minuty, jak również długość taktu. Zastosowano popularne metrum 4/4.
 */
global.BMP = 120;
global.SamplingFrequency = 44100;
global.N = 60 / global.BMP * 4; // Czas trwania nuty w sekundach
global.N2 = global.N * 2; // Czas trwania dwóch nut
global.N3 = global.N * 3; // Czas trwania trzech nut
global.N4 = global.N * 5; // Czas trwania pieciu nut
global.H = global.N / 2; // Czas trwania półnuty w sekundach
global.Q = global.N / 4; // Czas trwania ćwierćnuty w sekundach
global.E = global.N / 8; // Czas trwania ósemki w sekundach
global.S = global.N / 16; // Czas trwania szesnastki w sekundach
global.T = global.N / 32; // Czas trwania trzydziestkidwójki w sekundach
global.HT = global.N / 64; // Czas trwania sześćdziesięcioczwórki w sekundach
/*
 * Założono częstotliwość próbkowania równą 44100 Hz, co oznacza, że każda sekunda odpowiada tablicy 
 * N bitowych integer-ów oraz 8-bitowy rozmiar, który wyznacza głośność dzwięku.
 */
