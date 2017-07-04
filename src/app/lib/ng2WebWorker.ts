import{ Subject,Observable } from 'rxjs';


/**
 * @class NgWorker
 * @description
 * This class create web workers inline and 
 * report results of web workers with rxjs observables 
 */
export class Ng2WebWorker {
  

  private worker:Worker;
  private message:Subject<any>;
  public onChange:Observable<any>; 



  constructor(urlFileWebWorker:Function) {
    
    this.worker = this.createWorker( urlFileWebWorker );
    this.message = new Subject<any>();
    this.onChange = this.message.asObservable();

  }//constructor



  /**
   * @public
   * @method
   * @param work
   * @description
   * Crea un worker y retorna un observable que enviara las notificaciones 
   * a todos aquellos que se subscriban a él. 
   */
  private createWorker(work:Function):Worker {
    
    const bulkWork = `var execute = ${ work.toString() };
                      execute(e,self)`;
    
    const workerFile = `self.onmessage = function(e){${ bulkWork }}`;
    
    const blob = new Blob([ workerFile ], { type: 'application/javascript' });
    return new Worker( URL.createObjectURL(blob) );

  }//working




  /**
   * @public
   * @method
   * @param args 
   * @description
   * 
   */
  public run (args:any) {

    //Init web worker
    this.worker.postMessage( args );

    //addListener to web worker for send messages 
    //with observable comunication
    this.worker.onmessage = (args) => {
      this.message.next( args );
    };//onmessage

  }//postMessage




  /**
   * @public
   * @method
   * @description
   * 
   */
  public destroy() {
    this.worker.terminate();
  }//destroy

}//NgWorker