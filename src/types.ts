export interface ProjectInfo {
  name: string;
  path: string;
  type: ProjectType;
  languages: string[];
  dependencies: string[];
  files: FileInfo[];
  structure: string;
}

export interface FileInfo {
  path: string;
  type: string;
  size: number;
}

export enum ProjectType {
  NODEJS = 'Node.js',
  PYTHON = 'Python',
  WEB = 'Web Application',
  REACT = 'React',
  NEXTJS = 'Next.js',
  VUE = 'Vue.js',
  ANGULAR = 'Angular',
  TYPESCRIPT = 'TypeScript',
  JAVASCRIPT = 'JavaScript',
  UNKNOWN = 'Unknown'
}

export interface ReadmeSection {
  title: string;
  content: string;
}
