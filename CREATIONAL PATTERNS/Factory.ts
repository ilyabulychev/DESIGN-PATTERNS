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
        Word  = "docx",
        Excel = "xlsx",
        Json  = "json",
        Txt   = "txt"
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

    class WordDocument extends Document  {

        constructor(name: string = "Word") {
            super(name, DocumentType.Word);
        }

        ConvertToHtml() {
            alert(`Converting of ${this.Name} to HTML...`);
        }
    }

    class ExcelDocument extends Document  {

        constructor(name: string = "Excel") {
            super(name, DocumentType.Excel);
        }

        ConvertToHtml() {
            alert(`Converting of ${this.Name} to HTML...`);
        }
    }
    
    class JsonDocument extends Document  {

        Json: Object;

        constructor(name: string = "main") {
            super(name, DocumentType.Json);
        }

        TextToJson(text: string) {
            alert(`Pararsing text of ${this.Name}`);
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
                documentService.Create("Factory Pattern.docx"),
                documentService.Create("Favorite Book.xlsx"),
                documentService.Create("Factory.json")
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
    
    //  Inversion of Control (IoC)
    Application.Main(new DocumentService());
}());

