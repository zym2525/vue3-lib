export function isDef<T = unknown>(val?: T): val is T {
    return typeof val !== 'undefined'
}