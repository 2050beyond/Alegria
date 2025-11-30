import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.VERCEL_WEBHOOK_SECRET || process.env.GITHUB_WEBHOOK_SECRET
    
    if (webhookSecret) {
      const signature = request.headers.get('x-vercel-signature') || request.headers.get('x-hub-signature-256')
      const body = await request.text()
      
      if (signature) {
        const hmac = crypto.createHmac('sha256', webhookSecret)
        const digest = 'sha256=' + hmac.update(body).digest('hex')
        
        if (signature !== digest) {
          return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
        }
      }
    }

    // Trigger Vercel rebuild
    // In production, Vercel automatically rebuilds on GitHub push
    // This webhook can be used for additional processing if needed
    
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook received, rebuild triggered' 
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

