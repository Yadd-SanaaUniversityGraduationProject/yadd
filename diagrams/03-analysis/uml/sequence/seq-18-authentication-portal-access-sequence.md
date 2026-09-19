# Sequence 18 — Authentication & Portal Access

> **Status:** `REVIEW DRAFT — SYNCHRONIZED 2026-09-19 — NOT BASELINED`
>
> **Purpose:** Represents approved returning-user Authentication, password recovery, last-portal restoration and portal switching without creating separate Beneficiary/Provider accounts.

## Source basis

- `DEC-008..011`, `DEC-078`, `DEC-079`, `DEC-080`, `DEC-085`, `DEC-086`.
- `FR-001C..001F`.
- Account / Portal Model.
- `AUTH-01`, `AUTH-04`, `AUTH-05` approved UI contracts.

## Diagram

```mermaid
%%{init: {"theme":"base","themeVariables":{"background":"#FFFFFF","fontFamily":"Arial","actorBkg":"#F8E8C8","actorBorder":"#7E7E7E","actorTextColor":"#222222","actorLineColor":"#8A8A8A","signalColor":"#A07878","signalTextColor":"#5C3F3F","labelBoxBkgColor":"#FFFFFF","labelBoxBorderColor":"#7E7E7E","labelTextColor":"#222222","loopTextColor":"#222222","noteBkgColor":"#FFFFFF","noteBorderColor":"#7E7E7E","noteTextColor":"#222222","activationBkgColor":"#C8E0E8","activationBorderColor":"#7B969C","sequenceNumberColor":"#222222"}}}%%
sequenceDiagram
    actor U as User
    participant UI as AuthenticationUI «boundary»
    participant AC as AccountController «control»
    participant DB as YADDDatabase «entity»
    participant OTP as SMSOTPService «external»

    alt Normal Log In
        U->>UI: submitCredentials(verifiedPhoneOrEmail, password)
        UI->>AC: authenticate(identifier, password)
        AC->>DB: findAccountByVerifiedIdentifier(identifier)
        DB-->>AC: accountAndCredentialState

        alt Credentials valid and account can authenticate
            AC->>DB: loadLastPortal(userId)
            DB-->>AC: lastPortal

            alt Last Portal = Beneficiary
                AC-->>UI: authenticationSucceeded(Beneficiary)
                UI-->>U: openBeneficiaryPortal()
            else Last Portal = Provider
                AC->>DB: loadProviderProfile(userId)
                DB-->>AC: providerProfileState

                alt Provider Profile absent or incomplete
                    AC-->>UI: authenticationSucceeded(ProviderSetup)
                    UI-->>U: continueProviderProfileSetup()
                else Provider Profile exists
                    AC-->>UI: authenticationSucceeded(Provider)
                    UI-->>U: openProviderPortalWithCurrentEligibilityState()
                end
            end
        else Invalid credentials or unusable identifier
            AC-->>UI: authenticationFailed()
            UI-->>U: showAuthenticationError()
        end

    else Forgot Password
        U->>UI: chooseForgotPassword()
        UI-->>U: requestVerifiedRecoveryChannel()

        alt Phone recovery
            U->>UI: submitMobileNumber()
            UI->>AC: requestPhoneRecovery(mobile)
            AC->>OTP: sendOTP(mobile)
            OTP-->>U: deliverOTP()
            U->>UI: submitOTP(otp)
            UI->>AC: verifyRecoveryOTP(mobile, otp)
            AC->>OTP: verifyOTP(mobile, otp)
            OTP-->>AC: verificationResult

            alt OTP valid
                AC-->>UI: allowNewPassword()
                U->>UI: submitNewPassword()
                UI->>AC: resetPassword(newPassword)
                AC->>DB: updatePasswordCredential()
                DB-->>AC: passwordUpdated()
                AC-->>UI: passwordResetSucceeded()
                UI-->>U: returnToLogIn()
            else OTP invalid
                AC-->>UI: recoveryVerificationFailed()
                UI-->>U: showVerificationError()
            end

        else Verified Email recovery is available
            U->>UI: chooseVerifiedEmailRecovery()
            UI->>AC: startVerifiedEmailRecovery()
            AC-->>UI: recoveryFlowAvailable()
            UI-->>U: continueVerifiedEmailRecovery()
        end
    end

    opt Authenticated User switches Portal
        U->>UI: switchPortal(targetPortal)
        UI->>AC: switchPortal(userId, targetPortal)

        alt Target = Beneficiary
            AC->>DB: saveLastPortal(Beneficiary)
            DB-->>AC: saved()
            AC-->>UI: beneficiaryPortalReady()
            UI-->>U: openBeneficiaryPortal()
        else Target = Provider
            AC->>DB: loadProviderProfile(userId)
            DB-->>AC: providerProfileState
            AC->>DB: saveLastPortal(Provider)
            DB-->>AC: saved()

            alt Provider Profile absent or incomplete
                AC-->>UI: providerSetupRequired()
                UI-->>U: continueProviderProfileSetup()
            else Provider Profile exists
                AC-->>UI: providerPortalReady()
                UI-->>U: openProviderPortalWithCurrentEligibilityState()
            end
        end
    end

    Note over U,DB: One User account serves both portals, and portal switching is not login to another account
    Note over U,DB: Expired subscription may limit new Provider interactions but does not itself remove Provider Portal access
```

## Scope boundary

- Login uses verified Mobile or verified Email + Password; there is no independent Username.
- Phone OTP is the primary Forgot Password recovery path; verified Email may be an additional recovery channel.
- OTP lifetime, resend cooldown, attempt caps and lockout thresholds remain unfrozen and are not modeled.
- Provider Portal access is distinct from eligibility to start new provider interactions.
