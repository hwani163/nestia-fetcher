/**
 * Primitive type.
 *
 * `Primitive` is a type of TMP (Type Meta Programming) type who converts its argument as a
 * primitive type.
 *
 * If the target argument is a built-in class who returns its origin primitive type through
 * the `valueOf()` method like the `String` or `Number`, its return type would be the
 * `string` or `number`.
 *
 * Otherwise, the target argument is a type of custom class, all of its custom method would
 * be erased and its prototype would be changed to the primitive `object`. Therefore, return
 * type of the TMP type finally be the primitive object.
 *
 * In addition, if the target argument is a type of custom class and it has a special
 * method `toJSON()`, return type of this `Primitive` would be not `Primitive<Instance>`
 * but `Primitive<ReturnType<Instance.toJSON>>`.
 *
 * Before                  | After
 * ------------------------|----------------------------------------
 * `Boolean`               | `boolean`
 * `Number`                | `number`
 * `String`                | `string`
 * `Class`                 | `object`
 * `Class` with `toJSON()` | `Primitive<ReturnType<Class.toJSON>>`
 * Others                  | No change
 *
 * @template Instance Target argument type.
 * @author Jenogho Nam - https://github.com/samchon
 */
export type Primitive<Instance> = _Equal<Instance, _Primitive<Instance>> extends true ? Instance : _Primitive<Instance>;
export declare namespace Primitive {
    /**
     * Hard copy for primitive object.
     *
     * `Primitive.clone` is a function copying an object in the primitive and entire level.
     *
     * @param instance Target instance to be copied
     * @return The copied instance
     */
    function clone<Instance>(instance: Instance): Primitive<Instance>;
    /**
     * Test whether two arguments are equal in the primitive level.
     *
     * @param x The first argument to compare
     * @param y The second argument to compare
     * @return Whether two arguments are equal or not
     */
    function equal_to<Instance>(x: Instance, y: Instance): boolean;
}
type _Equal<X, Y> = X extends Y ? (Y extends X ? true : false) : false;
type _Primitive<Instance> = _ValueOf<Instance> extends object ? Instance extends object ? Instance extends IJsonable<infer Raw> ? _ValueOf<Raw> extends object ? Raw extends object ? _PrimitiveObject<Raw> : never : _ValueOf<Raw> : _PrimitiveObject<Instance> : never : _ValueOf<Instance>;
type _PrimitiveObject<Instance extends object> = Instance extends Array<infer T> ? _Primitive<T>[] : {
    [P in keyof Instance]: Instance[P] extends Function ? never : _Primitive<Instance[P]>;
};
type _ValueOf<Instance> = _IsValueOf<Instance, Boolean> extends true ? boolean : _IsValueOf<Instance, Number> extends true ? number : _IsValueOf<Instance, String> extends true ? string : Instance;
type _IsValueOf<Instance, Object extends IValueOf<any>> = Instance extends Object ? Object extends IValueOf<infer Primitive> ? Instance extends Primitive ? false : true : false : false;
interface IValueOf<T> {
    valueOf(): T;
}
interface IJsonable<T> {
    toJSON(): T;
}
export {};
