import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get token from NextAuth session or fallback to env
    const session = await getServerSession(authOptions as any)
    const token = (session as any)?.accessToken || process.env.GITHUB_TOKEN

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const octokit = new Octokit({ auth: token })
    
    // Use the Alegria repo
    const owner = '2050beyond'
    const repoName = 'Alegria'

    // Get current ref
    const { data: ref } = await octokit.git.getRef({
      owner,
      repo: repoName,
      ref: 'heads/main',
    })

    // Get current tree
    const { data: currentCommit } = await octokit.git.getCommit({
      owner,
      repo: repoName,
      commit_sha: ref.object.sha,
    })

    // Create commit message
    const pageName = body.pageName || 'content'
    const commitMessage = body.message || `Updated ${pageName} via TinaCMS`

    // Create new commit
    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo: repoName,
      message: commitMessage,
      tree: currentCommit.tree.sha,
      parents: [ref.object.sha],
      author: {
        name: 'TinaCMS Editor',
        email: 'editor@alegria.com',
      },
    })

    // Update ref
    await octokit.git.updateRef({
      owner,
      repo: repoName,
      ref: 'heads/main',
      sha: newCommit.sha,
    })

    // Store last commit info
    const commitInfo = {
      author: 'Editor',
      date: new Date().toISOString(),
      sha: newCommit.sha,
    }

    return NextResponse.json({ 
      success: true, 
      commit: commitInfo 
    })
  } catch (error) {
    console.error('Commit error:', error)
    return NextResponse.json({ error: 'Failed to commit' }, { status: 500 })
  }
}

