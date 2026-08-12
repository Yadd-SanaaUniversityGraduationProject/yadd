# Database Design — Relation Schema

> **الحالة:** `DRAFT BLOCKED BY ERD/SRS`

هذه الوثيقة ستحول ERD المعتمد إلى علاقات فعلية.

## Candidate Relations — غير معتمدة

```text
User(UserId, Status, ...)
Role(RoleId, Name)
UserRole(UserId, RoleId)
ProviderProfile(ProviderProfileId, UserId, ProviderType, Status, ...)
Category(CategoryId, Name, Type, ...)
Area(AreaId, ParentAreaId, Name, ...)
ServiceRequest(RequestId, CustomerId, CategoryId, AreaId, Status, ...)
Offer(OfferId, RequestId, ProviderProfileId, ProposedPrice, Status, ...)
Agreement(AgreementId, OfferId, AgreedPrice, Status, ...)
Invoice(InvoiceId, AgreementId, Amount, Status, ...)
Review(ReviewId, AgreementId, AuthorUserId, TargetUserId, Rating, ...)
PortfolioItem(ItemId, ProviderProfileId, ItemType, ...)
```

لا تحدد أنواع الحقول والقيود النهائية قبل إغلاق الأسئلة المفتوحة.
