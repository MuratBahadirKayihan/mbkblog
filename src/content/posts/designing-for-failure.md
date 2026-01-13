---
title: 'Designing for Failure: Why Retry Logic Often Makes Systems Worse'
date: '2025-06-22'
excerpt: 'Most systems don’t fail because of a single catastrophic bug. They fail because of small, well-intentioned decisions that compound under pressure.'
tags: ['Backend Systems', 'Resilience', 'Distributed Systems']
---

Most systems don’t fail because of a single catastrophic bug.
They fail because of small, well-intentioned decisions that compound under pressure.

One of the most common examples is **retry logic**.

At first glance, retries feel like the responsible thing to do.
A request fails? Try again.
Network hiccup? One more attempt won’t hurt.

In production, this mindset often does the opposite.

### The Illusion of Safety

Retries create a comforting illusion:
that failures are temporary and systems are patient.

**They aren’t.**

In a healthy system, retries are invisible.
In a degraded system, retries multiply load at the worst possible moment.

What starts as a minor slowdown turns into:

*   Request amplification
*   Thread pool exhaustion
*   Cascading failures across services

The system doesn’t recover.
It drowns.

### When Retries Become an Attack

I’ve seen systems where a 5% failure rate triggered a 200% traffic spike.

Not because users refreshed the page.
Because the system attacked itself.

Every failed request retried:

*   Synchronously
*   Immediately
*   Without backoff
*   Without a global view

Each retry increased pressure on the very component that was already struggling.

The retry logic was correct in isolation.
It was disastrous in reality.

### A More Honest Approach to Failure

Failure isn’t an exception in distributed systems.
It’s a state.

Designing for failure means accepting three uncomfortable truths:

1.  Not every request deserves to succeed
2.  Silence is sometimes safer than persistence
3.  Fast failure is often more reliable than slow hope

This shifts the question from
“Can we retry?”
to
“Should we?”

### Practical Constraints I Now Design Around

In production systems, I now treat retries as a scarce resource, not a default behavior.

My current rules of thumb:

*   Retries must be **bounded**
*   Backoff must be **exponential and jittered**
*   Retries must be **visible in metrics**
*   Some failures should propagate immediately

If the system can’t survive a failure without retries,
retries won’t save it.

### Observability Changes the Conversation

The most dangerous retries are the invisible ones.

If you can’t answer:

*   How many retries are happening
*   Where they are happening
*   And why they are happening

then retries are already working against you.

Observability doesn’t prevent failure.
It prevents self-deception.

### The Counterintuitive Outcome

The most reliable systems I’ve worked on did less, not more.

*   Fewer retries.
*   Stricter timeouts.
*   Clearer failure boundaries.

They failed faster, but recovered cleaner.

### Afterthought

Retries feel like optimism encoded in code.
Production systems don’t need optimism.

They need clear limits, honest signals, and the courage to say no.
