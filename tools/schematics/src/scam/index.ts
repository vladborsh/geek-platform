import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  apply,
  template,
  move,
  mergeWith,
  MergeStrategy,
  url,
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { Schema } from './schema';
import { strings } from '@angular-devkit/core';

export function main(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const completedOptions = setupOptions(tree, options);

    const templateSource = apply(url('./files'), [
      template({
        ...completedOptions,
        ...strings,
      }),
      move(completedOptions.path),
    ]);

    return chain([mergeWith(templateSource, MergeStrategy.Default)])(tree, context);
  };
}

function setupOptions(tree: Tree, options: Schema): Schema {
  const completedOptions = { ...options };

  if (!completedOptions.project) {
    completedOptions.project = 'geek-platform';
  }

  completedOptions.path = options.path === undefined ? buildPathTo(tree, completedOptions.project) : options.path;
  const parsedPath = parseName(completedOptions.path, completedOptions.name);

  completedOptions.name = parsedPath.name;
  completedOptions.path = parsedPath.path;

  return completedOptions;
}

function buildPathTo(tree: Tree, projectName: string): string {
  const workspace = getWorkspace(tree);
  const project = workspace.projects[projectName];

  return `${project.root}/src/${project.root.includes('apps') ? 'app' : 'lib'}`;
}