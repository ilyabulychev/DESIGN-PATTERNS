namespace Singleton {

    /// <summary>
    /// Database Singleton 
    /// </summary>
    export class Database {

        private static instance: Database;
        
        constructor() { }
        
        static get SharedInstance() {
            if (Database.instance) {
                return Database.instance;
            }
            return new Database();
        }

        Query = (query) => `System quaring SQL ${query}`;
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {
          let database = Database.SharedInstance;
          console.log(database.Query("SELECT * FROM [Table]"));
        }
    }

    Application.Main();
}

