# Logo Design Specifications for D3 AI App

## Design Team Requirements Document

---

## 📐 Logo Types & Requirements

### 1. Primary App Icon

**Purpose:** Main application icon for app stores and device home screens

**Specifications:**

- **Dimensions:** 1024 x 1024 pixels
- **Format:** PNG (24-bit color + alpha)
- **Background:** No transparency for app store version
- **Color Space:** sRGB
- **File Name:** `icon.png`

**Design Requirements:**

- Must be recognizable at 20x20px (smallest display size)
- Avoid thin lines (minimum 2px at 1024x1024)
- No text unless part of logo design
- Center the design with 10-15% padding from edges
- Must work on various background colors

**Platform Considerations:**

- iOS will apply rounded corners automatically (don't pre-round)
- Android may apply various masks (squircle, circle, rounded square)
- Test visibility on both light and dark wallpapers

---

### 2. Android Adaptive Icon

**Purpose:** Foreground layer for Android's adaptive icon system

**Specifications:**

- **Dimensions:** 1024 x 1024 pixels
- **Format:** PNG with transparency
- **Safe Zone:** Center 66% (680x680px) - critical content must fit here
- **File Name:** `icon-adaptive.png`

**Design Requirements:**

- Design must be centered
- 33% of each edge may be cropped by system
- No background - transparent PNG only
- Ensure logo works with any background color
- Test with circle, square, and squircle masks

**Visual Safe Zone:**

```
┌─────────────────────────┐
│                         │ ← 17% margin
│   ┌─────────────┐       │
│   │             │       │
│   │  SAFE ZONE  │       │ ← 66% safe area
│   │   (Logo)    │       │
│   │             │       │
│   └─────────────┘       │
│                         │ ← 17% margin
└─────────────────────────┘
```

---

### 3. Monochrome Icon

**Purpose:** Single-color version for Android themed icons

**Specifications:**

- **Dimensions:** 1024 x 1024 pixels
- **Format:** PNG with transparency
- **Colors:** Pure black (#000000) on transparent
- **File Name:** `icon-monochrome.png`

**Design Requirements:**

- Single color only (black)
- Must be recognizable without color
- Same safe zone as adaptive icon (66% center)
- Avoid gradients or shading
- Use solid shapes only

---

### 4. Notification Icon

**Purpose:** Small icon for push notifications

**Specifications:**

- **Dimensions:** 96 x 96 pixels
- **Format:** PNG with transparency
- **Colors:** White only for Android, full color for iOS
- **File Name:** `icon-notification.png`

**Design Requirements:**

- Extremely simplified version of main logo
- Must be clear at 24x24px display size
- Android: White silhouette only
- iOS: Can use colors but keep simple
- Avoid fine details

---

### 5. Horizontal Logotype

**Purpose:** App name with logo for headers and splash screens

**Specifications:**

- **Base Size (1x):** 300 x 90 pixels
- **Medium (2x):** 600 x 180 pixels
- **Large (3x):** 900 x 270 pixels
- **Format:** PNG with transparency
- **Aspect Ratio:** 10:3 (keep consistent)

**File Names:**

- Light theme (dark text): `logotype-dark.png`, `logotype-dark@2x.png`, `logotype-dark@3x.png`
- Dark theme (light text): `logotype-light.png`, `logotype-light@2x.png`, `logotype-light@3x.png`

**Design Requirements:**

- Include app name with icon/symbol
- Maintain legibility at all sizes
- Provide two versions: dark text and light text
- Keep vertical centering consistent
- Ensure 10px minimum padding on all sides

---

### 6. Square Logo Mark

**Purpose:** Standalone logo without text for navigation and headers

**Specifications:**

- **Dimensions:** 200 x 200 pixels
- **Format:** PNG with transparency
- **Files:** `logo-black.png` (dark version), `logo-white.png` (light version)

**Design Requirements:**

- Square aspect ratio
- Works without accompanying text
- Two versions: black and white
- Simple enough for 40x40px display
- Consistent visual weight with logotype

---

### 7. Favicon

**Purpose:** Browser tab icon for web version

**Specifications:**

- **Dimensions:** 32 x 32 pixels
- **Format:** PNG
- **Files:** `favicon.png`, `favicon-active.png`

**Design Requirements:**

- Extremely simplified logo
- Must be recognizable at 16x16px
- No text or fine details
- High contrast design
- Solid background recommended

---

### 8. Splash Screen Assets

**Purpose:** Loading screen while app initializes

**Specifications:**

- **Android Light:** 1080 x 1920 pixels
- **Android Dark:** 1080 x 1920 pixels
- **Format:** PNG
- **Files:** `splash-android-light.png`, `splash-android-dark.png`

**Design Requirements:**

- Logo centered on solid background
- Include app name below logo
- Keep content in center 50% of screen
- Avoid elements near edges (various screen ratios)
- Provide light and dark versions

---

## 🎨 Logo Design Best Practices & Tips

### Design Principles

#### 1. Simplicity First

- **Reduce complexity:** Remove unnecessary details that won't be visible at small sizes
- **Geometric shapes:** Use basic shapes that scale well
- **Limited colors:** 2-3 colors maximum for main logo
- **Test scaling:** Check logo at 16px, 32px, 64px, 128px sizes

#### 2. Consistency Across Variants

- **Visual weight:** All versions should feel equally "heavy"
- **Recognition:** Each variant should be instantly recognizable as the same brand
- **Style matching:** Maintain consistent design language (rounded vs sharp, thick vs thin)
- **Color relationships:** Keep color meanings consistent

#### 3. Platform Optimization

- **iOS Guidelines:**
  - Avoid black borders (iOS adds shadows)
  - Don't include "beta" or version text
  - Ensure logo works with parallax effect
  - Test with various wallpapers

- **Android Guidelines:**
  - Design for adaptive icon masks
  - Provide proper foreground/background separation
  - Test with Material You theming
  - Ensure notification icon is white-only

#### 4. Accessibility Considerations

- **Color contrast:** Minimum 4.5:1 ratio for important elements
- **Color blindness:** Test with color blindness simulators
- **Dark mode:** Ensure visibility in both themes
- **Motion:** Avoid designs that suggest movement (accessibility concern)

### Technical Guidelines

#### Color Specifications

```
Primary Brand Color:    #blue của logo SmartOSC
Secondary Color:        #green của loglo SmartOSC
Light Background:       #FFFFFF or #F5F5F5
Dark Background:        #000000 or #1A1A1A
```

#### File Naming Convention

```
icon.png                    # Main app icon
icon-adaptive.png           # Android adaptive
icon-monochrome.png         # Android themed
logo-black.png              # Black logo variant
logo-white.png              # White logo variant
logotype-dark.png           # Dark text (light theme)
logotype-dark@2x.png        # 2x resolution
logotype-dark@3x.png        # 3x resolution
logotype-light.png          # Light text (dark theme)
logotype-light@2x.png       # 2x resolution
logotype-light@3x.png       # 3x resolution
```

#### Export Settings

- **Format:** PNG-24 with transparency
- **Color Profile:** sRGB IEC61966-2.1
- **Interlacing:** None
- **Compression:** Maximum quality (lowest compression)
- **Metadata:** Strip all EXIF data
- **DPI:** 72 (standard for digital)

### Design Checklist

#### Pre-Design Phase

- [ ] Research competitor logos
- [ ] Understand brand values and target audience
- [ ] Create mood board
- [ ] Sketch multiple concepts
- [ ] Test concepts at small sizes

#### Design Phase

- [ ] Create vector master file (SVG/AI)
- [ ] Design in black and white first
- [ ] Add color purposefully
- [ ] Create size variations
- [ ] Test on different backgrounds

#### Validation Phase

- [ ] Test at all required sizes (16px to 1024px)
- [ ] Verify on light and dark backgrounds
- [ ] Check color contrast ratios
- [ ] Test with color blindness simulators
- [ ] Get feedback from stakeholders

#### Export Phase

- [ ] Export all required sizes and variants
- [ ] Optimize file sizes (use TinyPNG or similar)
- [ ] Verify correct color profiles
- [ ] Check transparency is preserved
- [ ] Name files according to convention

### Common Mistakes to Avoid

#### Design Mistakes

- ❌ **Too detailed:** Fine lines and details disappear at small sizes
- ❌ **Poor contrast:** Logo invisible on certain backgrounds
- ❌ **Trendy design:** Will look dated quickly
- ❌ **Text in icon:** Usually illegible at small sizes
- ❌ **Gradient overuse:** May not reproduce well

#### Technical Mistakes

- ❌ **Wrong dimensions:** Not following exact pixel requirements
- ❌ **Incorrect padding:** Logo too close to edges
- ❌ **Mixed styles:** Inconsistent design language across variants
- ❌ **Forgotten variants:** Missing dark/light theme versions
- ❌ **Poor optimization:** Files too large

#### Process Mistakes

- ❌ **No testing:** Not checking on actual devices
- ❌ **Single version:** Not creating all required variants
- ❌ **No documentation:** Not providing usage guidelines
- ❌ **Rush job:** Not iterating based on feedback
- ❌ **Ignoring guidelines:** Not following platform requirements

### Testing Recommendations

#### Size Testing

1. View at 16x16px (favicon minimum)
2. View at 40x40px (notification size)
3. View at 60x60px (typical app icon)
4. View at 180x180px (large display)
5. View at original size

#### Context Testing

1. Place on white background
2. Place on black background
3. Place on photo backgrounds
4. Place next to competitor logos
5. View in grayscale

#### Device Testing

1. iOS devices (various sizes)
2. Android devices (various launchers)
3. Web browsers (favicon)
4. Notification centers
5. App stores mockups

### Delivery Package

#### Files to Provide

```
📁 Logo Package/
├── 📁 Source Files/
│   ├── logo-master.ai (or .sketch/.fig)
│   ├── logo-master.svg
│   └── brand-guidelines.pdf
├── 📁 App Icons/
│   ├── icon.png (1024x1024)
│   ├── icon-adaptive.png (1024x1024)
│   └── icon-monochrome.png (1024x1024)
├── 📁 Logos/
│   ├── logo-black.png (200x200)
│   ├── logo-white.png (200x200)
│   └── favicon.png (32x32)
├── 📁 Logotypes/
│   ├── logotype-dark.png (300x90)
│   ├── logotype-dark@2x.png (600x180)
│   ├── logotype-dark@3x.png (900x270)
│   ├── logotype-light.png (300x90)
│   ├── logotype-light@2x.png (600x180)
│   └── logotype-light@3x.png (900x270)
└── 📁 Documentation/
    ├── usage-guidelines.pdf
    ├── color-specifications.pdf
    └── size-chart.pdf
```

#### Documentation to Include

1. **Brand Guidelines:** Logo usage, spacing, don'ts
2. **Color Specifications:** Exact hex/RGB values
3. **Typography:** If text is included
4. **Minimum Sizes:** Smallest acceptable display size
5. **Clear Space:** Minimum padding requirements

### Final Quality Assurance

Before delivery, ensure:

- ✅ All files are in correct dimensions
- ✅ File names match specification
- ✅ Transparency is preserved where required
- ✅ Colors are consistent across variants
- ✅ Logo works at all sizes
- ✅ Both theme variants are provided
- ✅ Files are optimized for size
- ✅ Documentation is complete

---

## 📞 Contact & Support

For questions about these specifications:

- Review the main `LOGO_CUSTOMIZATION_GUIDE.md`
- Test with the `replace-logos.sh` script
- Validate using actual devices

Remember: A great app logo is simple, memorable, and works everywhere from a tiny favicon to a large billboard.

---

*This document version: 1.0*
*Last updated: 29-08-2025*
*For: D3 AI App Branding Project*
