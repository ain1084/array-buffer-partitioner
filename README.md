# Array Buffer Partitioner

[![npm version](https://badge.fury.io/js/@ain1084%2Farray-buffer-partitioner.svg)](https://badge.fury.io/js/@ain1084%2Farray-buffer-partitioner)
[![CI](https://github.com/ain1084/array-buffer-partitioner/actions/workflows/ci.yml/badge.svg)](https://github.com/ain1084/array-buffer-partitioner/actions?query=workflow%3Aci)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Partition an ArrayBuffer into multiple TypedArray views efficiently, while handling complex memory layouts and ensuring optimal alignment for better access performance.

## Overview

`@ain1084/array-buffer-partitioner` is a utility library for creating multiple TypedArray views on a single `ArrayBuffer` or `SharedArrayBuffer`. This allows various data types to be efficiently placed within a single buffer. The library automatically adjusts each TypedArray’s byteOffset to prevent errors that can occur during view creation.

### Features

- Create multiple `TypedArray` views from a single `ArrayBuffer` or `SharedArrayBuffer`.
- Efficient memory partitioning without manual offset calculations.

## Installation

Install the library via npm:

```sh
npm i @ain1084/array-buffer-partitioner
```

## Usage

Import the `createArrayBufferViews` function to partition an `ArrayBuffer` or `SharedArrayBuffer` into multiple views:

```typescript
import { createArrayBufferViews } from '@ain1084/array-buffer-partitioner';

const views = createArrayBufferViews(ArrayBuffer, {
  data: [Float32Array, 1024],
  index: [Uint32Array, 1],
  flag: [Uint8Array, 1]
});

console.log(views.data.length); // 1024
console.log(views.data.byteOffset); // 0
console.log(views.index.length); // 1
console.log(views.flag.length); // 1
console.log(views.flag.byteOffset); // 4100
console.log(views.data.buffer.byteLength); // 4104
```

## API

### `createArrayBufferViews(BufferType: { new(size: number): ArrayBuffer | SharedArrayBuffer }, config: Record<string, [TypedArrayConstructor, number]>)`

Creates multiple `TypedArray` views on a single `ArrayBuffer` or `SharedArrayBuffer`.

#### Parameters

- `BufferType` (`{ new(size: number): ArrayBuffer | SharedArrayBuffer }`): The constructor for the buffer, either `ArrayBuffer` or `SharedArrayBuffer`.
- `config` (`Record<string, [TypedArrayConstructor, number]>`): An object specifying the desired views. Each key represents the name of the view, and the value is a tuple where:
  - The first element is the `TypedArray` class name (e.g., `Float32Array`, `Uint32Array`).
  - The second element is the number of elements for that view.

#### Returns

An object containing the views, with each key corresponding to the provided configuration.

## Contributing

Contributions are welcome! If you have ideas, suggestions, or issues, please create an issue on the [GitHub repository](https://github.com/ain1084/array-buffer-partitioner).

## License

This project is licensed under the MIT OR Apache-2.0 license.
