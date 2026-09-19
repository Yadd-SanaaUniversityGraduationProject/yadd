# Sequence 20 — Open Request Closure, Inactivity, Expiry & Republish

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 — NOT BASELINED`
>
> **Purpose:** Represents the approved lifecycle of an already-published Open Request after creation: Beneficiary closure, inactivity reminders/expiry, activity reset and Republish as a new Request.

## Source basis

- `DEC-048`, `DEC-081`.
- `FR-005C..005F`.
- `BR-018`, `BR-020`, `BR-052`, `BR-053`.
- Request Lifecycle and Request Cancellation/Expiry Model.
- `BEN-02`, `BEN-04` approved UI contracts.

## Diagram

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#F8E8C8","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor B as Beneficiary
    participant UI as RequestUI «boundary»
    participant RC as RequestController «control»
    participant R as Request «entity»
    participant SCH as YADDScheduler «control»

    Note over B,R: Precondition: Request status = Open and no Provider has been selected

    alt Beneficiary no longer needs the Request
        B->>UI: closeOpenRequest(requestId)
        UI->>RC: closeOpenRequest(requestId)
        RC->>R: verifyStillOpenAndUnmatched()
        R-->>RC: validForClosure
        RC->>R: setStatus(CLOSED_BY_BENEFICIARY)
        R-->>RC: requestClosed()
        RC-->>UI: closureConfirmed()
        UI-->>B: showClosedRequest()

    else Request remains Open
        SCH->>R: checkBeneficiaryInactivity()

        opt 24 hours of Beneficiary inactivity
            SCH-->>UI: sendRequestInactivityReminder1(requestId)
            UI-->>B: show24HourReminder()
        end

        opt Beneficiary performs meaningful activity before expiry
            B->>UI: stillNeededOrEditOrMeaningfulInteraction()
            UI->>RC: recordBeneficiaryActivity(requestId)
            RC->>R: resetInactivityClock()
            R-->>RC: inactivityClockReset()
            RC-->>UI: requestRemainsOpen()
            UI-->>B: showOpenRequest()
        end

        opt Provider Response arrives
            RC->>R: recordProviderResponseArrival()
            R-->>RC: responseRecorded()
            Note over RC,R: Provider Response alone does NOT reset Beneficiary inactivity
        end

        opt 48 hours of Beneficiary inactivity
            SCH-->>UI: sendRequestInactivityReminder2(requestId)
            UI-->>B: show48HourReminder()
        end

        alt 72 hours of Beneficiary inactivity reached
            SCH->>R: setStatus(EXPIRED)
            R-->>SCH: requestExpired()
            SCH-->>UI: notifyRequestExpired(requestId)
            UI-->>B: showExpiredRequest()

            opt Beneficiary chooses Republish
                B->>UI: republishRequest(requestId)
                UI->>RC: createRepublishDraftFromExpiredRequest(requestId)
                RC->>R: copyApprovedRequestDataToNewDraft()
                R-->>RC: newRequestDraft(newRequestId)
                RC-->>UI: republishDraftReady(newRequestId)
                UI-->>B: reviewAndEditNewRequestDraft()

                B->>UI: publishNewRequest(newRequestId)
                UI->>RC: publishNewRequest(newRequestId)
                RC->>R: setNewRequestStatus(OPEN)
                R-->>RC: newRequestPublished()
                RC-->>UI: publicationConfirmed(newRequestId)
                UI-->>B: showNewOpenRequest()
            end
        else Inactivity below expiry threshold
            SCH-->>R: keepRequestOpen()
        end
    end

    Note over B,R: Republish never reopens the old Expired Request
    Note over B,R: Old responses remain inactive, and the republished Request has a new identity and editable copied data
    Note over B,R: Closing an Open Request is not Transaction Cancellation
```

## Scope boundary

- This sequence begins after Request creation/publication.
- Provider selection and Transaction creation are handled by the separate Provider-selection sequence.
- Exact scheduler implementation is a derived modeling role; the approved behavior is the timing policy, not a mandated background-service architecture.
