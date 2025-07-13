name: "Grocery List Web Application - Complete Feature Implementation"
description: |

## Goal
Build a complete collaborative grocery list web application with real-time synchronization, social authentication (Google, Facebook, Apple), and advanced UI features including virtualized item lists and sharing capabilities.

## Why
- **User Value**: Provide families and households with a modern, collaborative grocery shopping experience
- **Technical Foundation**: Leverage existing SvelteKit + Express TypeScript infrastructure
- **Business Impact**: Create a production-ready application with real-time collaboration features
- **Future Ready**: Design API structure to support future mobile app development
- **Integration**: Build on existing project patterns and testing infrastructure

## What
Implement comprehensive grocery list management system with:

### Core Features
- **Multi-list Management**: Users can create, name, and organize multiple grocery lists
- **Real-time Collaboration**: Share lists with read-only or editable permissions
- **Smart Item Entry**: Text input with category filtering and historical item suggestions
- **Social Authentication**: Support for Google, Facebook, and Apple OAuth
- **Performance Optimization**: Virtualized lists for handling large item histories
- **Item History**: Persistent item database with cross-list editing capabilities

### Success Criteria
- [ ] Users can authenticate with Google, Facebook, or Apple
- [ ] Users can create and manage multiple named grocery lists
- [ ] Real-time synchronization works across multiple browser sessions
- [ ] Item entry interface performs smoothly with 1000+ historical items
- [ ] List sharing works with proper permission controls
- [ ] All features work responsively on mobile and desktop
- [ ] Comprehensive test coverage (unit + e2e) with >90% coverage
- [ ] Performance: Initial page load <2s, item search results <100ms

## All Needed Context

### Documentation & References
```yaml
# AUTHENTICATION - Critical for multi-provider OAuth implementation
- url: https://authjs.dev/reference/sveltekit
  why: Official SvelteKit Auth.js integration with Google/Facebook/Apple OAuth support
  critical: Built-in CSRF protection and secure session management

- url: https://dev.to/varsilias/complete-guide-to-implementing-apple-oauth-20sign-in-with-apple-authentication-in-a-nodeexpress-application-4hf
  why: Apple OAuth requires special JWT handling and key generation
  critical: Apple-specific implementation details for Node.js/Express

- url: https://www.passportjs.org/
  why: Backend OAuth strategies for passport-google-oauth20, passport-facebook, passport-apple
  critical: Standardized OAuth flow handling with Express.js

# REAL-TIME COLLABORATION - Essential for shared list functionality
- url: https://socket.io/docs/v4/
  why: WebSocket implementation with automatic fallback to HTTP long-polling
  critical: Built-in room/namespace support perfect for list sharing

- url: https://medium.com/@biz_41031/implementing-real-time-data-sync-with-websockets-building-collaborative-apps-9a77eee7700a
  why: Conflict resolution and synchronization patterns for collaborative apps
  critical: Operational Transformation algorithms for concurrent editing

# PERFORMANCE - Virtualized lists for large item histories
- url: https://github.com/sveltejs/svelte-virtual-list
  why: Official @sveltejs/svelte-virtual-list component for known item heights
  critical: Renders only visible items, essential for 1000+ item performance

- url: https://github.com/v1ack/svelte-virtual-scroll-list
  why: Dynamic item height support with bi-directional scrolling
  critical: Better for variable content sizes in item descriptions

# DATABASE DESIGN - Schema patterns for collaborative lists
- url: https://softwareengineering.stackexchange.com/questions/261269/database-schema-for-a-todo-list
  why: Detailed table relationships and collaboration patterns
  critical: Many-to-many relationships for user permissions and list sharing

# API DESIGN - REST patterns for list management
- url: https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
  why: Collection pattern for list management with proper HTTP verbs
  critical: Resource naming and error handling standards

# EXISTING CODEBASE PATTERNS - Follow project conventions
- file: backend/src/index.ts
  why: Express.js setup with CORS configuration pattern
  critical: Existing middleware patterns and port configuration

- file: frontend/src/routes/+page.svelte
  why: SvelteKit page component structure
  critical: Component organization and TypeScript integration

- file: backend/src/tests/demo.spec.ts
  why: Vitest testing patterns for backend
  critical: describe/it structure with expect assertions

- file: frontend/src/demo.spec.ts
  why: Frontend unit testing patterns
  critical: Vitest configuration for SvelteKit components

- file: frontend/package.json
  why: Available scripts for linting, testing, formatting
  critical: npm run lint/test/format commands for validation

- file: backend/package.json
  why: Backend dependencies and available scripts
  critical: Express.js and TypeScript build configuration
```

