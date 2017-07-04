import{ Component } from '@angular/core';
import{ Ng2WebWorker } from './lib/ng2WebWorker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  /**
   * @private
   * @method
   * @description
   * 
   */
  private startWebworker() {

    //Creamos un worker!
    let ngWorker:Ng2WebWorker = new Ng2WebWorker((args:any,self:any) => {
      
      self.postMessage("INIT WEBWORKER! ");

      var aux = args.data.pdfjs;
      console.log("BEFORE PARSE: ", aux);
      
      var PDFJS = JSON.parse( aux );
      console.log("AFTER PARSE: ", PDFJS );
      
      
      var url = '//cdn.mozilla.net/pdfjs/helloworld.pdf';
      
      PDFJS.getDocument( url )
      .then(function(pdf:any) {

        console.log("PROCESAMOS LOS DATOS EN EL WEBWORKER CREADO!" );
        console.log('********************************************* PDF loaded *********************************************************');
      
      });
      
      
      self.postMessage("PROCESS DATA! " );
      
      setTimeout(function(){ 
         self.postMessage(" WORK COMPLETED! "); 
      },10000);
      
    });
    //Final del bloque que se va a ejecutar en el otro hilo




    //Creamos un subscripción para escuchar los cambios 
    //que se van produciendo en el proceso del web worker ...
    ngWorker.onChange.subscribe((message:any) => {
      console.log("MENSAJE RECIBIDO EN EL SUBCRIBE: ", message );
    });//subscribe
    //var pdfjsString = JSON.stringify( PDFJS );
    //Ejecutamos el worker pasandole los datos necesarios para ejecutarlo
    ngWorker.run({});

    
  }//startWebworker
  




}
