namespace Decorator {

    /// <summary>
    /// Data Source Manager
    /// </summary>
    export interface DataSource {
        Read() : any;
        Write(data);
    }

     /// <summary>
    /// File Data Source
    /// </summary>
    export class FileDataSource implements DataSource {
        
        private fileName: string;
        
        constructor(fileName) {
            this.fileName = fileName;
        }

        Read(): string {
            let data = `{ "data" : 100 }`;
            console.log(`We are reading your data: ${data}...`);
            return data;
        }

        Write(data: string) {
            console.log(`We are saving your data: ${data}...`);
        }
    }

    /// <summary>
    /// The Data Source Decorator Abstraction
    /// </summary>
    abstract class DataSourceDecorator implements DataSource {
        
        protected wrappee: DataSource;

        constructor(source: DataSource) {
            this.wrappee = source;
        }

        Read() {
            this.wrappee.Read();
        }

        Write(data: any) {
            this.wrappee.Write(data);
        }
    }

    /// <summary>
    /// Encryption Decorator
    /// </summary>
    export class EncryptionDecorator extends DataSourceDecorator {
        
        Read(): any {
            let data = this.wrappee.Read();
            console.log(`We are decrypting your data: ${data}...`);
            return data;
        }

        
        Write(data: any) {
            console.log(`We are encypting your data: ${data}...`);
            this.wrappee.Write(data);
        }
    }

    /// <summary>
    /// Zip Decorator
    /// </summary>
    export class ZipDecorator extends DataSourceDecorator {
        
        Read(): string {
            let data = this.wrappee.Read();
            console.log(`We are unzipping your data: ${data}...`);
            return data;
        }

        
        Write(data: string) {
            console.log(`We are zipping your data: ${data}...`);
            this.wrappee.Write(data);
        }
    }

    /// <summary>
    /// Salary Manager
    /// </summary>
    export class SalaryManager {

        private source: DataSource;

        constructor(source: DataSource) {
            this.source = source;
        }

        Load(): string {
            return this.source.Read();
        }

        Save(data: string) {
            this.source.Write(data);
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main(settings) 
        {
            // Get File Manager
            let source: any = new FileDataSource("file.json");

            // If encryption enabled then encrypt / decrypt data
            if(settings.encryption) {
                source = new EncryptionDecorator(source);
            }
            // If encryption enabled then zip / unzip data
            if(settings.zipping) {
                source = new ZipDecorator(source);
            }
        
            // Salary Manager is working with File Manager with decorators
            let salaryManager = new SalaryManager(source);
            let salary = salaryManager.Load();
            salaryManager.Save(`{ "data" : 200 }`);
        }
    }

    Application.Main({ encryption: true, zipping: true });
}

