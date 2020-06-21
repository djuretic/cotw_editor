import {
  FIELDS, SPELLS, spellIds, stringFieldIds, numberFieldIds,
  fieldIds, emptySavegame, SavegameDefinition
} from './constants'
import {saveAs} from 'file-saver'

const readInt = function(_dataView: DataView, _offset: number, _numBytes: number){
  if (_numBytes === 1){
    return _dataView.getInt8(_offset);
  } else if (_numBytes === 2){
    return _dataView.getInt16(_offset, true);
  } else if (_numBytes === 4){
    return _dataView.getInt32(_offset, true);
  }
  throw new Error("_numBytes parameter is incorrect")
}

const readString = function(_dataView: DataView, _offset: number, _numBytes: number){
  var text = '';
  for(let i=0; i<_numBytes; i++){
    let byte = _dataView.getUint8(_offset+i)
    if(byte === 0){
      break
    }
    text += String.fromCharCode(byte)
  }
  return text
}

const writeInt = function(_dataView: DataView, _offset: number, _value: number, _numBytes: number){
  if (_numBytes === 1){
    return _dataView.setInt8(_offset, _value);
  } else if (_numBytes === 2){
    return _dataView.setInt16(_offset, _value, true);
  } else if (_numBytes === 4){
    return _dataView.setInt32(_offset, _value, true);
  }
}

export default {
  parse(file_or_arraybuffer: ArrayBuffer | Blob, success_callback: (state: SavegameDefinition) => void, error_callback: (error: Error) => void) {
    const parseData = (event: ProgressEvent<FileReader> | ArrayBuffer) => {
      let buffer = event instanceof ArrayBuffer ? event : event.target?.result
      if (!buffer || typeof buffer === 'string') {
        error_callback(new Error('Expected ArrayBuffer'))
        return
      }
      let dataView = new DataView(buffer)
      let state: SavegameDefinition = emptySavegame()
      state.rawFile = buffer

      try {
        // validate header
        const firstByte = readInt(dataView, 0x0, 1)
        const secondByte = readInt(dataView, 0x1, 1)
        if((firstByte !== 0x76 && firstByte !== 0x77 && secondByte !== 0x77) ||
          dataView.byteLength < 0x40A){ // see constants.js for 0x40A
          throw new Error('Invalid format')
        }

        for(const property of numberFieldIds){
          let {offset, numBytes} = FIELDS[property]
          state[property] = readInt(dataView, offset, numBytes)
        }
        for(const property of stringFieldIds){
          let {offset, numBytes} = FIELDS[property]
          state[property] = readString(dataView, offset, numBytes)
        }

        for(const property of spellIds){
          let {offset} = SPELLS[property]
          state.spellBook[property] = readInt(dataView, offset, 1)
        }
      } catch(e) {
        error_callback(e)
      }
      success_callback(state)
    }
    if(file_or_arraybuffer instanceof ArrayBuffer) { // only when using the example savegame
      parseData(file_or_arraybuffer)
    } else {
      var reader = new FileReader();
      // we are not using reader.onload because it's harder to test
      reader.addEventListener('load', parseData);
      reader.readAsArrayBuffer(file_or_arraybuffer);
    }
  },
  write(state: SavegameDefinition) {
    let dataView = new DataView(state.rawFile);
    for(const property of fieldIds){
      let {offset, numBytes, type} = FIELDS[property]
      let value = state[property]
      if(type !== 'string' && typeof value === "number"){
        writeInt(dataView, offset, value, numBytes)
      }
    }
    for(const property of spellIds){
      let {offset} = SPELLS[property]
      writeInt(dataView, offset, state.spellBook[property], 1)
    }
    let blob = new Blob([new Uint8Array(dataView.buffer)])
    saveAs(blob, 'savegame.cwg')
  }
}
