namespace Composite {

    /// <summary>
    /// The Team Object Abstraction
    /// </summary>
    interface TeamObject {
        name: string;
        operate(): void;
    }

    /// <summary>
    /// The TeamLead 
    /// </summary>
    class TeamLead implements TeamObject {

        private people: TeamObject[];
        name: string;

        constructor(name: string) {
            this.people = [];
            this.name = name;
        }

        operate(): void {
            console.log(`Team: ${this.name} is working...`);

            this.people.map((person: TeamObject) => {
                person.operate();
            });
        }

        addPerson(person: TeamObject) {
            const people = this.people.filter(o => o.name == person.name);

            if(people.length < 1) {
                console.log(`Person: ${person.name} comes in ${this.name}`);
                this.people.push(person);
            } else {
                console.log('The person is already in the team');
            }
        }

        removePerson(person: TeamObject) {
            const indexes = this.people.map((o: TeamObject, index) => {
                if(o.name == person.name) {
                    return index;
                }
            });

            if(indexes.length > 0) {
                console.log(`Person: ${person.name} is removed from the team`);
                this.people.slice(indexes[0], 1);
            } else {
                console.log(`No one is removed from the team`);
            }
        }
    }

    /// <summary>
    /// The Developer 
    /// </summary>
    class Developer implements TeamObject {
        
        name: string;

        constructor(name: string) {
            this.name = name;
        }

        operate(): void {
            console.log(`Developer: ${this.name} is working...`);
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {
            // Web Applicatin's Team
            let teamLead = new TeamLead("Web Application's Team");
            
            let JSDeveloper = new Developer("JavaScript Developer");
            let TSDeveloper = new Developer("TypeScript Developer");

            teamLead.addPerson(JSDeveloper);
            teamLead.addPerson(TSDeveloper);

            // Mongo DB Team
            let mongoTeam = new TeamLead("Mongo DB Team");

            let mongoDeveloper = new Developer("Mongo Developer");
            let noSQLDeveloper = new Developer("NoSQL Developer");

            mongoTeam.addPerson(mongoDeveloper);
            mongoTeam.addPerson(noSQLDeveloper);

            // Operations
            teamLead.operate();
            mongoTeam.operate();
        }
    }

    Application.Main();
}

