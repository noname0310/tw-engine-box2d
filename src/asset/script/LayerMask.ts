export class LayerMask {
    private _layers: Map<string, number> = new Map();

    public getLayers<T extends string[]>(): { [key in T[number]]: number } {
        return this._layers as unknown as { [key in T[number]]: number };
    }

    public setLayerCollisionMatrix<T extends [string]>(
        collisionMatrix: { 
            [key in T[0]]: { [key in T[0]]: boolean }
        }
    ): void;

    public setLayerCollisionMatrix<T extends [string, string]>(
        collisionMatrix: {
            [key in T[0]]: { [key in T[0]]: boolean } & { [key in T[1]]: boolean; }
        } & {
            [key in T[1]]: { [key in T[0]]: boolean; };
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

    public setLayerCollisionMatrix<T extends string[]>(
        collisionMatrix: { [key in T[number]]: { [key in T[number]]: boolean } },
    ): void {
        throw new Error("Method not implemented." + collisionMatrix);
    }
}
