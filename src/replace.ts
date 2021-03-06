// Dependencies:
import { Node } from 'typescript';
import { query } from './query';
import { TSQueryNode, TSQueryOptions, TSQueryStringTransformer } from './tsquery-types';

export function replace <T extends Node = Node> (source: string, selector: string, stringTransformer: TSQueryStringTransformer<T>, options: TSQueryOptions = {}): string {
    const matches = query(source, selector, options);
    const replacements = matches.map(node => stringTransformer(node as TSQueryNode));
    const reversedMatches = matches.reverse();
    const reversedReplacements = replacements.reverse();
    let result = source;
    reversedReplacements.forEach((replacement, index) => {
        if (replacement) {
            const match = reversedMatches[index];
            result = `${result.substr(0, match.getStart())}${replacement}${result.substr(match.getEnd())}`;
        }
    });
    return result;
}
