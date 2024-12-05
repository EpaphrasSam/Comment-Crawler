'use client';

import { Card } from "@/components/shared/Card";
import { Button, Tab, Tabs, Progress, Input, Select, SelectItem, Switch } from "@nextui-org/react";
import { Settings2, Save, RefreshCw, Pause, Play, AlertTriangle, Clock, BarChart2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SourceDetailsProps {
  source: any;
  onClose: () => void;
}

const mockTimeSeriesData = [
  { time: '00:00', articles: 45, comments: 320, errors: 2 },
  { time: '04:00', articles: 52, comments: 480, errors: 1 },
  { time: '08:00', articles: 78, comments: 650, errors: 3 },
  { time: '12:00', articles: 95, comments: 890, errors: 2 },
  { time: '16:00', articles: 120, comments: 1200, errors: 4 },
  { time: '20:00', articles: 85, comments: 780, errors: 1 },
];

export function SourceDetails({ source, onClose }: SourceDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{source.name}</h2>
          <p className="text-default-500">{source.url}</p>
        </div>
        <div className="flex gap-2">
          <Button
            color={source.status === 'active' ? "warning" : "success"}
            variant="flat"
            startIcon={source.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          >
            {source.status === 'active' ? 'Pause' : 'Resume'}
          </Button>
          <Button
            color="primary"
            startIcon={<Save className="h-4 w-4" />}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs aria-label="Source Details">
        <Tab key="overview" title="Overview">
          <div className="space-y-6 p-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Health Score</span>
                    <span className="text-sm text-default-500">{source.health}%</span>
                  </div>
                  <Progress 
                    value={source.health}
                    color={source.health > 80 ? "success" : source.health > 60 ? "warning" : "danger"}
                    className="h-2"
                  />
                </div>
              </Card>
              <Card>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Response Time</span>
                    <span className="text-sm text-default-500">{source.avgResponseTime}s</span>
                  </div>
                  <Progress 
                    value={Math.min(100, (source.avgResponseTime / 3) * 100)}
                    color={source.avgResponseTime < 1 ? "success" : source.avgResponseTime < 2 ? "warning" : "danger"}
                    className="h-2 mt-2"
                  />
                </div>
              </Card>
              <Card>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-sm text-default-500">{source.errorRate}%</span>
                  </div>
                  <Progress 
                    value={source.errorRate * 10}
                    color={source.errorRate < 3 ? "success" : source.errorRate < 7 ? "warning" : "danger"}
                    className="h-2 mt-2"
                  />
                </div>
              </Card>
            </div>

            {/* Activity Chart */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockTimeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="articles" stroke="#0070F3" name="Articles" />
                    <Line type="monotone" dataKey="comments" stroke="#7928CA" name="Comments" />
                    <Line type="monotone" dataKey="errors" stroke="#FF0080" name="Errors" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      i % 3 === 0 ? 'bg-success/10 text-success' :
                      i % 3 === 1 ? 'bg-warning/10 text-warning' :
                      'bg-danger/10 text-danger'
                    }`}>
                      {i % 3 === 0 ? <RefreshCw className="h-4 w-4" /> :
                       i % 3 === 1 ? <Clock className="h-4 w-4" /> :
                       <AlertTriangle className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {i % 3 === 0 ? 'Successfully scraped 25 new articles' :
                         i % 3 === 1 ? 'Scheduled maintenance completed' :
                         'Failed to fetch comments from 3 articles'}
                      </p>
                      <p className="text-xs text-default-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Tab>

        <Tab key="settings" title="Settings">
          <div className="space-y-6 p-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">General Settings</h3>
              <div className="space-y-4">
                <Input
                  label="Source Name"
                  placeholder="Enter source name"
                  defaultValue={source.name}
                />
                <Input
                  label="Base URL"
                  placeholder="Enter source URL"
                  defaultValue={source.url}
                />
                <Select
                  label="Source Type"
                  placeholder="Select source type"
                  defaultSelectedKeys={[source.type]}
                >
                  <SelectItem key="news" value="news">News Site</SelectItem>
                  <SelectItem key="blog" value="blog">Blog Platform</SelectItem>
                  <SelectItem key="social" value="social">Social Media</SelectItem>
                </Select>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Scraping Configuration</h3>
              <div className="space-y-4">
                <Select
                  label="Scraping Interval"
                  placeholder="Select interval"
                  defaultSelectedKeys={[source.scrapingInterval.toString()]}
                >
                  <SelectItem key="15">Every 15 minutes</SelectItem>
                  <SelectItem key="30">Every 30 minutes</SelectItem>
                  <SelectItem key="60">Every hour</SelectItem>
                </Select>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Section Patterns</label>
                  {source.sections.map((section: string, index: number) => (
                    <Input
                      key={index}
                      placeholder="Enter section pattern"
                      defaultValue={section}
                      className="mb-2"
                    />
                  ))}
                  <Button
                    variant="flat"
                    color="primary"
                    size="sm"
                  >
                    Add Section Pattern
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Auto-retry on Failure</p>
                      <p className="text-xs text-default-500">Automatically retry failed scraping attempts</p>
                    </div>
                    <Switch defaultSelected />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Deep Comment Scraping</p>
                      <p className="text-xs text-default-500">Scrape nested comment threads</p>
                    </div>
                    <Switch defaultSelected />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Historical Data</p>
                      <p className="text-xs text-default-500">Scrape historical comments and articles</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
              <div className="space-y-4">
                <Input
                  label="Request Timeout"
                  placeholder="Enter timeout in seconds"
                  type="number"
                  defaultValue="30"
                />
                <Input
                  label="Max Retries"
                  placeholder="Enter max retry attempts"
                  type="number"
                  defaultValue="3"
                />
                <Input
                  label="Concurrent Requests"
                  placeholder="Enter max concurrent requests"
                  type="number"
                  defaultValue="5"
                />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Debug Mode</p>
                    <p className="text-xs text-default-500">Enable detailed logging</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </div>
        </Tab>

        <Tab key="analytics" title="Analytics">
          <div className="space-y-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Comment Activity</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockTimeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="comments" stroke="#7928CA" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Article Performance</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockTimeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="articles" stroke="#0070F3" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Error Analysis</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockTimeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="errors" stroke="#FF0080" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
