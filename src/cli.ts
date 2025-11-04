#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import * as path from 'path';
import { ReadmeGenerator } from './generator';

const program = new Command();

program
  .name('readme-ai')
  .description('AI-powered README generator for your projects')
  .version('1.0.0')
  .argument('[path]', 'Path to the project directory', '.')
  .option('-k, --api-key <key>', 'Gemini API key (or set GEMINI_API_KEY env variable)')
  .action(async (targetPath: string, options: any) => {
    try {
      const apiKey = options.apiKey || process.env.GEMINI_API_KEY;

      if (!apiKey) {
        console.error(chalk.red('❌ Error: Gemini API key is required!'));
        console.log(chalk.yellow('\nPlease provide your API key using one of these methods:'));
        console.log(chalk.cyan('  1. Set GEMINI_API_KEY environment variable'));
        console.log(chalk.cyan('  2. Use --api-key flag: readme-ai --api-key YOUR_KEY'));
        console.log(chalk.gray('\nGet your API key at: https://makersuite.google.com/app/apikey'));
        process.exit(1);
      }

      const resolvedPath = path.resolve(targetPath);
      
      console.log(chalk.bold.blue('\n🚀 README-AI Generator\n'));
      console.log(chalk.gray(`Target directory: ${resolvedPath}\n`));

      const generator = new ReadmeGenerator(apiKey, resolvedPath);
      await generator.generate();

      console.log(chalk.green.bold('\n🎉 Done!\n'));
    } catch (error) {
      console.error(chalk.red(`\n❌ Error: ${error instanceof Error ? error.message : error}`));
      process.exit(1);
    }
  });

program.parse();
