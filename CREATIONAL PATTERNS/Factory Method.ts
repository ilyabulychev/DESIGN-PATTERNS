// Factory Method Pattern
// - Defines an interface for creating objects, but let subclasses to decide which class to instantiate
// - Refers the newly created object through a common interface

// Applicability 
// - When the types and dependencies of objects with which your code should work are unknown in advance
// - When you want to enable users to expand parts of your framework or library

(function () {
    
    // Interfaces
    interface IDocumentService {
        Create (name: string): IDocument
        Add    (document : IDocument)
        Find   (predicate: Function)
        Encrypt(document : IDocument)
        Decrypt(document : IDocument)
    }
    
    interface IDocument {
        Name: string;
        Type: DocumentType;
        Read()
        Write()
    }
  
    enum DocumentType {
        Html = "html",
        Json = "json",
        Pdf  = "pdf",
        Txt  = "txt"
    }

    // Documents
    
    abstract class Document implements IDocument {
        
        Name: string;
        Type: DocumentType

        constructor(name: string, type: DocumentType) {
            this.Name = name;
            this.Type = type;
        }

        Read() {
            alert(`The ${this.Name} is reading`);
        }
        Write() {
            alert(`The ${this.Name} is writing`);
        }
    }

    class HtmlDocument extends Document  {

        constructor(name: string = "index") {
            super(name, DocumentType.Html);
        }

        SourceCode() {
            console.log(`Source code of ${this.Name}`);
        }
    }
    
    class JsonDocument extends Document  {

        Json: Object;

        constructor(name: string = "main") {
            super(name, DocumentType.Json);
        }

        TextToJson(text: string) {
            console.log(`Pararsing text of ${this.Name}`);
        }
    }

    class PdfDocument extends Document  {

        constructor(name: string = "document") {
            super(name, DocumentType.Pdf);
        }

        Recognize() {
            alert(`Recognizing text of ${this.Name}`);
        }
    }

    class TxtDocument extends Document  {

        constructor(name: string = "document") {
            super(name, DocumentType.Txt);
        }
    }

    // DocumentService

    abstract class DocumentService implements IDocumentService {

        List: object[];

        constructor(){
            this.List = [];
        }

        abstract Create(name: string);

        Add(document : IDocument) {
            this.List.push(document);
        }

        Find(predicate: Function) {
            alert(`Enrypting the document...`);
        }
        Encrypt(document: IDocument) {
            alert(`Enrypting the ${document.Name} file`);
        }
        Decrypt(document: IDocument) {
            alert(`Decrypting the ${document.Name} file`);
        }
    }

    // DocumentService's Factory Methods

    class HtmlDocumentService extends DocumentService {
    
        public Create(name: string) : IDocument  {

            let document: IDocument = new HtmlDocument(name);

            return document;
        }
    }

    class JsonDocumentService extends DocumentService {
    
        public Create(name: string) : IDocument  {

            let document: IDocument = new JsonDocument(name);

            return document;
        }
    }

    class PdfDocumentService extends DocumentService {
    
        public Create(name: string) : IDocument  {

            let document: IDocument = new PdfDocument(name);

            return document;
        }
    }

    class TxtDocumentService extends DocumentService {
    
        public Create(name: string) : IDocument  {

            let document: IDocument = new TxtDocument(name);

            return document;
        }
    }
    
    // Application
    
    class Application {
        public static Main() {
            
            let htmlDocumentService = new HtmlDocumentService();
            let jsonDocumentService = new JsonDocumentService();
            let pdfDocumentService  = new PdfDocumentService();
            let txtDocumentService  = new TxtDocumentService();

            let documents : IDocument[] = [
                jsonDocumentService.Create("Factory.json"),
                htmlDocumentService.Create("Favorite Book.html"),
                pdfDocumentService .Create("Factory Book.pdf")
            ];

            for(let document of documents) {
                document.Read();
            }

            let pdfDocuments = documents.filter(o => o.Type == DocumentType.Pdf) as PdfDocument[];
            
            for(let document of pdfDocuments) {
                document.Recognize();
            }
        }
    }

    Application.Main();
}());

