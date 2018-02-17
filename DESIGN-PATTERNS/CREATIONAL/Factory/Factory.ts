namespace Factory
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
        Name   : string;
        Type   : DocumentType;
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
    export class DocumentService implements IDocumentService {
    
        List: object[];

        constructor(){
            this.List = [];
        }

        public Create(name: string) : IDocument  {
            
            let type = name.split('.').pop() as DocumentType;

            let document: IDocument;
    
            switch(type) {
                case DocumentType.Word:
                    document = new WordDocument(name);
                    break;
    
                case DocumentType.Excel:
                    document = new ExcelDocument(name);
                    break;
    
                case DocumentType.Json:
                    document = new JsonDocument(name);
                    break;
                
                case DocumentType.Txt:
                    document = new TxtDocument(name);
                    break;
            }
            
            return document;
        }

        Add     = (document : IDocument) => this.List.push(document);

        Find    = (predicate: Function)  => `Enrypting the document...`;
        Encrypt = (document:  IDocument) => `Enrypting the ${document.Name} file`;
        Decrypt = (document:  IDocument) => `Decrypting the ${document.Name} file`;
    }
    
    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main(documentService: IDocumentService) {
                  
            let documents : IDocument[] = [
                documentService.Create("Factory Pattern.docx"),
                documentService.Create("Favorite Book.xlsx"),
                documentService.Create("Factory.json")
            ];

            for(let document of documents) {
                console.log(document.Read());
            }

            let wordDocuments = documents.filter(o => o.Type == DocumentType.Word) as WordDocument[];
            
            for(let document of wordDocuments) {
                console.log(document.ConvertToHtml());
            }
        }
    }
    
    //  Inversion of Control (IoC)
    Application.Main(new DocumentService());
}

