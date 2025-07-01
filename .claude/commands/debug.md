# Advanced Debug Plan Generator

**Purpose**: Systematic bug reproduction, isolation, and resolution with structured debug plans

---

@include shared/universal-constants.yml#Universal_Legend

## Command Execution

Execute: immediate. --plan→show plan first
Legend: Generated based on symbols used in command
Purpose: "[Action][Subject] in $ARGUMENTS"

Generate comprehensive debug plans in `.claude/debug/` for systematic bug investigation and resolution.

@include shared/flag-inheritance.yml#Universal_Always

Examples:

- `/debug --reproduce` - Create bug reproduction plan
- `/debug --isolate --think-hard` - Deep root cause analysis
- `/debug --fix --iterate` - Iterative solution development
- `/debug --prevent --ultrathink` - Prevention strategy

## Debug Plan Structure

All debug plans are created in `.claude/debug/` with this structure:

```
.claude/debug/
├── YYYY-MM-DD-issue-name/
│   ├── 01-reproduction.md      # Reproduction steps & environment
│   ├── 02-investigation.md     # Investigation log & findings
│   ├── 03-hypothesis.md        # Root cause hypotheses
│   ├── 04-isolation.md         # Issue isolation results
│   ├── 05-solution.md          # Solution approaches
│   ├── 06-verification.md      # Fix verification plan
│   ├── 07-prevention.md        # Prevention measures
│   ├── artifacts/              # Screenshots, logs, traces
│   │   ├── error-logs/
│   │   ├── stack-traces/
│   │   └── test-cases/
│   └── debug-summary.md        # Executive summary
```

## Command-Specific Flags

--reproduce: "Create detailed reproduction protocol"
--isolate: "Systematic issue isolation plan"
--analyze: "Deep root cause analysis"
--fix: "Solution development strategy"
--verify: "Comprehensive verification plan"
--prevent: "Future prevention measures"
--monitor: "Post-fix monitoring setup"
--trace: "Execution trace collection"
--profile: "Performance profiling plan"
--compare: "Working vs broken comparison"

## Debug Workflow Phases

### Phase 1: Reproduction Protocol

**File: 01-reproduction.md**

````markdown
# Bug Reproduction Protocol

## Environment Setup

- [ ] OS: [Exact version]
- [ ] Runtime: [Language/version]
- [ ] Dependencies: [List with versions]
- [ ] Configuration: [Relevant settings]

## Reproduction Steps

1. **Setup**: [Initial state]
2. **Trigger**: [Exact actions]
3. **Expected**: [What should happen]
4. **Actual**: [What happens]
5. **Frequency**: [Always/Sometimes/Conditions]

## Minimal Reproduction

```[language]
// Smallest code that reproduces issue
```
````

## Test Case

```[language]
// Automated test that demonstrates bug
```

````

### Phase 2: Investigation Plan

**File: 02-investigation.md**

```markdown
# Investigation Log

## Investigation Strategy
1. **Scope Definition**: [Affected components]
2. **Data Collection**: [What to gather]
3. **Tool Selection**: [Debuggers/profilers needed]
4. **Timeline**: [When issue started]

## Investigation Steps
- [ ] Check recent changes (commits, deploys)
- [ ] Analyze error patterns
- [ ] Review related issues
- [ ] Examine system state
- [ ] Collect diagnostic data

## Findings
### Finding 1: [Title]
- **Evidence**: [Data/logs]
- **Impact**: [What it affects]
- **Relevance**: [How it relates]

### Finding 2: [Continue...]
````

### Phase 3: Hypothesis Development

**File: 03-hypothesis.md**

````markdown
# Root Cause Hypotheses

## Hypothesis 1: [Most Likely Cause]

**Probability**: High/Medium/Low
**Evidence For**:

- [Supporting fact 1]
- [Supporting fact 2]

**Evidence Against**:

- [Contradicting fact]

**Test Method**:

```[language]
// Code to test hypothesis
```
````

## Hypothesis 2: [Alternative Cause]

[Same structure]

## Hypothesis Ranking

1. [Most likely] - [Why]
2. [Second] - [Why]
3. [Third] - [Why]

````

### Phase 4: Issue Isolation

**File: 04-isolation.md**

```markdown
# Issue Isolation Results

## Isolation Method
- **Approach**: [Binary search/Component removal/etc]
- **Variables**: [What was tested]
- **Controls**: [What stayed constant]

## Isolation Steps
1. **Baseline**: [Working state]
2. **Test 1**: [What changed] → [Result]
3. **Test 2**: [What changed] → [Result]
4. **Narrowed to**: [Specific component/line]

## Root Cause Identification
**Component**: [Exact location]
**Root Cause**: [Specific issue]
**Trigger Condition**: [When it fails]
**Failure Mode**: [How it fails]
````

### Phase 5: Solution Development

**File: 05-solution.md**

````markdown
# Solution Approaches

## Solution 1: Quick Fix

**Approach**: [Immediate mitigation]
**Time**: [Implementation estimate]
**Risk**: [Low/Medium/High]

```diff
// Original code
- [problematic code]
// Fixed code
+ [corrected code]
```
````

## Solution 2: Proper Fix

