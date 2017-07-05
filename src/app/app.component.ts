import{ Component } from '@angular/core';
import{ Ng2WebWorker } from './lib/ng2WebWorker';
import{ PDFJS } from 'pdfjs-dist';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  private checkIfThreadIsBlock() {
    console.log("MAIN THREAD OF BROWSER NOT BLOCKED!!!!!");
  }

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

    let test:any = {
      name:'Salchicha',
      type:'carne'
    }

    let moreTest:any = {
      name:'Filete',
      type:'carne'
    };


    var options = options || { scale: 1 };
        

    function renderPage(page) {
        var viewport = page.getViewport(options.scale);
        var canvasContainer = document.getElementById('pdfs-container');
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvasContainer.appendChild(canvas);
        
        page.render(renderContext);
    }
    


    function renderPages(pdfDoc) {
        for(var num = 1; num <= pdfDoc.numPages; num++)
            pdfDoc.getPage(num).then(renderPage);
    }
    
    PDFJS.disableWorker = false;
    PDFJS.getDocument("../assets/documents/exampleDocument.pdf").then( renderPages );

    //start to work, send all parameters that 
    //worker code need 
    //ngWorker.run({test:test,pdfjs:moreTest});

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

      let { test,pdfjs } = args.data;

      //console.log("INSIDE OF WORKER DATA: " , data );
      console.log("INSIDE OF WORKER TEST: ", test);
      console.log("INSIDE OF WORKER MORE PDFJS: ", pdfjs);
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
