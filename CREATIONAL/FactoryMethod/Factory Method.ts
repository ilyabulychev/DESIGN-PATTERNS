// [FACTORY METHOD PATTERN]
// - Defines an interface for creating objects, but let subclasses to decide which class to instantiate.
// - Refers the newly created object through a common interface.

// Applicability 
// - When the types and dependencies of objects with which your code should work are unknown in advance.
// - When you want to enable users to expand parts of your framework or library.

namespace FactoryMethod 
{
    
    /// <summary>
    /// The Document Service abstraction
    /// </summary>
    interface IDocumentService {
        Create (name: string): IDocument
        Add    (document : IDocument)
        Find   (predicate: Function)
        Encrypt(document : IDocument)
        Decrypt(document : IDocument)
    }
    
    /// <summary>
    /// The Document abstraction
    /// </summary>
    interface IDocument {
        Name: string;
        Type: DocumentType;
        Read()
        Write()
    }
  
    /// <summary>
    /// Document Type Enumeration
    /// </summary>
    enum DocumentType {
        Word  = "docx",
        Excel = "xlsx",
        Json  = "json",
        Txt   = "txt"
    }

    /// <summary>
    /// Abstract Base Document
    /// </summary>
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

    /// <summary>
    /// Word Document
    /// </summary>
    class WordDocument extends Document  {

        constructor(name: string = "Word") {
            super(name, DocumentType.Word);
        }

        ConvertToHtml() {
            alert(`Converting of ${this.Name} to HTML...`);
        }
    }

    /// <summary>
    /// Excel Document
    /// </summary>
    class ExcelDocument extends Document  {

        constructor(name: string = "Excel") {
            super(name, DocumentType.Excel);
        }

        ConvertToHtml() {
            alert(`Converting of ${this.Name} to HTML...`);
        }
    }
    
    /// <summary>
    /// Json Document
    /// </summary>
    class JsonDocument extends Document  {

        Json: Object;

        constructor(name: string = "main") {
            super(name, DocumentType.Json);
        }

        TextToJson(text: string) {
            alert(`Pararsing text of ${this.Name}`);
        }
    }

    /// <summary>
    /// Text Document
    /// </summary>
    class TxtDocument extends Document  {

        constructor(name: string = "document") {
            super(name, DocumentType.Txt);
        }
    }

    /// <summary>
    /// Abstract Base Document Service
    /// </summary>
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

    /// <summary>
    /// Word Document Service
    /// </summary>
    class WordDocumentService extends DocumentService {
    
        public Create(name: string) : IDocument  {

            let document: IDocument = new WordDocument(name);

            return document;
        }
    }

    /// <summary>
    /// Excel Document Service
    /// </summary>
    class ExcelDocumentService extends DocumentService {
    
        public Create(name: string) : IDocument  {

            let document: IDocument = new ExcelDocument(name);

            return document;
        }
    }

    /// <summary>
    /// Json Document Service
    /// </summary>
    class JsonDocumentService extends DocumentService {
    
        public Create(name: string) : IDocument  {

            let document: IDocument = new JsonDocument(name);

            return document;
        }
    }

    /// <summary>
    /// Text Document Service
    /// </summary>
    class TxtDocumentService extends DocumentService {
    
        public Create(name: string) : IDocument  {

            let document: IDocument = new TxtDocument(name);

            return document;
        }
    }
    
    /// <summary>
    /// Application
    /// </summary>
    class Application {
        public static Main() {
            
            let wordDocumentService  = new WordDocumentService();
            let excelDocumentService = new ExcelDocumentService();
            let jsonDocumentService = new JsonDocumentService();
            let txtDocumentService  = new TxtDocumentService();

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

