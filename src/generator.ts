import * as path from 'path';
import * as fs from 'fs-extra';
import chalk from 'chalk';
import { ProjectAnalyzer } from './analyzer';
import { GeminiService } from './gemini-service';

export class ReadmeGenerator {
  private analyzer: ProjectAnalyzer;
  private geminiService: GeminiService;
  private targetPath: string;

  constructor(apiKey: string, targetPath: string = process.cwd()) {
    this.targetPath = path.resolve(targetPath);
    this.analyzer = new ProjectAnalyzer(this.targetPath);
    this.geminiService = new GeminiService(apiKey);
  }

  async generate(): Promise<void> {
    console.log(chalk.blue('🔍 Analyzing project...'));

    const projectInfo = await this.analyzer.analyze();
    console.log(chalk.green(`✓ Found ${projectInfo.files.length} files`));
    console.log(chalk.green(`✓ Detected project type: ${projectInfo.type}`));
    console.log(chalk.green(`✓ Languages: ${projectInfo.languages.join(', ')}`));

    console.log(chalk.blue('\n🤖 Generating README with AI...'));

    const sampleCode = await this.analyzer.getSampleCode();
    const readmeContent = await this.geminiService.generateReadme(projectInfo, sampleCode);

    console.log(chalk.blue('\n📝 Writing README.md...'));

    const readmePath = path.join(this.targetPath, 'README.md');
    await fs.writeFile(readmePath, readmeContent, 'utf-8');

    console.log(chalk.green(`\n✅ README.md created successfully at: ${readmePath}`));
    console.log(chalk.cyan('\n📄 Preview:'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(readmeContent.split('\n').slice(0, 15).join('\n'));
    console.log(chalk.gray('─'.repeat(50)));
  }
}
