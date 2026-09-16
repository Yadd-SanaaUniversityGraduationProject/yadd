"""
YADD — Use Case Diagram Print Package generator  (v2)

Two A4-portrait use-case diagrams:
  Panel A  Core Service Journey                        (right page of the spread)
  Panel B  Trust, Administration & Provider Management (left page of the spread)

Coordinates are millimetres, origin top-left, y grows downwards.
All text is converted to vector outlines, so SVG / PDF / PNG are identical.
"""
from __future__ import annotations

import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from yadd_canvas import Canvas  # noqa: E402
import yadd_text as yt  # noqa: E402

# --------------------------------------------------------------------------- #
# Palette
# --------------------------------------------------------------------------- #
INK = "#111827"
INK_SOFT = "#374151"
MUTED = "#6B7280"
BLUE = "#1F4E79"
BLUE_MID = "#2F75B5"
BLUE_LIGHT = "#EAF3FB"
CORE_FILL = "#D6E9F8"
CORE_EDGE = "#17618F"
SYS_FILL = "#FFF6DA"
SYS_EDGE = "#B8860B"
GROUP_FILL = "#FBFCFD"
GROUP_HEAD = "#EDF3F9"
GROUP_EDGE = "#B9C6D4"
BOX_FILL = "#FFFFFF"
NOTE = "#4B5563"
SPINE = "#4F86B5"
REL_INC = "#1F3A5F"
REL_EXT = "#6B7280"

AR = yt.ARABIC
AR_MED = yt.ARABIC_MED
AR_BOLD = yt.ARABIC_BOLD
MM = 25.4 / 72.0

# --------------------------------------------------------------------------- #
# Use case dictionary — English label (DEC-072) + Arabic label
# --------------------------------------------------------------------------- #
NODES = {
    "login":          dict(en="Log In", ar="تسجيل الدخول", kind="uc"),
    "create_act":     dict(en="Create Account", ar="إنشاء حساب", kind="uc"),
    "manage_act":     dict(en="Manage Account", ar="إدارة الحساب", kind="uc"),
    "browse":         dict(en="Browse Public Content", ar="تصفح المحتوى العام", kind="uc"),
    "search":         dict(en="Search Providers", ar="البحث عن المزوّدين", kind="uc"),
    "view_profile":   dict(en="View Provider Profile", ar="عرض ملف المزوّد", kind="uc"),
    "view_show":      dict(en="View Portfolio / Catalog", ar="عرض معرض الأعمال", kind="uc"),
    "communicate":    dict(en="Communicate / Inquire", ar="التواصل والاستفسار", kind="uc"),
    "req_start":      dict(en="Request Transaction Start", ar="طلب بدء المعاملة", kind="uc"),
    "conf_start":     dict(en="Confirm Transaction Start", ar="تأكيد بدء المعاملة", kind="uc"),
    "create_req":     dict(en="Create Request", ar="إنشاء الطلب", kind="uc"),
    "close_req":      dict(en="Close Open Request", ar="إغلاق الطلب المفتوح", kind="uc"),
    "view_match":     dict(en="View Matching Requests", ar="عرض الطلبات المطابقة", kind="uc"),
    "submit_resp":    dict(en="Submit Provider Response", ar="إرسال استجابة المزوّد", kind="uc"),
    "edit_resp":      dict(en="Edit Provider Response", ar="تعديل الاستجابة", kind="uc"),
    "withdraw_resp":  dict(en="Withdraw Provider Response", ar="سحب الاستجابة", kind="uc"),
    "compare":        dict(en="Compare Provider Responses", ar="مقارنة الاستجابات", kind="uc"),
    "select":         dict(en="Select Provider", ar="اختيار المزوّد", kind="uc"),
    "cancel_tx":      dict(en="Cancel Transaction", ar="إلغاء المعاملة", kind="uc"),
    "create_inv":     dict(en="Create Final Invoice", ar="إنشاء الفاتورة النهائية", kind="uc"),
    "review_inv":     dict(en="Review Final Invoice", ar="مراجعة الفاتورة النهائية", kind="uc"),
    "approve_inv":    dict(en="Approve Final Invoice", ar="اعتماد الفاتورة النهائية", kind="uc"),
    "req_rev":        dict(en="Request Invoice Revision", ar="طلب تعديل الفاتورة", kind="uc"),
    "revise_inv":     dict(en="Revise Final Invoice", ar="تعديل الفاتورة النهائية", kind="uc"),
    "complaint":      dict(en="Raise Transaction Complaint", ar="رفع شكوى على المعاملة", kind="uc"),
    "rate_provider":  dict(en="Rate Provider", ar="تقييم المزوّد", kind="uc"),
    "rate_benef":     dict(en="Rate Beneficiary", ar="تقييم المستفيد", kind="uc"),
    "manage_profile": dict(en="Manage Provider Profile", ar="إدارة ملف المزوّد", kind="uc"),
    "manage_show":    dict(en="Manage Portfolio / Catalog", ar="إدارة معرض الأعمال", kind="uc"),
    "manage_areas":   dict(en="Manage Service Areas", ar="إدارة مناطق الخدمة", kind="uc"),
    "submit_ver":     dict(en="Submit Verification", ar="تقديم طلب التحقق", kind="uc"),
    "review_ver":     dict(en="Review Provider Verification", ar="مراجعة تحقق المزوّد", kind="uc"),
    "manage_sub":     dict(en="Manage Provider Subscription", ar="إدارة اشتراك المزوّد", kind="uc"),
    "block":          dict(en="Block User", ar="حجب المستخدم", kind="uc"),
    "report":         dict(en="Report User / Content", ar="الإبلاغ عن مستخدم/محتوى", kind="uc"),
    "review_reports": dict(en="Review Reports / Flags", ar="مراجعة الإبلاغات", kind="uc"),
    "review_comp":    dict(en="Review Transaction Complaint", ar="مراجعة شكوى المعاملة", kind="uc"),
    "validate":       dict(en="Validate Response Eligibility", ar="التحقق من أهلية الاستجابة", kind="sys"),
    "create_tx":      dict(en="Create Active Transaction", ar="إنشاء معاملة نشطة", kind="sys"),
    "complete_tx":    dict(en="Complete Transaction", ar="إكمال المعاملة", kind="sys"),
}

