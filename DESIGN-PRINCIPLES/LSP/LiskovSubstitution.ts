namespace LiskovSubstitution {

    // export interface IEmployee {
    //     ID: number;
    //     Name: string;
    //     GetEmployeeDetails(employee: IEmployee);
    //     GetProjectDetails(employee: IEmployee);
    // }

    /// <summary>
    /// Employee Interface
    /// </summary>
    export interface IEmployee {
        ID: number;
        Name: string;
        GetEmployeeDetails(employee: IEmployee) : string;
    }

    /// <summary>
    /// Project Interface
    /// </summary>
    export interface IProject {
        ID: number;
        Name: string;
        GetProjectDetails() : string;
    }

    /// <summary>
    /// Abstract Employee
    /// </summary>
    abstract class Employee implements IEmployee, IProject {
        
        ID: number;
        Name: string;

        constructor(id: number, name: string) {
            this.ID = id, 
            this.Name = name;
        }

        abstract GetEmployeeDetails();
        abstract GetProjectDetails();
    }

    /// <summary>
    /// Casual Employee
    /// </summary>
    export class CasualEmployee extends Employee implements IProject, IProject { 

        GetProjectDetails() {
            return "Child Project";
        }

        GetEmployeeDetails() {
            return "Child Employee";
        }
    }

    /// <summary>
    /// Contractual Employee / if we need only one part of Base Employee then we must implement IProject
    /// </summary>
    export class ContractualEmployee implements IProject {
        
        ID: number;
        Name: string;

        constructor(id: number, name: string) {
            this.ID = id, 
            this.Name = name;
        }

        GetProjectDetails() {
            return "Child Project";
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {
            let employees : IProject[] = []; 
            employees.push(new CasualEmployee(1, "Casual Employee"));
            employees.push(new ContractualEmployee(2, "Contractual Employee"));

            employees.forEach(employee => { console.log(`${employee.ID}: ${employee.Name}: ${employee.GetProjectDetails()}`)});
        }
    }

    Application.Main();
}

