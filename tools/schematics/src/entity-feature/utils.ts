import { getWorkspace } from '@schematics/angular/utility/config';
import { SchematicsException, Tree, UpdateRecorder, Rule } from '@angular-devkit/schematics';
import { findNodes, insertAfterLastOccurrence } from '@schematics/angular/utility/ast-utils';
import { SyntaxKind, ScriptTarget, createSourceFile, SourceFile } from 'typescript';
import { strings } from '@angular-devkit/core';
import { InsertChange, Change } from '@schematics/angular/utility/change';
import { NameParser, ModuleFinder, ModuleDeclarator } from '@nestjs/schematics';

export function buildPathTo(tree: Tree, projectName: string): string {
  const workspace = getWorkspace(tree);
  const project = workspace.projects[projectName];

  return `${project.root}/src/${project.root.includes('apps') ? 'app' : 'lib'}`;
}

export function uppercase(str: string): string {
  return str.toUpperCase();
}

export function transformOptions(options: Record<string, any>, type: string, metadata: string): Record<string, any> {
  const target = Object.assign({}, options);

  if (!target.name) {
    throw new SchematicsException('Option (name) is required.');
  }

  target.metadata = metadata;
  target.type = type;
  const location = new NameParser().parse({ name: target.name, path: target.path });
  target.name = strings.dasherize(location.name);
  target.path = strings.dasherize(location.path);
  target.language = target.language !== undefined ? target.language : 'ts';

  return target;
}

export function addDeclarationToModule(options: Record<string, any>): Rule {
  return (tree: Tree) => {
    options.module = new ModuleFinder(tree).find({
      name: options.name,
      path: options.path,
    });

    if (!options.module) {
      return tree;
    }

    const treePath = tree.read(options.module);
    const content = treePath && treePath.toString();
    const declarator = new ModuleDeclarator();

    if (content) {
      tree.overwrite(options.module, declarator.declare(content, {
        name: options.name,
        metadata: options.metadata,
        path: options.path,
        module: options.module,
        type: options.type,
      }));
    }

    return tree;
  };
}

export function addToPublicApi(fileName: string, pathToPublicApi: string, folder: string, type: string): Rule {
  return (tree: Tree) => {
    const publicApiPath = `${pathToPublicApi}/../index.ts`;
    const source = readIntoSourceFile(tree, publicApiPath);
    const toInsert = getPublicApiImport(fileName, folder, type);
    const propertyAssignmentNodes = findNodes(source, SyntaxKind.EndOfFileToken);
    const fallbackPos = findNodes(source, SyntaxKind.EndOfFileToken)[0].getStart();
    const change = insertAfterLastOccurrence(propertyAssignmentNodes, toInsert, publicApiPath, fallbackPos);
    commitChanges(tree, publicApiPath, [change]);

    return tree;
  };
}

export function getPublicApiImport(name: string, folder: string, type: string): string {
  const dasherizedName = strings.dasherize(name);
  const imported = `${strings.classify(name)}${strings.classify(type)}`;

  return `export { ${imported} } from './lib/${folder}/${dasherizedName}.${type}';\n`;
}

export function readIntoSourceFile(tree: Tree, path: string): SourceFile {
  const text: Buffer | null = tree.read(path);

  if (text === null) {
    throw new SchematicsException(`File ${path} does not exist.`);
  }

  const sourceText = text.toString('utf-8');

  return createSourceFile(path, sourceText, ScriptTarget.Latest, true);
}

export function commitChanges(tree: Tree, filePath: string, changes: Change[]): void {
  const recorder: UpdateRecorder = tree.beginUpdate(filePath);

  changes
    .filter((change: Change) => change instanceof InsertChange)
    .forEach((change: InsertChange) => recorder.insertLeft(change.pos, change.toAdd));

  tree.commitUpdate(recorder);
}
