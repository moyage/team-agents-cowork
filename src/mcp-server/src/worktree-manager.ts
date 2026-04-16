import * as fs from 'fs/promises';
import * as path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

/**
 * Executes a Git command safely without shell injection.
 */
async function runGitCommand(args: string[], cwd: string): Promise<string> {
  try {
    const { stdout, stderr } = await execFileAsync('git', args, { cwd });
    if (stderr && stderr.trim().length > 0) {
      console.warn(`[WorktreeManager] git ${args[0]} stderr:`, stderr.trim());
    }
    return stdout.trim();
  } catch (error: any) {
    throw new Error(`Git command failed: git ${args.join(' ')}\nError: ${error.message}\nOutput: ${error.stdout}`);
  }
}

/**
 * Gets the path where headless sandboxes should be stored.
 */
function getSandboxesDir(projectRoot: string): string {
  return path.resolve(projectRoot, '..', '.cowork-sandboxes', path.basename(projectRoot));
}

/**
 * Creates a Git Worktree sandbox for an isolated task execution.
 */
export async function createWorktree(projectRoot: string, taskId: string, baseBranch: string = 'agent-sync'): Promise<string> {
  const sandboxesDir = getSandboxesDir(projectRoot);
  const worktreePath = path.join(sandboxesDir, taskId);
  const newBranchName = `task-${taskId}`;

  await fs.mkdir(sandboxesDir, { recursive: true });

  try {
    try {
      await fs.access(worktreePath);
      await runGitCommand(['worktree', 'prune'], projectRoot);
      const listOut = await runGitCommand(['worktree', 'list'], projectRoot);
      if (!listOut.includes(worktreePath)) {
        await fs.rm(worktreePath, { recursive: true, force: true });
      } else {
        return worktreePath;
      }
    } catch (e) {}

    await runGitCommand(['worktree', 'add', '-b', newBranchName, worktreePath, baseBranch], projectRoot);
    
    return worktreePath;
  } catch (error: any) {
    throw new Error(`Failed to create worktree for task ${taskId}: ${error.message}`);
  }
}

/**
 * Commits all changes in the Worktree and pushes them to the remote repository.
 */
export async function commitAndPushWorktree(worktreePath: string, commitMessage: string): Promise<void> {
  try {
    await runGitCommand(['add', '-A'], worktreePath);
    
    try {
      await runGitCommand(['diff-index', '--quiet', 'HEAD'], worktreePath);
      console.log(`[WorktreeManager] No changes to commit in ${worktreePath}`);
      return;
    } catch (e) {}

    await runGitCommand(['commit', '-m', commitMessage], worktreePath);
    const branchName = await runGitCommand(['rev-parse', '--abbrev-ref', 'HEAD'], worktreePath);
    await runGitCommand(['push', 'origin', branchName], worktreePath);

  } catch (error: any) {
    throw new Error(`Failed to commit and push worktree at ${worktreePath}: ${error.message}`);
  }
}

/**
 * Removes a Git Worktree sandbox safely.
 */
export async function removeWorktree(projectRoot: string, taskId: string): Promise<void> {
  const sandboxesDir = getSandboxesDir(projectRoot);
  const worktreePath = path.join(sandboxesDir, taskId);

  try {
    await runGitCommand(['worktree', 'remove', '--force', worktreePath], projectRoot);
    
    const branchName = `task-${taskId}`;
    try {
      await runGitCommand(['branch', '-D', branchName], projectRoot);
    } catch (e) {}

  } catch (error: any) {
    try {
      await runGitCommand(['worktree', 'prune'], projectRoot);
      if (await fs.stat(worktreePath).catch(() => null)) {
         await fs.rm(worktreePath, { recursive: true, force: true });
      }
    } catch (e) {
       console.warn(`[WorktreeManager] Failed to forcefully clean worktree ${worktreePath}:\n`, e);
    }
  }
}
