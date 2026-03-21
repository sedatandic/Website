{
  "brand": {
    "name": "GlobalAgri Commodities",
    "attributes": [
      "trustworthy",
      "established",
      "globally-connected",
      "risk-aware",
      "operationally-excellent",
      "calm confidence (not flashy)"
    ],
    "voice": {
      "tone": "B2B / corporate",
      "writing_style": [
        "short, factual sentences",
        "avoid hype",
        "use numbers where possible (years, countries, volumes)",
        "use industry terms sparingly and define once"
      ]
    }
  },
  "design_personality": {
    "fusion_style": [
      "Swiss-style grid + generous whitespace",
      "Corporate editorial typography (serif headlines) + modern UI sans body",
      "Subtle ‘global network’ motif (map dots/lines) used as decorative accents only"
    ],
    "do_not": [
      "No flashy neon",
      "No heavy 3D",
      "No busy animated backgrounds",
      "No consumer-ecommerce vibe"
    ]
  },
  "color_system": {
    "notes": [
      "User-chosen palette is mandatory: Navy #0b3c5d, Gold #d9a441, Light bg #f5f5f7.",
      "Use gold as an accent (CTAs, highlights, small dividers). Avoid large gold surfaces.",
      "Prefer solid backgrounds for reading areas; reserve mild gradients for hero overlays only (<=20% viewport)."
    ],
    "tokens_css_variables": {
      ":root": {
        "--ga-bg": "#f5f5f7",
        "--ga-surface": "#ffffff",
        "--ga-surface-2": "#eef1f4",
        "--ga-text": "#0b1220",
        "--ga-muted": "#5b6675",
        "--ga-border": "#d7dde5",
        "--ga-navy": "#0b3c5d",
        "--ga-navy-2": "#082f49",
        "--ga-gold": "#d9a441",
        "--ga-gold-2": "#c8922f",
        "--ga-success": "#1f7a5a",
        "--ga-warning": "#b7791f",
        "--ga-danger": "#b42318",
        "--ga-focus": "#1b6ea8",
        "--ga-shadow-sm": "0 1px 2px rgba(11, 18, 32, 0.06)",
        "--ga-shadow-md": "0 10px 30px rgba(11, 18, 32, 0.10)",
        "--ga-radius-sm": "10px",
        "--ga-radius-md": "14px",
        "--ga-radius-lg": "18px"
      },
      "shadcn_mapping_(update_in_index.css_hsl)": {
        "--background": "210 20% 97%  (approx #f5f5f7)",
        "--foreground": "215 35% 10%  (approx #0b1220)",
        "--card": "0 0% 100%",
        "--card-foreground": "215 35% 10%",
        "--primary": "203 79% 20%  (navy #0b3c5d)",
        "--primary-foreground": "0 0% 98%",
        "--secondary": "210 25% 94%  (surface-2)",
        "--secondary-foreground": "203 79% 20%",
        "--accent": "41 66% 56%  (gold #d9a441)",
        "--accent-foreground": "215 35% 10%",
        "--muted": "210 25% 94%",
        "--muted-foreground": "215 12% 42%",
        "--border": "214 18% 86%",
        "--input": "214 18% 86%",
        "--ring": "203 79% 20%"
      }
    },
    "semantic_usage": {
      "page_background": "--ga-bg",
      "content_cards": "--ga-surface",
      "section_alt_background": "--ga-surface-2",
      "primary_text": "--ga-text",
      "secondary_text": "--ga-muted",
      "primary_actions": "--ga-navy",
      "accent_actions": "--ga-gold",
      "borders": "--ga-border",
      "focus_ring": "--ga-focus"
    },
    "allowed_gradients_(decorative_only)": {
      "hero_overlay": "linear-gradient(180deg, rgba(11,60,93,0.78) 0%, rgba(11,60,93,0.62) 45%, rgba(11,60,93,0.82) 100%)",
      "subtle_section_wash": "radial-gradient(900px circle at 20% 10%, rgba(217,164,65,0.10), transparent 55%), radial-gradient(900px circle at 80% 30%, rgba(11,60,93,0.10), transparent 60%)"
    },
    "contrast_rules": [
      "Body text on light surfaces: use --ga-text (#0b1220) or near-black.",
      "Gold text should not be used for paragraphs; gold is for small labels, icons, and borders.",
      "Buttons: ensure AA contrast; prefer navy button with white text for primary CTA."
    ]
  },
  "typography": {
    "font_pairing": {
      "headings": {
        "family": "Spectral",
        "fallback": "ui-serif, Georgia, serif",
        "why": "Editorial authority for an established trading firm; pairs well with navy/gold."
      },
      "body_ui": {
        "family": "IBM Plex Sans",
        "fallback": "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
        "why": "Highly legible corporate sans for dense B2B content and forms."
      },
      "numbers_optional": {
        "family": "IBM Plex Mono",
        "use_for": ["trade hubs stats", "risk metrics", "incoterms / codes"],
        "note": "Use sparingly; do not make the site look like a terminal."
      },
      "google_fonts_import": [
        "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&family=Spectral:wght@400;500;600;700&display=swap"
      ]
    },
    "type_scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
      "h2": "text-2xl sm:text-3xl font-semibold tracking-tight",
      "h3": "text-xl sm:text-2xl font-semibold",
      "subheading": "text-base md:text-lg text-[color:var(--ga-muted)]",
      "body": "text-sm sm:text-base leading-relaxed text-[color:var(--ga-text)]",
      "small": "text-xs sm:text-sm text-[color:var(--ga-muted)]"
    },
    "css_snippet": {
      "global": "html { font-family: 'IBM Plex Sans', ui-sans-serif, system-ui; }\n.h-serif { font-family: 'Spectral', ui-serif, Georgia, serif; }\n.font-mono { font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular; }"
    }
  },
  "layout_and_grid": {
    "container": {
      "max_width": "max-w-6xl (desktop), max-w-7xl for hero only",
      "padding": "px-4 sm:px-6 lg:px-8",
      "section_spacing": "py-14 sm:py-18 lg:py-24",
      "vertical_rhythm": "Use 2–3x more spacing than feels comfortable; avoid cramped card grids."
    },
    "page_templates": {
      "marketing_page": [
        "Top: sticky header",
        "Hero: full-bleed image + overlay",
        "Content: alternating light surface sections",
        "Bottom: CTA band (solid navy) + footer"
      ],
      "list_page_(insights/jobs)": [
        "Hero-lite (title + filters)",
        "Card grid with pagination",
        "Right rail on desktop optional (featured insight / contact CTA)"
      ],
      "detail_page_(insight/job)": [
        "Breadcrumb",
        "Title + meta",
        "Two-column: content + sticky sidebar (apply / download / contact)"
      ]
    },
    "responsive_rules": [
      "Mobile-first: single column; grids become 2-col at sm, 3-col at lg.",
      "Navigation: use Sheet (mobile) and NavigationMenu (desktop).",
      "Avoid center-aligned long paragraphs; keep left-aligned for readability."
    ]
  },
  "components": {
    "component_path": {
      "header_nav": [
        "/app/frontend/src/components/ui/navigation-menu.jsx",
        "/app/frontend/src/components/ui/dropdown-menu.jsx",
        "/app/frontend/src/components/ui/sheet.jsx",
        "/app/frontend/src/components/ui/button.jsx",
        "/app/frontend/src/components/ui/separator.jsx"
      ],
      "hero": [
        "/app/frontend/src/components/ui/button.jsx",
        "/app/frontend/src/components/ui/badge.jsx"
      ],
      "commodity_cards": [
        "/app/frontend/src/components/ui/card.jsx",
        "/app/frontend/src/components/ui/badge.jsx",
        "/app/frontend/src/components/ui/button.jsx"
      ],
      "pillars": [
        "/app/frontend/src/components/ui/card.jsx",
        "/app/frontend/src/components/ui/accordion.jsx"
      ],
      "map": [
        "/app/frontend/src/components/ui/card.jsx",
        "/app/frontend/src/components/ui/tooltip.jsx"
      ],
      "insights": [
        "/app/frontend/src/components/ui/card.jsx",
        "/app/frontend/src/components/ui/breadcrumb.jsx",
        "/app/frontend/src/components/ui/pagination.jsx",
        "/app/frontend/src/components/ui/badge.jsx"
      ],
      "careers": [
        "/app/frontend/src/components/ui/card.jsx",
        "/app/frontend/src/components/ui/dialog.jsx",
        "/app/frontend/src/components/ui/badge.jsx"
      ],
      "forms": [
        "/app/frontend/src/components/ui/form.jsx",
        "/app/frontend/src/components/ui/input.jsx",
        "/app/frontend/src/components/ui/textarea.jsx",
        "/app/frontend/src/components/ui/select.jsx",
        "/app/frontend/src/components/ui/checkbox.jsx",
        "/app/frontend/src/components/ui/button.jsx"
      ],
      "tables_optional": [
        "/app/frontend/src/components/ui/table.jsx"
      ],
      "feedback": [
        "/app/frontend/src/components/ui/sonner.jsx",
        "/app/frontend/src/components/ui/skeleton.jsx"
      ]
    },
    "buttons": {
      "style": "Professional / Corporate",
      "tokens": {
        "--btn-radius": "12px",
        "--btn-shadow": "0 10px 20px rgba(11, 18, 32, 0.10)",
        "--btn-press-scale": "0.98"
      },
      "variants": {
        "primary": {
          "use": "Main CTAs (Request a Quote, Contact Trading Desk)",
          "tailwind": "bg-[color:var(--ga-navy)] text-white hover:bg-[color:var(--ga-navy-2)] shadow-sm",
          "focus": "focus-visible:ring-2 focus-visible:ring-[color:var(--ga-focus)] focus-visible:ring-offset-2"
        },
        "secondary": {
          "use": "Secondary CTAs (Download Company Profile)",
          "tailwind": "bg-white text-[color:var(--ga-navy)] border border-[color:var(--ga-border)] hover:border-[color:var(--ga-navy)] hover:bg-[color:var(--ga-surface-2)]"
        },
        "ghost": {
          "use": "Inline actions (Read more)",
          "tailwind": "bg-transparent text-[color:var(--ga-navy)] hover:bg-[color:rgba(11,60,93,0.08)]"
        },
        "accent": {
          "use": "Small highlight CTA (View all insights) — use sparingly",
          "tailwind": "bg-[color:var(--ga-gold)] text-[color:var(--ga-text)] hover:bg-[color:var(--ga-gold-2)]"
        }
      },
      "micro_interactions": [
        "On hover: translate-y-[-1px] + shadow-sm (buttons only)",
        "On press: scale-[0.98]",
        "No transition-all; use transition-colors and transition-shadow"
      ]
    },
    "cards": {
      "base": "rounded-[var(--ga-radius-md)] bg-white border border-[color:var(--ga-border)] shadow-[var(--ga-shadow-sm)]",
      "hover": "hover:shadow-[var(--ga-shadow-md)] hover:border-[color:rgba(11,60,93,0.35)] transition-shadow transition-colors",
      "commodity_card_layout": [
        "Top: icon/monogram badge",
        "Title (h3)",
        "2-line description",
        "Footer: ‘Explore’ link button"
      ]
    },
    "navigation": {
      "desktop": {
        "component": "NavigationMenu",
        "products_dropdown": "Mega-dropdown style: 2 columns (categories + featured).",
        "featured_block": "Right side: ‘Company Profile PDF’ + ‘Risk & Logistics’ quick links."
      },
      "mobile": {
        "component": "Sheet",
        "pattern": "Accordion inside Sheet for multi-level Products."
      }
    },
    "forms_and_validation": {
      "pattern": "Use shadcn Form with react-hook-form + zod (if present).",
      "field_layout": "2-col on md for Name/Company/Email/Phone; single column on mobile.",
      "states": {
        "default": "border --ga-border",
        "focus": "ring --ga-focus",
        "error": "border --ga-danger + helper text",
        "success": "sonner toast + inline confirmation"
      },
      "required": [
        "All inputs must have <Label> and aria attributes.",
        "All interactive elements must include data-testid."
      ]
    },
    "world_map": {
      "approach": {
        "preferred": "Lightweight SVG world map with highlighted regions + tooltips",
        "avoid": "Heavy 3D globe"
      },
      "library": {
        "option_a": {
          "name": "react-simple-maps",
          "install": "npm i react-simple-maps",
          "usage_notes": [
            "Render a simplified world map; highlight regions/hubs with gold dots.",
            "Use Tooltip shadcn for hub details.",
            "Keep animations subtle (fade-in dots)."
          ]
        }
      },
      "visual": {
        "map_fill": "#e7ecf2",
        "map_stroke": "#cfd7e3",
        "hub_dot": "#d9a441",
        "hub_ring": "rgba(217,164,65,0.25)",
        "hover": "Dot grows from 6px to 8px; ring opacity increases"
      }
    },
    "market_insights_cards": {
      "meta": "Show category badge (e.g., ‘Grains’), date, read time.",
      "thumbnail": "Use 16:9 image with dark overlay on hover.",
      "hover": "Image zoom 1.03 + card shadow increase; keep motion 180–220ms."
    },
    "careers": {
      "job_cards": "Card with title, location, type, short summary, ‘View role’ button.",
      "apply_flow": "Job detail page has sticky apply card on desktop; on mobile, bottom sticky CTA button opens Dialog with form."
    },
    "pdf_download": {
      "pattern": "Use Button secondary + file icon; show file size and last updated date.",
      "data": "If file is static, store in /public and link directly."
    },
    "footer": {
      "layout": "4 columns on lg: Company, Products, Resources, Contact. 2 columns on sm.",
      "style": "Solid navy background, white text, gold separators (thin).",
      "extras": "Add small ‘GlobalAgri Commodities © YEAR’ and compliance links."
    }
  },
  "page_level_layout_notes": {
    "home": {
      "hero": {
        "structure": [
          "Full-bleed image with dark overlay",
          "Left-aligned headline (serif) + subheading",
          "Two CTAs: Primary (Contact Trading Desk), Secondary (Explore Products)",
          "Trust row: 3–4 items (e.g., ‘Global network’, ‘Risk-managed logistics’, ‘Quality assurance’, ‘Compliance-first’)"
        ],
        "background": "Use shipping port / global logistics image; overlay gradient per tokens."
      },
      "commodity_strip": "7 cards in a responsive grid; on mobile use horizontal ScrollArea with snap.",
      "pillars": "3 pillar cards with icon + short copy; optional Accordion for details.",
      "map_teaser": "Map preview card with 3 highlighted hubs + ‘View global presence’ CTA.",
      "sustainability_teaser": "Split section: text + image; include compliance badges.",
      "insights_teaser": "3 latest insight cards + ‘View all’ accent button."
    },
    "about": {
      "leadership": "Use Avatar + Card; keep bios short; link to modal for full bio."
    },
    "products_and_markets": {
      "overview": "Top filters (Select) for category + region; then category sections.",
      "subcategory_pages": "Hero-lite + spec table (Table) + logistics/risk callout card."
    },
    "risk_management_and_logistics": {
      "layout": "Timeline-like sections with icons; include ‘Process’ steps using Cards + Separator."
    },
    "sustainability_and_compliance": {
      "layout": "Pillars + document download cards; avoid greenwashing visuals; keep factual."
    },
    "market_insights": {
      "list": "Card grid with Pagination; optional search input.",
      "detail": "Breadcrumb + article typography; right rail for related insights + contact CTA."
    },
    "global_presence": {
      "map": "Full map with hubs; list of offices/hubs below in Table or Cards."
    },
    "careers": {
      "list": "Job cards + filters (location/type).",
      "detail": "Role description + apply form; include equal opportunity statement."
    },
    "contact": {
      "form": "Use shadcn Form; include Select for Country and Product interest; show success toast."
    }
  },
  "motion_and_microinteractions": {
    "principles": [
      "Motion should communicate hierarchy and state, not decoration.",
      "Use 180–240ms durations; easing: cubic-bezier(0.2, 0.8, 0.2, 1).",
      "Respect prefers-reduced-motion."
    ],
    "recommended_library": {
      "name": "framer-motion",
      "install": "npm i framer-motion",
      "use_cases": [
        "Section entrance (fade + slight y)",
        "Card hover lift",
        "Mobile sheet menu transitions"
      ],
      "js_scaffold": "import { motion } from 'framer-motion';\n\nexport const FadeIn = ({ children, delay = 0 }) => (\n  <motion.div\n    initial={{ opacity: 0, y: 10 }}\n    whileInView={{ opacity: 1, y: 0 }}\n    viewport={{ once: true, margin: '-80px' }}\n    transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}\n  >\n    {children}\n  </motion.div>\n);"
    },
    "hover_patterns": {
      "cards": "transition-shadow transition-colors duration-200 hover:shadow-[var(--ga-shadow-md)]",
      "links": "underline-offset-4 hover:underline decoration-[color:rgba(217,164,65,0.7)]",
      "hero_cta": "hover:translate-y-[-1px] active:translate-y-0 active:scale-[0.98]"
    }
  },
  "texture_and_detail": {
    "noise_overlay": {
      "goal": "Avoid flat corporate look; add subtle grain on hero and navy sections only.",
      "css": ".ga-noise::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.12\"/></svg>');\n  opacity: 0.18;\n  mix-blend-mode: overlay;\n}"
    },
    "dividers": "Use thin gold separators: h-px bg-[color:rgba(217,164,65,0.35)]"
  },
  "accessibility": {
    "requirements": [
      "WCAG AA contrast for text and controls.",
      "Visible focus states on all interactive elements.",
      "Form labels must be explicit; errors announced via aria-live region or inline text.",
      "Respect prefers-reduced-motion."
    ],
    "keyboard": [
      "NavigationMenu and dropdowns must be keyboard accessible (shadcn defaults help).",
      "Skip-to-content link at top of page."
    ]
  },
  "testing_attributes": {
    "rule": "All interactive and key informational elements MUST include data-testid (kebab-case, role-based).",
    "examples": [
      "data-testid=\"site-header-products-menu\"",
      "data-testid=\"hero-primary-cta-button\"",
      "data-testid=\"commodity-card-grains\"",
      "data-testid=\"insights-card-0\"",
      "data-testid=\"careers-apply-submit-button\"",
      "data-testid=\"contact-form-country-select\"",
      "data-testid=\"pdf-download-company-profile\""
    ]
  },
  "image_urls": {
    "hero": [
      {
        "url": "https://images.pexels.com/photos/4570835/pexels-photo-4570835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Drone shot of shipping containers at a major port; use for Home hero with dark overlay.",
        "category": "home-hero"
      }
    ],
    "products": [
      {
        "url": "https://images.pexels.com/photos/6489275/pexels-photo-6489275.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Close-up wheat field; use for Grains category header or card thumbnails.",
        "category": "products-grains"
      }
    ],
    "leadership": [
      {
        "url": "https://images.pexels.com/photos/36645466/pexels-photo-36645466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Neutral corporate headshot; use as placeholder for leadership bios.",
        "category": "about-leadership"
      },
      {
        "url": "https://images.pexels.com/photos/36464817/pexels-photo-36464817.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Neutral corporate headshot; use as placeholder for leadership bios.",
        "category": "about-leadership"
      }
    ]
  },
  "instructions_to_main_agent": {
    "global_css_updates": [
      "Replace CRA default App.css styles; do not center the app container.",
      "In /app/frontend/src/index.css: update shadcn HSL tokens to match GlobalAgri palette (navy primary, gold accent, light background).",
      "Add Google Fonts import for Spectral + IBM Plex Sans.",
      "Add utility classes: .h-serif, .ga-noise, and a .ga-section for consistent spacing."
    ],
    "component_build_notes_(js_not_tsx)": [
      "This repo uses .jsx components; create new components as .jsx.",
      "Use named exports for components; default exports for pages.",
      "Use shadcn/ui primitives from /app/frontend/src/components/ui (no raw HTML dropdowns/calendars/toasts).",
      "Use sonner for toasts (already present)."
    ],
    "navigation_implementation": [
      "Desktop: NavigationMenu with a mega-dropdown for Products & Markets (7 categories).",
      "Mobile: Sheet with Accordion for multi-level navigation.",
      "Add data-testid to all nav triggers and links."
    ],
    "world_map_implementation": [
      "Use react-simple-maps for Global Presence page and Home teaser.",
      "Keep map static + tooltips; highlight hubs with gold dots and subtle pulse ring."
    ],
    "performance": [
      "Use responsive images and lazy loading for below-the-fold sections.",
      "Avoid heavy animation; only animate opacity/transform on entrance and hover."
    ]
  }
}

<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>
