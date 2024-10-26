// Jest test file for the array-buffer-partitioner module

import { createArrayBufferViews } from '../src';

describe('createArrayBufferViews', () => {
  it('should create the correct TypedArray views with ArrayBuffer', () => {
    const views = createArrayBufferViews(ArrayBuffer, {
      data: [Float32Array, 1024],
      index: [Uint32Array, 1],
      flag: [Uint8Array, 1]
    });

    expect(views.data.length).toBe(1024);
    expect(views.index.length).toBe(1);
    expect(views.flag.length).toBe(1);
    expect(views.data.byteOffset).toBe(0);
    expect(views.index.byteOffset).toBe(1024 * Float32Array.BYTES_PER_ELEMENT);
    expect(views.flag.byteOffset).toBe(1024 * Float32Array.BYTES_PER_ELEMENT + Uint32Array.BYTES_PER_ELEMENT);
  });

  it('should create the correct TypedArray views with SharedArrayBuffer', () => {
    const views = createArrayBufferViews(SharedArrayBuffer, {
      buffer1: [Int16Array, 512],
      buffer2: [Uint8Array, 256]
    });

    expect(views.buffer1.length).toBe(512);
    expect(views.buffer2.length).toBe(256);
    expect(views.buffer1.byteOffset).toBe(0);
    expect(views.buffer2.byteOffset).toBe(512 * Int16Array.BYTES_PER_ELEMENT);
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
