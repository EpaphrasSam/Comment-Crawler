'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/shared/Card'
import { Input, Button, Switch, Select, SelectItem, Chip } from '@nextui-org/react'
import { Plus, Filter, Trash2 } from 'lucide-react'
import { faker } from '@faker-js/faker'
import { useState } from 'react'

// Generate mock filters
const generateMockFilters = (count: number) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement([
      'Spam Filter',
      'Offensive Content',
      'Low Quality',
      'Bot Detection',
      'Language Filter',
    ]),
    type: faker.helpers.arrayElement(['keyword', 'regex', 'sentiment', 'length']),
    condition: faker.helpers.arrayElement(['contains', 'matches', 'exceeds', 'below']),
    value: faker.lorem.words(2),
    isActive: faker.datatype.boolean(),
    matchCount: faker.number.int({ min: 0, max: 1000 }),
  }))
}

const FilterCard = ({ filter, onDelete }: { 
  filter: ReturnType<typeof generateMockFilters>[0],
  onDelete: (id: string) => void 
}) => {
  const [isActive, setIsActive] = useState(filter.isActive)

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{filter.name}</h3>
          <div className="flex gap-2 mt-1">
            <Chip size="sm" variant="flat">{filter.type}</Chip>
            <Chip size="sm" variant="flat">{filter.condition}</Chip>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            size="sm"
            isSelected={isActive}
            onValueChange={setIsActive}
          />
          <Button
            isIconOnly
            color="danger"
            variant="light"
            size="sm"
            onClick={() => onDelete(filter.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
        Value: {filter.value}
      </p>

      <div className="text-xs text-secondary-600">
        Matched {filter.matchCount} comments
      </div>
    </Card>
  )
}

export default function FiltersPage() {
  const [filters, setFilters] = useState(generateMockFilters(6))
  const [showNewFilter, setShowNewFilter] = useState(false)

  const handleDeleteFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Comment Filters</h1>
          <Button 
            color="primary" 
            startContent={<Plus className="w-4 h-4" />}
            onClick={() => setShowNewFilter(true)}
          >
            Add Filter
          </Button>
        </div>

        {showNewFilter && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">New Filter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Filter Name"
                placeholder="Enter filter name"
              />
              <Select
                label="Filter Type"
                placeholder="Select filter type"
              >
                <SelectItem key="keyword">Keyword</SelectItem>
                <SelectItem key="regex">Regular Expression</SelectItem>
                <SelectItem key="sentiment">Sentiment Analysis</SelectItem>
                <SelectItem key="length">Comment Length</SelectItem>
              </Select>
              <Select
                label="Condition"
                placeholder="Select condition"
              >
                <SelectItem key="contains">Contains</SelectItem>
                <SelectItem key="matches">Matches</SelectItem>
                <SelectItem key="exceeds">Exceeds</SelectItem>
                <SelectItem key="below">Below</SelectItem>
              </Select>
              <Input
                label="Value"
                placeholder="Enter filter value"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                variant="flat" 
                onClick={() => setShowNewFilter(false)}
              >
                Cancel
              </Button>
              <Button 
                color="primary"
                startContent={<Filter className="w-4 h-4" />}
              >
                Create Filter
              </Button>
            </div>
          </Card>
        )}

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filters.map((filter) => (
            <FilterCard 
              key={filter.id} 
              filter={filter} 
              onDelete={handleDeleteFilter}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
