// Abstract Factory Pattern
// - Abstract Factory offers the interface for creating a family of related objects, without explicitly specifying their classes

(function () {
    
    // Interfaces
    interface IDocumentService {

        CreateWordDocument(name: string): IDocument
        CreateExcelDocument(name: string): IDocument

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

    // Microsoft Word Application
    abstract class WordDocument extends Document  {

        constructor(name: string = "Word") {
            super(name, DocumentType.Word);
        }
    }

    class Word2016Document extends WordDocument  {

        constructor(name: string = "Word 2016") {
            super(name);
        }
    }

    class Word2007Document extends WordDocument  {

        constructor(name: string = "Word 2007") {
            super(name);
        }
    }

    // Microsoft Excel Application
    abstract class ExcelDocument extends Document  {

        constructor(name: string = "Excel") {
            super(name, DocumentType.Word);
        }
    }

    class Excel2016Document extends ExcelDocument  {

        constructor(name: string = "Excel 2016") {
            super(name);
        }
    }

    class Excel2007Document extends ExcelDocument  {

        constructor(name: string = "Excel 2007") {
            super(name);
        }
    }

    // DocumentService

    abstract class DocumentService implements IDocumentService {

        List: object[];

        constructor(){
            this.List = [];
        }

        abstract CreateWordDocument (name: string);
        abstract CreateExcelDocument(name: string);

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

    class Document2016Service extends DocumentService {
     
        CreateWordDocument(name: string) : IDocument  {

            let document: IDocument = new Word2016Document(name);

            return document;
        }
        CreateExcelDocument(name: string) {

            let document: IDocument = new Excel2016Document(name);

            return document;
        }
    }

    class Document2007Service extends DocumentService {
    
        CreateWordDocument(name: string) : IDocument  {

            let document: IDocument = new Word2007Document(name);

            return document;
        }
        CreateExcelDocument(name: string) {

            let document: IDocument = new Excel2007Document(name);

            return document;
        }
    }
    
    // Application
    
    class Application {
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
                document.Read();
            }
        }
    }

    Application.Main();
}());
