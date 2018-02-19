namespace ProxyPattern {

    export interface IResource {
        Read(): string;
        Write(data: string): void;
    }

    export class Resource implements IResource  {
        
        Read(): string {
            let data = `{ "data" : 100 }`;
            console.log(`Reading the data: ${data}...`)
            return data;
        }
        Write(data: string): void {
            console.log(`Writing the data: ${data}...`)
        }
    }

    class ResourceProxy implements IResource {

        private resource: Resource;
      
        constructor() {
          this.resource = new Resource();
        }
      
        Read(): string {
            console.log(`Logging serice...`);
            return this.resource.Read();
        }
        Write(data: string): void {
            console.log(`Logging serice...`);
            this.resource.Write(data);
        }
      }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {
            let proxy = new ResourceProxy();
            proxy.Read();
            proxy.Write(`{ "data" : 200 }`);
        }
    }

    Application.Main();
}