### Current Codebase Tree
```bash
grocery-list/
├── backend/src/
│   ├── index.ts                    # Express server with CORS setup
│   └── tests/demo.spec.ts          # Vitest testing pattern
├── frontend/src/
│   ├── routes/+page.svelte         # SvelteKit page component
│   ├── lib/index.ts                # Shared library code location
│   ├── app.html                    # HTML template
│   └── demo.spec.ts                # Frontend unit testing
├── PRPs/templates/prp_base.md      # PRP template structure
├── CLAUDE.md                       # Project instructions and constraints
└── features/grocery_list_features.md # Complete feature requirements
```

### Desired Codebase Tree After Implementation
```bash
grocery-list/
├── backend/src/
│   ├── index.ts                    # Main Express server
│   ├── config/
│   │   ├── database.ts             # Database connection and config
│   │   └── auth.ts                 # OAuth provider configuration
│   ├── models/
│   │   ├── User.ts                 # User data model and validation
│   │   ├── List.ts                 # List data model and operations
│   │   ├── Item.ts                 # Item data model and history
│   │   └── Category.ts             # Category management
│   ├── routes/
│   │   ├── auth.ts                 # OAuth authentication endpoints
│   │   ├── lists.ts                # List CRUD and sharing operations
│   │   ├── items.ts                # Item management and history
│   │   └── users.ts                # User profile and preferences
│   ├── middleware/
│   │   ├── auth.ts                 # Authentication middleware
│   │   └── validation.ts           # Request validation
│   ├── sockets/
│   │   └── collaboration.ts        # Real-time WebSocket handlers
│   └── tests/
│       ├── auth.spec.ts            # Authentication testing
│       ├── lists.spec.ts           # List operations testing
│       ├── items.spec.ts           # Item management testing
│       └── sockets.spec.ts         # Real-time collaboration testing
├── frontend/src/
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── providers.ts        # OAuth provider configurations
│   │   │   └── session.ts          # Session management utilities
│   │   ├── api/
│   │   │   ├── client.ts           # API client with auth headers
│   │   │   ├── lists.ts            # List API operations
│   │   │   └── items.ts            # Item API operations
│   │   ├── stores/
│   │   │   ├── auth.ts             # Authentication Svelte store
│   │   │   ├── lists.ts            # Lists state management
│   │   │   ├── items.ts            # Items and history state
│   │   │   └── socket.ts           # Real-time connection store
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── LoginButtons.svelte # OAuth login interface
│   │   │   ├── lists/
│   │   │   │   ├── ListCard.svelte     # Individual list display
│   │   │   │   ├── ListSelector.svelte # List switching interface
│   │   │   │   └── ShareDialog.svelte  # List sharing modal
│   │   │   ├── items/
│   │   │   │   ├── ItemEntry.svelte        # Smart item input with autocomplete
│   │   │   │   ├── ItemList.svelte         # Virtualized item display
│   │   │   │   ├── ItemCard.svelte         # Individual item component
│   │   │   │   └── CategorySelector.svelte # Category dropdown
│   │   │   └── ui/
│   │   │       ├── VirtualList.svelte      # Reusable virtual list component
│   │   │       └── Modal.svelte            # Modal dialog component
│   │   └── utils/
│   │       ├── validation.ts       # Client-side validation rules
│   │       └── formatting.ts       # Display formatting utilities
│   ├── routes/
│   │   ├── +layout.svelte          # App layout with auth check
│   │   ├── +page.svelte            # Main grocery list interface
│   │   ├── auth/
│   │   │   └── +page.svelte        # Authentication page
│   │   ├── lists/
│   │   │   ├── +page.svelte        # All lists view
│   │   │   └── [id]/+page.svelte   # Individual list view
│   │   └── history/
│   │       └── +page.svelte        # Item history management
│   └── tests/
│       ├── auth.spec.ts            # Authentication flow testing
│       ├── lists.spec.ts           # List management testing
│       ├── items.spec.ts           # Item operations testing
│       └── collaboration.spec.ts   # Real-time features testing
```

