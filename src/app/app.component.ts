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
  private startWebWorker() {
    //Create webworker and your work code
    let ngWorker:Ng2WebWorker = this.createWebWorker();
    this.workerListener( ngWorker );

    //var pdfjsString = JSON.stringify( PDFJS );
    let test:any = {
      name:'Salchicha',
      type:'carne'
    }

    //start to work, send all parameters that 
    //worker code need 
    ngWorker.run({test:test});

  }//startWebworker
  



  /**
   * @private
   * @method
   * @param worker
   * @description
   *  
   */
  private workerListener(worker:Ng2WebWorker) {
    //listener all messages arrivals of worker
    worker.onChange.subscribe((message:any) => {
    
      console.log("SUBCRIBE MESSAGE: ", message );
    
    });//subscribe
  }//worker





  private createWebWorker():Ng2WebWorker {
    //Creamos un worker!
    return new Ng2WebWorker((args:any,self:any) => {
      var test = args;
      console.log("inside of worker: " + test );
      //self.postMessage("INIT WEBWORKER! " + args );

      // var aux = args.data.pdfjs;
      // console.log("BEFORE PARSE: ", aux);
      
      // var PDFJS = JSON.parse( aux );
      // console.log("AFTER PARSE: ", PDFJS );
      
      
      // var url = '//cdn.mozilla.net/pdfjs/helloworld.pdf';
      
      // PDFJS.getDocument( url )
      // .then(function(pdf:any) {

      //   console.log("PROCESAMOS LOS DATOS EN EL WEBWORKER CREADO!" );
      //   console.log('********************************************* PDF loaded *********************************************************');
      
      // });
      
      
      //self.postMessage("PROCESS DATA! " );
      
      setTimeout(function(){ 
         self.postMessage(" WORK COMPLETED! "); 
      },30000);
      
    });
  }



}
