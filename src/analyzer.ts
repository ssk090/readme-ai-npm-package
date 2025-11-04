import * as path from 'path';
import * as fs from 'fs-extra';
import fg from 'fast-glob';
import { ProjectInfo, ProjectType, FileInfo } from './types';

export class ProjectAnalyzer {
  private targetPath: string;

  constructor(targetPath: string = process.cwd()) {
    this.targetPath = path.resolve(targetPath);
  }

  async analyze(): Promise<ProjectInfo> {
    const files = await this.scanFiles();
    const packageInfo = await this.readPackageJson();
    const dependencies = await this.extractDependencies();
    const languages = this.detectLanguages(files);
    const projectType = this.detectProjectType(files, packageInfo);
    const structure = await this.generateStructure();

    return {
      name: packageInfo?.name || path.basename(this.targetPath),
      path: this.targetPath,
      type: projectType,
      languages,
      dependencies,
      files,
      structure
    };
  }

  private async scanFiles(): Promise<FileInfo[]> {
    const patterns = [
      '**/*.{js,ts,jsx,tsx,py,java,go,rs,rb,php,cs,cpp,c,h,hpp}',
      '**/package.json',
      '**/requirements.txt',
      '**/Cargo.toml',
      '**/go.mod',
      '**/pom.xml',
      '**/*.md'
    ];

    const ignore = [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.git/**',
      '**/venv/**',
      '**/__pycache__/**',
      '**/target/**'
    ];

    const filePaths = await fg(patterns, {
      cwd: this.targetPath,
      ignore,
      dot: false,
      absolute: false
    });

    const fileInfos: FileInfo[] = [];
    for (const filePath of filePaths.slice(0, 100)) {
      const fullPath = path.join(this.targetPath, filePath);
      try {
        const stats = await fs.stat(fullPath);
        fileInfos.push({
          path: filePath,
          type: path.extname(filePath),
          size: stats.size
        });
      } catch (error) {
        continue;
      }
    }

    return fileInfos;
  }

  private async readPackageJson(): Promise<any> {
    try {
      const packagePath = path.join(this.targetPath, 'package.json');
      if (await fs.pathExists(packagePath)) {
        return await fs.readJson(packagePath);
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  private async extractDependencies(): Promise<string[]> {
    const deps: string[] = [];

    const packagePath = path.join(this.targetPath, 'package.json');
    if (await fs.pathExists(packagePath)) {
      try {
        const pkg = await fs.readJson(packagePath);
        if (pkg.dependencies) {
          deps.push(...Object.keys(pkg.dependencies));
        }
        if (pkg.devDependencies) {
          deps.push(...Object.keys(pkg.devDependencies));
        }
      } catch (error) {}
    }

    const requirementsPath = path.join(this.targetPath, 'requirements.txt');
    if (await fs.pathExists(requirementsPath)) {
      try {
        const content = await fs.readFile(requirementsPath, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
        deps.push(...lines.map(line => line.split('==')[0].split('>=')[0].trim()));
      } catch (error) {}
    }

    return deps;
  }

  private detectLanguages(files: FileInfo[]): string[] {
    const languageMap: { [key: string]: string } = {
      '.js': 'JavaScript',
      '.ts': 'TypeScript',
      '.jsx': 'JavaScript/React',
      '.tsx': 'TypeScript/React',
      '.py': 'Python',
      '.java': 'Java',
      '.go': 'Go',
      '.rs': 'Rust',
      '.rb': 'Ruby',
      '.php': 'PHP',
      '.cs': 'C#',
      '.cpp': 'C++',
      '.c': 'C'
    };

    const languages = new Set<string>();
    files.forEach(file => {
      const lang = languageMap[file.type];
      if (lang) {
        languages.add(lang);
      }
    });

    return Array.from(languages);
  }

  private detectProjectType(files: FileInfo[], packageInfo: any): ProjectType {
    if (packageInfo) {
      const deps = {
        ...packageInfo.dependencies,
        ...packageInfo.devDependencies
      };

      if (deps['next']) return ProjectType.NEXTJS;
      if (deps['react']) return ProjectType.REACT;
      if (deps['vue']) return ProjectType.VUE;
      if (deps['@angular/core']) return ProjectType.ANGULAR;
      if (deps['typescript']) return ProjectType.TYPESCRIPT;
      return ProjectType.NODEJS;
    }

    if (files.some(f => f.path.includes('requirements.txt'))) {
      return ProjectType.PYTHON;
    }

    if (files.some(f => f.type === '.ts' || f.type === '.tsx')) {
      return ProjectType.TYPESCRIPT;
    }

    if (files.some(f => f.type === '.js' || f.type === '.jsx')) {
      return ProjectType.JAVASCRIPT;
    }

    if (files.some(f => f.type === '.html' || f.type === '.css')) {
      return ProjectType.WEB;
    }

    return ProjectType.UNKNOWN;
  }

  private async generateStructure(): Promise<string> {
    const ignore = [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.git/**',
      '**/venv/**',
      '**/__pycache__/**'
    ];

    const files = await fg('**/*', {
      cwd: this.targetPath,
      ignore,
      dot: false,
      onlyFiles: false,
      deep: 3
    });

    return files.slice(0, 50).join('\n');
  }

  async getSampleCode(): Promise<string> {
    const codePatterns = ['**/*.{js,ts,jsx,tsx,py}'];
    const ignore = [
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**'
    ];

    const codeFiles = await fg(codePatterns, {
      cwd: this.targetPath,
      ignore,
      absolute: false
    });

    let sampleCode = '';
    for (const file of codeFiles.slice(0, 3)) {
      const fullPath = path.join(this.targetPath, file);
      try {
        const content = await fs.readFile(fullPath, 'utf-8');
        const lines = content.split('\n').slice(0, 30).join('\n');
        sampleCode += `\n--- ${file} ---\n${lines}\n`;
      } catch (error) {
        continue;
      }
    }

    return sampleCode;
  }
}
