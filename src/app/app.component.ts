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

    this.minhaObservable('Eduardo').subscribe(result => {
      console.log(result);
    },
    erro => {
      console.log(erro);
    })
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

      if(nome === 'Eduardo' ){
        subscriber.next('Olá! ' + nome);
        setTimeout(() => {
          subscriber.next('Resposta com delay');
        }, 5000);
      }else {
        subscriber.error('Ops! Deu erro'); 
      }

    });
  }

}
