import { createLoader, parseAsString, parseAsArrayOf, parseAsStringLiteral } from "nuqs/server";

export const sortedValues = ["featured", "low_to_high", "high_to_low", "newest"] as const;

export const params = {
    search: parseAsString
        .withOptions({
            clearOnDefault: true
        })
        .withDefault("")
    ,
    sort: parseAsStringLiteral(sortedValues).
        withDefault("newest"),
    minPrice: parseAsString
        .withOptions({
            clearOnDefault: true,
        }).
        withDefault(""),
    maxPrice: parseAsString
        .withOptions({
            clearOnDefault: true,
        }).
        withDefault(""),
    tags: parseAsArrayOf(parseAsString)
        .withOptions({
            clearOnDefault: true,
        }).
        withDefault([]),
    category: parseAsArrayOf(parseAsString)
        .withOptions({
            clearOnDefault: true,
        }).
        withDefault([]),
}

export const loadProductFilters = createLoader(params);