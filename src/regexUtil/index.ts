export const getType = <T>(obj: T): string => (Object.prototype.toString.call(obj)).match(/\w+\s(\w+)/)![1].toLowerCase();
