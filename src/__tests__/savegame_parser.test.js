import SavegameParser from '../savegame_parser';
import fs from 'fs';

// source: http://stackoverflow.com/a/12101012
// Convert from Node buffer to ArrayBuffer
function toArrayBuffer(buf) {
	var ab = new ArrayBuffer(buf.length);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buf.length; ++i) {
		view[i] = buf[i];
	}
	return ab;
}

describe('SavegameParser', () => {
	it('reads file', () => {
		const fn = jest.fn();
		window.FileReader = function FileReader() {
			this.listeners = [];
			this.addEventListener = function(type, listener) {
				this.listeners.push(listener);
			};
			this.readAsArrayBuffer = function() {
				this.result = toArrayBuffer(fs.readFileSync(__dirname + '/example.cwg'));
				this.listeners.forEach((listener) => listener());
			};
		};
		SavegameParser.parse(new Blob(), fn);
		expect(fn).toBeCalled();
	});

});
