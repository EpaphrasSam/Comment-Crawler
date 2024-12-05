'use client'

import { Card } from '../shared/Card'
import { Avatar, Button, Chip } from '@nextui-org/react'
import { ArrowRight, MessageCircle, ThumbsUp, AlertTriangle } from 'lucide-react'
import { faker } from '@faker-js/faker'
import Link from 'next/link'

interface Activity {
  id: string
  type: 'comment' | 'sentiment' | 'alert'
  title: string
  description: string
  source: string
  articleId: string
  timestamp: string
  sentiment?: number
  author?: string
}

const generateMockActivities = (): Activity[] => {
  return Array.from({ length: 5 }, () => {
    const types = ['comment', 'sentiment', 'alert'] as const
    const type = types[Math.floor(Math.random() * types.length)]
    
    const baseActivity = {
      id: faker.string.uuid(),
      articleId: faker.string.uuid(),
      source: 'BBC News',
      timestamp: faker.date.recent().toISOString(),
    }

    switch (type) {
      case 'comment':
        return {
          ...baseActivity,
          type,
          title: 'New High-Impact Comment',
          description: faker.lorem.sentence(),
          author: faker.person.fullName(),
        }
      case 'sentiment':
        return {
          ...baseActivity,
          type,
          title: 'Sentiment Shift Detected',
          description: `Sentiment shifted from neutral to ${faker.number.float({ min: -1, max: 1 }) > 0 ? 'positive' : 'negative'}`,
          sentiment: faker.number.float({ min: -1, max: 1 }),
        }
      case 'alert':
        return {
          ...baseActivity,
          type,
          title: 'Unusual Activity Detected',
          description: 'Sudden increase in negative comments detected',
        }
      default:
        return baseActivity as Activity
    }
  })
}

export const RecentActivity = () => {
  const activities = generateMockActivities()

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'comment':
        return <MessageCircle className="w-4 h-4" />
      case 'sentiment':
        return <ThumbsUp className="w-4 h-4" />
      case 'alert':
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'comment':
        return 'primary'
      case 'sentiment':
        return 'success'
      case 'alert':
        return 'warning'
    }
  }

  return (
    <Card title="Recent Activity">
      <div className="space-y-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-default-100">
              <Avatar
                name={activity.author || activity.source}
                size="sm"
                className="flex-shrink-0"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.title}</span>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={getActivityColor(activity.type)}
                      startContent={getActivityIcon(activity.type)}
                    >
                      {activity.type}
                    </Chip>
                  </div>
                  <span className="text-xs text-default-500">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-default-600">{activity.description}</p>
                <div className="flex items-center gap-2 text-xs text-default-500">
                  <span>{activity.source}</span>
                  <span>•</span>
                  <Link 
                    href={`/articles/${activity.articleId}`}
                    className="text-primary hover:underline"
                  >
                    View Article
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          as={Link}
          href="/activity"
          variant="flat"
          color="primary"
          className="w-full"
          endContent={<ArrowRight className="w-4 h-4" />}
        >
          View All Activity
        </Button>
      </div>
    </Card>
  )
}
