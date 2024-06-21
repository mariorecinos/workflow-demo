# Introduction to GitHub Actions

GitHub Actions is a feature provided by GitHub that allows you to automate, customize, and execute software development workflows right in your repository. With GitHub Actions, you can create workflows that build, test, package, release, or deploy any code project on GitHub.

GitHub Actions provides you with a virtual machine (VM) to run your workflows. When you specify a runs-on attribute in your workflow, GitHub sets up a virtual environment based on your selection. For example, runs-on: ubuntu-latest tells GitHub to provide an Ubuntu-based virtual machine.

## How Does It Work?

- Provisioning: When a workflow is triggered, GitHub creates a new VM instance with the specified environment.
- Setup: The VM is preconfigured with necessary tools and software. For example, if you choose ubuntu-latest, it includes common tools and software needed for development.
- Execution: Your workflow steps are executed in this VM. Each step in the workflow runs in the context of this isolated environment.
- Cleanup: Once the workflow completes, the VM is destroyed, ensuring no leftover files or data.

This means you don't have to worry about setting up and maintaining a physical machine for running your tests or builds. GitHub takes care of everything, providing a clean slate for each workflow run.

## What is a Workflow?

A workflow is an automated process that you define in your GitHub repository. It's made up of one or more jobs that can run on different machines, such as a Linux server or a Windows machine.

## Understanding the Workflow File

The workflow file is a YAML file that lives in your `.github/workflows directory`. YAML is a human-readable data format that is easy to write and understand. Let's walk through an example workflow file named `components-test.yml`.

## Example Workflow: components-test.yml

Here's what the file looks like:

```yaml
name: Component Tests

on:
  push:
    branches: [ solution ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Setup Node.js (Latest Stable Version)
      uses: actions/setup-node@v2
      with:
        node-version: 'lts/*'
        cache: 'npm'

    - name: Install dependencies
      run: npm install

    - name: Run Component Tests
      run: npm run test src/tests/component/App.test.js
```

Let's break down each part:

## Name

This is the name of the workflow. It helps you identify this workflow in the GitHub Actions interface.

```yaml
name: Component Tests
```

## Triggers: on

This section defines when the workflow should run. In this case, the workflow runs every time there is a push (a code change) to the `solution` branch.

```yaml
on:
  push:
    branches: [ solution ]
```

## Jobs

A workflow can have multiple jobs that run different tasks. Each job can have multiple steps. Let's look at the `build` job:

**Job: build**

runs-on: ubuntu-latest: This specifies the type of machine the job should run on. Here, it uses the latest version of Ubuntu, a popular Linux distribution.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

## Steps

Each job contains steps that define the actions to perform.

**Step 1: Checkout Code**

uses: actions/checkout@v2: This step uses a predefined action to check out (download) your repository's code so the job can work with it.

```yaml
steps:
- uses: actions/checkout@v2
```

**Step 2: Setup Node.js**

- name: Setup Node.js (Latest Stable Version): This is a descriptive name for the step.
- uses: actions/setup-node@v2: This step uses another predefined action to set up Node.js, a JavaScript runtime.
- with:: This provides additional settings:
- node-version: 'lts/*': This specifies that it should install the latest stable version of Node.js.
- cache: 'npm': This enables caching for npm (Node Package Manager) to speed up the process.

**Step 3: Install Dependencies**

- name: Install dependencies: This is another descriptive name.
- run: npm install: This runs the npm install command to install the necessary packages required by your project.

```yaml
- name: Install dependencies
  run: npm install
```

**Step 4: Run Component Tests**

- name: Run Component Tests: A descriptive name for the step.
- run: npm run test src/tests/component/App.test.js: This runs a command to execute your component tests. It specifically runs the test file App.test.js located in the src/tests/component directory.

```yaml
- name: Run Component Tests
  run: npm run test src/tests/component/App.test.js
```

## Observe In Action

- Now whenever you make a push to your solution branch it will trigger the workflow which you can view in the actions tab of your repository.
