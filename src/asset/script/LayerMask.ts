type Layer<l extends number = 32, acc extends Array<string> = [string]> =
    acc["length"] extends l
      ? acc
      : acc | Layer<l, [...acc, string]>;

export class LayerMask {
    private _layers: Map<string, number> = new Map();

    public getLayers<T extends Layer>(): { [key in T[number]]: number } {
        return this._layers as unknown as { [key in T[number]]: number };
    }

    /* generator
    using System;
    using System.Text;

    StringBuilder builder = new();

    void MakeLine(int len, int i)
    {
        builder.Append($"            [key in T[{i}]]: ");
        for (var j = 0; j < len - i; j++)
        {
            builder.Append($"{{ [key in T[{j}]]: boolean }}");
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
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[19]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[19]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[20]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[19]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[20]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[21]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[19]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[20]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[21]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[22]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[19]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[20]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[21]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[22]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[23]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[19]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[20]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[21]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[22]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[23]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[24]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[19]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[20]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[21]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[22]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[23]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[24]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[25]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[19]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[20]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[21]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[22]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[23]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[24]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[25]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[26]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[19]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[20]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[21]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[22]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[23]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[24]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[25]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[26]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[27]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean } & { [key in T[28]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[19]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[20]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[21]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[22]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[23]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[24]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[25]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[26]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[27]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[28]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean } & { [key in T[28]]: boolean } & { [key in T[29]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean } & { [key in T[28]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[19]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[20]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[21]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[22]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[23]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[24]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[25]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[26]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[27]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[28]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[29]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean } & { [key in T[28]]: boolean } & { [key in T[29]]: boolean } & { [key in T[30]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean } & { [key in T[28]]: boolean } & { [key in T[29]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean } & { [key in T[28]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[19]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[20]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[21]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[22]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[23]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[24]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[25]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[26]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[27]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[28]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[29]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[30]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean } & { [key in T[28]]: boolean } & { [key in T[29]]: boolean } & { [key in T[30]]: boolean } & { [key in T[31]]: boolean }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean } & { [key in T[28]]: boolean } & { [key in T[29]]: boolean } & { [key in T[30]]: boolean }
        } & {
            [key in T[2]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean } & { [key in T[28]]: boolean } & { [key in T[29]]: boolean }
        } & {
            [key in T[3]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean } & { [key in T[28]]: boolean }
        } & {
            [key in T[4]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean } & { [key in T[27]]: boolean }
        } & {
            [key in T[5]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean } & { [key in T[26]]: boolean }
        } & {
            [key in T[6]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean } & { [key in T[25]]: boolean }
        } & {
            [key in T[7]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean } & { [key in T[24]]: boolean }
        } & {
            [key in T[8]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean } & { [key in T[23]]: boolean }
        } & {
            [key in T[9]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean } & { [key in T[22]]: boolean }
        } & {
            [key in T[10]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean } & { [key in T[21]]: boolean }
        } & {
            [key in T[11]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean } & { [key in T[20]]: boolean }
        } & {
            [key in T[12]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean } & { [key in T[19]]: boolean }
        } & {
            [key in T[13]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean } & { [key in T[18]]: boolean }
        } & {
            [key in T[14]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean } & { [key in T[17]]: boolean }
        } & {
            [key in T[15]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean } & { [key in T[16]]: boolean }
        } & {
            [key in T[16]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean } & { [key in T[15]]: boolean }
        } & {
            [key in T[17]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean } & { [key in T[14]]: boolean }
        } & {
            [key in T[18]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean } & { [key in T[13]]: boolean }
        } & {
            [key in T[19]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean } & { [key in T[12]]: boolean }
        } & {
            [key in T[20]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean } & { [key in T[11]]: boolean }
        } & {
            [key in T[21]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean } & { [key in T[10]]: boolean }
        } & {
            [key in T[22]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean } & { [key in T[9]]: boolean }
        } & {
            [key in T[23]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean } & { [key in T[8]]: boolean }
        } & {
            [key in T[24]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean } & { [key in T[7]]: boolean }
        } & {
            [key in T[25]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean } & { [key in T[6]]: boolean }
        } & {
            [key in T[26]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean } & { [key in T[5]]: boolean }
        } & {
            [key in T[27]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean } & { [key in T[4]]: boolean }
        } & {
            [key in T[28]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean } & { [key in T[3]]: boolean }
        } & {
            [key in T[29]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean } & { [key in T[2]]: boolean }
        } & {
            [key in T[30]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean }
        } & {
            [key in T[31]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends Layer>(
        collisionMatrix: { [key in T[number]]: { [key in T[number]]: boolean } },
    ): void {
        throw new Error("Method not implemented." + collisionMatrix);
    }
}
