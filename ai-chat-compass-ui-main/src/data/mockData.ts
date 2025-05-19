
export type UserStatus = 'online' | 'offline' | 'away';

export type ConversationStatus = 'open' | 'closed' | 'pending' | 'assigned';

export type ConversationTag = 'Billing' | 'Bug Report' | 'Feature Request' | 'Question' | 'Urgent' | 'Positive Sentiment';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: UserStatus;
  lastActive: string;
  company?: string;
  plan?: string;
  location?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'admin' | 'system' | 'ai';
  content: string;
  timestamp: string;
  isAiSuggestion?: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  status: ConversationStatus;
  assignedTo?: string;
  tags: ConversationTag[];
  subject: string;
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
  unread: boolean;
}

export interface Admin {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export const mockAdmins: Admin[] = [
  {
    id: 'admin-1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    role: 'Support Lead'
  },
  {
    id: 'admin-2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    role: 'Customer Support'
  },
  {
    id: 'admin-3',
    name: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    role: 'Technical Support'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    status: 'online',
    lastActive: '2 minutes ago',
    company: 'TechCorp Inc.',
    plan: 'Premium',
    location: 'New York, USA'
  },
  {
    id: 'user-2',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    status: 'offline',
    lastActive: '3 hours ago',
    company: 'Marketing Experts',
    plan: 'Basic',
    location: 'London, UK'
  },
  {
    id: 'user-3',
    name: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    status: 'away',
    lastActive: '1 day ago',
    company: 'Design Studio',
    plan: 'Standard',
    location: 'Berlin, Germany'
  },
  {
    id: 'user-4',
    name: 'David Kim',
    email: 'david.kim@example.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    status: 'online',
    lastActive: 'Just now',
    company: 'Startup Labs',
    plan: 'Premium Plus',
    location: 'San Francisco, USA'
  },
  {
    id: 'user-5',
    name: 'Olivia Taylor',
    email: 'olivia.t@example.com',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604',
    status: 'offline',
    lastActive: '5 days ago',
    company: 'Creative Solutions',
    plan: 'Trial',
    location: 'Toronto, Canada'
  }
];

export const mockAiSuggestions: Record<string, string[]> = {
  'conv-1': [
    "I'd be happy to help troubleshoot that error message. Could you please share a screenshot of the exact error you're seeing?",
    "I understand your frustration with the billing error. Let me look into your account right away and get this resolved for you.",
    "That's definitely not the experience we want you to have. I'll make sure our technical team addresses this issue immediately."
  ],
  'conv-2': [
    "I can see you're on our Basic plan. Upgrading to Premium would give you access to the features you're looking for, and I can offer a 15% discount for the first 3 months.",
    "Thank you for your interest in our premium features. I'd be happy to set up a demo call to show you how they work.",
    "I appreciate your question about pricing. Our Premium plan is $29/month, but we do offer annual discounts that bring it down to $24/month."
  ],
  'conv-3': [
    "Great news! The feature you're requesting is actually already available. Go to Settings > Preferences > Advanced to enable it.",
    "I've noted your feature request and submitted it to our product team. This is valuable feedback that helps us improve.",
    "While we don't currently have that specific feature, there's a workaround you might find helpful. Would you like me to explain how it works?"
  ],
  'conv-4': [
    "I'm sorry to hear you're having trouble with the integration. Let's troubleshoot this step by step.",
    "Based on your description, it sounds like there might be an API key issue. Could you verify that your key is still active in your account settings?",
    "Our latest update may have affected some integrations. Let me check if there are any known issues with the specific service you're trying to connect."
  ],
  'conv-5': [
    "Welcome to our platform! I'd be happy to help you get started. What specific aspect would you like to learn about first?",
    "Thank you for signing up! I notice you haven't completed your profile setup yet. Would you like me to guide you through that process?",
    "As a new user, you might find our quick-start guide helpful. I can send you a link to that along with our most popular tutorials."
  ]
};

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    user: mockUsers[0],
    status: 'open',
    assignedTo: 'admin-1',
    tags: ['Billing', 'Urgent'],
    subject: 'Billing Issue',
    lastMessage: "I'm seeing an error when trying to update my payment method",
    lastMessageTime: '5m ago',
    unread: true,
    messages: [
      {
        id: 'msg-1-1',
        sender: 'user',
        content: "Hi there, I'm having a problem with my billing. When I try to update my credit card, I keep getting an error message.",
        timestamp: '2023-05-18T09:30:00Z'
      },
      {
        id: 'msg-1-2',
        sender: 'admin',
        content: "I'm sorry to hear that! Can you tell me what error message you're seeing?",
        timestamp: '2023-05-18T09:35:00Z'
      },
      {
        id: 'msg-1-3',
        sender: 'user',
        content: "It says 'Unable to process payment method. Please try again later.' I've tried multiple times over the past day.",
        timestamp: '2023-05-18T09:37:00Z'
      },
      {
        id: 'msg-1-4',
        sender: 'user',
        content: "I'm seeing an error when trying to update my payment method, and my service is about to be suspended. Can you help ASAP?",
        timestamp: '2023-05-18T09:38:00Z'
      },
      {
        id: 'msg-1-5',
        sender: 'ai',
        content: "I'd be happy to help troubleshoot that error message. Could you please share a screenshot of the exact error you're seeing?",
        timestamp: '2023-05-18T09:39:00Z',
        isAiSuggestion: true
      },
      {
        id: 'msg-1-6',
        sender: 'ai',
        content: "I understand your frustration with the billing error. Let me look into your account right away and get this resolved for you.",
        timestamp: '2023-05-18T09:39:05Z',
        isAiSuggestion: true
      },
      {
        id: 'msg-1-7',
        sender: 'ai',
        content: "That's definitely not the experience we want you to have. I'll make sure our technical team addresses this issue immediately.",
        timestamp: '2023-05-18T09:39:10Z',
        isAiSuggestion: true
      }
    ]
  },
  {
    id: 'conv-2',
    user: mockUsers[1],
    status: 'open',
    tags: ['Feature Request'],
    subject: 'Premium Features',
    lastMessage: "Could you tell me more about your premium plans?",
    lastMessageTime: '30m ago',
    unread: false,
    messages: [
      {
        id: 'msg-2-1',
        sender: 'user',
        content: "Hi, I'm currently on the basic plan but I'm interested in some of the premium features. Could you tell me more about them?",
        timestamp: '2023-05-18T08:00:00Z'
      },
      {
        id: 'msg-2-2',
        sender: 'admin',
        content: "Of course! Our premium plan includes advanced analytics, priority support, and unlimited exports. Was there a specific feature you were interested in?",
        timestamp: '2023-05-18T08:15:00Z'
      },
      {
        id: 'msg-2-3',
        sender: 'user',
        content: "Thanks for the quick response. I'm particularly interested in the advanced analytics. How much more detailed are they compared to the basic plan?",
        timestamp: '2023-05-18T08:30:00Z'
      }
    ]
  },
  {
    id: 'conv-3',
    user: mockUsers[2],
    status: 'pending',
    tags: ['Bug Report', 'Feature Request'],
    subject: 'Feature Not Working',
    lastMessage: "I can't seem to find the export function you mentioned",
    lastMessageTime: '2h ago',
    unread: true,
    messages: [
      {
        id: 'msg-3-1',
        sender: 'user',
        content: "Hello, I'm trying to use the data export feature that was mentioned in your last newsletter, but I can't find it anywhere in the dashboard.",
        timestamp: '2023-05-17T14:00:00Z'
      },
      {
        id: 'msg-3-2',
        sender: 'admin',
        content: "Hi Sophia, thanks for reaching out. The export feature should be available under 'Reports > Data > Export'. Can you check if you see it there?",
        timestamp: '2023-05-17T14:30:00Z'
      },
      {
        id: 'msg-3-3',
        sender: 'user',
        content: "I've looked there, but there's no Export option. I only see 'Save' and 'Share' buttons.",
        timestamp: '2023-05-17T15:00:00Z'
      },
      {
        id: 'msg-3-4',
        sender: 'admin',
        content: "I apologize for the confusion. Could you tell me which subscription plan you're currently on? The export feature is only available on Premium and higher plans.",
        timestamp: '2023-05-17T15:15:00Z'
      },
      {
        id: 'msg-3-5',
        sender: 'user',
        content: "Oh, I see. I'm on the Standard plan. Is there any way to get access to just the export feature without upgrading to Premium? It's the only Premium feature I need.",
        timestamp: '2023-05-17T15:30:00Z'
      }
    ]
  },
  {
    id: 'conv-4',
    user: mockUsers[3],
    status: 'assigned',
    assignedTo: 'admin-2',
    tags: ['Bug Report', 'Urgent'],
    subject: 'Integration Problem',
    lastMessage: "The API integration with Salesforce isn't working",
    lastMessageTime: '1d ago',
    unread: false,
    messages: [
      {
        id: 'msg-4-1',
        sender: 'user',
        content: "Hello support team, we're having an issue with the Salesforce integration. It was working yesterday, but today all of our data sync attempts are failing.",
        timestamp: '2023-05-16T10:00:00Z'
      },
      {
        id: 'msg-4-2',
        sender: 'admin',
        content: "Hi David, I'm sorry to hear about the integration issues. Let me check if there are any known service disruptions. Have you made any changes to your Salesforce configuration recently?",
        timestamp: '2023-05-16T10:15:00Z'
      },
      {
        id: 'msg-4-3',
        sender: 'user',
        content: "No changes on our end. We're getting an authentication error, but our API keys should be valid. This is affecting our entire sales team right now.",
        timestamp: '2023-05-16T10:20:00Z'
      }
    ]
  },
  {
    id: 'conv-5',
    user: mockUsers[4],
    status: 'open',
    tags: ['Question', 'Positive Sentiment'],
    subject: 'Getting Started',
    lastMessage: "Thanks for the quick onboarding information",
    lastMessageTime: '2d ago',
    unread: false,
    messages: [
      {
        id: 'msg-5-1',
        sender: 'user',
        content: "Hi there! I just signed up for your service and I'm excited to get started. Do you have any beginner guides or tutorials you could point me to?",
        timestamp: '2023-05-15T09:00:00Z'
      },
      {
        id: 'msg-5-2',
        sender: 'admin',
        content: "Welcome to our platform, Olivia! We're glad to have you. Yes, we have several resources for new users. Here's a link to our Getting Started guide: https://example.com/getting-started. Is there a specific feature you're most interested in learning about?",
        timestamp: '2023-05-15T09:30:00Z'
      },
      {
        id: 'msg-5-3',
        sender: 'user',
        content: "Thank you for the quick response! I'm particularly interested in setting up the automated reports. I'll check out the guide you sent.",
        timestamp: '2023-05-15T10:00:00Z'
      },
      {
        id: 'msg-5-4',
        sender: 'admin',
        content: "You're welcome! For automated reports, you might want to also check out this specific tutorial: https://example.com/automated-reports. Let me know if you have any questions after reviewing these resources.",
        timestamp: '2023-05-15T10:15:00Z'
      },
      {
        id: 'msg-5-5',
        sender: 'user',
        content: "Perfect, thanks for all your help! I'll go through these materials and reach out if I have any questions.",
        timestamp: '2023-05-15T10:30:00Z'
      }
    ]
  }
];