### Known Gotchas & Library Quirks

**Apple OAuth Specific:**
- Requires RSA private key generation and JWT signing
- Client secret is generated dynamically, not static
- Returns different user data format than Google/Facebook

**Socket.io with SvelteKit:**
- Requires polling transport configuration for development
- Must handle connection state in Svelte stores properly
- Room-based updates for list-specific synchronization

**Svelte Virtual Lists:**
- Known item heights perform better than dynamic sizing
- Requires proper key handling for item identity
- May need custom implementation for complex item layouts

**Express.js Authentication:**
- Session security requires proper cookie configuration
- CORS must allow credentials for authenticated requests
- OAuth callback URLs must match provider configuration exactly

**Database Considerations:**
- Foreign key constraints critical for data integrity
- Indexing required on list_id and user_id for performance
- Soft deletes recommended for item history preservation

## Implementation Blueprint

### Data Models and Structure

```typescript
// Core data models ensuring type safety and consistency

// User model with multiple auth providers
interface User {
  id: string;
  email: string;
  name: string;
  auth_providers: AuthProvider[];
  created_at: Date;
  last_active: Date;
}

// List model with ownership and sharing
interface List {
  id: string;
  name: string;
  owner_id: string;
  is_current: boolean;
  created_at: Date;
  updated_at: Date;
  shares: ListShare[];
}

// Item model with history tracking
interface Item {
  id: string;
  name: string;
  category_id: string;
  created_by: string;
  created_at: Date;
  usage_count: number;
}

// List-specific item instance
interface ListItem {
  list_id: string;
  item_id: string;
  quantity: string;
  size: string;
  completed: boolean;
  position: number;
  added_at: Date;
}
```

### Database Schema Design

```sql
-- Users table with email-based identity
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP DEFAULT NOW()
);

-- Authentication providers per user
CREATE TABLE auth_providers (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL, -- 'google', 'facebook', 'apple'
  provider_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id, provider)
);

-- Lists with ownership
CREATE TABLE lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories per user
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Items in user's history
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES categories(id),
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  usage_count INTEGER DEFAULT 0
);

-- Items in specific lists
CREATE TABLE list_items (
  list_id UUID REFERENCES lists(id) ON DELETE CASCADE,
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  quantity VARCHAR(50),
  size VARCHAR(50),
  completed BOOLEAN DEFAULT FALSE,
  position INTEGER NOT NULL,
  added_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (list_id, item_id)
);

-- List sharing permissions
CREATE TABLE list_shares (
  list_id UUID REFERENCES lists(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  permission VARCHAR(20) NOT NULL, -- 'read' or 'write'
  shared_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (list_id, user_id)
);

-- Indexes for performance
CREATE INDEX idx_lists_owner ON lists(owner_id);
CREATE INDEX idx_list_items_list ON list_items(list_id);
CREATE INDEX idx_items_user ON items(created_by);
CREATE INDEX idx_categories_user ON categories(user_id);
```

### Tasks in Implementation Order

