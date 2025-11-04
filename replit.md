# README-AI

## Overview
An AI-powered CLI tool that analyzes project structure and generates comprehensive README.md files using Google's Gemini AI. Built as an npm package that can be run with `npx readme-ai`.

**Current State:** Fully functional CLI tool with TypeScript, Gemini AI integration, and automatic project analysis capabilities.

## Recent Changes (November 4, 2025)
- Initial project setup with TypeScript and npm configuration
- Implemented project analyzer with file scanning and language detection
- Created Gemini AI service integration for README generation
- Built CLI interface with Commander.js
- Added colored console output with Chalk
- Successfully tested with sample Express.js project

## Project Architecture

### Tech Stack
- **Language:** TypeScript
- **Runtime:** Node.js (v16+)
- **AI:** Google Gemini 2.0 Flash
- **CLI Framework:** Commander.js
- **File Operations:** fs-extra, fast-glob
- **Styling:** Chalk for colored output

### Project Structure
```
src/
├── cli.ts           # CLI entry point with argument parsing
├── generator.ts     # Main README generator orchestrator
├── analyzer.ts      # Project analysis and file scanning
├── gemini-service.ts # Gemini AI integration
└── types.ts         # TypeScript type definitions

dist/                # Compiled JavaScript output
test-project/        # Sample project for testing
```

### Key Features
1. **Project Analysis:**
   - Scans up to 100 files to understand project structure
   - Detects project type (Node.js, Python, React, etc.)
   - Identifies languages and dependencies automatically
   - Generates folder structure overview

2. **AI-Powered Generation:**
   - Uses Gemini 2.0 Flash model for fast, accurate content
   - Analyzes sample code to understand project purpose
   - Generates comprehensive README with standard sections
   - Professional formatting with markdown, code blocks, and emojis

3. **CLI Interface:**
   - Run with `npx readme-ai` or `npx readme-ai /path/to/project`
   - Supports API key via environment variable or flag
   - Colored console output for better UX
   - Preview generated README in terminal

### Usage
```bash
# Using environment variable (recommended)
export GEMINI_API_KEY="your-api-key"
npx readme-ai

# Using CLI flag
npx readme-ai --api-key your-api-key

# For specific directory
npx readme-ai /path/to/project
```

### Dependencies
- @google/generative-ai - Gemini AI SDK
- commander - CLI argument parsing
- fast-glob - Fast file pattern matching
- fs-extra - Enhanced file system operations
- chalk - Terminal color styling

## Configuration
- **GEMINI_API_KEY:** Required environment variable for AI generation
- Get free API key at: https://makersuite.google.com/app/apikey

## Future Enhancements
- Customizable README templates
- Interactive CLI prompts for additional context
- Badge generation (build status, version, license)
- Configuration file (.readme-ai.json) support
- Multiple output formats and styles
