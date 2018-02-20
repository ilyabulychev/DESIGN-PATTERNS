namespace DependencyInversion {

    /// <summary>
    /// Printer Interface
    /// </summary>
    export interface IPrinter {
        Print();
        Clean();
    }

    /// <summary>
    /// HP Printer
    /// </summary>
    export class HPPrinter implements IPrinter {
        Print() {
            console.log(`HP printer is printing a paper...`);
        }
        Clean() {
            console.log(`HP printer is cleaning...`);
        }
    }

    /// <summary>
    /// Canon Printer
    /// </summary>
    export class CanonPrinter implements IPrinter {
        Print() {
            console.log(`Canon printer is printing a paper...`);
        }
        Clean() {
            console.log(`Canon printer is cleaning...`);
        }
    }

    /// <summary>
    /// Report Manager
    /// </summary>
    export class ReportManager {
        Print(printer: IPrinter) {
            printer.Print();
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {
            let report = new ReportManager();
            // We can change the printer to any different printers
            report.Print(new CanonPrinter());
        }
    }

    Application.Main();
}

