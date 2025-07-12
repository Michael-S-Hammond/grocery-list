name: "Base PRP Template v2 - Context-Rich with Validation Loops"
description: |

## Purpose
Template optimized for AI agents to implement features with sufficient context and self-validation capabilities to achieve working code through iterative refinement.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md

---

## Goal
[What needs to be built - be specific about the end state and desires]

## Why
- [Business value and user impact]
- [Integration with existing features]
- [Problems this solves and for whom]

## What
[User-visible behavior and technical requirements]

### Success Criteria
- [ ] [Specific measurable outcomes]

## All Needed Context

### Documentation & References (list all context needed to implement the feature)
```yaml
# MUST READ - Include these in your context window
- url: [Official API docs URL]
  why: [Specific sections/methods you'll need]
  
- file: [path/to/example.py]
  why: [Pattern to follow, gotchas to avoid]
  
- doc: [Library documentation URL] 
  section: [Specific section about common pitfalls]
  critical: [Key insight that prevents common errors]

- docfile: [PRPs/ai_docs/file.md]
  why: [docs that the user has pasted in to the project]

```

### Current Codebase tree (run `tree` in the root of the project) to get an overview of the codebase
```bash

```

### Desired Codebase tree with files to be added and responsibility of file
```bash

```

### Known Gotchas of our codebase & Library Quirks

## Implementation Blueprint

### Data models and structure

Create the core data models, we ensure type safety and consistency.

```

### list of tasks to be completed to fullfill the PRP in the order they should be completed

```yaml
Task 1:
MODIFY src/ExistingFile.swift:
  - FIND pattern: "class OldImplementation {"
  - INJECT after line containing "func myFunction() {"
  - PRESERVE existing method signatures

CREATE src/NewFile.swift:
  - MIRROR pattern from: src/SimilarFile.swift
  - MODIFY class name and core logic
  - KEEP error handling pattern identical

...(...)

Task N:
...

```


### Per task pseudocode as needed added to each task
```swift

# Task 1
# Pseudocode with CRITICAL details dont write entire code
func NewFeature(param: String) async -> SampleResult? {
    // PATTERN: Always validate input first (see src/Validators.swift)
    // Raises validation error
    guard let validated = validateInput(param: param) else {
        return nil
    }
    
    // GOTCHA: This library requires connection pooling
    let task = Task {
        // PATTERN: Use retry decorator function
         let apiResult = retry(attempts: 3, backoff: Exponential) {
             // CRITICAL: API returns 429 if >10 req/sec
             return externalApiCall(param: validated)
        }
    }
    
    // PATTERN: Standard task error handling
    do {
        return try await task.value
    } catch {
        // PATTERN: Log errors
        Log.error(message: "API call failed: \(error)")
    }
}
```

### Integration Points
```yaml
DATABASE:
  - migration: "Add column 'feature_enabled' to users table"
  - index: "CREATE INDEX idx_feature_lookup ON users(feature_id)"
```

## Validation Loop

### Level 1: Syntax & Style
```bash
# Run these FIRST - fix any errors before proceeding
swiftlint analyze src --fix --format # Auto-fix what's possible

# Expected: No errors. If errors, READ the error and fix.
```

### Level 2: Unit Tests each new feature/file/function use existing test patterns
```swift
// CREATE TestNewFeature.swift with these test cases:
import Testing
@testable import Examples

struct ExamplesTests {
    @Test func testHappyPath() async throws {
        // Basic functionality works
        let result = testableFunction(value: "valid_input")
        #expect(result == "expected")
    }

    @Test func testValidationError() async throws {
        // Invalid input raises validation error
        let result = testableFunction(value: "invalid_input")
        #expect(result == "expected")
    }
}
```

```bash
# Run and iterate until passing:
xcodebuild \
  -project MyAwesomeApp.xcodeproj \
  -scheme MyAwesomeApp \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 12,OS=14.3' \
  test
  
  # If failing: Read error, understand root cause, fix code, re-run (never mock to pass)
```

## Final validation Checklist
- [ ] All tests pass:
- [ ] No linting errors:
- [ ] Manual test successful: [specific curl/command]
- [ ] Error cases handled gracefully
- [ ] Logs are informative but not verbose
- [ ] Documentation updated if needed

---

## Anti-Patterns to Avoid
- ❌ Don't create new patterns when existing ones work
- ❌ Don't skip validation because "it should work"  
- ❌ Don't ignore failing tests - fix them
- ❌ Don't use sync functions in async context
- ❌ Don't hardcode values that should be config
- ❌ Don't catch all exceptions - be specific