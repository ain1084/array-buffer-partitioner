// Jest test file for the array-buffer-partitioner module

import { createArrayBufferViews } from '../src';

const alignTo = (offset: number, alignment: number): number => {
  return (offset + alignment - 1) & ~(alignment - 1)
}

describe('createArrayBufferViews', () => {
  it('should create the correct TypedArray views with ArrayBuffer', () => {
    const views = createArrayBufferViews(ArrayBuffer, {
      data: [Float32Array, 1024],
      index: [Uint32Array, 1],
      flag: [Uint8Array, 1],
      u32: [Uint32Array, 1],
      u64: [BigUint64Array, 1],
    });

    expect(views.data.byteOffset).toBe(0);
    expect(views.data.length).toBe(1024);
    expect(views.index.byteOffset).toBe(1024 * Float32Array.BYTES_PER_ELEMENT);
    expect(views.index.length).toBe(1);
    expect(views.flag.byteOffset).toBe(alignTo(views.index.byteOffset + Uint32Array.BYTES_PER_ELEMENT, Uint8Array.BYTES_PER_ELEMENT));
    expect(views.flag.length).toBe(1);
    expect(views.u32.byteOffset).toBe(alignTo(views.flag.byteOffset + Uint8Array.BYTES_PER_ELEMENT, Uint32Array.BYTES_PER_ELEMENT));
    expect(views.u32.length).toBe(1);
    expect(views.u64.byteOffset).toBe(alignTo(views.u32.byteOffset + Uint32Array.BYTES_PER_ELEMENT, BigUint64Array.BYTES_PER_ELEMENT));
    expect(views.u64.length).toBe(1);
  });

  it('should create the correct TypedArray views with SharedArrayBuffer', () => {
    const views = createArrayBufferViews(SharedArrayBuffer, {
      data: [Float32Array, 1024],
      index: [Uint32Array, 1],
      flag: [Uint8Array, 1],
      u32: [Uint32Array, 1],
      u64: [BigUint64Array, 1],
    });
    expect(views.data.byteOffset).toBe(0);
    expect(views.data.length).toBe(1024);
    expect(views.index.byteOffset).toBe(1024 * Float32Array.BYTES_PER_ELEMENT);
    expect(views.index.length).toBe(1);
    expect(views.flag.byteOffset).toBe(alignTo(views.index.byteOffset + Uint32Array.BYTES_PER_ELEMENT, Uint8Array.BYTES_PER_ELEMENT));
    expect(views.flag.length).toBe(1);
    expect(views.u32.byteOffset).toBe(alignTo(views.flag.byteOffset + Uint8Array.BYTES_PER_ELEMENT, Uint32Array.BYTES_PER_ELEMENT));
    expect(views.u32.length).toBe(1);
    expect(views.u64.byteOffset).toBe(alignTo(views.u32.byteOffset + Uint32Array.BYTES_PER_ELEMENT, BigUint64Array.BYTES_PER_ELEMENT));
    expect(views.u64.length).toBe(1);
  });

  it('should throw an error if the buffer size is insufficient', () => {
    expect(() => {
      createArrayBufferViews(ArrayBuffer, {
        largeBuffer: [Float64Array, 1024],
        smallBuffer: [Uint8Array, 1024]
      });
    }).not.toThrow();
  });
});
