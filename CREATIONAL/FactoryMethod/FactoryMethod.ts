namespace FactoryMethod 
{   
    /// <summary>
    /// The Document Service abstraction
    /// </summary>
    export interface IDocumentService {
        Create (name: string): IDocument
        Add    (document : IDocument): number;
        Find   (predicate: Function) : string;
        Encrypt(document : IDocument): string;
        Decrypt(document : IDocument): string;
    }
    
    /// <summary>
    /// The Document abstraction
    /// </summary>
    export interface IDocument {
        Name: string;
        Type: DocumentType;
        Read() : string;
        Write(): string;
    }
  
    /// <summary>
    /// Document Type Enumeration
    /// </summary>
    export enum DocumentType {
        Word  = "docx",
        Excel = "xlsx",
        Json  = "json",
        Txt   = "txt"
    }

    /// <summary>
    /// Abstract Base Document
    /// </summary>
    export abstract class Document implements IDocument {
        
        Name: string;
        Type: DocumentType

        constructor(name: string, type: DocumentType) {
            this.Name = name;
            this.Type = type;
        }

        Read  = () => `The ${this.Name} is reading`;
        Write = () => `The ${this.Name} is writing`;
    }

    /// <summary>
    /// Word Document
    /// </summary>
    export class WordDocument extends Document  {

        constructor(name: string = "Word") {
            super(name, DocumentType.Word);
        }

        ConvertToHtml = () => `Converting of ${this.Name} to HTML...`;
    }

    /// <summary>
    /// Excel Document
    /// </summary>
    export class ExcelDocument extends Document  {

        constructor(name: string = "Excel") {
            super(name, DocumentType.Excel);
        }

        ConvertToHtml = () => `Converting of ${this.Name} to HTML...`;
    }
    
    /// <summary>
    /// Json Document
    /// </summary>
    export class JsonDocument extends Document  {

        Json: Object;

        constructor(name: string = "main") {
            super(name, DocumentType.Json);
        }

        TextToJson = () => `Pararsing text of ${this.Name}`;
    }

    /// <summary>
    /// Text Document
    /// </summary>
    export class TxtDocument extends Document  {

        constructor(name: string = "document") {
            super(name, DocumentType.Txt);
        }
    }

    /// <summary>
    /// Abstract Base Document Service
    /// </summary>
    export abstract class DocumentService implements IDocumentService {

        List: object[];

        constructor(){
            this.List = [];
        }

        abstract Create(name: string);

        Add     = (document : IDocument) => this.List.push(document);

        Find    = (predicate: Function)  => `Enrypting the document...`;
        Encrypt = (document:  IDocument) => `Enrypting the ${document.Name} file`;
        Decrypt = (document:  IDocument) => `Decrypting the ${document.Name} file`;
    }

    /// <summary>
    /// Word Document Service
    /// </summary>
    export class WordDocumentService extends DocumentService {
    
        public Create(name: string) : IDocument  {

            let document: IDocument = new WordDocument(name);

            return document;
        }
    }

    /// <summary>
    /// Excel Document Service
    /// </summary>
    export class ExcelDocumentService extends DocumentService {
    
        public Create(name: string) : IDocument  {

            let document: IDocument = new ExcelDocument(name);

            return document;
        }
    }

    /// <summary>
    /// Json Document Service
    /// </summary>
    export class JsonDocumentService extends DocumentService {
    
        public Create(name: string) : IDocument  {

            let document: IDocument = new JsonDocument(name);

            return document;
        }
    }

    /// <summary>
    /// Text Document Service
    /// </summary>
    export class TxtDocumentService extends DocumentService {
    
        public Create(name: string) : IDocument  {

            let document: IDocument = new TxtDocument(name);

            return document;
        }
    }
    
    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() {
            
            let wordDocumentService  = new WordDocumentService();
            let excelDocumentService = new ExcelDocumentService();
            let jsonDocumentService  = new JsonDocumentService();
            let txtDocumentService   = new TxtDocumentService();

            let documents : IDocument[] = [
                wordDocumentService .Create("Factory.docx"),
                excelDocumentService.Create("Favorite Book.xlsx"),
                jsonDocumentService .Create("Factory Book.json")
            ];

            for(let document of documents) {
                document.Read();
            }

            let wordDocuments = documents.filter(o => o.Type == DocumentType.Word) as WordDocument[];
            
            for(let document of wordDocuments) {
                document.ConvertToHtml();
            }
        }
    }

    Application.Main();
}

