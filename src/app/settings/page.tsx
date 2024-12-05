'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/shared/Card'
import { Input, Switch, Button, Divider } from '@nextui-org/react'
import { Save, Bell, Clock, Database, Shield } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoScrape: true,
    dataRetention: '30',
    maxArticles: '1000',
    maxComments: '10000',
    scrapeInterval: '60',
    enableProxy: false,
  })

  const handleChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Button color="primary" startContent={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notifications Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Enable Notifications</p>
                  <p className="text-sm text-secondary-600">
                    Receive alerts for new comments and scraping status
                  </p>
                </div>
                <Switch
                  isSelected={settings.notifications}
                  onValueChange={(value) => handleChange('notifications', value)}
                />
              </div>
            </div>
          </Card>

          {/* Scraping Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Scraping</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Auto Scraping</p>
                  <p className="text-sm text-secondary-600">
                    Automatically scrape new comments
                  </p>
                </div>
                <Switch
                  isSelected={settings.autoScrape}
                  onValueChange={(value) => handleChange('autoScrape', value)}
                />
              </div>
              <Input
                type="number"
                label="Scraping Interval (minutes)"
                value={settings.scrapeInterval}
                onChange={(e) => handleChange('scrapeInterval', e.target.value)}
              />
            </div>
          </Card>

          {/* Data Management */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Data Management</h2>
            </div>
            <div className="space-y-4">
              <Input
                type="number"
                label="Data Retention (days)"
                value={settings.dataRetention}
                onChange={(e) => handleChange('dataRetention', e.target.value)}
              />
              <Input
                type="number"
                label="Maximum Articles"
                value={settings.maxArticles}
                onChange={(e) => handleChange('maxArticles', e.target.value)}
              />
              <Input
                type="number"
                label="Maximum Comments"
                value={settings.maxComments}
                onChange={(e) => handleChange('maxComments', e.target.value)}
              />
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Enable Proxy</p>
                  <p className="text-sm text-secondary-600">
                    Use proxy for web scraping
                  </p>
                </div>
                <Switch
                  isSelected={settings.enableProxy}
                  onValueChange={(value) => handleChange('enableProxy', value)}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
