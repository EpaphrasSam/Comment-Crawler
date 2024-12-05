'use client';

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/shared/Card";
import { Input, Button, Progress } from "@nextui-org/react";
import { Search, Plus, Newspaper, MessageSquare, BarChart } from "lucide-react";
import { faker } from "@faker-js/faker";
import { useState } from "react";

interface Source {
  id: string;
  name: string;
  url: string;
  articleCount: number;
  commentCount: number;
  lastUpdated: string;
  status: "active" | "paused" | "error";
  health: number;
}

const generateMockSources = (count: number): Source[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    url: faker.internet.url(),
    articleCount: faker.number.int({ min: 50, max: 500 }),
    commentCount: faker.number.int({ min: 500, max: 5000 }),
    lastUpdated: faker.date.recent().toISOString(),
    status: faker.helpers.arrayElement(["active", "paused", "error"]),
    health: faker.number.int({ min: 60, max: 100 }),
  }));
};

export default function SourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const sources = generateMockSources(8);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Sources</h1>
            <Button 
              color="primary" 
              endContent={<Plus className="h-4 w-4" />}
              className="text-background dark:text-white"
            >
              Add Source
            </Button>
          </div>
          
          <Input
            placeholder="Search sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="text-default-400" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sources.map((source) => (
            <Card key={source.id}>
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{source.name}</h3>
                    <p className="text-sm text-default-500">{source.url}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    source.status === 'active' ? 'bg-success/10 text-success' :
                    source.status === 'paused' ? 'bg-warning/10 text-warning' :
                    'bg-danger/10 text-danger'
                  }`}>
                    {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Newspaper className="h-4 w-4 text-default-400" />
                    <span className="text-sm">{source.articleCount} articles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-default-400" />
                    <span className="text-sm">{source.commentCount} comments</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Health</span>
                    <span className="text-sm text-default-500">{source.health}%</span>
                  </div>
                  <Progress 
                    value={source.health}
                    color={source.health > 80 ? "success" : source.health > 60 ? "warning" : "danger"}
                    className="h-2"
                  />
                </div>

                <div className="flex justify-between items-center text-sm text-default-500">
                  <span>Last updated</span>
                  <span>{new Date(source.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
