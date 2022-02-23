import { EngineGlobalObject, GameStateKind } from "the-world-engine";

type Layer<l extends number = 32, acc extends string[] = ["default"]> =
    acc["length"] extends l
        ? acc
        : acc | Layer<l, [...acc, string]>;

type LayerParm<T extends Layer, acc extends boolean[] = [], out extends string = never> =
    acc["length"] extends T["length"]
        ? out
        : out | LayerParm<T, [...acc, true], T[acc["length"]]>

export class LayerMaskFactory {
    private _engineGlobalObject: EngineGlobalObject;
    private _strCategory: Map<string, number> = new Map([["default", 0x0001]]); //key: layerName value: layer
    private _numCategory: Map<number, string> = new Map([[0x0001, "default"]]); //key: layer value: layerName
    private _layerMasks: Map<number, number> = new Map([[0x0001, 0x0001]]); //key: layer value: layerMask

    public constructor(engineGlobalObject: EngineGlobalObject) {
        this._engineGlobalObject = engineGlobalObject;
    }

    public nameToLayer<T extends Layer>(layerName: LayerParm<T>): number {
        const category = this._strCategory.get(layerName as string);
        if (category === undefined) {
            throw new Error("Layer not found");
        }
        return category;
    }

    public layerToName<T extends Layer>(layer: number): LayerParm<T> {
        const category = this._numCategory.get(layer);
        if (category === undefined) {
            throw new Error("Layer not found");
        }
        return category as LayerParm<T>;
    }

    public createMaskFromName<T extends Layer>(...layerNames: LayerParm<T>[]): number {
        let maskBit = 0x0000;
        for (let i = 0; i < layerNames.length; i++) {
            maskBit |= this.nameToLayer(layerNames[i]);
        }
        return maskBit;
    }

    public createMaskFromLayer(...layer: number[]): number {
        let maskBit = 0x0000;
        for (let i = 0; i < layer.length; i++) {
            maskBit |= layer[i];
        }
        return maskBit;
    }

    public getMaskFromName<T extends Layer>(layerName: LayerParm<T>): number {
        const category = this._strCategory.get(layerName as string);
        if (category === undefined) throw new Error("Layer not found");
        const mask = this._layerMasks.get(category);
        if (mask === undefined) throw new Error("Mask not found");
        return mask;
    }

    public getMaskFromLayer(layer: number): number {
        const mask = this._layerMasks.get(layer);
        if (mask === undefined) throw new Error("Mask not found");
        return mask;
    }

    // #region Layer Collision Matrix Overloads
    
