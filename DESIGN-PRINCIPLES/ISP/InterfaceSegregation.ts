namespace InterfaceSegregation {

    /// <summary>
    /// Lead Interface
    /// </summary>
    export interface ILead {
        CreateTask();
        AssignTask();
        // WorkOnTask();
    }

    /// <summary>
    /// Programmer Interface
    /// </summary>
    export interface IProgrammer {
        WorkOnTask();
    }

    /// <summary>
    /// Manager 
    /// </summary>
    export class Manager implements ILead {

        CreateTask() {
            console.log(`Manager is creating a task...`);
        }
        AssignTask() {
            console.log(`Manager is assigning a task...`);
        }

        // WorkOnTask() {
        //     throw new Error("Manager will not work on task!");
        // }
    }

    /// <summary>
    /// Programmer 
    /// </summary>
    export class Programmer implements IProgrammer {
        WorkOnTask() {
            console.log(`Programmer is creating a task...`);
        }
    }

    /// <summary>
    /// TeamLead 
    /// </summary>
    export class TeamLead implements ILead, IProgrammer {
        CreateTask() {
            console.log(`TeamLead is creating a task...`);
        }
        AssignTask() {
            console.log(`TeamLead is assigning a task...`);
        }
        WorkOnTask() {
            console.log(`TeamLead is working on a task...`);
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {
            let manager = new Manager();
            manager.CreateTask();
            manager.AssignTask();

            let teamLead = new TeamLead();
            teamLead.WorkOnTask();
        }
    }

    Application.Main();
}

