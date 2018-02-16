// BUILDER PATTERN
// - The intent of the Builder design pattern is to separate the construction of a complex object from its representation. By doing so the same construction process can create different representations.

// Advantages
// - Allows you to vary a product’s internal representation.
// - Encapsulates code for construction and representation.
// - Provides control over steps of construction process.

(function () {

    /// <summary>
    /// The builder abstraction
    /// </summary>
    interface ICarBuilder
    {
        Reset()
        SetSeats   (number:   number)
        SetDoors   (number:   number)
        SetEngine  (engine:   string)
        SetComputer(computer: string)
        GetResult  (): ICar;
    }

    /// <summary>
    /// The product abstraction
    /// </summary>
    interface ICar 
    {
        Doors:    number;
        Seats:    number;
        Engine:   string;
        Computer: string;
    }

    /// <summary>
    /// Represents a product created by the builder
    /// </summary>
    class Car implements ICar
    {
        Doors:    number;
        Seats:    number;
        Engine:   string;
        Computer: string;

        constructor(doors?: number, seats?: number, engine?: string, computer?: string) {
            this.Doors    = doors;
            this.Seats    = seats;
            this.Engine   = engine;
            this.Computer = computer;
        }
    }

    /// <summary>
    /// Represents a product created by the builder
    /// </summary>
    class CarManual implements ICar
    {
        Doors:    number;
        Seats:    number;
        Engine:   string;
        Computer: string;

        constructor(doors?: number, seats?: number, engine?: string, computer?: string) {
            this.Doors    = doors;
            this.Seats    = seats;
            this.Engine   = engine;
            this.Computer = computer;
        }
    }

    /// <summary>
    /// Concrete builder implementation
    /// </summary>
    class CarBuilder implements ICarBuilder
    {
        private car:Car;

        Reset() {
            this.car = new Car();
        }
        SetSeats(number: number) {
            this.car.Seats = number;
        }
        SetDoors(number: number) {
            this.car.Doors = number;
        }
        SetEngine(engine: string) {
            this.car.Engine = engine;
        }
        SetComputer(computer: string) {
            this.car.Computer = computer;
        }

        GetResult(): ICar {
            return this.car;
        }
    }

    /// <summary>
    /// Concrete builder implementation
    /// </summary>
    class CarManualBuilder implements ICarBuilder
    {
        private carManual:CarManual;

        Reset() {
            this.carManual = new CarManual();
        }
        SetSeats(number: number) {
            this.carManual.Seats = number;
        }
        SetDoors(number: number) {
            this.carManual.Doors = number;
        }
        SetEngine(engine: string) {
            this.carManual.Engine = engine;
        }
        SetComputer(computer: string) {
            this.carManual.Computer = computer;
        }

        GetResult(): ICar {
            return this.carManual;
        }
    }

    /// <summary>
    /// Director
    /// </summary>
    class Director
    {
        private builder:ICarBuilder;
        constructor(builder: ICarBuilder) {
            this.builder = builder;
        }

        ChangeBuilder(builder: ICarBuilder) {
            this.builder = builder;
        }

        Construct(type: string)
        {
            this.builder.Reset();
            this.builder.SetSeats(2);
            this.builder.SetDoors(2);
            this.builder.SetEngine("Engine");

            if(type == "advanced") {
                this.builder.SetComputer("HP Computer");
            }
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    class Application {
        public static Main() 
        {
            // Car construction 
            let carBuilder = new CarBuilder();

            let carDirector = new Director(carBuilder);
            carDirector.Construct("advanced");

            let car = carBuilder.GetResult();

            // Manual construction 
            let manualBuilder = new CarManualBuilder();

            let manualDirector = new Director(manualBuilder);
            manualDirector.Construct("advanced");

            let manual = manualBuilder.GetResult();
        }
    }

    Application.Main();
}());

