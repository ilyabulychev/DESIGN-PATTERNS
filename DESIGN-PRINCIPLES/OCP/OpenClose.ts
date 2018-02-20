namespace OpenClose {

    /// <summary>
    /// Employee Interface
    /// </summary>
    export interface IEmployee {
        ID: number;
        Name: string;
        InsertToTable(employee: IEmployee);
    }

    /// <summary>
    /// Report Interface
    /// </summary>
    export interface IReport {
        Generate(employee: IEmployee);
    }

    /// <summary>
    /// Abstract Report
    /// </summary>
    abstract class Report implements IReport {
        abstract Generate(employee: IEmployee);
    }

    /// <summary>
    /// PDF Report
    /// </summary>
    export class PDFReport extends Report {
        Generate(employee: IEmployee) {
            console.log(`PDF Report for employee: ${employee.ID}: ${employee.Name}.`);
        }
    }

    /// <summary>
    /// JSON Report
    /// </summary>
    export class JSONReport extends Report {
        Generate(employee: IEmployee) {
            console.log(`JSON Report for employee: ${employee.ID}: ${employee.Name}.`);
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {
            let report = new JSONReport();
            report.Generate({ "ID": 1, "Name": "ILYA BULYCHEV"} as IEmployee);
        }
    }

    Application.Main();
}

