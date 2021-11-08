CREATE TABLE IF NOT EXISTS asistencia(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT,
    asignatura TEXT,
    profesor TEXT,
    hora TEXT   
);


INSERT INTO asistencia
    (id, fecha, asignatura, hora) VALUES 
    ('24/09/2021','Programación de aplicaciones moviles','Marcelo Montecinos','19:01');

INSERT INTO asistencia
    (id, fecha, asignatura, hora) VALUES 
    ('23/09/2021','Estadistica descriptiva','Patricio Muñoz','20:31');

INSERT INTO asistencia
    (id, fecha, asignatura, hora) VALUES 
    ('22/09/2021','Arquitectura de software','Guillermo Pinto','21:15');

INSERT INTO asistencia
    (id, fecha, asignatura, hora) VALUES 
    ('21/09/2021','Ingles elemental','Ramon Pozo','20:31');