**Approach**: [Comprehensive solution]
**Time**: [Implementation estimate]
**Risk**: [Low/Medium/High]

**Implementation Plan**:

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Solution 3: Refactor

[If applicable - larger architectural change]

## Recommendation

**Chosen**: Solution [X]
**Rationale**: [Why this approach]

````

### Phase 6: Verification Plan

**File: 06-verification.md**

```markdown
# Fix Verification Plan

## Test Strategy
1. **Unit Tests**: [What to test]
2. **Integration Tests**: [Workflows to verify]
3. **Regression Tests**: [What might break]
4. **Performance Tests**: [Metrics to check]

## Test Cases
### Test 1: Original Bug
```[language]
// Test that original issue is fixed
````

### Test 2: Edge Cases

```[language]
// Boundary condition tests
```

### Test 3: Regression

```[language]
// Ensure nothing else broke
```

## Acceptance Criteria

- [ ] Original bug no longer reproduces
- [ ] All tests pass
- [ ] No performance degradation
- [ ] No new errors in logs

````

### Phase 7: Prevention Strategy

**File: 07-prevention.md**

```markdown
# Prevention Measures

## Code Improvements
- **Pattern**: [What to avoid]
- **Better Approach**: [What to do instead]
- **Enforcement**: [Linting rules/reviews]

## Process Improvements
1. **Testing**: [New test requirements]
2. **Review**: [Checklist items]
3. **Monitoring**: [Alerts to add]

## Documentation Updates
- [ ] Update troubleshooting guide
- [ ] Add to known issues
- [ ] Document fix pattern
- [ ] Update best practices

## Long-term Actions
- [ ] Refactor similar code
- [ ] Add static analysis
- [ ] Improve error handling
- [ ] Enhance monitoring
````

## Debug Summary Template

**File: debug-summary.md**

```markdown
# Debug Summary: [Issue Name]

**Date**: [YYYY-MM-DD]
**Severity**: Critical/High/Medium/Low
**Time to Resolution**: [X hours/days]

## Executive Summary

[1-2 paragraph overview of issue and resolution]

## Root Cause

**What**: [Specific technical cause]
**Why**: [Why it happened]
**Impact**: [What it affected]

## Solution

**Fix Applied**: [Brief description]
**Verification**: [How we know it's fixed]

## Lessons Learned

1. [Key takeaway 1]
2. [Key takeaway 2]
3. [Key takeaway 3]

## Action Items

- [ ] [Follow-up task 1]
- [ ] [Follow-up task 2]
- [ ] [Monitoring setup]
```

## Best Practices for Debug Plans

### Reproduction Excellence

- **Deterministic**: Steps must reliably reproduce issue
- **Minimal**: Smallest possible reproduction case
- **Automated**: Include test that demonstrates bug
- **Documented**: Clear environment requirements

### Investigation Rigor

- **Systematic**: Follow structured approach
- **Evidence-based**: Document all findings
- **Hypothesis-driven**: Test assumptions
- **Tool-assisted**: Use appropriate debugging tools

### Solution Quality

- **Root cause focused**: Fix the cause, not symptoms
- **Trade-off aware**: Document pros/cons
- **Test-driven**: Write tests first
- **Incremental**: Small, safe changes

### Documentation Standards

- **Searchable**: Use consistent naming
- **Linkable**: Cross-reference related issues
- **Visual**: Include diagrams where helpful
- **Actionable**: Clear next steps

## Artifact Collection

Store in `artifacts/` subdirectory:

- **Error logs**: Full stack traces
- **Screenshots**: Visual bugs
- **Network traces**: API issues
- **Performance profiles**: Slowness
- **Memory dumps**: Leaks
- **Test results**: Verification data

## Integration Patterns

### Git Integration

```bash
# Create branch from debug plan
git checkout -b fix/YYYY-MM-DD-issue-name

# Reference in commits
git commit -m "fix: [issue] per .claude/debug/YYYY-MM-DD-issue-name"
```

### Issue Tracking

- Link debug plan in issue tracker
- Update status as plan progresses
- Reference plan in PR description

### Knowledge Base

- Extract patterns for future reference
- Update debugging playbooks
- Share learnings with team

@include shared/research-patterns.yml#Mandatory_Research_Flows
@include shared/quality-patterns.yml#Code_Quality_Metrics
@include shared/universal-constants.yml#Standard_Messages_Templates

## Usage Examples

```bash
# Create comprehensive debug plan
/debug "API returns 500 on user creation" --reproduce --isolate

# Performance debugging with profiling
/debug "Slow page load after deployment" --profile --trace

# Complex issue with multiple hypotheses
/debug "Intermittent data corruption" --analyze --think-hard

# Production incident response
/debug "Critical: Payment processing failing" --reproduce --fix --monitor
```

## Success Metrics

- **Time to Reproduction**: < 30 minutes
- **Root Cause Identification**: < 2 hours
- **Fix Development**: Varies by complexity
- **Verification Complete**: Before deployment
- **Documentation**: Within 24 hours

Your goal is to create a comprehensive, actionable debug plan that not only fixes the immediate issue but provides a reusable framework for similar problems in the future.
