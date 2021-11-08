import { Platform,AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Observable } from 'rxjs';
import { Asistencia } from '../asistencias/asistencia.model';


@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private dbReady = new BehaviorSubject<boolean>(false);
  private dataBase: SQLiteObject;
  private http: HttpClient;
  private  sqlPorter: SQLitePorter;
  private sqlite: SQLite;

  registroAsistencia = new BehaviorSubject([]);

  private asistencia: Asistencia;

  constructor(http: HttpClient,plataforma: Platform,sqlite: SQLite, sqlPorter: SQLitePorter) 
  { 
        //Detectar Plataforma
        alert('xxxx-01');
        plataforma.ready()
          .then(() => {
             this.sqlite=sqlite;
             this.http=http;
             this.sqlPorter=sqlPorter;
             // Crear o abrir la base de datos DataBaseProyectoUno.db;
             this.sqlite.create({
               name: 'DataBaseProyectoUno.db',
               location: 'default',
               createFromLocation: 1
             })
             .then((db: SQLiteObject) => {
              alert('xxxx-2');
               this.dataBase = db;
               this.crearTablas();
               alert('xxxx-1 ');
               }).catch(e =>{
                 alert('Error conexión'  );
                 console.error(e);
                 console.error('Error Conexión '+ e.message);
               });
          }).catch(e => alert('Plataforma no leida.'));
         }
         crearTablas() {
           // Obtener el archivo que contiene las sentencias SQL
         this.http.get('../assets/db/CreateDatabase.sql',{responseType: 'text'})
             .subscribe(sql => {
               // Ejecutar las sentencias SQL del archivo
               this.sqlPorter.importSqlToDb(this.dataBase, sql)
                 .then(async _ => {
                   // Informar que la base de datos está lista
                   alert('xxxx-3 ');
                    this.cargarAsistencia();
                    alert('xxxx-4 ');
                   this.dbReady.next(true);
                   alert('xxxx-5 ');
                 }).catch(e => {
                   alert('Error al importar la base de datos');
                   console.error(e);
                   console.error('Error al importar la base de datos', e.message);
                 });
             });
           }

          getDatabaseState() {
            return this.dbReady.asObservable();
          }
        
         getRegistro(): Observable<Asistencia[]>{
                  return this.registroAsistencia.asObservable();
          }  

          cargarAsistencia(){
            return this.dataBase.executeSql('SELECT * FROM contacto', []).then(data => {
              let asistencias: Asistencia[] = [];
        
              if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    asistencias.push(
                      data.rows.item(i));
                }
              }
              this.registroAsistencia.next(asistencias);
            });
          }

          getAsistencia(id): Promise<Asistencia> {
            return this.dataBase.executeSql('SELECT * FROM Contacto WHERE id = ?', [id]).then(resSelect => { 
                return {
                      id: resSelect.rows.item(0).id,
                      fecha: resSelect.rows.item(0).fecha,
                      asignatura: resSelect.rows.item(0).asignatura,
                      profesor: resSelect.rows.item(0).profesor,
                      hora: resSelect.rows.item(0).hora,
                }
              });
            }

            addAsistencia(fecha, asignatura,profesor,hora) {
              let data = [fecha, asignatura,profesor,hora];
              return this.dataBase.executeSql('INSERT INTO contacto (fecha, asignatura,profesor,hora) VALUES (?, ?, ? ,? ,?)', data)
              .then(res => {
               this.cargarAsistencia();
              });
            }
            updateAsistencia(fecha, asignatura,profesor,hora,id) {
              alert('Actualiza '+id);
              let data = [fecha, asignatura,profesor,hora,id];
              return this.dataBase.executeSql('UPDATE contacto SET fecha=?, asignatura=?, profesor=?, hora=? WHERE id=?', data)
              .then(res => {
               this.cargarAsistencia();
              });
            }
          
           deleteAsistencia(id) {
              alert('Delete '+id);
              let data = [ id];
              return this.dataBase.executeSql('DELETE FROM contacto  WHERE id=?', data)
              .then(res => {
               this.cargarAsistencia();
              });
            }
  }

