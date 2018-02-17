namespace Adapter {

    /// <summary>
    /// The Adapter abstraction
    /// </summary>
    export interface IReader {
        Read() : string;
        Write(): string;
    }

    /// <summary>
    /// Xml Reader / Old Style Class
    /// </summary>
    class XmlReader {
        ReadXML = ()  => `Reading XML file...`;
        WriteXML = () => `Writting XML file...`;
      }

    /// <summary>
    /// JSON Reader / New Style class
    /// </summary>
    export class JsonReader implements IReader {
        Read = ()  => `Reading JSON file...`;
        Write = () => `Writting JSON file...`;
    }

    /// <summary>
    /// Xml Reader Adapter to IReader format
    /// </summary>
    export class XmlReaderAdapter implements IReader {
        Read = () => {
            const xmlReader = new XmlReader();
            return xmlReader.ReadXML();
        }
        Write = () => {
            const xmlReader = new XmlReader();
            return xmlReader.WriteXML();
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {  
            let readers : IReader[] = [
                new JsonReader(),
                new XmlReaderAdapter()
            ];
            
            for(let reader of readers) {
                console.log(reader.Read());
                console.log(reader.Write());
            }
        }
    }

    Application.Main();
}

