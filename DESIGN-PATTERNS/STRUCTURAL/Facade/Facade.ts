namespace Facade {

    /// <summary>
    /// XRay System
    /// </summary>
    export class XRaySystem {
        Activate() {
            console.log(`Activating the engine...`);
        }
        Scan() {
            console.log(`Scanning the patient...`);
        }
    }

    /// <summary>
    /// Monitor System
    /// </summary>
    export class MonitorSystem {
        Check() {
            console.log(`Cheking systems...`);
        }
    }

    /// <summary>
    /// Oxygen System
    /// </summary>
    export class OxygenSystem {
        Generate() {
            console.log(`Generating oxygen...`)
        }
    }

    /// <summary>
    /// Facade: Surgery Operation
    /// </summary>
    export class SurgeryOperation {

        private xRaySystem    : XRaySystem;
        private monitorSystem : MonitorSystem;
        private oxygenSystem  : OxygenSystem;

        constructor() {
            this.xRaySystem    = new XRaySystem();
            this.monitorSystem = new MonitorSystem();
            this.oxygenSystem  = new OxygenSystem();
        }

        Operate() {
            this.xRaySystem.Activate();
            this.xRaySystem.Scan();
            this.monitorSystem.Check();
            this.oxygenSystem.Generate();
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {
            let operation = new SurgeryOperation();
            operation.Operate();
        }
    }

    Application.Main();
}

