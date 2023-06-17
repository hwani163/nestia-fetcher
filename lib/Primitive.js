"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitive = void 0;
var Primitive;
(function (Primitive) {
    /**
     * Hard copy for primitive object.
     *
     * `Primitive.clone` is a function copying an object in the primitive and entire level.
     *
     * @param instance Target instance to be copied
     * @return The copied instance
     */
    function clone(instance) {
        return JSON.parse(JSON.stringify(instance));
    }
    Primitive.clone = clone;
    /**
     * Test whether two arguments are equal in the primitive level.
     *
     * @param x The first argument to compare
     * @param y The second argument to compare
     * @return Whether two arguments are equal or not
     */
    function equal_to(x, y) {
        return (JSON.stringify(x) === JSON.stringify(y) || recursive_equal_to(x, y));
    }
    Primitive.equal_to = equal_to;
})(Primitive = exports.Primitive || (exports.Primitive = {}));
function object_equal_to(x, y) {
    for (var key in x)
        if (recursive_equal_to(x[key], y[key]) === false)
            return false;
    return true;
}
function array_equal_to(x, y) {
    if (x.length !== y.length)
        return false;
    return x.every(function (value, index) { return recursive_equal_to(value, y[index]); });
}
function recursive_equal_to(x, y) {
    var type = typeof x;
    if (type !== typeof y)
        return false;
    else if (type === "object")
        if (x instanceof Array)
            return array_equal_to(x, y);
        else
            return object_equal_to(x, y);
    else if (type !== "function")
        return x === y;
    else
        return true;
}
//# sourceMappingURL=Primitive.js.map