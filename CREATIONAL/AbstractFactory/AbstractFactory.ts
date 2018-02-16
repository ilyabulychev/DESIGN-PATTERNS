namespace AbstractFactory
{
    /// <summary>
    /// The Document Service abstraction
    /// </summary>
    export interface IDocumentService {

        CreateWordDocument (name: string): IDocument
        CreateExcelDocument(name: string): IDocument

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
    /// The Document Type enumeration
    /// </summary>
    export enum DocumentType {
        Word  = "docx",
        Excel = "xlsx",
        Json  = "json",
        Txt   = "txt"
    }

    /// <summary>
    /// The Document's base class 
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
    /// Microsoft Word document abstraction
    /// </summary>
    export abstract class WordDocument extends Document  {

        constructor(name: string = "Word") {
            super(name, DocumentType.Word);
        }
    }

    /// <summary>
    /// Microsoft Word 2016 document
    /// </summary>
    export class Word2016Document extends WordDocument  {

        constructor(name: string = "Word 2016") {
            super(name);
        }
    }

    /// <summary>
    /// Microsoft Word 2007 document
    /// </summary>
    export class Word2007Document extends WordDocument  {

        constructor(name: string = "Word 2007") {
            super(name);
        }
    }

    /// <summary>
    /// Microsoft Excel document abstraction
    /// </summary>
    export abstract class ExcelDocument extends Document  {

        constructor(name: string = "Excel") {
            super(name, DocumentType.Word);
        }
    }

    /// <summary>
    /// Microsoft Excel 2016 document
    /// </summary>
    export class Excel2016Document extends ExcelDocument  {

        constructor(name: string = "Excel 2016") {
            super(name);
        }
    }

    /// <summary>
    /// Microsoft Excel 2007 document
    /// </summary>
    export class Excel2007Document extends ExcelDocument  {

        constructor(name: string = "Excel 2007") {
            super(name);
        }
    }

    /// <summary>
    /// Document Service abstraction
    /// </summary>
    export abstract class DocumentService implements IDocumentService {

        List: object[];

        constructor(){
            this.List = [];
        }

        abstract CreateWordDocument (name: string);
        abstract CreateExcelDocument(name: string);

        Add     = (document : IDocument) => this.List.push(document);

        Find    = (predicate: Function)  => `Enrypting the document...`;
        Encrypt = (document:  IDocument) => `Enrypting the ${document.Name} file`;
        Decrypt = (document:  IDocument) => `Decrypting the ${document.Name} file`;
    }

    /// <summary>
    /// Document 2016 Service
    /// </summary>
    export class Document2016Service extends DocumentService {
     
        CreateWordDocument(name: string) : IDocument  {

            let document: IDocument = new Word2016Document(name);

            return document;
        }
        CreateExcelDocument(name: string) {

            let document: IDocument = new Excel2016Document(name);

            return document;
        }
    }

    /// <summary>
    /// Document 2007 Service
    /// </summary>
    export class Document2007Service extends DocumentService {
    
        CreateWordDocument(name: string) : IDocument  {

            let document: IDocument = new Word2007Document(name);

            return document;
        }
        CreateExcelDocument(name: string) {

            let document: IDocument = new Excel2007Document(name);

            return document;
        }
    }
    
    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        public static Main() {
            
            let document2016Service  = new Document2016Service();
            let document2007Service  = new Document2007Service();

            let documents : IDocument[] = [

                document2016Service.CreateWordDocument("Factory Pattern 2016.docx"),
                document2007Service.CreateWordDocument("Factory Pattern 2007.docx"),

                document2016Service.CreateExcelDocument("Factory Pattern 2016.xlsx"),
                document2007Service.CreateExcelDocument("Factory Pattern 2017.xlsx"),
            ];

            for(let document of documents) {
                console.log(document.Read());
            }
        }
    }

    Application.Main();
}
