'use client'

import { useState } from "react"
import { DashboardLayout } from "../layout/DashboardLayout"
import { URLInput } from "../interfaces/URLInput"
import { Button, Input, Tabs, Tab } from "@nextui-org/react"
import { Search, ExternalLink, Newspaper } from "lucide-react"
import { DashboardStats } from "./DashboardStats"
import { Card } from "../shared/Card"
import { faker } from "@faker-js/faker"

interface AnalyzedArticle {
  id: string
  url: string
  title: string
  section: string
  timestamp: string
  commentCount: number
  sentiment: number
  isProcessing?: boolean
}

const generateMockArticles = (): AnalyzedArticle[] => {
  return Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    url: faker.internet.url(),
    title: faker.lorem.sentence(),
    section: faker.helpers.arrayElement(['Politics', 'Technology', 'Business', 'Sport']),
    timestamp: faker.date.recent().toISOString(),
    commentCount: faker.number.int({ min: 10, max: 1000 }),
    sentiment: faker.number.float({ min: -1, max: 1 }),
    isProcessing: faker.datatype.boolean()
  }))
}

interface DashboardProps {
  children?: React.ReactNode
}

export const Dashboard = ({ children }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const analyzedArticles = generateMockArticles()

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.2) return "text-success"
    if (sentiment < -0.2) return "text-danger"
    return "text-warning"
  }

  const getSentimentText = (sentiment: number) => {
    if (sentiment > 0.2) return "Positive"
    if (sentiment < -0.2) return "Negative"
    return "Neutral"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">Comment Analysis Dashboard</h1>
          </div>

          <DashboardStats />
          
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recently Analyzed Articles</h2>
            <div className="flex gap-2">
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="w-4 h-4 text-default-400" />}
                className="w-64"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {analyzedArticles.map((article) => (
              <Card key={article.id}>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        {article.title}
                      </a>
                      <ExternalLink className="w-4 h-4 text-default-400" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-default-500">
                      <span>{article.section}</span>
                      <span>•</span>
                      <span>{new Date(article.timestamp).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{article.commentCount} comments</span>
                      <span>•</span>
                      <span className={getSentimentColor(article.sentiment)}>
                        {getSentimentText(article.sentiment)} sentiment
                      </span>
                    </div>
                  </div>
                  {article.isProcessing && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-default-500">Processing</span>
                      <div className="animate-spin">⚡</div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
