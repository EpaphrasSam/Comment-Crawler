'use client'

import { Select, SelectItem, RadioGroup, Radio, Slider, Checkbox } from "@nextui-org/react"
import { Card } from "../shared/Card"

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void
}

export const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="font-medium mb-4">Sort By</h3>
        <RadioGroup defaultValue="recent">
          <Radio value="recent">Most Recent</Radio>
          <Radio value="likes">Most Likes</Radio>
          <Radio value="replies">Most Replies</Radio>
        </RadioGroup>
      </Card>

      <Card>
        <h3 className="font-medium mb-4">Date Range</h3>
        <Select 
          label="Time Period" 
          className="max-w-xs"
          defaultSelectedKeys={["7"]}
        >
          <SelectItem key="1" value="1">Last 24 hours</SelectItem>
          <SelectItem key="7" value="7">Last 7 days</SelectItem>
          <SelectItem key="30" value="30">Last 30 days</SelectItem>
          <SelectItem key="90" value="90">Last 3 months</SelectItem>
          <SelectItem key="all" value="all">All time</SelectItem>
        </Select>
      </Card>

      <Card>
        <h3 className="font-medium mb-4">Engagement Filter</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
              Minimum Likes
            </p>
            <Slider 
              step={1}
              maxValue={100}
              minValue={0}
              defaultValue={0}
              className="max-w-xs"
            />
          </div>
          <div>
            <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
              Minimum Replies
            </p>
            <Slider 
              step={1}
              maxValue={50}
              minValue={0}
              defaultValue={0}
              className="max-w-xs"
            />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-medium mb-4">Display Options</h3>
        <div className="space-y-2">
          <Checkbox defaultSelected>Show replies</Checkbox>
          <Checkbox defaultSelected>Show timestamps</Checkbox>
          <Checkbox defaultSelected>Show engagement metrics</Checkbox>
        </div>
      </Card>
    </div>
  )
}
