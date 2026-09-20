# Activity 18 — Authentication & Portal Access

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-20 THROUGH DEC-091 — NOT BASELINED`
>
> **Basis:** DEC-008..011/078/079/080/085/086, FR-001C..001F, Account & Portal Model, AUTH-01/04/05.

```mermaid
flowchart TD
    S([Start]) --> A[Open Authentication Page]
    A --> B{Forgot Password?}

    B -- No --> C[Enter Verified Mobile or Email and Password]
    C --> D[Submit Credentials]
    D --> E[Find Account by Verified Identifier]
    E --> F[Validate Password and Account State]
    F --> G{Authentication Valid?}
    G -- No --> H[Reject Authentication]
    H --> I[Show Authentication Error]
    I --> J{Retry or Leave?}
    J -- Retry --> C
    J -- Leave --> Z0([End — Authentication Not Completed])

    G -- Yes --> K[Load Last Used Portal]
    K --> L{Last Portal?}
    L -- Beneficiary --> M[Open Beneficiary Portal]
    L -- Provider --> N[Load Provider Profile State]
    N --> O{Provider Profile Complete?}
    O -- Yes --> P[Open Provider Portal with Current Eligibility State]
    O -- No --> Q[Continue Provider Profile Setup]
    M --> R{Switch Portal?}
    P --> R
    Q --> R
    R -- No --> Z1([End — Portal Access Complete])
    R -- Yes --> T[Select Target Portal]
    T --> U{Target Portal?}
    U -- Beneficiary --> V[Save Beneficiary as Last Used Portal]
    V --> W[Open Beneficiary Portal]
    W --> Z1
    U -- Provider --> X[Load Provider Profile State]
    X --> Y[Save Provider as Last Used Portal]
    Y --> Y2{Provider Profile Complete?}
    Y2 -- Yes --> Y3[Open Provider Portal with Current Eligibility State]
    Y2 -- No --> Y4[Continue Provider Profile Setup]
    Y3 --> Z1
    Y4 --> Z1

    B -- Yes --> R0[Choose Forgot Password]
    R0 --> R1{Recovery Channel?}
    R1 -- Phone --> R2[Enter Mobile Number]
    R2 --> R3[Request Verified Recovery Channel]
    R3 --> R4[Validate Recovery Mobile Number]
    R4 --> R5[Generate Recovery OTP]
    R5 --> R6[External SMS Service Sends OTP to Mobile Number]
    R6 --> R7[Enter Recovery OTP]
    R7 --> R8[Verify Recovery OTP]
    R8 --> R9{OTP Valid?}
    R9 -- No --> R10[Show Verification Error]
    R10 --> R11{Retry Recovery or Return to Log In?}
    R11 -- Retry --> R2
    R11 -- Return --> A
    R9 -- Yes --> R12[Enter New Password]
    R12 --> R13[Allow Password Reset]
    R13 --> R14[Validate New Password]
    R14 --> R15[Update Password Credential]
    R15 --> R16[Confirm Password Reset]
    R16 --> A

    R1 -- Verified Email --> E0[Choose Verified Email Recovery]
    E0 --> E1[Check Verified Email Recovery Availability]
    E1 --> E2{Verified Email Available?}
    E2 -- Yes --> E3[Start Verified Email Recovery Flow]
    E3 --> E4[Continue Verified Email Recovery]
    E4 --> A
    E2 -- No --> E5[Show Recovery Channel Unavailable Message]
    E5 --> E6{Use Phone Recovery or Return to Log In?}
    E6 -- Phone --> R2
    E6 -- Return --> A
```

One User account serves both portals; portal switching does not mean logging into another account. Provider Portal access is separate from eligibility to start new Provider interactions. An Expired Subscription may restrict new interactions, but it does not remove Provider Portal access. The verified-email recovery branch is represented only at the approved level and does not invent an unfrozen implementation mechanism.
