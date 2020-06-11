Endpoints

- Iniciar partida:
    Nombre jugador -> hash
- Unirse a partida: 
    Nombre jugador, hash -> ok
- Obtener status juego: 
    Hash -> 1 o 2 jugadores con simbolo (Info general del juego, simbolos, quien comienza,etc)
    -> Jugador(1 o 2): nombre, simbolo
    -> Info: estado Esperando jugador, Turno, Completado
    -> Tablero
- Posicionar casillero:
    jugador (que esta jugando), casilla, hash 
    -> Si: posicionada correctamente
    -> No: motivo. Casilla ocupada, juego terminado, etc
    -> No hay segundo jugador.
    -> Se posiciono correctamente, se gano la partida
- Get resultado: hash -> Puntaje
- Cambiar nombre jugador: hash, nombre viejo, nombre nuevo -> ok
- Reiniciar tablero: hash -> tablero vacio