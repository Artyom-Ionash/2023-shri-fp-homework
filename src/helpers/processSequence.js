/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */

import {
    __,
    allPass,
    andThen,
    assoc,
    compose,
    concat,
    gt,
    ifElse,
    length,
    lt,
    mathMod,
    otherwise,
    partial,
    prop,
    tap,
    test,
} from "ramda";

import Api from "../tools/api";

const API_TECH_URL = "https://api.tech/numbers/base";
const ANIMALS_TECH_URL = "https://animals.tech/";

const api = new Api();

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const process = compose(
        otherwise(handleError),
        andThen(handleSuccess),
        andThen(compose(String, prop("result"))),
        andThen(api.get(__, {})),
        andThen(concat(ANIMALS_TECH_URL)),
        andThen(tap(writeLog)),
        andThen(compose(String, mathMod(__, 3))),
        andThen(tap(writeLog)),
        andThen((num) => num ** 2),
        // writeLog("ThirdLog");
        andThen(tap(writeLog)),
        andThen(length),
        // writeLog("SecondLog");
        andThen(tap(writeLog)),
        andThen(compose(String, prop("result"))),
        // api.get("https://api.tech/numbers/base", {
        compose(
            api.get(API_TECH_URL),
            assoc("number", __, { from: 10, to: 2 })
        ),
        // writeLog(value);
        tap(writeLog),
        compose(Math.round, Number)
    );

    compose(
        ifElse(
            allPass([
                compose(gt(__, 2), length),
                compose(lt(__, 10), length),
                test(/^[0-9]+\.?[0-9]+$/),
            ]),
            process,
            partial(handleError, ["ValidationError"])
        ),
        tap(writeLog)
    )(value);
};

export default processSequence;