```yaml
Task 1 - Database Setup and Models:
  CREATE backend/src/config/database.ts:
    - Database connection configuration
    - Migration setup for tables above
    - Connection pooling and error handling
  
  CREATE backend/src/models/ directory with TypeScript models:
    - User.ts: User operations and validation
    - List.ts: List CRUD with ownership checks
    - Item.ts: Item history and search functionality
    - Category.ts: Category management per user
    - PATTERN: Follow existing backend/src/index.ts structure

Task 2 - Authentication Backend:
  MODIFY backend/src/index.ts:
    - INJECT passport.js middleware configuration
    - ADD session management with secure cookies
    - PRESERVE existing CORS configuration
  
  CREATE backend/src/config/auth.ts:
    - OAuth provider configurations (Google, Facebook, Apple)
    - JWT secret management and Apple key handling
    - CRITICAL: Apple requires RSA private key generation
  
  CREATE backend/src/routes/auth.ts:
    - OAuth callback endpoints for all three providers
    - User registration/login flow
    - Session management endpoints

Task 3 - Core API Routes:
  CREATE backend/src/routes/lists.ts:
    - GET /api/lists: User's lists with sharing status
    - POST /api/lists: Create new list
    - PUT /api/lists/:id: Update list name
    - DELETE /api/lists/:id: Delete list (ownership check)
    - POST /api/lists/:id/share: Share list with user
  
  CREATE backend/src/routes/items.ts:
    - GET /api/items/history: User's item history with search
    - POST /api/lists/:id/items: Add item to list
    - PUT /api/lists/:id/items/:itemId: Update list item
    - DELETE /api/lists/:id/items/:itemId: Remove from list
    - PATTERN: RESTful design following research URL patterns

Task 4 - Real-time Collaboration:
  ADD socket.io dependency to backend/package.json
  
  CREATE backend/src/sockets/collaboration.ts:
    - Socket.io server setup with room-based list updates
    - Real-time item addition/completion notifications
    - User presence indicators for shared lists
    - PATTERN: Use rooms for list-specific updates
  
  MODIFY backend/src/index.ts:
    - INJECT Socket.io server initialization
    - PRESERVE existing Express configuration

Task 5 - Frontend Authentication:
  ADD Auth.js to frontend dependencies
  
  CREATE frontend/src/lib/auth/providers.ts:
    - Auth.js provider configurations for Google/Facebook/Apple
    - Environment variable handling for OAuth keys
    - Session management utilities
  
  CREATE frontend/src/lib/stores/auth.ts:
    - Svelte store for authentication state
    - Login/logout functions
    - User profile management
  
  CREATE frontend/src/components/auth/LoginButtons.svelte:
    - OAuth login buttons for all three providers
    - Loading states and error handling
    - PATTERN: Follow existing Svelte component structure

Task 6 - Core Frontend Components:
  CREATE frontend/src/lib/api/client.ts:
    - API client with authentication headers
    - Error handling and retry logic
    - Base URL configuration
  
  CREATE frontend/src/lib/stores/lists.ts:
    - Svelte store for lists state
    - CRUD operations with API integration
    - Current list management
  
  CREATE frontend/src/components/lists/ListCard.svelte:
    - Individual list display component
    - Share button and ownership indicators
    - MIRROR pattern from existing +page.svelte structure

Task 7 - Smart Item Entry Interface:
  CREATE frontend/src/components/items/ItemEntry.svelte:
    - Text input with real-time filtering
    - Category dropdown with user's categories
    - Historical item suggestions below input
    - CRITICAL: Debounced search for performance
  
  CREATE frontend/src/components/items/CategorySelector.svelte:
    - Dropdown with existing categories
    - "Create new category" option
    - Usage frequency sorting

Task 8 - Virtualized Item Display:
  ADD @sveltejs/svelte-virtual-list to frontend dependencies
  
  CREATE frontend/src/components/items/ItemList.svelte:
    - Virtual list implementation for item history
    - Search filtering and category filtering
    - PATTERN: Use official Svelte virtual list component
    - CRITICAL: Known item heights for performance
  
  CREATE frontend/src/components/items/ItemCard.svelte:
    - Individual item display with checkbox
    - Quantity/size editing
    - Cross-out styling for completed items

Task 9 - Real-time Frontend Integration:
  ADD socket.io-client to frontend dependencies
  
  CREATE frontend/src/lib/stores/socket.ts:
    - Socket.io connection management
    - Room joining for list subscriptions
    - Real-time event handling
  
  MODIFY frontend/src/components/items/ItemList.svelte:
    - INJECT real-time update handlers
    - PRESERVE existing virtualization
    - Handle concurrent editing conflicts

Task 10 - List Sharing Interface:
  CREATE frontend/src/components/lists/ShareDialog.svelte:
    - Modal dialog for sharing lists
    - Email input with permission level selection
    - Current shares display with revoke options
  
  CREATE frontend/src/routes/lists/+page.svelte:
    - All lists view with sorting options
    - Share status indicators
    - List access controls

Task 11 - Complete Testing Suite:
  CREATE backend/src/tests/auth.spec.ts:
    - OAuth flow testing with mocked providers
    - Session management validation
    - Error handling for invalid tokens
  
  CREATE backend/src/tests/lists.spec.ts:
    - List CRUD operations testing
    - Sharing permission validation
    - Ownership checks for all operations
  
  CREATE frontend/src/tests/collaboration.spec.ts:
    - Real-time synchronization testing
    - Conflict resolution validation
    - Socket connection handling

Task 12 - Performance Optimization:
  MODIFY frontend/src/components/items/ItemEntry.svelte:
    - IMPLEMENT debounced search (300ms delay)
    - OPTIMIZE category filtering algorithm
    - ADD loading states for search results
  
  CREATE frontend/src/lib/utils/performance.ts:
    - Debounce utility functions
    - Search optimization helpers
    - Caching for frequently accessed items
```

