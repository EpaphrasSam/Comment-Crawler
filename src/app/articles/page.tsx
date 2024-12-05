"use client";

import { useState, useEffect } from "react";
import {
  Input,
  Select,
  SelectItem,
  Card,
  CardBody,
  Tabs,
  Tab,
  Button,
} from "@nextui-org/react";
import { Search } from "lucide-react";
import { faker } from "@faker-js/faker";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ArticleCard } from "@/components/interfaces/ArticleCard";
import { URLInput } from "@/components/interfaces/URLInput";

interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  publishDate: string;
  commentCount: number;
  thumbnail: string;
  section?: string;
}

interface NewsSource {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  icon: string;
  sections: string[];
}

const newsSources: NewsSource[] = [
  {
    id: "bbc",
    name: "BBC News",
    enabled: true,
    description: "British Broadcasting Corporation - Global news coverage",
    icon: "🇬🇧",
    sections: ["Politics", "Technology", "Business", "Sport", "Entertainment"],
  },
  {
    id: "cnn",
    name: "CNN",
    enabled: false,
    description: "Cable News Network - Coming soon",
    icon: "🔜",
    sections: [],
  },
  {
    id: "aljazeera",
    name: "Al Jazeera",
    enabled: false,
    description: "Al Jazeera Media Network - Coming soon",
    icon: "🔜",
    sections: [],
  },
];

const sortOptions = ["Most Recent", "Most Comments", "Oldest"];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("bbc");
  const [selectedSection, setSelectedSection] = useState("all");
  const [sortBy, setSortBy] = useState("Most Recent");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const mockArticles = Array.from({ length: 12 }, () => ({
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          url: faker.internet.url(),
          source: "BBC News",
          section: faker.helpers.arrayElement([
            "Politics",
            "Technology",
            "Business",
            "Sport",
          ]),
          publishDate: faker.date.recent().toISOString(),
          commentCount: faker.number.int({ min: 10, max: 1000 }),
          thumbnail: faker.image.url(),
        }));
        setArticles(mockArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const activeSource = newsSources.find((s) => s.id === selectedSource);
  const sections = activeSource?.sections || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsSources.map((source) => (
            <Card
              key={source.id}
              className={`cursor-pointer transition-all ${
                source.enabled
                  ? selectedSource === source.id
                    ? "border-primary"
                    : "hover:border-primary/50"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => source.enabled && setSelectedSource(source.id)}
            >
              <CardBody className="flex items-start gap-4">
                <div className="text-4xl">{source.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{source.name}</h3>
                  <p className="text-sm text-default-500">
                    {source.description}
                  </p>
                  {!source.enabled && (
                    <div className="mt-2">
                      <span className="text-xs bg-default-100 rounded-full px-2 py-1">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {activeSource?.enabled && (
          <div className="space-y-4">
            <Card>
              <CardBody>
                <Tabs
                  aria-label="Scraping Options"
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
                  <Tab
                    key="single"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Single Article</span>
                      </div>
                    }
                  >
                    <div className="pt-4">
                      <URLInput
                        onSubmit={(url) => console.log("Analyzing URL:", url)}
                        placeholder={`Enter ${activeSource.name} article URL...`}
                      />
                    </div>
                  </Tab>
                  <Tab
                    key="bulk"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Bulk Scraping</span>
                      </div>
                    }
                  >
                    <div className="pt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                          label="Section to Scrape"
                          placeholder="Select section"
                          selectedKeys={[selectedSection]}
                          onChange={(e) => setSelectedSection(e.target.value)}
                          classNames={{
                            trigger: "h-12",
                          }}
                        >
                          <SelectItem key="all" value="all">
                            All Sections
                          </SelectItem>
                          {sections.map((section) => (
                            <SelectItem key={section} value={section}>
                              {section}
                            </SelectItem>
                          ))}
                        </Select>
                        <Input
                          type="number"
                          label="Maximum Articles"
                          placeholder="Enter max articles to scrape"
                          description="Leave empty for no limit"
                          min={1}
                          classNames={{
                            input: "h-12",
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          type="number"
                          label="Comments per Article"
                          placeholder="Enter max comments per article"
                          description="Leave empty for all comments"
                          min={1}
                          classNames={{
                            input: "h-12",
                          }}
                        />
                        <Select
                          label="Sort Comments By"
                          placeholder="Select sort order"
                          defaultSelectedKeys={["newest"]}
                          classNames={{
                            trigger: "h-12",
                          }}
                        >
                          <SelectItem key="newest" value="newest">
                            Newest First
                          </SelectItem>
                          <SelectItem key="oldest" value="oldest">
                            Oldest First
                          </SelectItem>
                          <SelectItem key="popular" value="popular">
                            Most Popular
                          </SelectItem>
                        </Select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          type="number"
                          label="Days to Look Back"
                          placeholder="Enter number of days"
                          description="Leave empty for no time limit"
                          min={1}
                          classNames={{
                            input: "h-12",
                          }}
                        />
                        <Select
                          label="Comment Depth"
                          placeholder="Select comment depth"
                          defaultSelectedKeys={["all"]}
                          classNames={{
                            trigger: "h-12",
                          }}
                        >
                          <SelectItem key="all" value="all">
                            All Comments & Replies
                          </SelectItem>
                          <SelectItem key="top" value="top">
                            Top-Level Comments Only
                          </SelectItem>
                          <SelectItem key="custom" value="custom">
                            Custom Depth
                          </SelectItem>
                        </Select>
                      </div>
                      <Button color="primary" className="w-full" size="lg">
                        Start Bulk Scraping
                      </Button>
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="text-default-400" />}
                className="flex-1"
              />
              <div className="flex gap-2">
                <Select
                  placeholder="Section"
                  selectedKeys={[selectedSection]}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-40"
                >
                  <SelectItem key="all" value="all">
                    All Sections
                  </SelectItem>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  placeholder="Sort by"
                  selectedKeys={[sortBy]}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-40"
                >
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles
                .filter(
                  (article) =>
                    selectedSection === "all" ||
                    article.section === selectedSection
                )
                .map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onAnalyze={() =>
                      console.log("Analyzing article:", article.id)
                    }
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
