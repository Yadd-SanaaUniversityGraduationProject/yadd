# Lifecycles & State Machines

> **الحالة:** `PROPOSED — NOT APPROVED`

الرسومات التالية أدوات نقاش فقط حتى اعتماد Business Rules.

## Service Request — Candidate Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Open: publish
    Open --> Agreed: accept offer
    Open --> Cancelled: cancel/expire
    Agreed --> InProgress: start/confirm
    Agreed --> Cancelled: allowed exception
    InProgress --> AwaitingInvoice: work marked complete
    AwaitingInvoice --> Closed: invoice accepted / closure rule
    Closed --> [*]
    Cancelled --> [*]
```

`TBD`: هل InProgress/AwaitingInvoice لازمان؟ وما event الإغلاق؟

## Offer — Candidate Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Submitted
    Submitted --> Revised: provider revises
    Revised --> Submitted: resubmit
    Submitted --> Accepted: customer accepts
    Submitted --> Rejected: customer rejects
    Submitted --> Withdrawn: provider withdraws
    Accepted --> [*]
    Rejected --> [*]
    Withdrawn --> [*]
```

## Invoice — Candidate Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Sent
    Sent --> Accepted
    Sent --> RevisionRequested
    RevisionRequested --> Draft
    Sent --> Rejected
    Accepted --> Closed
    Closed --> [*]
```

كل انتقال يحتاج Business Rule ومعرف FR قبل اعتماده.
