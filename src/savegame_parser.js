import {FIELDS, SPELLS} from './constants';
import {saveAs} from 'file-saver';

const readInt = function(_dataView, _offset, _numBytes){
	if (_numBytes === 1){
		return _dataView.getInt8(_offset);
	} else if (_numBytes === 2){
		return _dataView.getInt16(_offset, true);
	} else if (_numBytes === 4){
		return _dataView.getInt32(_offset, true);
	}
};

const readString = function(_dataView, _offset, _numBytes){
	var text = '';
	for(let i=0; i<_numBytes; i++){
		let byte = _dataView.getUint8(_offset+i);
		if(byte === 0){
			break;
		}
		text += String.fromCharCode(byte);
	}
	return text;
};

const writeInt = function(_dataView, _offset, _value, _numBytes){
	if (_numBytes === 1){
		return _dataView.setInt8(_offset, _value);
	} else if (_numBytes === 2){
		return _dataView.setInt16(_offset, _value, true);
	} else if (_numBytes === 4){
		return _dataView.setInt32(_offset, _value, true);
	}
};

export default {
	parse(filename, success_callback, error_callback) {
		var reader = new FileReader();
		// we are not using reader.onload because it's harder to test
		reader.addEventListener('load', () => {
			var dataView = new DataView(reader.result);
			var state = {spellBook: {}, rawFile: reader.result};

			try {
				for(let property in FIELDS){
					if(FIELDS.hasOwnProperty(property)){
						let {offset, numBytes, type} = FIELDS[property];
						if(type === 'string'){
							state[property] = readString(dataView, offset, numBytes);
						} else {
							state[property] = readInt(dataView, offset, numBytes);
						}
					}
				}

				for(let property in SPELLS){
					if(SPELLS.hasOwnProperty(property)){
						let {offset} = SPELLS[property];
						state.spellBook[property] = readInt(dataView, offset, 1);
					}
				}
			} catch(e) {
				error_callback(e);
			}

			success_callback(state);
		});
		reader.readAsArrayBuffer(filename);
	},
	write(state) {
		let dataView = new DataView(state.rawFile);
		for(let property in FIELDS){
			if(FIELDS.hasOwnProperty(property)){
				let {offset, numBytes, type} = FIELDS[property];
				if(type !== 'string'){
					writeInt(dataView, offset, state[property], numBytes);
				}
			}
		}
		for(let property in SPELLS){
			if(SPELLS.hasOwnProperty(property)){
				let {offset} = SPELLS[property];
				writeInt(dataView, offset, state.spellBook[property], 1);
			}
		}
		let blob = new Blob([dataView]);
		saveAs(blob, 'savegame.cwg');
	}
};
