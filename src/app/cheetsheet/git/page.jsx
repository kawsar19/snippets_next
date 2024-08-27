"use client";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const gitCommands = [
  {
    command: "git init",
    description: "Initialize a new Git repository.",
    example: "git init",
  },
  {
    command: "git clone <url>",
    description: "Clone an existing repository from the provided URL.",
    example: "git clone https://github.com/user/repo.git",
  },
  {
    command: "git status",
    description: "Show the working tree status.",
    example: "git status",
  },
  {
    command: "git add <file>",
    description: "Add file changes to the staging area.",
    example: "git add file.txt",
  },
  {
    command: "git commit -m '<message>'",
    description: "Commit changes with a message.",
    example: "git commit -m 'Initial commit'",
  },
  {
    command: "git push",
    description: "Push committed changes to the remote repository.",
    example: "git push origin main",
  },
  {
    command: "git pull",
    description: "Fetch and merge changes from the remote repository.",
    example: "git pull origin main",
  },
  {
    command: "git branch",
    description: "List, create, or delete branches.",
    example: "git branch",
  },
  {
    command: "git checkout <branch>",
    description: "Switch to the specified branch.",
    example: "git checkout feature-branch",
  },
  {
    command: "git merge <branch>",
    description:
      "Merge changes from the specified branch into the current branch.",
    example: "git merge feature-branch",
  },
  {
    command: "git log",
    description: "Show the commit history.",
    example: "git log",
  },
  {
    command: "git revert <commit>",
    description: "Revert a commit by creating a new commit.",
    example: "git revert a1b2c3d",
  },
  {
    command: "git reset --hard <commit>",
    description:
      "Reset the repository to a specific commit and discard changes.",
    example: "git reset --hard a1b2c3d",
  },
  {
    command: "git stash",
    description: "Stash changes in a dirty working directory.",
    example: "git stash",
  },
  {
    command: "git stash pop",
    description:
      "Apply the most recently stashed changes and remove them from the stash list.",
    example: "git stash pop",
  },
  {
    command: "git diff",
    description:
      "Show changes between commits, commit and working directory, etc.",
    example: "git diff",
  },
  {
    command: "git tag",
    description: "List, create, or delete tags.",
    example: "git tag v1.0",
  },
  {
    command: "git fetch",
    description: "Download objects and refs from another repository.",
    example: "git fetch origin",
  },
  {
    command: "git remote -v",
    description: "Show the remote URLs for the repository.",
    example: "git remote -v",
  },
  {
    command: "git remote add <name> <url>",
    description: "Add a new remote repository.",
    example: "git remote add origin https://github.com/user/repo.git",
  },
  {
    command: "git remote remove <name>",
    description: "Remove a remote repository.",
    example: "git remote remove origin",
  },
  {
    command: "git rm <file>",
    description: "Remove files from the working directory and staging area.",
    example: "git rm file.txt",
  },
  {
    command: "git mv <old> <new>",
    description: "Move or rename a file, a directory, or a symlink.",
    example: "git mv oldfile.txt newfile.txt",
  },
  {
    command: "git commit --amend",
    description: "Modify the most recent commit.",
    example: "git commit --amend -m 'Updated commit message'",
  },
  {
    command: "git rebase <branch>",
    description: "Reapply commits on top of another base branch.",
    example: "git rebase main",
  },
  {
    command: "git cherry-pick <commit>",
    description: "Apply the changes introduced by some existing commits.",
    example: "git cherry-pick a1b2c3d",
  },
  {
    command: "git log --oneline",
    description: "Show the commit logs in a concise format.",
    example: "git log --oneline",
  },
  {
    command: "git log --graph --oneline --all",
    description: "Show a graphical representation of the commit history.",
    example: "git log --graph --oneline --all",
  },
  {
    command: "git stash list",
    description: "List all stashed changes.",
    example: "git stash list",
  },
  {
    command: "git stash apply <stash>",
    description: "Apply a stash from the stash list.",
    example: "git stash apply stash@{0}",
  },
  {
    command: "git stash drop <stash>",
    description: "Remove a stash from the stash list.",
    example: "git stash drop stash@{0}",
  },
  {
    command: "git reflog",
    description: "Show the reference logs.",
    example: "git reflog",
  },
  {
    command: "git submodule",
    description: "Initialize, update, or inspect submodules.",
    example: "git submodule update --init --recursive",
  },
  {
    command: "git config --global user.name <name>",
    description: "Set the user name for commits.",
    example: "git config --global user.name 'John Doe'",
  },
  {
    command: "git config --global user.email <email>",
    description: "Set the user email for commits.",
    example: "git config --global user.email 'john@example.com'",
  },
  {
    command: "git clean -f",
    description: "Remove untracked files from the working directory.",
    example: "git clean -f",
  },
  {
    command: "git archive",
    description: "Create an archive of files from a named tree.",
    example: "git archive --format=tar --output=repo.tar master",
  },
];

const GitCheatSheet = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Git Cheat Sheet</h1>
      <div className="space-y-4">
        {gitCommands.map((command, index) => (
          <div
            key={index}
            className="relative p-4 border rounded-md bg-gray-50"
          >
            <h2 className="text-xl font-semibold mb-2">{command.command}</h2>
            <p className="mb-2 text-gray-600">{command.description}</p>
            <SyntaxHighlighter language="bash" style={solarizedlight}>
              {command.example}
            </SyntaxHighlighter>
            <CopyToClipboard text={command.example}>
              <button className="absolute top-2 right-2 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition-colors duration-200">
                Copy
              </button>
            </CopyToClipboard>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <a
          href="https://github.com/your-repo/git-cheat-sheet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default GitCheatSheet;