ACTOR_TEXT = {
    "guest":    ("زائر", "Guest"),
    "benef":    ("مستفيد", "Beneficiary"),
    "provider": ("مزوّد", "Provider"),
    "admin":    ("مدير النظام", "YADD Administrator"),
}

# --------------------------------------------------------------------------- #
# Panel definitions
# --------------------------------------------------------------------------- #
PANEL_A = dict(
    tag="A",
    title_ar="الرحلة الأساسية للخدمة",
    title_en="Core Service Journey",
    subtitle_ar="المخطط 1 من 2 — الاستكشاف والاستفسار · الطلب المنشور والاستجابة والاختيار · المعاملة والفاتورة",
    groups=[
        dict(key="A1", ar="المصادقة والدخول", en="Authentication & Access",
             rows=[[(2, 1, "login"), (3, 1, "create_act")]]),
        dict(key="A2", ar="الاستكشاف والاستفسار المباشر", en="Discovery & Direct Inquiry",
             rows=[[(1, 1, "browse"), (2, 1, "search"), (3, 1, "view_show")],
                   [(2, 1, "view_profile")],
                   [(2, 1, "communicate")],
                   [(1, 1, "req_start"), (2, 1, "conf_start")]],
             note="الملف العام لا يعرض بيانات الاتصال الخاصة أو البيانات الحساسة · والمحادثة وحدها لا تنشئ معاملة — Public profile excludes private data; chat alone never creates a Transaction"),
        dict(key="A4", ar="مسار الطلب المنشور", en="Published Request Route",
             rows=[[(1, 1, "create_req"), (2, 1, "close_req"), (3, 1, "view_match")],
                   [(1, 1, "compare"), (2, 1, "validate"), (3, 1, "submit_resp")],
                   [(1, 1, "select"), (2, 1, "edit_resp"), (3, 1, "withdraw_resp")],
                   [(2, 1, "create_tx")]],
             note="استجابة فعّالة واحدة لكل مزوّد لكل طلب، وتتطلب: Verified + Active Subscription + Open Request — وإنشاء المعاملة النشطة هو نقطة التقاء المسارين"),
        dict(key="A5", ar="المعاملة والفاتورة والشكوى", en="Transaction, Final Invoice & Dispute",
             rows=[[(1, 1, "create_inv"), (2, 1, "review_inv"), (3, 1, "cancel_tx")],
                   [(1, 1, "req_rev"), (2, 1, "approve_inv"), (3, 1, "complaint")],
                   [(1, 1, "revise_inv"), (2, 1, "complete_tx")]],
             note="اعتماد الفاتورة يُكمل المعاملة، ولا اعتماد تلقائي — Approval completes the Transaction; no auto-approval"),
    ],
    actors=[
        dict(key="guest", ar="زائر", en="Guest", side="left", align="login",
             links=[("login", "top"), ("create_act", "top"), ("browse", "left"),
                    ("search", "left"), ("view_profile", "top"), ("view_show", "top")]),
        dict(key="benef", ar="مستفيد", en="Beneficiary", side="left", align="create_req",
             links=[("communicate", "left"), ("req_start", "left"), ("conf_start", "top"),
                    ("create_req", "left"), ("close_req", "top"), ("compare", "left"),
                    ("select", "left"), ("create_inv", "left"), ("review_inv", "top"),
                    ("cancel_tx", "top"), ("req_rev", "left"), ("approve_inv", "top"),
                    ("complaint", "top")]),
        dict(key="provider", ar="مزوّد", en="Provider", side="right", align="submit_resp",
             links=[("communicate", "top"), ("req_start", "top"), ("conf_start", "top"),
                    ("view_match", "right"), ("submit_resp", "top"), ("edit_resp", "top"),
                    ("withdraw_resp", "right"), ("cancel_tx", "right"),
                    ("create_inv", "top"), ("revise_inv", "top")]),
    ],
    relations=[
        dict(src="view_profile", dst="search", kind="extend", route="v", ldx=8.5),
        dict(src="view_show", dst="view_profile", kind="extend", route="diag"),
        dict(src="communicate", dst="view_profile", kind="extend", route="v", ldx=8.5),
        dict(src="req_start", dst="communicate", kind="extend", route="v", ldx=-9.0),
        dict(src="conf_start", dst="create_tx", kind="include", route="chan", slot=2,
             ldx=-8.5, above_target=2.3),
        dict(src="view_match", dst="submit_resp", kind="extend", route="v", ldx=9.0),
        dict(src="submit_resp", dst="validate", kind="include", route="h", ldy=-1.6),
        dict(src="compare", dst="select", kind="extend", route="v", ldx=8.5),
        dict(src="select", dst="create_tx", kind="include", route="v", ldx=9.0),
        dict(src="req_rev", dst="review_inv", kind="extend", route="v", ldx=-9.0),
        dict(src="approve_inv", dst="review_inv", kind="extend", route="v", ldx=8.5),
        dict(src="complaint", dst="review_inv", kind="extend", route="v", ldx=9.0),
        dict(src="approve_inv", dst="complete_tx", kind="include", route="v", ldx=-9.0),
    ],
    captions=[],
)

