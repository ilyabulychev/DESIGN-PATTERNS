namespace Bridge {

    /// <summary>
    /// The Device Abstraction
    /// </summary>
    export interface IDevice {
        IsEnabled() : boolean;
        Enable() : boolean;
        Disable(): boolean;

        GetValume() : number;
        SetValume(number: number);

        GetChannel() : number;
        SetChannel(number: number);
    }

    /// <summary>
    /// The Remote Abstraction
    /// </summary>
    export interface IRemote {
        TogglePower();

        ValumeUp();
        ValumeDown();

        ChannelUp();
        ChannelDown();
    }

    /// <summary>
    /// Remote Concrete
    /// </summary>
    export class Remote implements IRemote {

        protected device : IDevice;
        constructor(device : IDevice) {
            this.device = device;
        }

        TogglePower() {
            if(this.device.IsEnabled()) {
                this.device.Disable();
            } else {
                this.device.Enable()
            }
        }

        ValumeUp() {
            this.device.SetValume(this.device.GetValume() + 10);
        }

        ValumeDown() {
            this.device.SetValume(this.device.GetValume() - 10);
        }

        ChannelUp() {
            this.device.SetChannel(this.device.GetChannel() + 1);
        }

        ChannelDown() {
            this.device.SetChannel(this.device.GetChannel() - 1);
        }
    }

    /// <summary>
    /// Advanced Remote Concrete
    /// </summary>
    export class AdvancedRemote extends Remote {

        Mute() {
            this.device.SetValume(0);
        }
    }

    /// <summary>
    /// TV Device Concrete
    /// </summary>
    export class TV implements IDevice {
        
        private power   : boolean;
        private valume  : number;
        private channel : number;

        constructor(){
            this.valume  = 0;
            this.channel = 1;
        }
        IsEnabled(): boolean {
            return this.power;
        }
        Enable(): boolean {
            return this.power = true;
        }
        Disable(): boolean {
            return this.power = false;
        }
        GetValume(): number {
            return this.valume;
        }
        SetValume(number: number) {
            return this.valume = number;
        }
        GetChannel(): number {
            return this.channel;
        }
        SetChannel(number: number) {
            return this.channel = number;
        }
    }

    /// <summary>
    /// Radio Device Concrete
    /// </summary>
    export class Radio implements IDevice {
        
        private power   : boolean;
        private valume  : number;
        private channel : number;

        constructor(){
            this.valume  = 0;
            this.channel = 1;
        }

        IsEnabled(): boolean {
            return this.power;
        }
        Enable(): boolean {
            return this.power = true;
        }
        Disable(): boolean {
            return this.power = false;
        }
        GetValume(): number {
            return this.valume;
        }
        SetValume(number: number) {
            return this.valume = number;
        }
        GetChannel(): number {
            return this.channel;
        }
        SetChannel(number: number) {
            return this.channel = number;
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {
          let tv = new TV();
          let tvRemote = new Remote(tv);
          tvRemote.TogglePower();

          let radio = new Radio();
          let radioRemote = new AdvancedRemote(radio);
          radioRemote.ValumeUp();

          console.log(radio.GetValume());
        }
    }

    Application.Main();
}

