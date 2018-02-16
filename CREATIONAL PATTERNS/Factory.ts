// Factory Pattern

// - Creates objects without exposing the instantiation logic to the client
// - Refers to the newly created object through a common interface

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

    class DocumentService implements IDocumentService {
    
        List: object[];

        constructor(){
            this.List = [];
        }

        public Create(name: string) : IDocument  {
            
            let type = name.split('.').pop() as DocumentType;

            let document: IDocument;
    
            switch(type) {
                case DocumentType.Html:
                    document = new HtmlDocument(name);
                    break;
    
                case DocumentType.Json:
                    document = new JsonDocument(name);
                    break;
    
                case DocumentType.Pdf:
                    document = new PdfDocument(name);
                    break;
                
                case DocumentType.Txt:
                    document = new TxtDocument(name);
                    break;
            }
            
            return document;
        }

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
    
    // Application
    
    class Application {
        public static Main(documentService: IDocumentService) {
                  
            let documents : IDocument[] = [
                documentService.Create("Factory Pattern.pdf"),
                documentService.Create("Favorite Book.html"),
                documentService.Create("Factory.json")
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
    
    //  Inversion of Control (IoC)
    Application.Main(new DocumentService());
}());