PANEL_B = dict(
    tag="B",
    title_ar="الثقة والإدارة وإدارة المزوّد",
    title_en="Trust, Administration & Provider Management",
    subtitle_ar="المخطط 2 من 2 — الهوية والحساب · ملف المزوّد ومعرضه · التحقق والاشتراك · الأمان · الشكاوى والتقييم",
    groups=[
        dict(key="B1", ar="الهوية والحساب", en="Identity & Account",
             rows=[[(2, 1, "login"), (3, 1, "create_act")],
                   [(1, 1, "manage_act")]],
             note="حساب User واحد لكل شخص، وبعد الدخول يُختار مسار البداية: بوابة المستفيد أو بوابة المزوّد"),
        dict(key="B2", ar="ملف المزوّد ومعرض الأعمال", en="Provider Profile & Showcase",
             rows=[[(1, 1, "manage_profile"), (2, 1, "manage_show"), (3, 1, "manage_areas")]],
             note="ملف Provider واحد لكل حساب، بنوع واحد فقط: إما SERVICE وإما PRODUCT"),
        dict(key="B3", ar="التحقق والاشتراك", en="Verification & Subscription",
             rows=[[(1, 1, "submit_ver"), (2, 1, "review_ver"), (3, 1, "manage_sub")]],
             note="قرار التحقق بشري والذكاء الاصطناعي مساعد فقط، والتحقق + الاشتراك شرطان لأهلية إرسال الاستجابات"),
        dict(key="B4", ar="الأمان والحجب والإبلاغ", en="Trust & Safety",
             rows=[[(1, 1, "block"), (2, 1, "report"), (3, 1, "review_reports")]],
             note="الحجب والإبلاغ مفهومان مستقلان، والإبلاغ لا يعني إدانة أو حظرًا تلقائيًا"),
        dict(key="B5", ar="الشكاوى والمراجعة الإدارية", en="Dispute & Administrative Review",
             rows=[[(2, 1, "review_comp")]],
             note="مراجعة الشكوى تعتمد على وجود شكوى قائمة، ولا تمنح صلاحية تسوية مالية — المراجعة إدارية فقط"),
        dict(key="B6", ar="السمعة والتقييم", en="Reputation & Rating",
             rows=[[(1, 1, "rate_provider"), (3, 1, "rate_benef")]],
             note="التقييم متاح فقط بعد Transaction = Completed، وهو عملية بعد المعاملة لا تغيّر حالتها — التقييم متاح بعد الاكتمال فقط"),
    ],
    actors=[
        dict(key="guest", ar="زائر", en="Guest", side="left", align="login",
             links=[("login", "top"), ("create_act", "top")]),
        dict(key="benef", ar="مستفيد", en="Beneficiary", side="left", align="block",
             links=[("manage_act", "left"), ("block", "left"), ("report", "top"),
                    ("rate_provider", "left")]),
        dict(key="provider", ar="مزوّد", en="Provider", side="left", align="manage_profile",
             links=[("manage_profile", "left"), ("manage_show", "top"), ("manage_areas", "top"),
                    ("submit_ver", "top"), ("block", "top"), ("report", "left"),
                    ("rate_benef", "top"), ("manage_act", "top")]),
        dict(key="admin", ar="مدير النظام", en="YADD Administrator", side="right",
             align="review_comp", mid=True,
             links=[("review_ver", "top"), ("manage_sub", "top"),
                    ("review_reports", "top"), ("review_comp", "top")]),
    ],
    roles=[
        dict(ar="مراجع التحقق", en="Verification Reviewer", target="review_ver"),
        dict(ar="مسؤول الاشتراكات", en="Subscription Admin.", target="manage_sub"),
        dict(ar="مسؤول المحتوى", en="Content Moderator", target="review_reports"),
    ],
    relations=[],
    captions=[],
)

# --------------------------------------------------------------------------- #
# Page geometry
# --------------------------------------------------------------------------- #
PAGE_W, PAGE_H = 210.0, 297.0
MARGIN = 8.0
HEADER_Y0, HEADER_Y1 = 7.4, 25.6
CONTENT_TOP = 31.8
CONTENT_BOTTOM = 256.6
LEGEND_Y = 259.8
LEGEND_H = 15.0
FOOTER_Y = 281.0
SHELL_PAD = 4.6
BAND_MIN = 3.4
PITCH_MAX = 17.4
OVAL_MAX = 11.8

ACTOR_BAND = 27.0
SHELL_LEFT = MARGIN + ACTOR_BAND
SHELL_RIGHT = PAGE_W - MARGIN - ACTOR_BAND
BUS_DX = 3.0
SPINE_DX = 6.6
INNER_CH = 9.8
GROUP_LEFT = SHELL_LEFT + INNER_CH
GROUP_RIGHT = SHELL_RIGHT - INNER_CH
PAD_IN_GROUP = 3.2
COL_GAP = 4.6
N_SLOTS = 3


