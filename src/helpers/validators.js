import {
    __,
    allPass,
    any,
    compose,
    countBy,
    dissoc,
    equals,
    gte,
    identity,
    prop,
    values,
    propEq,
    complement,
} from "ramda";

/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    compose(equals("red"), prop("star")),
    compose(equals("green"), prop("square")),
    compose(equals("white"), prop("triangle")),
    compose(equals("white"), prop("circle")),
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
    gte(__, 2),
    compose(prop("green"), compose(countBy(identity), values))
);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(
    ({ blue, red }) => blue === red,
    compose(countBy(identity), values)
);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    compose(equals("blue"), prop("circle")),
    compose(equals("red"), prop("star")),
    compose(equals("orange"), prop("triangle")),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(
    compose(any(gte(__, 3)), values),
    compose(dissoc("white"), compose(countBy(identity), values))
);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
    compose(equals("green"), prop("triangle")),
    compose(propEq("green", 2), compose(countBy(identity), values)),
    compose(propEq("red", 1), compose(countBy(identity), values)),
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(
    propEq("orange", 4),
    compose(countBy(identity), values)
);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([
    complement(compose(equals("red"), prop("star"))),
    complement(compose(equals("white"), prop("star"))),
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(
    propEq("green", 4),
    compose(countBy(identity), values)
);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
    complement(compose(equals("white"), prop("square"))),
    complement(compose(equals("white"), prop("triangle"))),
    ({ square, triangle }) => square === triangle,
]);
