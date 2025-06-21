// Analytics service for tracking user interactions
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private isInitialized = false;

  init() {
    if (this.isInitialized) return;
    
    // Load Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      this.isInitialized = true;
      console.log('Analytics initialized');
    }
    
    // Load events from localStorage
    this.loadEvents();
  }

  trackEvent(event: Omit<AnalyticsEvent, 'timestamp'>) {
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now()
    };

    this.events.push(fullEvent);
    this.saveEvents();

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });
    }

    console.log('Analytics event:', fullEvent);
  }

  trackPageView(page: string) {
    this.trackEvent({
      event: 'page_view',
      category: 'navigation',
      action: 'page_view',
      label: page
    });
  }

  trackContactForm() {
    this.trackEvent({
      event: 'contact_form',
      category: 'engagement',
      action: 'contact_form_submit',
      label: 'contact_form'
    });
  }

  trackProjectView(projectName: string) {
    this.trackEvent({
      event: 'project_view',
      category: 'engagement',
      action: 'project_view',
      label: projectName
    });
  }

  trackDownloadResume() {
    this.trackEvent({
      event: 'resume_download',
      category: 'engagement',
      action: 'resume_download',
      label: 'resume'
    });
  }

  trackGameScore(score: number) {
    this.trackEvent({
      event: 'game_score',
      category: 'game',
      action: 'score_achieved',
      value: score
    });
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  getEventCount(): number {
    return this.events.length;
  }

  private saveEvents() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('portfolio_analytics', JSON.stringify(this.events));
      } catch (error) {
        console.error('Failed to save analytics events:', error);
      }
    }
  }

  private loadEvents() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio_analytics');
        if (saved) {
          this.events = JSON.parse(saved);
        }
      } catch (error) {
        console.error('Failed to load analytics events:', error);
      }
    }
  }

  clearEvents() {
    this.events = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('portfolio_analytics');
    }
  }
}

// Global analytics instance
export const analytics = new AnalyticsService();

// Initialize analytics on app start
if (typeof window !== 'undefined') {
  analytics.init();
}

// Declare global gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
} 