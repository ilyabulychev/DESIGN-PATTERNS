namespace Prototype {

    export interface ICloneable 
    {
        Clone(): ICar
    }

    /// <summary>
    /// The product abstraction
    /// </summary>
    export interface ICar 
    {
        Doors:    number;
        Seats:    number;
        Engine:   string;
        Computer: string;
    }

    /// <summary>
    /// Represents a product created by the builder
    /// </summary>
    export class Car implements ICar, ICloneable
    {
        private doors:    number;
        private seats:    number;
        private engine:   string;
        private computer: string;
    
        constructor(options : ICar = { Doors: 0, Seats: 0, Engine: "", Computer: ""}) {
            this.doors    = options.Doors;
            this.seats    = options.Seats;
            this.engine   = options.Engine;
            this.computer = options.Computer;
        }

        get Doors()    { return  this.doors    }
        get Seats()    { return  this.seats    }
        get Engine()   { return  this.engine   }
        get Computer() { return  this.computer }

        Clone(): ICar {
            return new Car({ Doors: this.doors, Seats: this.Seats, Engine: this.Engine, Computer: this.Computer})
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {
          let car = new Car({ Doors: 2, Seats: 2, Engine: "Engine", Computer: "HP Computer"});
          let audi = car.Clone();

          console.log(`Car engine: ${audi.Engine}, seats: ${audi.Seats}, doors: ${audi.Doors}, computer: ${audi.Computer}`);
        }
    }

    Application.Main();
}

