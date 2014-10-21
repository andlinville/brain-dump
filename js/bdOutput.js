// The MIT License (MIT)

// thinker.js / Copyright (c) 2014 Andrew Linville

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



;(function($) {	

	var	pluginName = 'bdOutput',
		defaults = {
			startDelay: 1000,
			speedX: 1,
			startOn: 'click'
		};

	bdOutput = function(el, options) {

		// element to contain thoughts
		this.el = $(el);

		// options
		this.options = $.extend({}, defaults, options);

		// delay between event firing and playback beginning, in milliseconds
		this.startDelay = this.options.startDelay;

		// type-speed multiplier
		this.speedX = this.options.speedX;

		// event on which to start playback: 'scroll' or 'click'
		this.startOn = this.options.startOn;

		// data
		this.playbackData = this.options.data || [];

		// parsed data
		this.parsedPlaybackData = this.parseData();

		// initialize the object and prep for playback
		this.init();

	}

	bdOutput.prototype = {

		constructor: bdOutput,

		init: function() {

			var	self = this,
				$el = this.el;

			switch (self.startOn) {

				case 'wait':
					break;

				case 'load':
					self.write();
					break;

				case 'click':
					$el.click(function() {
						self.write();
					});
					break;

				default:
					self.write();
			}

		},

		parseData: function() {

			var	self = this,
				data = this.playbackData,
				output = [];

			// sort input ascending by time
			data.sort( function(a, b) {
				return a.time - b.time;
			})

			// set output time values as differences
			for ( var i in data ) {
				var	n = Number(i) + 1;
				var	time = n < data.length ? (data[n].time - data[i].time) / (1.5 * self.speedX) : 0,
					text = data[i].text;
				output.push({ 
					text: text, 
					time: time
				}); 
			};

			return output

		},

		write: function() {

			var	self = this,
				$el = this.el
				counter = 0,
				data = this.parsedPlaybackData;

			// write values
			function write_values() {

				// save time and text values for this current index
				var	text,
					time;

				// recursion break condition
				if (counter == data.length) {
					return null;
				}

				// write text and increment counter
				text = data[counter].text,
				time = data[counter].time;
				$el.text(text);
				counter += 1;

				// set new timeout and recurse
				setTimeout( function() {
					write_values()
				}, time);

			}

			// call write_values with initial delay
			setTimeout( function() {
				write_values()
			}, self.startDelay);

		}

	};

	$.fn.bdOutput = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new bdOutput(this, options))
			}
		});
	};

})(window.jQuery);
