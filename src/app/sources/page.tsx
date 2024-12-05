"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/shared/Card";
import {
  Button,
  Progress,
  Chip,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { Newspaper, MessageSquare } from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Source {
  id: string;
  name: string;
  url: string;
  articleCount: number;
  commentCount: number;
  status: "active" | "paused";
  health: number;
  description: string;
  lastCrawl: string;
  avgCommentsPerArticle: number;
  topCommenters: number;
  crawlFrequency: number;
  recentActivity: {
    time: string;
    articles: number;
    comments: number;
  }[];
}

const sources: Source[] = [
  {
    id: "bbc",
    name: "BBC News",
    url: "https://www.bbc.com/news",
    articleCount: 250,
    commentCount: 2500,
    status: "active",
    health: 98,
    description:
      "British Broadcasting Corporation - One of the world's leading news organizations",
    lastCrawl: "2024-01-20T15:30:00Z",
    avgCommentsPerArticle: 45,
    topCommenters: 150,
    crawlFrequency: 30,
    recentActivity: [
      { time: "12:00", articles: 20, comments: 180 },
      { time: "13:00", articles: 25, comments: 220 },
      { time: "14:00", articles: 18, comments: 160 },
      { time: "15:00", articles: 22, comments: 200 },
      { time: "16:00", articles: 28, comments: 250 },
    ],
  },
  {
    id: "cnn",
    name: "CNN",
    url: "https://www.cnn.com",
    articleCount: 180,
    commentCount: 1800,
    status: "active",
    health: 95,
    description: "Cable News Network - 24-hour news channel and website",
    lastCrawl: "2024-01-20T15:25:00Z",
    avgCommentsPerArticle: 35,
    topCommenters: 120,
    crawlFrequency: 30,
    recentActivity: [
      { time: "12:00", articles: 15, comments: 140 },
      { time: "13:00", articles: 18, comments: 165 },
      { time: "14:00", articles: 20, comments: 180 },
      { time: "15:00", articles: 16, comments: 150 },
      { time: "16:00", articles: 22, comments: 200 },
    ],
  },
  {
    id: "aljazeera",
    name: "Al Jazeera",
    url: "https://www.aljazeera.com",
    articleCount: 150,
    commentCount: 1200,
    status: "active",
    health: 92,
    description: "Al Jazeera Media Network - Middle Eastern news organization",
    lastCrawl: "2024-01-20T15:20:00Z",
    avgCommentsPerArticle: 30,
    topCommenters: 90,
    crawlFrequency: 30,
    recentActivity: [
      { time: "12:00", articles: 12, comments: 100 },
      { time: "13:00", articles: 15, comments: 130 },
      { time: "14:00", articles: 14, comments: 120 },
      { time: "15:00", articles: 18, comments: 160 },
      { time: "16:00", articles: 20, comments: 180 },
    ],
  },
];

export default function SourcesPage() {
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSourceClick = (source: Source) => {
    setSelectedSource(source);
    onOpen();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">News Sources</h1>
          <p className="text-default-500">
            Monitor and manage news sources for comment crawling
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sources.map((source) => (
            <Card
              key={source.id}
              className="hover:border-primary transition-colors cursor-pointer"
              isPressable
              onPress={() => handleSourceClick(source)}
            >
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{source.name}</h3>
                    <p className="text-sm text-default-500">{source.url}</p>
                  </div>
                  <Chip
                    className={
                      source.status === "active"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }
                    size="sm"
                  >
                    {source.status.charAt(0).toUpperCase() +
                      source.status.slice(1)}
                  </Chip>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Newspaper className="h-4 w-4 text-default-400" />
                    <span className="text-sm">
                      {source.articleCount} articles
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-default-400" />
                    <span className="text-sm">
                      {source.commentCount} comments
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Health</span>
                    <span className="text-sm text-default-500">
                      {source.health}%
                    </span>
                  </div>
                  <Progress
                    value={source.health}
                    color={source.health > 90 ? "success" : "warning"}
                    className="h-2"
                  />
                </div>

                <Button
                  variant="light"
                  color={source.status === "active" ? "warning" : "success"}
                  className="w-full"
                  onPress={() => {
                    // Toggle source status
                  }}
                >
                  {source.status === "active"
                    ? "Pause Crawling"
                    : "Resume Crawling"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="2xl"
          backdrop="blur"
          scrollBehavior="outside"
        >
          <ModalContent>
            <ModalBody className="py-6">
              {selectedSource && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedSource.name}
                    </h2>
                    <p className="text-default-500">
                      {selectedSource.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <div className="p-4">
                        <h4 className="text-sm font-medium">Articles</h4>
                        <p className="text-2xl font-bold">
                          {selectedSource.articleCount}
                        </p>
                      </div>
                    </Card>
                    <Card>
                      <div className="p-4">
                        <h4 className="text-sm font-medium">Comments</h4>
                        <p className="text-2xl font-bold">
                          {selectedSource.commentCount}
                        </p>
                      </div>
                    </Card>
                    <Card>
                      <div className="p-4">
                        <h4 className="text-sm font-medium">Avg Comments</h4>
                        <p className="text-2xl font-bold">
                          {selectedSource.avgCommentsPerArticle}
                        </p>
                      </div>
                    </Card>
                    <Card>
                      <div className="p-4">
                        <h4 className="text-sm font-medium">Top Commenters</h4>
                        <p className="text-2xl font-bold">
                          {selectedSource.topCommenters}
                        </p>
                      </div>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Crawling Details
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-default-500">Frequency</span>
                          <span>
                            Every {selectedSource.crawlFrequency} minutes
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-default-500">Health</span>
                          <span>{selectedSource.health}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-default-500">Status</span>
                          <Chip
                            className={
                              selectedSource.status === "active"
                                ? "bg-success/10 text-success"
                                : "bg-warning/10 text-warning"
                            }
                            size="sm"
                          >
                            {selectedSource.status.charAt(0).toUpperCase() +
                              selectedSource.status.slice(1)}
                          </Chip>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-default-500">Last Crawl</span>
                          <span>
                            {new Date(
                              selectedSource.lastCrawl
                            ).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Source Info
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-default-500">Website</span>
                          <a
                            href={selectedSource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary"
                          >
                            Visit Site
                          </a>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-default-500">
                            Comments/Article
                          </span>
                          <span>{selectedSource.avgCommentsPerArticle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-default-500">
                            Active Commenters
                          </span>
                          <span>{selectedSource.topCommenters}</span>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Recent Activity
                    </h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={selectedSource.recentActivity}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="articles"
                            stroke="#0070F3"
                            name="Articles"
                          />
                          <Line
                            type="monotone"
                            dataKey="comments"
                            stroke="#7928CA"
                            name="Comments"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
