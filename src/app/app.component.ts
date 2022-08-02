import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RXJS';

  ngOnInit(): void {
/*     this.minhaPromise('Eduardo').then(result => console.log(result)); */

/*     this.minhaPromise('José').then(result => console.log(result)).catch(erro => console.log(erro)); */

/*     this.minhaObservable('Eduardo').subscribe(result => {
      console.log(result);
    },
    erro => {
      console.log(erro);
    }) */

    const observer = {
      next: (valor: any) => console.log('NEXT: ', valor),
      error: (erro: any) => console.log('ERRO: ', erro),
      complete: () => console.log('cabo')
    }

/*     const obs = this.minhaObservable('Eduardo');
    obs.subscribe(observer); */

    const obs = this.usuarioObservable('Admin', 'admin@admin');
    const subs = obs.subscribe(observer);

    setTimeout(() => {
      subs.unsubscribe();
    }, 3500);
  }

  minhaPromise(nome: string): Promise<string>{
    return new Promise((resolve, reject) => {
      if(nome === 'Eduardo'){
        setTimeout(() => {
          resolve('Seja bem vindo Eduardo');
        }, 1000);
      } else {
        reject('Ops! Você não é o Eduardo');
      }
    })
  }

  minhaObservable(nome: string): Observable<string>{
    return new Observable(subscriber => {

      if(nome === 'Eduardo'){
        subscriber.next('Olá! ' + nome);
        setTimeout(() => {
          subscriber.next('Resposta com delay');
        }, 5000);
        subscriber.complete();
      }else {
        subscriber.error('Ops! Deu erro'); 
      }

    });
  }

  usuarioObservable(nome: string, email: string): Observable<Usuario>{
    return new Observable(subscriber => {

      if(nome === 'Admin'){
        let usuario = new Usuario(nome, email);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 1000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 2000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 3000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 4000);

        setTimeout(() => {
          subscriber.complete();
        }, 5000);

      }else {
        subscriber.error('Ops! Deu erro'); 
      }

    });
  }

}

export class Usuario {
  constructor(nome: string, email: string){
    this.nome = nome;
    this.email = email;
  }

  nome: string;
  email: string;
}
