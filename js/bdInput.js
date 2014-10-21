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



;(function ($) {

	var	pluginName = "bdInput",
        defaults = {};

	bdInput = function(el, options) {

		// element containing text entry
		this.el = $(el);

		// array of times and text values 
		this.data = [];

		// config options
		this.options = $.extend({}, defaults, options);

		// initialize binding
		this.init();

	};

	bdInput.prototype = {

		constructor: BDInput,

		init: function() {

			var	self = this;

			self.el.bind('input propertychange', function() {
				
				var	text,
					time,
					value;

				// text is full value of the input
				text = $(this).val();
				time = new Date().getTime();
				value = {
					text: text,
					time: time
				};
				self.data.push(value);

			});

		},

		getData: function() {
			return this.data;
		},

		clearData: function() {
			this.data = [];
		}

	};	

	$.fn.bdInput = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new bdInput(this, options));
			}
		});	
	};

	

})(window.jQuery);
