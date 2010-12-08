/** core.js
 **
 **/
var Scratch = {
	/* .addProperties(object, properties)
	 *
	 * Adds properties to an object (probably an element, right?). For
	 * values which are Objects themselves, where the property already
	 * exists, this will recurse to add subproperties on the assumption
	 * that it would be unable to replace the property entirely.
	 *
	 * Returns the element so that it can be used for chaining if
	 * necessary, but this will modify the element in-place.
	 *
	 * Example: _addProperties(element, {id: "foo", style: {background: "#fff"}});
	 */
	addProperties: function(object, properties) {
		for(var k in properties) {
			if(properties[k].constructor == Object && object[k])
				this.addProperties(object[k], properties[k]);
			else object[k] = properties[k];
		}
		return object;
	}

};