### Per Task Pseudocode

```typescript
// Task 1: Database Models Example
// backend/src/models/List.ts
export class ListModel {
  // PATTERN: Always validate ownership first
  static async getUserLists(userId: string): Promise<List[]> {
    // CRITICAL: Include sharing permissions in query
    const query = `
      SELECT l.*, ls.permission 
      FROM lists l 
      LEFT JOIN list_shares ls ON l.id = ls.list_id 
      WHERE l.owner_id = ? OR ls.user_id = ?
    `;
    return db.query(query, [userId, userId]);
  }

  // GOTCHA: Check ownership before any modifications
  static async updateList(listId: string, userId: string, data: UpdateData) {
    const ownership = await this.checkOwnership(listId, userId);
    if (!ownership) throw new UnauthorizedError();
    // ... update logic
  }
}

// Task 5: Frontend Auth Store Example
// frontend/src/lib/stores/auth.ts
export const auth = writable<AuthState>({
  user: null,
  loading: true,
  error: null
});

// PATTERN: Handle all three OAuth providers consistently
export async function loginWithProvider(provider: 'google' | 'facebook' | 'apple') {
  try {
    auth.update(state => ({ ...state, loading: true }));
    // CRITICAL: Use Auth.js signIn with proper redirect
    const result = await signIn(provider, { redirect: false });
    if (result?.error) throw new Error(result.error);
  } catch (error) {
    auth.update(state => ({ ...state, error: error.message, loading: false }));
  }
}

// Task 7: Smart Item Entry Example
// frontend/src/components/items/ItemEntry.svelte
<script lang="ts">
  // PATTERN: Debounced search for performance
  let searchTerm = '';
  let filteredItems: Item[] = [];
  
  // CRITICAL: 300ms debounce prevents excessive API calls
  $: debouncedSearch = debounce(() => {
    if (searchTerm.length > 2) {
      searchItems(searchTerm, selectedCategory);
    }
  }, 300);
  
  // GOTCHA: Must handle both existing and new item creation
  function handleItemSelect(item: Item | string) {
    if (typeof item === 'string') {
      // Create new item
      createAndAddItem(item, selectedCategory);
    } else {
      // Add existing item
      addExistingItem(item);
    }
  }
</script>
```

### Integration Points

```yaml
DATABASE:
  - connection: "PostgreSQL with connection pooling"
  - migrations: "Add tables in order: users, auth_providers, lists, categories, items, list_items, list_shares"
  - indexes: "Critical for list_id, user_id, and search performance"

AUTHENTICATION:
  - sessions: "Secure HTTP-only cookies with CSRF protection"
  - OAuth: "Callback URLs must match provider configuration"
  - security: "Rate limiting on auth endpoints"

REAL-TIME:
  - transport: "WebSocket with Socket.io rooms for list isolation"
  - fallback: "HTTP long-polling for network restrictions"
  - conflict: "Last-write-wins with timestamp comparison"

PERFORMANCE:
  - virtualization: "Only render visible items in large lists"
  - search: "Debounced input with backend caching"
  - caching: "Browser storage for frequently accessed items"
```

## Validation Loop

