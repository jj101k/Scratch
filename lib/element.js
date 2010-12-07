/** element.js
 **
 ** This file contains helpers for doing fairly basic operations with elements.
 **/

/* _element(name, properties, contents)
 *
 * Creates a DOM Element node, and sets it up. Apart from the name,
 * all arguments are optional and will be sensibly detected, meaning
 * that you can if you wish provide contents as the second argument.
 * Arguments are:
 * - name: The tag name, conventionally lower-case but it doesn't
 *   matter. Example: "input".
 * - properties: An associative array of various properties to set
 *   on the Element node. You should note that these are the actual
 *   property names not the attribute names (eg. you want className
 *   rather than class). See _addProperties() below.
 *   Example: {className: "big-box", {style: {fontSize: "12pt"}}
 * - contents: A set of DOM nodes (or similar) which will be
 *   appendChild()ed to the element. See _addChildren() below.
 *
 * There is one special value allowed in the "properties" array:
 * onbuild. If set, this is a function which will be called immediately
 * before returning as onbuild.call(element), which is to say that
 * "this" will be the new element; the property will also be added
 * to the element itself as usual. Example: function() {if(somevalue)
 * this.appendChild(document.createTextNode("..."))}
 *
 * If you need to, you can specify properties and/or contents
 * multiple times, and they will be evaluated in order except that
 * onbuild (if present) will only be called at the end.
 */
function _element(name) {
	var element = document.createElement(name);
	for(var i=1; i<arguments.length; i++) {
		var arg = arguments.item(i);
		if(arg.constructor == Array) _addChildren(element, arg);
		else if(arg.constructor == Object) _addProperties(element, arg);
		else throw "Cannot build using object types other than Object and Array";
	}
	if(element.onbuild) element.onbuild();
	return element;
}
/* _addChildren(element, children)
 *
 * Adds several DOM nodes (or similar) to an element. Nodes are not
 * cloned, so you should call .cloneNode() where approproate yourself.
 *
 * Arguments are:
 * - element: A DOM Element node.
 * - children: An array or similar of values to add (append). DOM
 *   nodes will be added as they are, anything else will be converted
 *   into a text node via document.createTextNode().
 *
 * Returns the element so that it can be used for chaining if
 * necessary, but this will modify the element in-place.
 */
function _addChildren(element, children) {
	for(var i=0; i<children.length; i++) {
		var child = children[i];
		if(child.nodeType === undefined)
			child = document.createTextNode(child);
		element.appendChild(child);
	}
	return element;
}
/* _addProperties(object, properties)
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
function _addProperties(object, properties) {
	for(var k in properties) {
		if(properties[k].constructor == Object && object[k])
			_addProperties(object[k], properties[k]);
		else object[k] = properties[k];
	}
	return object;
}
