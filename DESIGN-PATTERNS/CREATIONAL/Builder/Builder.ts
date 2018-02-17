namespace Builder {

    /// <summary>
    /// The builder abstraction
    /// </summary>
    export interface ICarBuilder {

        SetSeats    (number  : number) : ICarBuilder;
        SetDoors    (number  : number) : ICarBuilder;
        SetEngine   (engine  : string) : ICarBuilder;
        SetComputer (computer: string) : ICarBuilder;
        Build       ()                 : ICar;
    }

    /// <summary>
    /// The product abstraction
    /// </summary>
    export interface ICar {

        Doors:    number;
        Seats:    number;
        Engine:   string;
        Computer: string;
    }

    /// <summary>
    /// Represents a product created by the builder
    /// </summary>
    export class Car implements ICar {

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
    }

    /// <summary>
    /// Concrete builder implementation
    /// </summary>
    export class CarBuilder implements ICarBuilder {

        private options;

        constructor() {
            this.options = {}
        }

        SetSeats(number: number) {
            this.options.Seats = number;
            return this;
        }
        SetDoors(number: number) {
            this.options.Doors = number;
            return this;
        }
        SetEngine(engine: string) {
            this.options.Engine = engine;
            return this;
        }
        SetComputer(computer: string) {
            this.options.Computer = computer;
            return this;
        }

        Build(): ICar {
            return new Car(this.options as ICar)
        }
    }

    /// <summary>
    /// Director
    /// </summary>
    export class Director {
        
        private builder: ICarBuilder;

        constructor(builder: ICarBuilder) {
            this.builder = builder;
        }

        Construct(type: string) {
            console.log(this.builder);
            this.builder
                .SetSeats(2)
                .SetDoors(2)
                .SetEngine("Engine");

            if(type == "advanced") {
                this.builder.SetComputer("HP Computer");
            }
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {
            let builder = new CarBuilder();
            new Director(builder).Construct("advanced");
            let car = builder.Build();

            console.log(`Car engine: ${car.Engine}, seats: ${car.Seats}, doors: ${car.Doors}, computer: ${car.Computer}`);
        }
    }

    Application.Main();
}