### Level 1: Syntax & Style
```bash
# Backend validation - MUST pass before proceeding
npm --prefix backend run lint
npm --prefix backend run build

# Expected: No errors. If errors:
npm --prefix backend run format

# Frontend validation - MUST pass before proceeding  
npm --prefix frontend run lint
npm --prefix frontend run check

# Expected: No errors. If errors:
npm --prefix frontend run format
```

### Level 2: Unit Tests for Each Feature
```typescript
// backend/src/tests/lists.spec.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { ListModel } from '../models/List.js';

describe('List Management', () => {
  beforeEach(async () => {
    // Reset test database
    await setupTestDatabase();
  });

  it('creates list with proper ownership', async () => {
    const userId = 'test-user-id';
    const list = await ListModel.create({ name: 'Test List', owner_id: userId });
    expect(list.owner_id).toBe(userId);
    expect(list.name).toBe('Test List');
  });

  it('prevents unauthorized list access', async () => {
    const list = await ListModel.create({ name: 'Private List', owner_id: 'owner-id' });
    await expect(
      ListModel.updateList(list.id, 'different-user-id', { name: 'Hacked' })
    ).rejects.toThrow('Unauthorized');
  });

  it('handles list sharing permissions correctly', async () => {
    const list = await ListModel.create({ name: 'Shared List', owner_id: 'owner-id' });
    await ListModel.shareList(list.id, 'friend-id', 'read');
    
    const friendLists = await ListModel.getUserLists('friend-id');
    expect(friendLists).toContainEqual(expect.objectContaining({
      id: list.id,
      permission: 'read'
    }));
  });
});
```

```bash
# Run tests and iterate until passing:
npm --prefix backend run test
npm --prefix frontend run test

# E2E tests for critical user flows:
npm --prefix frontend run test:e2e

# CRITICAL: Never mock or delete tests to pass - fix the underlying issue
```

### Level 3: Integration Testing
```bash
# Test authentication flow:
curl -X POST http://localhost:3000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"code": "test_oauth_code"}'

# Expected: Valid session cookie and user data

# Test real-time collaboration:
# Open two browser sessions, modify list in one, verify update in other
# Expected: <100ms update propagation

# Test virtualized list performance:
# Load 1000+ items, measure render time
# Expected: Initial render <500ms, scroll smooth at 60fps
```

## Final Validation Checklist
- [ ] All unit tests pass with >90% coverage
- [ ] All linting rules pass with no warnings
- [ ] Authentication works for all three providers (Google, Facebook, Apple)
- [ ] Real-time synchronization works across browser sessions
- [ ] Virtualized lists handle 1000+ items smoothly
- [ ] List sharing permissions enforced correctly
- [ ] API endpoints follow RESTful conventions
- [ ] Error handling provides meaningful user feedback
- [ ] Mobile responsive design works on common screen sizes
- [ ] No sensitive data logged or exposed in client code

---

## Anti-Patterns to Avoid
- ❌ Don't implement OAuth from scratch - use Auth.js/Passport.js
- ❌ Don't render all items in DOM - use virtualization for performance
- ❌ Don't allow SQL injection - use parameterized queries
- ❌ Don't store OAuth tokens in localStorage - use secure HTTP-only cookies
- ❌ Don't skip ownership checks on API endpoints
- ❌ Don't implement real-time with polling - use WebSockets
- ❌ Don't hardcode API URLs - use environment configuration
- ❌ Don't ignore rate limiting on search endpoints
- ❌ Don't trust client-side validation alone - validate on backend
- ❌ Don't expose internal error details to frontend users

## Implementation Confidence Score: 8/10

**Reasoning for High Score:**
- Comprehensive research with specific implementation URLs
- Detailed task breakdown with order dependencies
- Existing project structure provides solid foundation
- All necessary libraries and patterns identified
- Complete validation loops with executable tests
- Real-world implementation examples referenced
- Performance considerations built into design

**Risk Mitigation:**
- Apple OAuth complexity addressed with specific implementation guide
- Real-time collaboration patterns well-researched
- Virtualization performance requirements specified
- Database schema designed for scalability
- Security considerations integrated throughout