class Panel:
    def __init__(self, cfg: dict):
        self.cfg = cfg
        self.tag = cfg["tag"]
        self.c = Canvas(PAGE_W, PAGE_H, title=f"YADD — {cfg['title_en']} — Use Case Diagram")
        usable = (GROUP_RIGHT - GROUP_LEFT) - 2 * PAD_IN_GROUP - COL_GAP * (N_SLOTS - 1)
        self.slot_w = usable / N_SLOTS
        self.grid_x0 = GROUP_LEFT + PAD_IN_GROUP
        self.node_box: dict[str, dict] = {}
        self.group_box: dict[str, dict] = {}
        self.actor_box: dict[str, dict] = {}
        self.role_box: dict[str, dict] = {}
        self.bus_x = {"left": SHELL_LEFT + BUS_DX, "right": SHELL_RIGHT - BUS_DX}
        self.role_bus_x = GROUP_RIGHT + 3.0
        self.admin_bus_x = PAGE_W - MARGIN - 1.0
        self.spine_x = SHELL_LEFT + SPINE_DX

    # ------------------------------------------------------------------ #
    def _slot_rect(self, slot: int, span: int):
        x0 = self.grid_x0 + (slot - 1) * (self.slot_w + COL_GAP)
        w = self.slot_w * span + COL_GAP * (span - 1)
        return x0, w

    def _layout(self, pitch, oval_h, header_h, pad_bottom, band_h, note_h, y_top):
        y = y_top
        for gi, g in enumerate(self.cfg["groups"]):
            g_y0 = y
            y += header_h
            for ri, row in enumerate(g["rows"]):
                row_cy = y + pitch / 2.0
                for (slot, span, key) in row:
                    x0, w = self._slot_rect(slot, span)
                    self.node_box[key] = dict(cx=x0 + w / 2.0, cy=row_cy, w=w, h=oval_h,
                                              row_cy=row_cy, group=g["key"], slot=slot,
                                              span=span, slot_x0=x0, slot_x1=x0 + w,
                                              first_row=(ri == 0))
                y += pitch
            if g.get("note"):
                y += note_h
            y += pad_bottom
            g["_box"] = dict(y0=g_y0, y1=y, header_h=header_h)
            self.group_box[g["key"]] = g["_box"]
            if gi < len(self.cfg["groups"]) - 1:
                y += band_h
        return y - y_top

    def build(self, force_pitch=None):
        groups = self.cfg["groups"]
        n_rows = sum(len(g["rows"]) for g in groups)
        n_gaps = len(groups) - 1
        avail = CONTENT_BOTTOM - CONTENT_TOP

        header_h, pad_bottom, note_h = 5.9, 2.9, 4.6
        fixed = 0.0
        for g in groups:
            fixed += header_h + pad_bottom + (note_h if g.get("note") else 0.0)
        pitch = (avail - fixed - n_gaps * BAND_MIN) / n_rows
        pitch = max(9.0, min(PITCH_MAX, pitch))
        if force_pitch:
            pitch = force_pitch
        oval_h = max(8.2, min(OVAL_MAX, pitch - 5.0))
        used = self._layout(pitch, oval_h, header_h, pad_bottom, BAND_MIN, note_h, 0.0)
        leftover = max(0.0, avail - used)
        band_h = BAND_MIN + leftover / max(n_gaps, 1)
        used = self._layout(pitch, oval_h, header_h, pad_bottom, band_h, note_h, 0.0)
        y0 = CONTENT_TOP + max(0.0, (avail - used) / 2.0)
        self._layout(pitch, oval_h, header_h, pad_bottom, band_h, note_h, y0)
        self.geom = dict(pitch=pitch, oval_h=oval_h, header_h=header_h, band_h=band_h,
                         note_h=note_h)
        self.fit_pitch = pitch
        self.shell_top = max(y0 - SHELL_PAD, HEADER_Y1 + 1.4)
        self.shell_bottom = groups[-1]["_box"]["y1"] + 3.4
        return self

    # ------------------------------------------------------------------ #
    def draw(self):
        self._header()
        self._shell()
        self._groups()
        self._nodes()
        self._captions()
        self._spine()
        self._actor_place()
        self._role_place()
        self._associations()
        self._relations()
        self._legend()
        self._footer()
        return self.c

    # -- header ---------------------------------------------------------- #
    def _header(self):
        c, cfg = self.c, self.cfg
        c.rect(0, 0, PAGE_W, PAGE_H, fill="#FFFFFF")
        c.rect(MARGIN, HEADER_Y0, PAGE_W - 2 * MARGIN, HEADER_Y1 - HEADER_Y0,
               fill="#F7FAFD", stroke=GROUP_EDGE, sw=0.3, rx=1.5)
        c.rect(MARGIN, HEADER_Y0, 1.6, HEADER_Y1 - HEADER_Y0, fill=BLUE, stroke=None, rx=0.8)
        x = MARGIN + 5.2
        c.text(x, HEADER_Y0 + 5.2, cfg["title_ar"], size=14.6, font=AR_BOLD, fill=BLUE)
        c.text(x, HEADER_Y0 + 10.2, cfg["title_en"] + " — Use Case Diagram", size=8.8,
               bold_latin=True, fill=INK)
        c.text(x, HEADER_Y0 + 14.8, cfg["subtitle_ar"], size=6.9, font=AR, fill=MUTED)
        c.text(PAGE_W - MARGIN - 5.0, HEADER_Y0 + 5.4, "يَد | YADD", size=11.5, font=AR_BOLD,
               fill=BLUE, align="right")
        c.text(PAGE_W - MARGIN - 5.0, HEADER_Y0 + 9.8, "Sana'a University — Graduation Project",
               size=6.8, fill=INK_SOFT, align="right")
        badge = f"PANEL {self.tag} / 2"
        bw = 22.0
        c.rect(PAGE_W - MARGIN - 5.0 - bw, HEADER_Y0 + 12.0, bw, 4.4, fill=BLUE, stroke=None,
               rx=2.2)
        c.text(PAGE_W - MARGIN - 5.0 - bw / 2.0, HEADER_Y0 + 14.2, badge, size=6.4,
               fill="#FFFFFF", align="center", bold_latin=True)

    # -- shell ----------------------------------------------------------- #
    def _shell(self):
        c = self.c
        c.rect(SHELL_LEFT, self.shell_top, SHELL_RIGHT - SHELL_LEFT,
               self.shell_bottom - self.shell_top, fill="#FFFFFF", stroke=BLUE_MID, sw=0.55)
        c.text((SHELL_LEFT + SHELL_RIGHT) / 2.0, self.shell_top + 3.5,
               "YADD System — نطاق النظام", size=8.2, font=AR_MED, fill=BLUE_MID,
               align="center")

    # -- groups ---------------------------------------------------------- #
    def _groups(self):
        c = self.c
        for g in self.cfg["groups"]:
            b = g["_box"]
            hh = b["header_h"]
            c.rect(GROUP_LEFT, b["y0"], GROUP_RIGHT - GROUP_LEFT, b["y1"] - b["y0"],
                   fill=GROUP_FILL, stroke=GROUP_EDGE, sw=0.3, rx=1.6)
            c.rect(GROUP_LEFT, b["y0"], GROUP_RIGHT - GROUP_LEFT, hh,
                   fill=GROUP_HEAD, stroke=GROUP_EDGE, sw=0.3, rx=1.6)
            c.rect(GROUP_LEFT, b["y0"] + hh - 2.0, GROUP_RIGHT - GROUP_LEFT, 2.0,
                   fill=GROUP_HEAD, stroke=None)
            c.text(GROUP_LEFT + 3.4, b["y0"] + hh / 2.0 + 0.3, g["ar"], size=8.0,
                   font=AR_MED, fill=BLUE)
            tw = c.measure(g["ar"], 8.0, font=AR_MED)
            c.text(GROUP_LEFT + 3.4 + tw + 3.0, b["y0"] + hh / 2.0 + 0.4, f"[{g['key']}]",
                   size=6.4, fill=BLUE_MID)
            c.text(GROUP_RIGHT - 3.4, b["y0"] + hh / 2.0 + 0.4, g["en"], size=6.7,
                   bold_latin=True, fill=BLUE_MID, align="right")
            if g.get("note"):
                self._note(g["note"], GROUP_LEFT + 3.4, b["y1"] - 3.6,
                           GROUP_RIGHT - GROUP_LEFT - 6.8)

    def _wrap_lines(self, text, max_w, size):
        c = self.c
        words = text.split(" ")
        lines, cur = [], ""
        for wd in words:
            trial = (cur + " " + wd).strip()
            if c.measure(trial, size, font=AR) <= max_w or not cur:
                cur = trial
            else:
                lines.append(cur)
                cur = wd
        if cur:
            lines.append(cur)
        return lines

    def _note(self, text, x, y, max_w):
        c = self.c
        size = 6.5
        words = text.split(" ")
        lines, cur = [], ""
        for wd in words:
            trial = (cur + " " + wd).strip()
            if c.measure(trial, size, font=AR) <= max_w or not cur:
                cur = trial
            else:
                lines.append(cur)
                cur = wd
        lines.append(cur)
        for i, ln in enumerate(lines):
            c.text(x, y - (len(lines) - 1 - i) * 3.1, ln, size=size, font=AR, fill=NOTE)

    # -- nodes ----------------------------------------------------------- #
    def _nodes(self):
        c = self.c
        for key, b in self.node_box.items():
            node = NODES[key]
            fill, edge, sw = BLUE_LIGHT, BLUE_MID, 0.32
            if node["kind"] == "sys":
                fill, edge = SYS_FILL, SYS_EDGE
            if key == "login":
                fill, edge, sw = CORE_FILL, CORE_EDGE, 0.85
            c.ellipse(b["cx"], b["cy"], b["w"] / 2.0, b["h"] / 2.0, fill=fill, stroke=edge, sw=sw)
            self._node_text(key, b)

    def _fit(self, text, max_w, size, min_size, font=None):
        w = self.c.measure(text, size, font=font)
        return size if w <= max_w else max(min_size, size * max_w / w)

    def _node_text(self, key, b):
        c = self.c
        node = NODES[key]
        core = key == "login"
        max_w = b["w"] - 5.8
        f_ar = AR_BOLD if core else AR_MED
        size = 9.2 if core else 8.3
        s_ar = self._fit(node["ar"], max_w, size, 6.9, font=f_ar)

        en_size = 6.5
        en_lines = self._wrap_en(node["en"], max_w, en_size) if b["h"] >= 10.4 else [node["en"]]
        s_en = self._fit(node["en"], max_w, en_size, 5.0)
        if len(en_lines) == 1:
            top = -1.6
            c.text(b["cx"], b["cy"] + top, node["ar"], size=s_ar, font=f_ar, fill=INK,
                   align="center")
            c.text(b["cx"], b["cy"] + top + 3.0, en_lines[0], size=s_en, fill=MUTED,
                   align="center")
        else:
            top = -3.1
            c.text(b["cx"], b["cy"] + top, node["ar"], size=s_ar, font=f_ar, fill=INK,
                   align="center")
            for i, ln in enumerate(en_lines):
                c.text(b["cx"], b["cy"] + top + 3.0 + i * 2.9, ln, size=6.2, fill=MUTED,
                       align="center")

    def _wrap_en(self, text, max_w, size):
        c = self.c
        if c.measure(text, size) <= max_w:
            return [text]
        parts = text.split(" ")
        best, best_diff = None, 1e9
        for i in range(1, len(parts)):
            a, bb = " ".join(parts[:i]), " ".join(parts[i:])
            diff = abs(c.measure(a, size) - c.measure(bb, size))
            if diff < best_diff:
                best, best_diff = (a, bb), diff
        if best is None:
            return [text]
        return list(best)

    # -- captions -------------------------------------------------------- #
    def _captions(self):
        c = self.c
        for cap in self.cfg.get("captions", []):
            nb = self.node_box[cap["anchor"]]
            txt = cap["text"]
            w = c.measure(txt, 6.4, font=AR_MED)
            x = nb["cx"] + cap.get("dx", 0.0)
            y = nb["cy"] + cap.get("dy", 7.0)
            c.rect(x - w / 2.0 - 1.8, y - 2.4, w + 3.6, 4.8, fill="#FFFFFF",
                   stroke=BLUE_MID, sw=0.28, rx=2.4)
            c.text(x, y, txt, size=6.4, font=AR_MED, fill=BLUE_MID, align="center")

    # -- precondition spine ---------------------------------------------- #
    def _spine(self):
        c = self.c
        first_key = self.cfg["groups"][0]["key"]
        first_row_key = self.cfg["groups"][0]["rows"][0][0][2]
        ch = self._header_space(first_key, self.node_box[first_row_key]["cy"]
                                - self.node_box[first_row_key]["h"] / 2.0)
        y_chan = self.group_box[first_key]["y0"] + self.group_box[first_key]["header_h"] \
            + max(1.2, ch / 2.0)
        groups = self.cfg["groups"][1:]
        top = y_chan
        bottom = groups[-1]["_box"]["y1"] - 3.2
        nb = self.node_box["login"]
        c.line(nb["cx"], nb["cy"] + nb["h"] / 2.0 + 0.6, nb["cx"], y_chan,
               stroke=SPINE, sw=0.38, dash=[1.2, 0.9])
        c.line(nb["cx"], y_chan, self.spine_x, y_chan, stroke=SPINE, sw=0.38,
               dash=[1.2, 0.9])
        c.line(self.spine_x, y_chan - 0.9, self.spine_x, bottom, stroke=SPINE, sw=0.48,
               dash=[1.4, 1.05])
        for g in groups:
            b = g["_box"]
            gy = b["y0"] + b["header_h"] + 2.2
            c.line(self.spine_x, gy, GROUP_LEFT - 0.5, gy, stroke=SPINE, sw=0.48,
                   dash=[1.4, 1.05])
            c.arrow_head(GROUP_LEFT - 0.3, gy, 0.0, kind="open", size=1.9, stroke=SPINE,
                         sw=0.48)
            c.poly([(self.spine_x - 0.9, gy - 1.5), (self.spine_x + 0.9, gy),
                    (self.spine_x - 0.9, gy + 1.5)],
                   fill=SPINE, stroke=SPINE, sw=0.2, closed=True)
        self._rotated(self.spine_x - 2.6, (y_chan + bottom) / 2.0,
                      "«precondition» — جلسة مصادَق عليها لكل وظيفة محمية — Authenticated Session",
                      6.3, SPINE)

    def _rotated(self, x, y, text, size, fill):
        c = self.c
        glyphs = yt.layout_text(text, size)
        w = yt.text_width(glyphs)
        ang = math.radians(-90)
        ca, sa = math.cos(ang), math.sin(ang)
        ox, oy = x - w / 2.0, y
        contours = []
        for g in glyphs:
            g.x += ox
            g.y = oy
            for con in yt.glyph_contours(g):
                ncon = []
                for seg in con:
                    k = seg[0]
                    vals = []
                    for i in range(1, len(seg), 2):
                        gx, gy = seg[i], seg[i + 1]
                        rx = x + (gx - x) * ca - (gy - y) * sa
                        ry = y + (gx - x) * sa + (gy - y) * ca
                        vals += [rx, ry]
                    ncon.append((k, *vals))
                contours.append(ncon)
        c.contours(contours, fill=fill)

    # -- actors ---------------------------------------------------------- #
    @staticmethod
    def _split_en(en):
        if len(en) <= 12:
            return [en]
        parts = en.split(" ")
        if len(parts) == 2:
            return parts
        mid = (len(parts) + 1) // 2
        return [" ".join(parts[:mid]), " ".join(parts[mid:])]

    def _actor_place(self):
        c = self.c
        w = 21.0
        for a in self.cfg["actors"]:
            ar, en = ACTOR_TEXT[a["key"]]
            lines = self._split_en(en)
            h = 7.6 + 4.1 * (len(lines) - 1) + 3.0
            g0 = self.group_box[self.cfg["groups"][0]["key"]]
            if a.get("mid"):
                cy = self.shell_top + 0.50 * (self.shell_bottom - self.shell_top)
            else:
                cy = self.node_box[a["align"]]["cy"]
            cy = max(g0["y0"] + g0["header_h"] + h / 2.0 + 1.6,
                     min(self.shell_bottom - 7.0, cy))
            x = MARGIN + 0.9 if a["side"] == "left" else PAGE_W - MARGIN - 0.9 - w
            y = cy - h / 2.0
            self.actor_box[a["key"]] = dict(x=x, y=y, w=w, h=h, cy=cy, side=a["side"])
            c.rect(x, y, w, h, fill=BOX_FILL, stroke=INK, sw=0.44, rx=1.2)
            c.rect(x, y, w, 1.2, fill=BLUE, stroke=None, rx=0.6)
            c.text(x + w / 2.0, y + 4.8, ar, size=8.8, font=AR_BOLD, fill=INK, align="center")
            for i, ln in enumerate(lines):
                c.text(x + w / 2.0, y + 9.0 + i * 3.4, ln, size=6.4, fill=INK_SOFT,
                       align="center")

    def _role_place(self):
        roles = self.cfg.get("roles")
        if not roles:
            return
        c = self.c
        ab = self.actor_box["admin"]
        w = 25.5
        x = PAGE_W - MARGIN - 0.9 - w - 3.4
        spine_x = PAGE_W - MARGIN - 0.9 - 1.2
        gap = 6.0
        h = 13.5
        y = ab["y"] + ab["h"] + 8.5
        first_y = y
        for r in roles:
            c.rect(x, y, w, h, fill="#F7FAFD", stroke=INK_SOFT, sw=0.3, rx=1.0)
            c.text(x + w / 2.0, y + 4.6, r["ar"], size=7.6, font=AR_MED, fill=INK, align="center")
            lines = self._wrap_en(r["en"], w - 4.5, 5.6)
            for i, ln in enumerate(lines):
                c.text(x + w / 2.0, y + 8.9 + i * 3.1, ln, size=5.6, fill=MUTED,
                       align="center")
            self.role_box[r["target"]] = dict(x=x, y=y, w=w, h=h, cy=y + h / 2.0,
                                              right=x + w)
            c.line(x + w, y + h / 2.0, spine_x, y + h / 2.0, stroke=INK_SOFT, sw=0.3)
            y += h + gap
        last_y = y - gap
        # generalisation spine up into the YADD Administrator actor
        c.line(spine_x, first_y + h / 2.0, spine_x, ab["y"] + ab["h"] + 2.8,
               stroke=INK_SOFT, sw=0.34)
        c.line(spine_x, last_y - h / 2.0, spine_x, first_y + h / 2.0,
               stroke=INK_SOFT, sw=0.34)
        c.poly([(spine_x, ab["y"] + ab["h"] + 1.1), (spine_x - 1.9, ab["y"] + ab["h"] + 4.3),
                (spine_x + 1.9, ab["y"] + ab["h"] + 4.3)],
               fill="#FFFFFF", stroke=INK_SOFT, sw=0.34)

    # -- associations ---------------------------------------------------- #
    def _corridor_y(self, nb):
        return nb["cy"] - nb["h"] / 2.0 - 1.4

    def _header_space(self, gkey, first_row_y):
        """Vertical channel inside a group between its header band and first oval row."""
        return first_row_y - (self.group_box[gkey]["y0"] + self.group_box[gkey]["header_h"])

    def _associations(self):
        for a in self.cfg["actors"]:
            box = self.actor_box[a["key"]]
            bus = self.admin_bus_x if a["key"] == "admin" else self.bus_x[a["side"]]
            self._fan(box, a["links"], a["side"], bus)
        for target, rb in self.role_box.items():
            self._fan(rb, [(target, "top")], "right", self.role_bus_x)

    def _fan(self, box, links, side, bus):
        """Trunk + vertical bus + short spurs: one clean association tree."""
        c = self.c
        links = sorted(links, key=lambda kv: self.node_box[kv[0]]["cy"])
        sx = box["x"] + box["w"] if side == "left" else box["x"]
        cy = box["cy"]
        c.line(sx, cy, bus, cy, stroke=INK_SOFT, sw=0.26)

        # stagger the corridors so that spurs of the same row never overlap
        per_row: dict[float, int] = {}
        spurs = []
        for key, approach in links:
            nb = self.node_box[key]
            if approach in ("left", "right"):
                tx = nb["slot_x0"] if approach == "left" else nb["slot_x1"]
                ty = nb["cy"]
                spurs.append((bus, ty, tx, ty, ty, None))
            else:
                row = round(nb["row_cy"], 2)
                idx = per_row.get(row, 0)
                per_row[row] = idx + 1
                corr = nb["cy"] - nb["h"] / 2.0 - 1.35 - idx * 0.95
                spurs.append((bus, corr, nb["cx"], corr, corr,
                              (nb["cx"], nb["cy"] - nb["h"] / 2.0)))

        ys = [cy] + [sp[4] for sp in spurs]
        c.line(bus, min(ys), bus, max(ys), stroke=INK_SOFT, sw=0.26)
        for (x0, y0, x1, y1, _, drop) in spurs:
            c.line(x0, y0, x1, y1, stroke=INK_SOFT, sw=0.26)
            if drop:
                c.line(drop[0], drop[1], drop[0], y1, stroke=INK_SOFT, sw=0.26)
                c.ellipse(drop[0], drop[1], 0.45, 0.45, fill=INK_SOFT, stroke=None)
            else:
                c.ellipse(x1, y1, 0.45, 0.45, fill=INK_SOFT, stroke=None)

    # -- relations ------------------------------------------------------- #
    def _relations(self):
        c = self.c
        for rel in self.cfg["relations"]:
            s = self.node_box[rel["src"]]
            d = self.node_box[rel["dst"]]
            kind = rel["kind"]
            col = REL_INC if kind == "include" else REL_EXT
            dash = [1.1, 0.85]
            route = rel.get("route", "v")
            if route == "diag":
                p0 = self._ellipse_border(s, d)
                p1 = self._ellipse_border(d, s)
                ang = math.atan2(p1[1] - p0[1], p1[0] - p0[0])
                c.line(p0[0], p0[1], p1[0] - math.cos(ang) * 2.0, p1[1] - math.sin(ang) * 2.0,
                       stroke=col, sw=0.32, dash=dash)
                c.arrow_head(p1[0], p1[1], ang, kind="open", size=2.0, stroke=col, sw=0.34)
                mx, my = (p0[0] + p1[0]) / 2.0, (p0[1] + p1[1]) / 2.0
                dx, dy = p1[0] - p0[0], p1[1] - p0[1]
                L = math.hypot(dx, dy) or 1.0
                self._halo(mx - dy / L * 3.4, my + dx / L * 3.4, f"«{kind}»", col)
                continue
            if route == "chan":
                chan_x = self.grid_x0 + rel["slot"] * (self.slot_w + COL_GAP) - COL_GAP / 2.0
                y1 = s["cy"] + s["h"] / 2.0 + 1.8
                pts = [(s["cx"], s["cy"] + s["h"] / 2.0 + 0.4), (s["cx"], y1),
                       (chan_x, y1), (chan_x, d["cy"]), (d["slot_x1"] + 0.6, d["cy"])]
                for j in range(len(pts) - 1):
                    c.line(pts[j][0], pts[j][1], pts[j + 1][0], pts[j + 1][1], stroke=col,
                           sw=0.32, dash=dash)
                c.arrow_head(d["slot_x1"] + 0.4, d["cy"], math.pi, kind="open", size=2.0,
                             stroke=col, sw=0.34)
                lx = chan_x + rel.get("ldx", 6.0)
                ly = (y1 + d["cy"]) / 2.0 + rel.get("ldy", 0.0)
            else:
                if route == "h" and abs(s["cy"] - d["cy"]) < 0.5:
                    if s["cx"] < d["cx"]:
                        p0 = (s["slot_x1"], s["cy"])
                        p1 = (d["slot_x0"], d["cy"])
                    else:
                        p0 = (s["slot_x0"], s["cy"])
                        p1 = (d["slot_x1"], d["cy"])
                    ang = math.atan2(p1[1] - p0[1], p1[0] - p0[0])
                    c.line(p0[0], p0[1], p1[0] - math.cos(ang) * 2.0, p1[1] - math.sin(ang) * 2.0,
                           stroke=col, sw=0.32, dash=dash)
                    c.arrow_head(p1[0], p1[1], ang, kind="open", size=2.0, stroke=col, sw=0.34)
                    lx, ly = (p0[0] + p1[0]) / 2.0, p0[1] - 5.2                         if abs(p0[1] - d["cy"]) < 0.5 else (p0[1] + p1[1]) / 2.0
                elif route == "h":
                    yb = max(s["cy"], d["cy"]) + max(s["h"], d["h"]) / 2.0 + 1.7
                    x0, x1 = s["cx"], d["cx"]
                    c.line(x0, s["cy"] + s["h"] / 2.0, x0, yb, stroke=col, sw=0.32, dash=dash)
                    c.line(x0, yb, x1, yb, stroke=col, sw=0.32, dash=dash)
                    c.line(x1, yb, x1, d["cy"] + d["h"] / 2.0 + 1.9, stroke=col, sw=0.32,
                           dash=dash)
                    c.arrow_head(x1, d["cy"] + d["h"] / 2.0 + 0.5, -math.pi / 2, kind="open",
                                 size=2.0, stroke=col, sw=0.34)
                    lx, ly = (x0 + x1) / 2.0, yb
                else:
                    if s["cy"] > d["cy"]:
                        p0 = (s["cx"], s["cy"] - s["h"] / 2.0)
                        p1 = (d["cx"], d["cy"] + d["h"] / 2.0)
                    else:
                        p0 = (s["cx"], s["cy"] + s["h"] / 2.0)
                        p1 = (d["cx"], d["cy"] - d["h"] / 2.0)
                    ang = math.atan2(p1[1] - p0[1], p1[0] - p0[0])
                    ex = p1[0] - math.cos(ang) * 2.0
                    ey = p1[1] - math.sin(ang) * 2.0
                    c.line(p0[0], p0[1], ex, ey, stroke=col, sw=0.32, dash=dash)
                    c.arrow_head(p1[0], p1[1], ang, kind="open", size=2.0, stroke=col, sw=0.34)
                    lx = (p0[0] + p1[0]) / 2.0 + rel.get("ldx", 0.0)
                    ly = (p0[1] + p1[1]) / 2.0 + rel.get("ldy", 0.0)
            if rel.get("above_target"):
                ly = d["cy"] - d["h"] / 2.0 - rel["above_target"]
            self._halo(lx, ly, f"«{kind}»", col)

    def _ellipse_border(self, a, b, pad=0.6):
        """Point on ellipse a's border in the direction of ellipse b's centre."""
        cx, cy = a["cx"], a["cy"]
        rx, ry = a["w"] / 2.0 + pad, a["h"] / 2.0 + pad
        dx, dy = b["cx"] - cx, b["cy"] - cy
        if abs(dx) < 1e-6 and abs(dy) < 1e-6:
            return cx, cy
        t = 1.0 / math.sqrt((dx / rx) ** 2 + (dy / ry) ** 2)
        return cx + dx * t, cy + dy * t

    def _halo(self, x, y, text, col, size=6.2):
        c = self.c
        w = c.measure(text, size)
        c.rect(x - w / 2.0 - 0.9, y - 1.95, w + 1.8, 3.9, fill="#FFFFFF", stroke=None, rx=0.7)
        c.text(x, y, text, size=size, fill=col, align="center")

    # -- legend ---------------------------------------------------------- #
    def _legend(self):
        c = self.c
        c.rect(MARGIN, LEGEND_Y, PAGE_W - 2 * MARGIN, LEGEND_H, fill="#F7FAFD",
               stroke=GROUP_EDGE, sw=0.3, rx=1.5)
        c.rect(MARGIN, LEGEND_Y, 1.4, LEGEND_H, fill=BLUE_MID, stroke=None, rx=0.7)
        items = [
            ("core", "نقطة الالتحام", "Core entry point"),
            ("uc", "حالة استخدام", "Use Case"),
            ("sys", "سلوك نظامي", "System"),
            ("actor", "فاعل", "Actor"),
            ("assoc", "ارتباط", "Association"),
            ("pre", "شرط مسبق", "Precondition"),
            ("inc", "تضمين إلزامي", "«include»"),
            ("ext", "امتداد اختياري", "«extend»"),
        ]
        col_w = (PAGE_W - 2 * MARGIN - 7.0) / 4.0
        for i, (kind, ar, en) in enumerate(items):
            row, col = divmod(i, 4)
            x = MARGIN + 3.6 + col * col_w
            y = LEGEND_Y + 4.0 + row * 4.3
            self._glyph(kind, x, y)
            tx = x + 16.4
            w_ar = c.measure(ar, 5.9, font=AR)
            c.text(tx, y, ar, size=5.9, font=AR, fill=INK_SOFT)
            c.text(tx + w_ar + 1.2, y, "/", size=5.9, fill=GROUP_EDGE)
            c.text(tx + w_ar + 3.0, y, en, size=5.9, fill=INK_SOFT)
        c.line(MARGIN + 3.0, LEGEND_Y + LEGEND_H - 4.2, PAGE_W - MARGIN - 3.0,
               LEGEND_Y + LEGEND_H - 4.2, stroke=GROUP_EDGE, sw=0.25)
        c.text(MARGIN + 3.6, LEGEND_Y + LEGEND_H - 2.1,
               "المصدر: 08-use-cases.md · 10-UML.md · DEC-067/072/077",
               size=5.7, font=AR, fill=MUTED)
        c.text(PAGE_W - MARGIN - 3.6, LEGEND_Y + LEGEND_H - 2.1,
               "REVIEW DRAFT — NOT BASELINED", size=5.7, fill=MUTED, align="right")

    def _glyph(self, kind, x, y):
        c = self.c
        mx = x + 8.0
        if kind == "actor":
            c.rect(x + 2.4, y - 2.2, 11.2, 4.6, fill=BOX_FILL, stroke=INK, sw=0.38, rx=1.0)
        elif kind == "uc":
            c.ellipse(mx, y, 6.6, 2.3, fill=BLUE_LIGHT, stroke=BLUE_MID, sw=0.32)
        elif kind == "sys":
            c.ellipse(mx, y, 6.6, 2.3, fill=SYS_FILL, stroke=SYS_EDGE, sw=0.32)
        elif kind == "core":
            c.ellipse(mx, y, 6.6, 2.3, fill=CORE_FILL, stroke=CORE_EDGE, sw=0.75)
        elif kind == "assoc":
            c.line(x + 1.2, y, x + 16.0, y, stroke=INK_SOFT, sw=0.26)
            c.ellipse(x + 16.0, y, 0.45, 0.45, fill=INK_SOFT, stroke=None)
        elif kind in ("inc", "ext"):
            col = REL_INC if kind == "inc" else REL_EXT
            c.line(x + 1.5, y + 1.6, x + 15.6, y - 1.6, stroke=col, sw=0.34, dash=[1.0, 0.8])
            c.arrow_head(x + 15.6, y - 1.6, math.atan2(-3.2, 14.1), kind="open", size=1.8,
                         stroke=col, sw=0.36)
        elif kind == "pre":
            c.line(x + 5.0, y - 2.3, x + 5.0, y + 2.3, stroke=SPINE, sw=0.4, dash=[1.2, 0.9])
            c.line(x + 5.0, y, x + 10.4, y, stroke=SPINE, sw=0.4, dash=[1.2, 0.9])
            c.arrow_head(x + 10.8, y, 0.0, kind="open", size=1.8, stroke=SPINE, sw=0.42)

    # -- footer ---------------------------------------------------------- #
    def _footer(self):
        c = self.c
        c.line(MARGIN, FOOTER_Y, PAGE_W - MARGIN, FOOTER_Y, stroke=GROUP_EDGE, sw=0.3)
        side_txt = ("ورقة المخطط 1 من 2 — توضع على يمين الورقة 2 من 2 عند الطباعة"
                    if self.tag == "A" else
                    "ورقة المخطط 2 من 2 — توضع على يسار الورقة 1 من 2 عند الطباعة")
        c.text((GROUP_LEFT + GROUP_RIGHT) / 2.0, FOOTER_Y + 5.0, side_txt, size=7.2,
               font=AR_MED, fill=BLUE_MID, align="center")
        c.text(MARGIN, FOOTER_Y + 5.0, "A4 portrait · vector SVG/PDF · 300 DPI PNG",
               size=6.2, fill=MUTED)
        c.text(PAGE_W - MARGIN, FOOTER_Y + 5.0, "يَد | YADD — Use Case Model", size=6.4,
               fill=MUTED, align="right")


def make_panels():
    """Lay out both panels with one shared pitch so the two pages match."""
    a = Panel(PANEL_A).build()
    b = Panel(PANEL_B).build()
    pitch = min(a.fit_pitch, b.fit_pitch)
    panels = []
    for cfg in (PANEL_A, PANEL_B):
        p = Panel(cfg).build(force_pitch=pitch)
        panels.append((p, p.draw()))
    return panels


def build(tag: str):
    panels = make_panels()
    return panels[0] if tag == "A" else panels[1]


def main():
    out = os.environ.get("YADD_OUT", "/home/user/build/out")
    os.makedirs(out, exist_ok=True)
    for p, c in make_panels():
        tag = p.tag
        open(os.path.join(out, f"panel{tag}.svg"), "w").write(c.to_svg())
        c.to_pdf(os.path.join(out, f"panel{tag}.pdf"))
        print(f"panel {tag}: ops={len(c.ops)} geom={p.geom}")
    print("done")


if __name__ == "__main__":
    main()