    /* generator
using System;
using System.Text;

StringBuilder builder = new();

void MakeLine(int len, int i)
{
    builder.Append($"            [key in T[{i}]]: ");
    for (var j = 0; j < len - i; j++)
    {
        builder.Append($"{{ [key in T[{len - j - 1}]]: boolean }}");
        if (j != len - i - 1)
        {
            builder.Append(" & ");
        }
    }
    builder.AppendLine();
}

void MakeSet(int set)
{
    builder.Append("    public setLayerCollisionMatrix<T extends [");
    for (var i = 0; i < set; i++)
    {
        builder.Append("string");
        if (i != set - 1)
        {
            builder.Append(", ");
        }
    }
    builder.AppendLine("]>(");
    builder.AppendLine("        collisionMatrix: {");
    for (var i = 0; i < set; i++)
    {
        MakeLine(set, i);
        builder.AppendLine(i != set - 1 ? "        } & {" : "        }");
    }
    builder.AppendLine("    ): void;");
}

for (var i = 1; i <= 32; i++)
{
    MakeSet(i);
    builder.AppendLine();
}

Console.WriteLine(builder.ToString());
    */
    public setLayerCollisionMatrix<T extends [string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[1]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[2]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[3]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[4]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[5]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[6]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[7]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[8]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[9]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[10]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[11]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[12]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[13]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[14]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[15]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[16]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[17]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[18]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[19]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[19]]: { [key in T[19]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[19]]: { [key in T[20]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[20]]: { [key in T[20]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[19]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[20]]: { [key in T[21]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[21]]: { [key in T[21]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[19]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[20]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[21]]: { [key in T[22]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[22]]: { [key in T[22]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[19]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[20]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[21]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[22]]: { [key in T[23]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[23]]: { [key in T[23]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[19]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[20]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[21]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[22]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[23]]: { [key in T[24]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[24]]: { [key in T[24]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[19]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[20]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[21]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[22]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[23]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[24]]: { [key in T[25]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[25]]: { [key in T[25]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[19]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[20]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[21]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[22]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[23]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[24]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[25]]: { [key in T[26]]: boolean } & { [key in T[25]]: boolean }
        } & {
            [key in T[26]]: { [key in T[26]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[19]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[20]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[21]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[22]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[23]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[24]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[25]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean }
        } & {
            [key in T[26]]: { [key in T[27]]: boolean } & { [key in T[26]]: boolean }
        } & {
            [key in T[27]]: { [key in T[27]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[19]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[20]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[21]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[22]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[23]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[24]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[25]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean }
        } & {
            [key in T[26]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean }
        } & {
            [key in T[27]]: { [key in T[28]]: boolean } & { [key in T[27]]: boolean }
        } & {
            [key in T[28]]: { [key in T[28]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[19]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[20]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[21]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[22]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[23]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[24]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[25]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean }
        } & {
            [key in T[26]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean }
        } & {
            [key in T[27]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean }
        } & {
            [key in T[28]]: { [key in T[29]]: boolean } & { [key in T[28]]: boolean }
        } & {
            [key in T[29]]: { [key in T[29]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[19]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[20]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[21]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[22]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[23]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[24]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[25]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean }
        } & {
            [key in T[26]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean }
        } & {
            [key in T[27]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean }
        } & {
            [key in T[28]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean }
        } & {
            [key in T[29]]: { [key in T[30]]: boolean } & { [key in T[29]]: boolean }
        } & {
            [key in T[30]]: { [key in T[30]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean } & { [key in T[0]]: boolean }
        } & {
            [key in T[1]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[17]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[18]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[19]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[20]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[21]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[22]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[23]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[24]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[25]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean } & { [key in T[25]]: boolean }
        } & {
            [key in T[26]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean } & { [key in T[26]]: boolean }
        } & {
            [key in T[27]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean } & { [key in T[27]]: boolean }
        } & {
            [key in T[28]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean } & { [key in T[28]]: boolean }
        } & {
            [key in T[29]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean } & { [key in T[29]]: boolean }
        } & {
            [key in T[30]]: { [key in T[31]]: boolean } & { [key in T[30]]: boolean }
        } & {
            [key in T[31]]: { [key in T[31]]: boolean }
        }
    ): void;

    // #endregion

    public setLayerCollisionMatrix<T extends Layer>(
        collisionMatrix: { [key in T[number]]: { [key in T[number]]: boolean } },
    ): void {
        if (this._engineGlobalObject.gameState.kind !== GameStateKind.Initializing) {
            throw new Error("Cannot set collision matrix after initialization");
        }
        const entries = Object.entries(collisionMatrix) as [string, object][];

        entries.sort((a, b) => { //sort for consistency
            const aKey = Object.entries(a[1]).length;
            const bKey = Object.entries(b[1]).length;
            return bKey - aKey;
        });

        // register layer
        this._strCategory.clear();
        this._numCategory.clear();
        this._layerMasks.clear();

        for (let i = 0, j = 0x0001; i < entries.length; i++, j <<= 1) {
            const layerName = entries[i][0];
            this._strCategory.set(layerName, j);
            this._numCategory.set(j, layerName);
            this._layerMasks.set(j, 0x0000);
        }

        // set collision matrix
        for (let i = 0; i < entries.length; ++i) {
            const item = entries[i];
            const layerName = item[0];
            const layerEntries = Object.entries(item[1]);
            for (let j = 0; j < layerEntries.length; ++j) {
                const matrixKey = layerEntries[j][0];
                const matrixValue = layerEntries[j][1] as boolean;

                const layerA = this._strCategory.get(layerName)!;
                const layerB = this._strCategory.get(matrixKey)!;

                const layerMaskA = this._layerMasks.get(layerA)!;
                const layerMaskB = this._layerMasks.get(layerB)!;

                if (matrixValue) {
                    this._layerMasks.set(layerA, layerMaskA | layerB);
                    this._layerMasks.set(layerB, layerMaskB | layerA);
                }
            }
        }
    }
}
