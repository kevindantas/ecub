'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class SmoothScroll
 *
 * @author Kevin Dantas Shih
 *
 * @description 
 * Make a smooth scroll to the selected height or element	
 */
var SmoothScroll = function () {

	/**
  * @return {}
  */
	function SmoothScroll() {
		_classCallCheck(this, SmoothScroll);

		this.ease = 0.1;
		this.isEasing = false;

		this.targetX = 0;
		this.targetY = 0;

		this.update = this.update.bind(this);
	}

	/**
  * @name diffY
  * @description 
  * Difference between the current vertical page position and the target to be scrolled
  * 
  * @type {float}
  */


	_createClass(SmoothScroll, [{
		key: 'update',
		value: function update() {

			if (!this.isEasing) return;

			if (!this.shouldScroll) {
				this.isEasing = false;
			}

			this.scrollX += this.diffX;
			this.scrollY += this.diffY;

			window.scroll(this.scrollX, this.scrollY);
			requestAnimationFrame(this.update);
		}
	}, {
		key: 'scroll',
		value: function scroll() {

			this.isEasing = true;

			this.scrollX = window.scrollX;
			this.scrollY = window.scrollY;

			this.update();
		}

		/**
   * @method scrollTo
   * @description 
   * Scroll to selected element
   * 
   * @param {String|Object|Number} element - Class, ID or tag name of the element or the node itself
   * @param {String=} direction - (horizontal|vertical) || (x|y)
   */

	}, {
		key: 'scrollTo',
		value: function scrollTo(target, direction) {

			switch (typeof target === 'undefined' ? 'undefined' : _typeof(target)) {
				case 'string':
					target = document.querySelector(target);
					break;
				case 'number':
					break;
				case 'object':
					break;
				default:
					throw new Error('Invalid target');
			}

			if (!direction || direction == 'vertical' || direction == 'y') {
				this.targetY = target.offsetTop || target;
			} else if (direction == 'horizontal' || direction == 'x') {
				this.targetX = target.offsetLeft || target;
			} else {
				throw new Error('Invalid direction value');
			}

			this.scroll();
		}
	}, {
		key: 'diffY',
		get: function get() {
			return (this.targetY - this.scrollY) * 0.07;
		}

		/**
   * @name diffX
   * @description 
   * Difference between the current horizontal page position and the target to be scrolled
   * 
   * @type {float}
   */

	}, {
		key: 'diffX',
		get: function get() {
			return (this.targetX - this.scrollX) * 0.07;
		}

		/**
   * @name shouldScroll
   * @description 
   * Getter for the validations defining when the page should scroll or not
   * 
   * @return {bool}
   */

	}, {
		key: 'shouldScroll',
		get: function get() {
			var isValid = {
				scrollX: true,
				scrollY: true
			};

			// If the target is below the current scrollY
			if (this.diffY > 0) {
				isValid.diffY = this.diffY > 1;

				isValid.scrollY = this.scrollY < this.targetY;
			} else if (this.diffY < 0) {
				isValid.diffY = this.diffY < -1;

				isValid.scrollY = this.scrollY > this.targetY;
			}

			return isValid.diffY && isValid.scrollY;
		}
	}]);

	return SmoothScroll;
}();