'use client'

import { StatsCard } from '../shared/StatsCard'
import { Card } from '../shared/Card'
import { 
  Newspaper,
  MessageCircle, 
  TrendingUp, 
  TrendingDown, 
  Globe,
  Users,
  BarChart3,
  Clock,
  Sparkles,
} from 'lucide-react'
import { faker } from '@faker-js/faker'
import { Progress, Button, Tabs, Tab, CardBody } from '@nextui-org/react'

// Generate mock statistics
const generateMockStats = () => ({
  overview: {
    totalArticles: faker.number.int({ min: 50, max: 200 }),
    totalComments: faker.number.int({ min: 1000, max: 5000 }),
    activeCommenters: faker.number.int({ min: 100, max: 500 }),
    avgCommentsPerArticle: faker.number.int({ min: 10, max: 50 }),
  },
  sourceStats: {
    bbc: {
      name: "BBC News",
      articles: faker.number.int({ min: 30, max: 100 }),
      comments: faker.number.int({ min: 500, max: 2000 }),
      topSections: [
        {
          name: "Politics",
          articles: faker.number.int({ min: 10, max: 30 }),
          comments: faker.number.int({ min: 100, max: 500 }),
          trend: faker.number.int({ min: -20, max: 30 }),
        },
        {
          name: "Technology",
          articles: faker.number.int({ min: 8, max: 25 }),
          comments: faker.number.int({ min: 80, max: 400 }),
          trend: faker.number.int({ min: -20, max: 30 }),
        },
      ],
      commentSentiment: faker.number.float({ min: -1, max: 1, precision: 0.01 }),
    },
    cnn: {
      name: "CNN",
      articles: faker.number.int({ min: 20, max: 80 }),
      comments: faker.number.int({ min: 400, max: 1500 }),
      topSections: [
        {
          name: "Politics",
          articles: faker.number.int({ min: 8, max: 25 }),
          comments: faker.number.int({ min: 80, max: 400 }),
          trend: faker.number.int({ min: -20, max: 30 }),
        },
        {
          name: "Business",
          articles: faker.number.int({ min: 6, max: 20 }),
          comments: faker.number.int({ min: 60, max: 300 }),
          trend: faker.number.int({ min: -20, max: 30 }),
        },
      ],
      commentSentiment: faker.number.float({ min: -1, max: 1, precision: 0.01 }),
    },
    aljazeera: {
      name: "Al Jazeera",
      articles: faker.number.int({ min: 15, max: 60 }),
      comments: faker.number.int({ min: 300, max: 1200 }),
      topSections: [
        {
          name: "Middle East",
          articles: faker.number.int({ min: 6, max: 20 }),
          comments: faker.number.int({ min: 60, max: 300 }),
          trend: faker.number.int({ min: -20, max: 30 }),
        },
        {
          name: "International",
          articles: faker.number.int({ min: 5, max: 15 }),
          comments: faker.number.int({ min: 50, max: 250 }),
          trend: faker.number.int({ min: -20, max: 30 }),
        },
      ],
      commentSentiment: faker.number.float({ min: -1, max: 1, precision: 0.01 }),
    },
  },
  commentTrends: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(
      "en-US",
      { weekday: "short" }
    ),
    count: faker.number.int({ min: 50, max: 200 }),
    sentiment: faker.number.float({ min: -1, max: 1, precision: 0.01 }),
  })),
  recentActivity: Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    source: faker.helpers.arrayElement(["BBC News", "CNN", "Al Jazeera"]),
    action: faker.helpers.arrayElement([
      "New article analyzed",
      "Comments updated",
      "Sentiment analysis completed",
    ]),
    timestamp: faker.date.recent().toISOString(),
  })),
});

export const DashboardStats = () => {
  const stats = generateMockStats();

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.2) return "text-success";
    if (sentiment < -0.2) return "text-danger";
    return "text-warning";
  };

  const getSentimentText = (sentiment: number) => {
    if (sentiment > 0.2) return "Positive";
    if (sentiment < -0.2) return "Negative";
    return "Neutral";
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Articles"
          value={stats.overview.totalArticles}
          icon={<Newspaper className="w-5 h-5" />}
          description="Articles analyzed across all sources"
          trend={{ value: 12.5, isUpward: true }}
        />
        <StatsCard
          title="Total Comments"
          value={stats.overview.totalComments}
          icon={<MessageCircle className="w-5 h-5" />}
          description="Comments collected and analyzed"
          trend={{ value: 8.2, isUpward: true }}
        />
        <StatsCard
          title="Active Commenters"
          value={stats.overview.activeCommenters}
          icon={<Users className="w-5 h-5" />}
          description="Unique commenters identified"
          trend={{ value: 5.3, isUpward: true }}
        />
        <StatsCard
          title="Avg. Comments"
          value={stats.overview.avgCommentsPerArticle}
          icon={<BarChart3 className="w-5 h-5" />}
          description="Average comments per article"
          trend={{ value: 3.7, isUpward: true }}
        />
      </div>

      {/* Source-specific Stats */}
      <Card>
        <CardBody>
          <Tabs
            aria-label="Source Statistics"
            size="lg"
            color="primary"
            variant="underlined"
            classNames={{
              base: "w-full",
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-primary",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-primary",
            }}
          >
            {Object.entries(stats.sourceStats).map(([sourceId, source]) => (
              <Tab
                key={sourceId}
                title={
                  <div className="flex items-center space-x-2">
                    <span>{source.name}</span>
                    <span className="text-xs bg-default-100 rounded-full px-2">
                      {source.articles} articles
                    </span>
                  </div>
                }
              >
                <div className="pt-4 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Articles Analyzed</h4>
                      <div className="text-2xl font-semibold">
                        {source.articles}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Total Comments</h4>
                      <div className="text-2xl font-semibold">
                        {source.comments}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Overall Sentiment</h4>
                      <div
                        className={`text-2xl font-semibold ${getSentimentColor(
                          source.commentSentiment
                        )}`}
                      >
                        {getSentimentText(source.commentSentiment)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Top Sections</h4>
                    {source.topSections.map((section) => (
                      <div key={section.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{section.name}</span>
                            {section.trend > 0 ? (
                              <TrendingUp className="w-4 h-4 text-success" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-danger" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-default-500">
                            <span>{section.articles} articles</span>
                            <span>{section.comments} comments</span>
                          </div>
                        </div>
                        <Progress
                          value={(section.comments / source.comments) * 100}
                          className="h-1"
                          color="primary"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Tab>
            ))}
          </Tabs>
        </CardBody>
      </Card>

      {/* Recent Activity and Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Comment Activity">
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2">
              {stats.commentTrends.map((day) => (
                <div key={day.date} className="flex flex-col items-center">
                  <div className="text-sm text-default-500">{day.date}</div>
                  <div className="h-24 w-full flex items-end">
                    <div
                      className="w-full bg-primary rounded-t"
                      style={{
                        height: `${
                          (day.count /
                            Math.max(
                              ...stats.commentTrends.map((d) => d.count)
                            )) *
                          100
                        }%`,
                        opacity: 0.7 + (day.sentiment + 1) * 0.15,
                      }}
                    />
                  </div>
                  <div className="text-xs text-default-500">{day.count}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Recent Activity">
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-default-500" />
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-default-500">{activity.source}</p>
                  </div>
                </div>
                <span className="text-xs text-default-500">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
