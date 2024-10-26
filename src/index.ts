/**
 * Creates multiple TypedArray views on a single ArrayBuffer or SharedArrayBuffer.
 * The function takes a constructor (either ArrayBuffer or SharedArrayBuffer) and a configuration object,
 * then allocates the buffer and returns the specified TypedArray views.
 *
 * @typeParam T - A record specifying the TypedArray types and sizes.
 * @param BufferType - The constructor for the buffer, either ArrayBuffer or SharedArrayBuffer.
 * @param config - An object specifying the desired views. Each key represents the name of the view, and the value is a tuple where:
 *  - The first element is the TypedArray class name (e.g., Float32Array, Uint32Array).
 *  - The second element is the number of elements for that view.
 *
 * @returns An object containing the views, with each key corresponding to the provided configuration.
 *
 * @example
 * ```typescript
 * import { createArrayBufferViews } from '@ain1084/array-buffer-partitioner';
 *
 * const views = createArrayBufferViews(ArrayBuffer, {
 *   data: [Float32Array, 1024],
 *   index: [Uint32Array, 1],
 *   flag: [Uint8Array, 1]
 * });
 *
 * console.log(views.data.length); // 1024
 * console.log(views.data.byteOffset); // 0
 * console.log(views.index.length); // 1
 * console.log(views.flag.length); // 1
 * console.log(views.flag.byteOffset); // 4100
 * console.log(views.data.buffer.byteLength); // 4104
 * ```
 */
export function createArrayBufferViews<T extends Record<string, [ArrayTypeConstructor<SupportedArrays>, number]>>(
  BufferType: { new(size: number): ArrayBuffer },
  config: T
): {
    [K in keyof T]: InstanceType<T[K][0]>
  } {
  const alignTo = (value: number, alignment: number) =>
    (value + alignment - 1) & ~(alignment - 1);

  let totalSize = 0;

  for (const [, [type, size]] of Object.entries(config) as Array<[string, ArrayView]>) {
    const alignment = type.BYTES_PER_ELEMENT;
    totalSize = alignTo(totalSize, alignment) + (alignment * size);
  }

  const buffer = new BufferType(totalSize);
  const result = {} as { [K in keyof T]: InstanceType<T[K][0]> };

  let offset = 0;

  for (const key in config) {
    const [type, size] = config[key];
    const alignment = type.BYTES_PER_ELEMENT;
    offset = alignTo(offset, alignment);
    result[key] = new type(buffer, offset, size) as InstanceType<T[typeof key][0]>;
    offset += alignment * size;
  }

  return result;
}

/**
 * Represents the constructor for supported TypedArray types.
 * @internal
 */
type ArrayTypeConstructor<R> = {
  new(buffer: ArrayBuffer, byteOffset: number, length: number): R;
  BYTES_PER_ELEMENT: number;
};

/**
 * Lists the supported TypedArray types.
 * @internal
 */
type SupportedArrays =
  Float32Array | Uint32Array | Uint8Array |
  Int32Array | Int16Array | Uint16Array |
  Float64Array | BigInt64Array | BigUint64Array;

/**
 * Represents the configuration for creating TypedArray views.
 * Each entry consists of a TypedArray class name and the number of elements to allocate.
 * @internal
 */
type ArrayView = [ArrayTypeConstructor<SupportedArrays>, number];
