# Comment Crawler - Project Documentation

## Project Overview

Comment Crawler is a sophisticated web application designed to scrape, analyze, and display comments from popular news websites, initially focusing on BBC News. The application provides a structured approach to gathering public discourse data from news articles, with a clean and intuitive user interface.

## Technical Stack

- **Frontend Framework**: Next.js with TypeScript
- **UI Components**: NextUI
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Web Scraping**: Puppeteer
- **Initial News Source**: BBC News

## Core Features

### 1. Comment Scraping System

- **Single Article Scraping**

  - Direct URL input
  - Validation of BBC news URLs
  - Comment extraction from "Have Your Say" sections
  - Progress tracking during scraping

- **Batch Scraping**
  - Multiple article selection
  - Queue management system
  - Concurrent scraping with rate limiting
  - Batch progress monitoring

### 2. Data Collection

Comments will be collected with the following data points:

- Comment text content
- Username/Author
- Timestamp
- Likes/Reactions count
- Reply structure (parent-child relationships)
- Article context (title, URL, category)

## User Interface Design

### 1. Navigation Bar (Fixed Top)

- Logo/App Name
- Current section indicator
- Theme toggle (dark/light)
- Settings icon
- User preferences

### 2. Main Dashboard (Home View)

- Welcome message with quick stats
- Three main action cards:
  1. "Start New Scrape"
  2. "View Previous Scrapes"
  3. "Batch Operations"
- Recent activity timeline
- System status indicator

### 3. Article Selection Interface

#### Direct URL Input Method

- Large URL input field
- Real-time URL validation
- Article preview card showing:
  - Thumbnail
  - Headline
  - Publication date
  - Estimated comment count

#### Browse Articles Method

- Left sidebar with BBC categories
- Article grid/list view
- Per article information:
  - Thumbnail
  - Headline
  - Date
  - Comment count badge
  - Selection checkbox for batch operations
- Filtering options:
  - Date range
  - Category
  - Comment count
  - Sort options

### 4. Scraping Control Center

#### Single Article View

- Article preview header
- Scraping configuration options:
  - Comment depth selection
  - Include replies toggle
  - Sort preferences
- Progress indicators:
  - Circular progress
  - Comments found counter
  - Time remaining
  - Current status

#### Batch Operations View

- Selected articles list
- Batch configuration panel
- Queue management interface
- Global progress bar
- Individual progress cards per article

### 5. Results Interface

#### Comments View

- Threaded conversation layout
- Comment cards containing:
  - User avatar/name
  - Timestamp
  - Comment text
  - Engagement metrics
  - Reply structure
- Infinite scroll implementation
- Right-side filter panel:
  - Keyword search
  - Date filter
  - Sort options
  - Engagement filters

#### Analytics Panel

- Comment volume over time chart
- Engagement metrics visualization
- Top commenters
- Popular discussion topics
- Sentiment distribution

## User Interaction Flow

1. **Initial Entry**

   - Land on dashboard
   - Choose scraping method (direct URL or browse)

2. **Article Selection**

   - If Direct URL:
     - Paste URL
     - Wait for validation
     - View article preview
   - If Browse:
     - Navigate categories
     - Filter articles
     - Select single/multiple articles

3. **Scraping Configuration**

   - Set depth of comments
   - Configure reply inclusion
   - Set sorting preferences
   - Start scraping process

4. **During Scrape**

   - View real-time progress
   - Monitor status updates
   - Handle any errors
   - Option to pause/resume

5. **Results Review**
   - Browse threaded comments
   - Apply filters
   - View analytics
   - Export data if needed

## Technical Considerations

### 1. Rate Limiting

- Implement delays between requests
- Respect BBC's robots.txt
- Handle 429 (Too Many Requests) errors
- Queue system for batch operations

### 2. Error Handling

- Invalid URL detection
- Network error recovery
- Scraping failure recovery
- User-friendly error messages

### 3. Performance Optimization

- Implement pagination
- Lazy loading for comments
- Caching strategy
- Efficient data storage

### 4. Data Management

- Comment storage structure
- Relationship mapping
- Export functionality
- Data cleanup policies

## Future Enhancements

1. Additional news sources support
2. Advanced analytics features
3. Comment sentiment analysis
4. User authentication system
5. Custom scraping rules
6. API access
7. Scheduled scraping
8. Email notifications

## Development Phases

### Phase 1: Core Infrastructure

- [x] Project setup with Next.js
- [x] NextUI integration
- [ ] Basic layout implementation
- [ ] BBC URL validation
- [ ] Simple scraping prototype

### Phase 2: Scraping Engine

- [ ] Puppeteer integration
- [ ] Comment extraction logic
- [ ] Rate limiting implementation
- [ ] Error handling

### Phase 3: User Interface

- [ ] Dashboard implementation
- [ ] Scraping controls
- [ ] Results display
- [ ] Filter system

### Phase 4: Advanced Features

- [ ] Batch operations
- [ ] Analytics
- [ ] Export functionality
- [ ] Performance optimization

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Access the application at `http://localhost:3000`

## Contributing Guidelines

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Submit pull request

## Notes

- Respect website terms of service
- Implement appropriate delays
- Handle rate limiting gracefully
- Document any site structure changes

This documentation will be updated as the project evolves and new features are implemented.
