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
  },
  /* .inject(array, initial_value, iterator)
   *
   * Performs iterator(counter, item) for all the items in the array
   * (in order), with "counter" initially being "initial_value", and
   * the return value of iterator() being used to update "counter".
   * Once finished, the value of "counter" will be returned.
   * Essentially this is the same as a for() loop with an initial
   * mutable state.
   *
   * A trivial example of where this might be useful is a sum function:
   * Scratch.inject(array, 0, function(counter, item) {return counter+item});
   *
   * For a slightly more complex use-case, you could write a map
   * function this way, although see .map() below.
   */
  inject: function(array, initial_value, iterator) {
    var counter = initial_value;
    for(var i=0; i<array.length; i++)
      counter = iterator(counter, array[i]);
    return counter;
  },
  /* .injectInPlace(array, initial_value, iterator)
   *
   * As .inject() except that counter is never replaced - use this
   * if you're certain you're correctly using in-place modification
   * methods eg. "++", "shift", "push".
   */
  injectInPlace: function(array, initial_value, iterator) {
    var counter = initial_value;
    for(var i=0; i<array.length; i++)
      iterator(counter, array[i]);
    return counter;
  },
  /* .map(array, mapper)
   *
   * Creates one array from another, using the return of mapper(item)
   * to create each item. Please note that this prohibits creating
   * more than one destination array item per source array item.
   *
   * Internally this uses .injectInPlace(), although a less efficient
   * form could use .inject().
   *
   * Returns the new array.
   */
  map: function(array, mapper) {
    function iterator(counter, item) {
      counter.push( mapper(item) );
    }
    return this.injectInPlace(array, [], iterator);
  },
  /* .forEach(array, iterator)
   * .forEach(array, iterator, reverse)
   *
   * Simply does iterator(item) for each item in the array,
   * either in normal order or reverse order. Although you can
   * just call .forEach with array.reverse(), objects which are
   * merely like arrays cannot be handled that way, and depending
   * on the Javascript engine you might find that Array.reverse()
   * inefficiently (for this purpose) copies the array.
   *
   * Although this can for general cases be expressed as a limited
   * case of .injectInPlace(), the specialised purpose of the "reverse"
   * argument means it needs its own implementation.
   *
   * A sensible use for this might be pruning a mutable array:
   * Scratch.forEach(array, function(item) {array.delete(item)}, true);
   */
  forEach: function(array, iterator, reverse) {
    if(reverse) {
      for(var i=array.length-1; i>=0; i--)
        iterator(array[i]);
    } else {
      for(var i=0; i<array.length; i++)
        iterator(array[i]);
    }
  },
  /* .times(n, iterator)
   *
   * Similar to .forEach(), but just calls iterator() n times.
   *
   * A relatively efficient prune of a very array-like object might be:
   * Scratch.times(array.length, function() {array.pop()});
   */
  times: function(n, iterator) {
    for(var i=0; i<n; i++)
      iterator();
  }
};
