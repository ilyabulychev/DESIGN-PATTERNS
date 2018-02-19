namespace Flyweight {

    /// <summary>
    /// TreeType / Static 
    /// </summary>
    export class TreeType {
        
        Name: string;
        Color: string;
        Texture: any;

        constructor(name: string, color: string, texture: any) {
            this.Name    = name;
            this.Color   = color;
            this.Texture = texture;
        }

        Draw(canvas: any, x: number, y: number) {
            console.log(`Drawing the ${this.Name} with color: ${this.Color}, texture ${this.Texture}`);
        }
    }

    /// <summary>
    /// TreeType Facotry / Static 
    /// </summary>
    export class TreeTypeFactory {

        private static treeTypes: TreeType[] = [];

        static GetTreeType(name: string, color: string, texture: any) {
            let type = TreeTypeFactory.treeTypes.find(type => type.Name == name && type.Color == color && type.Texture == texture);

            if(type == undefined) {
                type = new TreeType(name, color, texture);
                this.treeTypes.push(type); 
            }

            return type;
        }
    }

    /// <summary>
    /// Tree / Dynamic Data
    /// </summary>
    export class Tree {
        X: number;
        Y: number;

        Type: TreeType;

        constructor(x: number, y: number, type: TreeType) {
            this.X = x;
            this.Y = y;
            this.Type = type;
        }

        Draw(canvas) {
            this.Type.Draw(canvas, this.X, this.Y);
        }
    }

    /// <summary>
    /// Forest
    /// </summary>
    export class Forest {
        
        Trees: Tree[];

        constructor() {
            this.Trees = [];
        }

        PlantTree(x: number, y: number, color: string, texture: any) {
            let type = TreeTypeFactory.GetTreeType(name, color, texture);
            let tree = new Tree(x, y, type);
            this.Trees.push(tree);
        }

        Draw(canvas) {
            this.Trees.forEach((tree, index, array) => {
                tree.Draw(canvas);
            });
        }
    }

    /// <summary>
    /// Application
    /// </summary>
    export class Application {
        
        static Main() 
        {
            let forest = new Forest();
            forest.PlantTree(10, 10, "green", "green tree");
            forest.PlantTree(20, 20, "yellow", "yellow tree");
            forest.Draw("canvas");
        }
    }

    Application.Main();
}

