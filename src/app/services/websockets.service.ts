import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
// mport {Usuario} from '../models/usuario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  public socketStatus = false;

  // private usuario: Usuario;

  constructor(private socket: Socket,
              // private router: Router
  ) {
    // this.cargarStorage();
    this.revisarStatus();

  }

  revisarStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      // para que se logeen  si se cae y dvanta el sevidor
      // this.cargarStorage();
    });
    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });
  }

  // emitir eventos hacia servidor
  emitir(tipo: string, payload?: any, callback?: (resp: any) => void) {
    console.log('Emitiendo Evento', tipo);
    this.socket.emit(tipo, payload, callback);
  }

  // escuchar eventos desde servidor
  escuchar(tipo: string) {
    // this.socket.emit(tipo, payload, callback);
    return this.socket.fromEvent(tipo);
  }

  // loginWs(nombre: string) {
  //
  //   return new Promise((resolve, reject) => {
  //     this.emitir('configurar-usuario', {nombre}, resp => {
  //       console.log('Respuesta: ', resp);
  //       this.usuario = new Usuario(nombre);
  //       this.guardarStorage();
  //
  //       resolve();
  //     });
  //   });
  // }

//   logOutWs() {
// // solo eliminamos el usuario y no yerminamos el socket
//     this.emitir('configurar-usuario', {nombre: 'sin-nombre'}, resp => {
//       console.log('Respuesta: ', resp);
//       this.usuario = null;
//       localStorage.removeItem('usuario');
//       this.router.navigateByUrl('');
//
//     });
//   }

  getUsuario() {
    // return this.usuario;
  }

  // guardarStorage() {
  //   localStorage.setItem('usuario', JSON.stringify(this.usuario));
  // }
  //
  // cargarStorage() {
  //   if (localStorage.getItem('usuario')) {
  //
  //     this.usuario = JSON.parse(localStorage.getItem('usuario'));
  //     this.loginWs(this.usuario.nombre);
  //   }
  // }

}
