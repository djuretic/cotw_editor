import { saveAs } from "file-saver"
import {
  emptySavegame,
  FIELDS,
  fieldIds,
  numberFieldIds,
  type SavegameDefinition,
  SPELLS,
  spellBarInitOffset,
  spellIds,
  stringFieldIds,
} from "./constants"

const readInt = (_dataView: DataView, _offset: number, _numBytes: number) => {
  if (_numBytes === 1) {
    return _dataView.getInt8(_offset)
  } else if (_numBytes === 2) {
    return _dataView.getInt16(_offset, true)
  } else if (_numBytes === 4) {
    return _dataView.getInt32(_offset, true)
  }
  throw new Error("_numBytes parameter is incorrect")
}

const readString = (
  _dataView: DataView,
  _offset: number,
  _numBytes: number,
) => {
  var text = ""
  for (let i = 0; i < _numBytes; i++) {
    const byte = _dataView.getUint8(_offset + i)
    if (byte === 0) {
      break
    }
    text += String.fromCharCode(byte)
  }
  return text
}

const writeInt = (
  _dataView: DataView,
  _offset: number,
  _value: number,
  _numBytes: number,
) => {
  if (_numBytes === 1) {
    return _dataView.setInt8(_offset, _value)
  } else if (_numBytes === 2) {
    return _dataView.setInt16(_offset, _value, true)
  } else if (_numBytes === 4) {
    return _dataView.setInt32(_offset, _value, true)
  }
}

export default {
  parse(
    file_or_arraybuffer: ArrayBuffer | Blob,
    success_callback: (state: SavegameDefinition) => void,
    error_callback: (error: Error) => void,
  ) {
    var reader: FileReader
    const parseData = (event: ProgressEvent<FileReader> | ArrayBuffer) => {
      const buffer = event instanceof ArrayBuffer ? event : event.target?.result
      if (!buffer || typeof buffer === "string") {
        error_callback(new Error("Expected ArrayBuffer"))
        return
      }
      const dataView = new DataView(buffer)
      const state: SavegameDefinition = emptySavegame()
      state.rawFile = buffer

      try {
        // validate header
        const firstByte = readInt(dataView, 0x0, 1)
        const secondByte = readInt(dataView, 0x1, 1)
        if (
          (firstByte !== 0x76 && firstByte !== 0x77 && secondByte !== 0x77) ||
          dataView.byteLength < 0x40a
        ) {
          // see constants.js for 0x40A
          throw new Error("Invalid format")
        }

        for (const property of numberFieldIds) {
          const { offset, numBytes } = FIELDS[property]
          state[property] = readInt(dataView, offset, numBytes)
        }
        for (const property of stringFieldIds) {
          const { offset, numBytes } = FIELDS[property]
          state[property] = readString(dataView, offset, numBytes)
        }

        for (const property of spellIds) {
          const { offset } = SPELLS[property]
          state.spellBook[property] = readInt(dataView, offset, 1)
        }
        for (let i = 0; i < 10; i++) {
          // TODO clone?
          state.spellBar[i] = readInt(dataView, spellBarInitOffset + 2 * i, 2)
        }
      } catch (e) {
        error_callback(e instanceof Error ? e : new Error(String(e)))
      }
      success_callback(state)
    }
    if (file_or_arraybuffer instanceof ArrayBuffer) {
      // only when using the example savegame
      parseData(file_or_arraybuffer)
    } else {
      reader = new FileReader()
      // we are not using reader.onload because it's harder to test
      reader.addEventListener("load", parseData)
      reader.readAsArrayBuffer(file_or_arraybuffer)
    }
  },
  write(state: SavegameDefinition) {
    const dataView = new DataView(state.rawFile)
    for (const property of fieldIds) {
      const { offset, numBytes, type } = FIELDS[property]
      const value = state[property]
      if (type !== "string") {
        writeInt(dataView, offset, value as number, numBytes)
      }
    }
    for (const property of spellIds) {
      const { offset } = SPELLS[property]
      writeInt(dataView, offset, state.spellBook[property], 1)
    }
    for (let i = 0; i < 10; i++) {
      writeInt(dataView, spellBarInitOffset + 2 * i, state.spellBar[i] ?? -1, 2)
    }
    const blob = new Blob([new Uint8Array(dataView.buffer)])
    saveAs(blob, "savegame.cwg")
  },
}
