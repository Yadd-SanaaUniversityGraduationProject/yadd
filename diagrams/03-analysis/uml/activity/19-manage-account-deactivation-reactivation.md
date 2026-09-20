# Activity 19 — Manage Account, Deactivation & Reactivation

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-20 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** DEC-079, FR-001G/001H, BR-050, Account & Portal Model, AUTH-06.

```mermaid
flowchart TD
    S([Start]) --> A[Open Account Settings]
    A --> B[Load User Account Data]
    B --> C[Display Account Settings]
    C --> D{Select Account Management Action}

    D -- Names / Photo --> N1[Enter Account Changes]
    N1 --> N2[Submit Account Changes]
    N2 --> N3[Load Provider Verification Context]
    N3 --> N4{Verified Service Provider Changes Legal Name?}
    N4 -- No --> N5[Save Account Changes]
    N5 --> N6[Confirm Saved Changes]
    N6 --> N7[View Save Confirmation]
    N7 --> D
    N4 -- Yes --> N8[Save Account Changes]
    N8 --> N9[Mark Identity Verification for Human Re-review]
    N9 --> N10[Confirm Changes and Verification Re-review]
    N10 --> N11[View Re-review Notice]
    N11 --> D

    D -- Mobile Number --> M1[Enter New Mobile Number]
    M1 --> M2[Validate New Mobile Number]
    M2 --> M3[Generate Mobile Change OTP]
    M3 --> M4[External SMS Service Sends OTP to New Mobile Number]
    M4 --> M5[Enter Mobile Change OTP]
    M5 --> M6[Verify New Mobile OTP]
    M6 --> M7{OTP Valid?}
    M7 -- Yes --> M8[Replace Verified Mobile Number]
    M8 --> M9[Confirm Mobile Change]
    M9 --> M10[View Mobile Change Confirmation]
    M10 --> D
    M7 -- No --> M11[Show Verification Error]
    M11 --> M12{Retry or Cancel Mobile Change?}
    M12 -- Retry --> M1
    M12 -- Cancel --> D

    D -- Email --> E1[Enter New Email Address]
    E1 --> E2[Submit New Email]
    E2 --> E3[Save New Email as Unverified]
    E3 --> E4[Require Email Verification]
    E4 --> E5[View Email Verification Required Notice]
    E5 --> D

    D -- Password --> P1[Enter Current Password and New Password]
    P1 --> P2[Submit Password Change]
    P2 --> P3[Verify Current Password]
    P3 --> P4{Current Password Valid?}
    P4 -- Yes --> P5[Validate New Password]
    P5 --> P6[Update Password Credential]
    P6 --> P7[Confirm Password Change]
    P7 --> P8[View Password Change Confirmation]
    P8 --> D
    P4 -- No --> P9[Reject Password Change]
    P9 --> P10[Show Password Error]
    P10 --> P11{Retry or Cancel Password Change?}
    P11 -- Retry --> P1
    P11 -- Cancel --> D

    D -- Deactivate --> D1[Confirm Account Deactivation]
    D1 --> D2[Set Account as Deactivated]
    D2 --> D3[Confirm Deactivation]
    D3 --> D4[View Deactivated State]
    D4 --> Z1([End — Account Deactivated])

    D -- Reactivate --> R1[Request Account Reactivation]
    R1 --> R2[Enter Registered Mobile Number]
    R2 --> R3[Load Account Administrative State]
    R3 --> R4{Administratively Suspended?}
    R4 -- Yes --> R5[Block Self-service Reactivation]
    R5 --> R6[Show Reactivation Unavailable]
    R6 --> R7[View Reactivation Unavailable Message]
    R7 --> Z2([End — Reactivation Unavailable])
    R4 -- No --> R8[Generate Reactivation OTP]
    R8 --> R9[External SMS Service Sends OTP to Registered Mobile Number]
    R9 --> R10[Enter Reactivation OTP]
    R10 --> R11[Verify Reactivation OTP]
    R11 --> R12{OTP Valid?}
    R12 -- Yes --> R13[Reactivate User Account]
    R13 --> R14[Confirm Reactivation]
    R14 --> R15[View Reactivated State]
    R15 --> Z3([End — Account Reactivated])
    R12 -- No --> R16[Show Verification Error]
    R16 --> R17{Retry or Cancel Reactivation?}
    R17 -- Retry --> R2
    R17 -- Cancel --> Z4([End — Reactivation Cancelled])

    D -- Leave --> Z5([End — Leave Account Settings])
```

Product Trade Name belongs to the Provider Profile, not the User Account. A newly entered email remains Unverified and cannot be used for login or recovery until verification succeeds; the exact email-verification mechanism is not frozen here. MVP supports Deactivation and Reactivation, not self-service permanent Hard Delete. Historical Transactions, Invoices, Ratings and Reports remain retained according to the current model. Administratively suspended accounts cannot use self-service Reactivation.
