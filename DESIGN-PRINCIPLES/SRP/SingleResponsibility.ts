namespace SingleResponsibility {

    export interface IEmployee {
        ID: number;
        Name: string;
        InsertToTable(employee: IEmployee);
    }

    export interface IReport {
        Generate(employee: IEmployee);
    }


    export class Employee implements IEmployee {
        
        ID: number;
        Name: string;

        constructor(id: number, name: string) {
            this.ID = id, 
            this.Name = name;
        }

        InsertToTable() {
            console.log(`Employee: ${this.ID}: ${this.Name} has just inserted to the SQL Table.`)
            return true;
        }
    }

    export class Report implements IReport {
        Generate(employee: IEmployee) {
            console.log(`Report for employee: ${employee.ID}: ${employee.Name}.`)
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {
            let employee = new Employee(1, "ILYA BULYCHEV");
            employee.InsertToTable();

            let report = new Report();
            report.Generate(employee);
        }
    }

    Application.Main();
}

