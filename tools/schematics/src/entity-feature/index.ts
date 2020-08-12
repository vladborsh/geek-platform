import { template, url, mergeWith, apply, move, Rule, chain, MergeStrategy, SchematicContext, Tree, Source, branchAndMerge } from '@angular-devkit/schematics';
import { buildPathTo, addDeclarationToModule, addToPublicApi, uppercase, transformOptions } from './utils';
import { normalize, strings } from '@angular-devkit/core';
import { SchemaInterface } from './schema.interface';

export function main(options: SchemaInterface): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const templateRule = template(Object.assign({}, options, strings, { uppercase }));

    return branchAndMerge(
      chain([
        defaultMerge(
          url('./files/back-data-access'),
          [templateRule, move(normalize(`${buildPathTo(tree, 'geek-platform-api')}/data-access`))]
        ),
        defaultMerge(
          url('./files/domain-service'),
          [templateRule, move(normalize(`${buildPathTo(tree, 'geek-platform-api')}/domain`))
        ]),
        defaultMerge(
          url('./files/back-controller'),
          [templateRule, move(normalize(`${buildPathTo(tree, 'geek-platform-api')}/router`))],
        ),
        addDeclarationToModule(
          transformOptions({
            name: `${strings.dasherize(options.name)}`,
            path: `apps/geek-platform-api/src/app/router/${strings.dasherize(options.name)}`,
          }, 'controller', 'controllers'),
        ),
        defaultMerge(
          url('./files/dto'),
          [templateRule, move(normalize(`${buildPathTo(tree, 'api-interfaces')}/dto`))],
        ),
        addToPublicApi(options.name, buildPathTo(tree, 'api-interfaces'), 'dto', 'dto'),
      ])
    )(tree, context);
  };
}

function defaultMerge(source: Source, rules: Rule[]): Rule {
  return mergeWith(apply(source, rules), MergeStrategy.Default);
}
