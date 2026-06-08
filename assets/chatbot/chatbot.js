/* ============================================================
   AQUA BOT v5 – Intelligent Chatbot (Rheem partnership)
   AQUASAFE Building Material LLC
   Pure vanilla JS – no dependencies
   ============================================================ */

(function () {
    'use strict';

    /* ==========================================================
       MASCOT ICON (Construction bot with hard hat & animated eyes)
       ========================================================== */
    var BOT_FACE_HTML =
        '<div class="aquabot-bot-face">' +
            '<div class="aquabot-hat"></div>' +
            '<div class="aquabot-head"></div>' +
            '<div class="aquabot-eyes"><div class="aquabot-eye"></div><div class="aquabot-eye"></div></div>' +
            '<div class="aquabot-mouth"></div>' +
            '<div class="aquabot-wrench">🔧</div>' +
        '</div>';

    var CLOSE_X_SVG = '<svg class="aquabot-close-x" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="white"/></svg>';

    /* Small avatar for message bubbles */
    var MSG_AVATAR_HTML =
        '<div class="aquabot-msg-avatar">' +
            '<div class="av-hat"></div>' +
            '<div class="av-head"></div>' +
            '<div class="av-eyes"><div class="av-dot"></div><div class="av-dot"></div></div>' +
        '</div>';

    /* Header avatar */
    var HEADER_AVATAR_HTML =
        '<div class="aquabot-header-avatar">' +
            '<div class="mini-hat"></div>' +
            '<div class="mini-head"></div>' +
            '<div class="mini-eyes"><div class="mini-eye"></div><div class="mini-eye"></div></div>' +
            '<div class="mini-smile"></div>' +
        '</div>';

    /* ==========================================================
       TOOLTIP MESSAGES
       ========================================================== */
    var TOOLTIPS = [
        'Hello 👋 I\'m Aqua Bot!',
        'Need reliable MEP solutions?',
        'Explore Grundfos, Rheem & more!',
        'Click to chat with me 💬'
    ];

    /* ==========================================================
       KNOWLEDGE BASE
       ========================================================== */
    var TAGLINE = 'AQUASAFE – Reliable MEP Solutions for UAE Construction 💧';

    var WELCOME_MSG =
        'Hey there! 👋 I\'m <strong>Aqua Bot</strong>, your MEP assistant.<br><br>' +
        'I can help you explore our <strong>products</strong>, learn about our <strong>brands</strong>, check <strong>services</strong>, or connect you with our sales team.<br><br>' +
        'What would you like to know?';

    var PRIMARY_MENU = [
        { label: '🔧 Our Products',        action: 'products' },
        { label: '🏷 Our Brands',           action: 'brands' },
        { label: '🛠 Services We Offer',    action: 'services' },
        { label: '🏗 Project Solutions',     action: 'projects' },
        { label: '📦 Download Brochures',   action: 'brochures' },
        { label: '💰 Request a Quotation',  action: 'quotation' },
        { label: '📞 Contact Us',           action: 'contact' }
    ];

    var PRODUCTS_MENU = [
        { label: '💧 Water Pumps',       action: 'prod_pumps' },
        { label: '🔵 Drainage Systems',  action: 'prod_drainage' },
        { label: '🟢 Plumbing Systems',  action: 'prod_plumbing' },
        { label: '🔴 Water Heaters (Rheem)', action: 'prod_heater' },
        { label: '⚙️ Valves & Fittings', action: 'prod_valves' },
        { label: '🟤 Manhole Covers',    action: 'prod_manhole' },
        { label: '📋 View All Products', type: 'link', url: 'products.html' }
    ];

    var BRANDS_MENU = [
        { label: '🇩🇰 Grundfos – Water Pumps',       action: 'brand_grundfos' },
        { label: '🇶🇦 Hepworth – Drainage',           action: 'brand_hepworth' },
        { label: '🇩🇪 Polymelt – Plumbing',           action: 'brand_polymelt' },
        { label: '🇺🇸 Rheem – Water Heaters',         action: 'brand_rheem' },
        { label: '⚙️ Vybik – Valves',                 action: 'brand_vybik' },
        { label: '🏭 Allied Iron – Manhole Covers',   action: 'brand_allied' }
    ];

    var RESPONSES = {

        /* ---- Products ---- */
        products: {
            text: 'Great choice! We supply a comprehensive range of MEP products for the UAE construction industry. 🏗️<br><br>Which product category interests you?',
            buttons: PRODUCTS_MENU
        },

        prod_pumps: {
            text: '<strong>Water Pumps – Grundfos</strong> 🇩🇰<br><br>' +
                'World\'s leading energy-efficient pumping solutions:<br><br>' +
                '• Booster Pumps & Systems<br>• Submersible Pumps<br>• Circulation Pumps (HVAC)<br>• Domestic Pumps<br>• Vertical Multi-Stage Pumps<br><br>' +
                'Perfect for residential, commercial, and industrial projects.',
            buttons: [
                { label: '🔗 View Water Pumps', type: 'link', url: 'products-water-pumps.html' },
                { label: '🏷 Grundfos Details', type: 'link', url: 'brand-grundfos.html' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 Products', action: 'products' }
            ]
        },

        prod_drainage: {
            text: '<strong>Drainage Systems – Hepworth</strong> 🇶🇦<br><br>' +
                'Premium thermoplastic drainage piping solutions:<br><br>' +
                '• uPVC Drainage Pipes & Fittings (BS EN 1401)<br>• uPVC Soil & Waste Pipes<br>• HDPE Pipes (Wavin)<br>• uPVC Duct & Pressure Pipes<br><br>' +
                'Ideal for building, civil engineering, and industrial drainage.',
            buttons: [
                { label: '🔗 View Drainage', type: 'link', url: 'products-drainage-system.html' },
                { label: '🏷 Hepworth Details', type: 'link', url: 'brand-hepworth.html' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 Products', action: 'products' }
            ]
        },

        prod_plumbing: {
            text: '<strong>Plumbing Systems – Polymelt</strong> 🇩🇪<br><br>' +
                'German-engineered PP-R & PP-RCT piping with 60+ years of excellence:<br><br>' +
                '• ECOSAN PP-R/PP-RCT Pipes<br>• POLYMUTAN PP-R Pipes<br>• UV Resistant PP-R Pipes<br>• Mechanical PP-RCT Pipes<br><br>' +
                '50+ year service life, 100% recyclable, certified by SKZ, DVGW, WRAS.',
            buttons: [
                { label: '🔗 View Plumbing', type: 'link', url: 'products-plumbing-system.html' },
                { label: '🏷 Polymelt Details', type: 'link', url: 'brand-polymelt.html' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 Products', action: 'products' }
            ]
        },

        prod_heater: {
            text: '<strong>Water Heaters – Rheem</strong> 🇺🇸<br><br>' +
                'Aquasafe partners with <strong>Rheem</strong>, a global water heating leader since 1925.<br><br>' +
                '<strong>Fury® 82V Electric Storage</strong> (30–120 gallon):<br>' +
                '• Resistored heating elements & premium anode rod<br>' +
                '• Exclusive Rheemglas tank lining<br>' +
                '• R-Foam polyurethane insulation<br>' +
                '• EverKleen™ self-cleaning technology<br>' +
                '• 21 GPH recovery at 90°F rise<br><br>' +
                'Models: 82V30, 82V40, 82V52, 82V66, 82V80, 82V120 — for villas, apartments, hotels & commercial buildings.',
            buttons: [
                { label: '🔗 View Water Heaters', type: 'link', url: 'products-water-heater.html' },
                { label: '🏷 Rheem Brand Page', type: 'link', url: 'brand-rheem.html' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 Products', action: 'products' }
            ]
        },

        prod_valves: {
            text: '<strong>Valves & Fittings – Vybik</strong> ⚙️<br><br>' +
                'High-performance precision valve solutions:<br><br>' +
                '• Brass Ball Valves (full-port, quarter-turn)<br>• Manifold Splitters (multi-outlet)<br>• Brass Fittings<br><br>' +
                'Suitable for water, oil, and gas applications.',
            buttons: [
                { label: '🔗 View Valves', type: 'link', url: 'products-valves.html' },
                { label: '🏷 Vybik Details', type: 'link', url: 'brand-vybik.html' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 Products', action: 'products' }
            ]
        },

        prod_manhole: {
            text: '<strong>Manhole Covers – Allied Iron</strong> 🏭<br><br>' +
                'Heavy-duty ductile & grey iron castings (25+ years, 670+ patterns):<br><br>' +
                '• Circular & Square Covers<br>• Recessed Covers<br>• Double Triangular Covers<br>• Gully Gratings & Channel Gratings<br><br>' +
                'Compliant with EN124-2, ISO 9001 & KITEMARK certified.',
            buttons: [
                { label: '🔗 View Manhole Covers', type: 'link', url: 'products-manhole-covers.html' },
                { label: '🏷 Allied Iron Details', type: 'link', url: 'brand-allied-iron.html' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 Products', action: 'products' }
            ]
        },

        /* ---- Brands ---- */
        brands: {
            text: 'We partner with world-class manufacturers. 🌍<br><br>Each brand is selected for quality, durability, and compliance with UAE standards. Which one interests you?',
            buttons: BRANDS_MENU
        },

        brand_grundfos: {
            text: '<strong>Grundfos</strong> 🇩🇰 – World\'s Largest Pump Manufacturer<br><br>' +
                '🏢 Founded 1945 in Denmark<br>👥 19,000+ employees<br>🌍 Present in 60+ countries<br>📊 16M+ pumps/year<br><br>' +
                '<strong>Certifications:</strong> ISO 9001, ISO 14001, ISO 50001, CE, WRAS, FM/UL<br><br>' +
                '<strong>Range:</strong> Booster, Submersible, Circulation, End Suction, Domestic & Multi-Stage Pumps.',
            buttons: [
                { label: '🔗 Visit Grundfos Page', type: 'link', url: 'brand-grundfos.html' },
                { label: '💧 Water Pumps', action: 'prod_pumps' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 All Brands', action: 'brands' }
            ]
        },

        brand_hepworth: {
            text: '<strong>Hepworth</strong> 🇶🇦 – Middle East\'s Premier Piping Solutions<br><br>' +
                '🏢 Established 2003, Qatar<br>🏆 First KITEMARK in Qatar<br>📦 8+ product solutions<br><br>' +
                '<strong>Certifications:</strong> ISO 9001, ISO 14001, ISO 45001, KITEMARK<br><br>' +
                '<strong>Range:</strong> uPVC Drainage, Soil & Waste, Pressure Pipes, Duct Pipes, HDPE (Wavin).',
            buttons: [
                { label: '🔗 Visit Hepworth Page', type: 'link', url: 'brand-hepworth.html' },
                { label: '🔵 Drainage Systems', action: 'prod_drainage' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 All Brands', action: 'brands' }
            ]
        },

        brand_polymelt: {
            text: '<strong>Polymelt</strong> 🇩🇪 – 60+ Years of German Piping Excellence<br><br>' +
                '🌍 Serving 20+ countries<br>♻️ 100% recyclable<br>📜 4 global certifications<br><br>' +
                '<strong>Certifications:</strong> SKZ, DVGW, WRAS, ICC (NSF/ASTM)<br><br>' +
                '<strong>Key:</strong> 50+ year service life, corrosion-free.<br><strong>Range:</strong> ECOSAN, POLYMUTAN, UV Resistant, Mechanical PP-RCT.',
            buttons: [
                { label: '🔗 Visit Polymelt Page', type: 'link', url: 'brand-polymelt.html' },
                { label: '🟢 Plumbing Systems', action: 'prod_plumbing' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 All Brands', action: 'brands' }
            ]
        },

        brand_rheem: {
            text: '<strong>Rheem</strong> 🇺🇸 – Integrated Home Comfort<br><br>' +
                'Global water heating leader since 1925 — tank, tankless, gas & heat-pump solutions.<br><br>' +
                '<strong>Range:</strong> Fury® 82V Electric Storage (30–120 gal)<br>' +
                '• Resistored elements & Rheemglas lining<br>' +
                '• R-Foam insulation & EverKleen™ self-cleaning<br>' +
                '• 21 GPH recovery · 150 PSI working pressure<br><br>' +
                'Supplied by Aquasafe Trading across UAE.',
            buttons: [
                { label: '🔗 Visit Rheem Page', type: 'link', url: 'brand-rheem.html' },
                { label: '🔴 Water Heaters', action: 'prod_heater' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 All Brands', action: 'brands' }
            ]
        },

        brand_vybik: {
            text: '<strong>Vybik</strong> ⚙️ – Precision Valve Solutions<br><br>' +
                'High-performance valves for industrial, commercial, and building applications.<br><br>' +
                '<strong>Products:</strong> Full-port Brass Ball Valves, Manifold Splitters, Brass Fittings.<br><br>' +
                'Built for durability and precision flow control — water, oil & gas.',
            buttons: [
                { label: '🔗 Visit Vybik Page', type: 'link', url: 'brand-vybik.html' },
                { label: '⚙️ Valves', action: 'prod_valves' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 All Brands', action: 'brands' }
            ]
        },

        brand_allied: {
            text: '<strong>Allied Iron Products (AIPPL)</strong> 🏭 – 25+ Years Trusted Iron Foundry<br><br>' +
                '⚙️ 12,000 MT capacity<br>📐 670+ patterns<br>🔁 98% repeat rate<br><br>' +
                '<strong>Certifications:</strong> ISO 9001, ISO 45001, ISO 14001, KITEMARK<br><br>' +
                '<strong>Products:</strong> Municipal Castings, Manhole Covers, Gully Gratings, Railway & Industrial Castings.',
            buttons: [
                { label: '🔗 Visit Allied Iron Page', type: 'link', url: 'brand-allied-iron.html' },
                { label: '🟤 Manhole Covers', action: 'prod_manhole' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 All Brands', action: 'brands' }
            ]
        },

        /* ---- Services ---- */
        services: {
            text: 'We offer end-to-end MEP services across the UAE. 🛠️<br><br>What kind of support do you need?',
            buttons: [
                { label: '📦 Supply & Distribution', action: 'svc_supply' },
                { label: '🚚 Delivery Services',     action: 'svc_delivery' },
                { label: '🧑‍💼 Consultation',          action: 'svc_consult' },
                { label: '🔍 Custom Sourcing',        action: 'svc_custom' },
                { label: '🔧 Technical Support',      action: 'svc_support' },
                { label: '🤝 Project Partnership',    action: 'svc_partner' },
                { label: '📋 View All Services', type: 'link', url: 'services.html' }
            ]
        },

        svc_supply: {
            text: '<strong>Product Supply & Distribution</strong> 📦<br><br>' +
                'Authorized distributor of premium building materials:<br><br>' +
                '✅ Quality-assured products<br>✅ Competitive bulk pricing<br>✅ UAE-wide availability<br>✅ Large ready stock',
            buttons: [
                { label: '🔗 Our Services', type: 'link', url: 'services.html' },
                { label: '🔧 Our Products', action: 'products' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 Services', action: 'services' }
            ]
        },

        svc_delivery: {
            text: '<strong>Delivery Services</strong> 🚚<br><br>' +
                'On-time delivery across the UAE:<br><br>' +
                '✅ On-time guarantee<br>✅ Safe handling & packaging<br>✅ Flexible scheduling<br>✅ UAE-wide (Al Ain, Abu Dhabi, Dubai & beyond)',
            buttons: [
                { label: '📞 Contact for Delivery', action: 'contact' },
                { label: '🔙 Services', action: 'services' }
            ]
        },

        svc_consult: {
            text: '<strong>Consultation & Product Selection</strong> 🧑‍💼<br><br>' +
                'Our experts help you choose the right materials — considering climate, budget & specs.<br><br>' +
                '✅ Expert guidance<br>✅ Project-specific recommendations<br>✅ Budget alternatives<br>✅ Technical spec support',
            buttons: [
                { label: '📞 Book Consultation', action: 'contact' },
                { label: '💬 WhatsApp Us', type: 'whatsapp' },
                { label: '🔙 Services', action: 'services' }
            ]
        },

        svc_custom: {
            text: '<strong>Custom Orders & Sourcing</strong> 🔍<br><br>' +
                'Need something specific? We source from our international network.<br><br>' +
                '✅ Special product sourcing<br>✅ Custom specifications<br>✅ International procurement<br>✅ Bulk order arrangements',
            buttons: [
                { label: '📧 Send Requirements', type: 'email' },
                { label: '💬 WhatsApp Us', type: 'whatsapp' },
                { label: '🔙 Services', action: 'services' }
            ]
        },

        svc_support: {
            text: '<strong>Technical Support & After-Sales</strong> 🔧<br><br>' +
                'We\'re here to help with installation, troubleshooting & warranty:<br><br>' +
                '✅ Installation guidance<br>✅ Troubleshooting help<br>✅ Warranty support<br>✅ Product replacement',
            buttons: [
                { label: '📞 Contact Support', action: 'contact' },
                { label: '💬 WhatsApp Support', type: 'whatsapp' },
                { label: '🔙 Services', action: 'services' }
            ]
        },

        svc_partner: {
            text: '<strong>Project Partnership</strong> 🤝<br><br>' +
                'End-to-end MEP supply chain solutions for contractors, developers & project managers:<br><br>' +
                '✅ Dedicated project managers<br>✅ Long-term supply agreements<br>✅ Credit facilities<br>✅ Priority fulfillment',
            buttons: [
                { label: '📞 Discuss Partnership', action: 'contact' },
                { label: '💬 WhatsApp Us', type: 'whatsapp' },
                { label: '🔙 Services', action: 'services' }
            ]
        },

        /* ---- Projects ---- */
        projects: {
            text: 'We provide complete MEP solutions for both <strong>commercial</strong> and <strong>residential</strong> projects across the UAE. 🏗️<br><br>' +
                'Our team collaborates with contractors, consultants & developers. What type of project?',
            buttons: [
                { label: '🏢 Commercial/Industrial', action: 'proj_commercial' },
                { label: '🏠 Residential', action: 'proj_residential' },
                { label: '🔗 View Our Projects', type: 'link', url: 'projects.html' },
                { label: '💰 Get Quote', action: 'quotation' }
            ]
        },

        proj_commercial: {
            text: '<strong>Commercial & Industrial Projects</strong> 🏢<br><br>' +
                'We supply efficient MEP systems for malls, offices, factories & infrastructure:<br><br>' +
                '• High-capacity Grundfos pumps<br>• Industrial-grade Hepworth drainage<br>• Polymelt piping for HVAC<br>• Commercial Rheem water heaters',
            buttons: [
                { label: '🔧 Explore Products', action: 'products' },
                { label: '🤝 Project Partnership', action: 'svc_partner' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 Projects', action: 'projects' }
            ]
        },

        proj_residential: {
            text: '<strong>Residential Projects</strong> 🏠<br><br>' +
                'Reliable systems for villas, apartments & housing developments:<br><br>' +
                '• Polymelt PP-R piping for potable water<br>• Rheem domestic water heaters<br>• Grundfos home booster pumps<br>• Vybik valves & fittings',
            buttons: [
                { label: '🔧 Explore Products', action: 'products' },
                { label: '🧑‍💼 Consultation', action: 'svc_consult' },
                { label: '💰 Get Quote', action: 'quotation' },
                { label: '🔙 Projects', action: 'projects' }
            ]
        },

        /* ---- Brochures ---- */
        brochures: {
            text: '<strong>Product Brochures</strong> 📦<br><br>' +
                'Download technical brochures:<br><br>' +
                '<strong>Polymelt:</strong> POLYMUTAN PP-R, ECOSAN PP-R/PP-RCT, Mechanical PP-RCT, UV PP-R<br>' +
                '<strong>Hepworth:</strong> uPVC Drainage, Pressure Pipes, Soil & Waste, Duct Pipes, Wavin HDPE<br><br>' +
                'Visit our products page or email us to receive them.',
            buttons: [
                { label: '📋 Products & Brochures', type: 'link', url: 'products.html' },
                { label: '📧 Email for Brochures', type: 'email' },
                { label: '💬 WhatsApp Us', type: 'whatsapp' },
                { label: '🔙 Main Menu', action: 'home' }
            ]
        },

        /* ---- Quotation ---- */
        quotation: {
            text: '<strong>Request a Quotation</strong> 💰<br><br>' +
                'Share your BOQ or requirements — our team will respond within 24 hours:<br><br>' +
                '<span class="aq-contact-line">📧 <a href="mailto:sales@aquasafeuae.com">sales@aquasafeuae.com</a></span>' +
                '<span class="aq-contact-line">📱 <a href="https://wa.me/971565044257" target="_blank" rel="noopener">+971 56 504 4257</a> (WhatsApp)</span>' +
                '<span class="aq-contact-line">📞 <a href="tel:+97137349475">+971 3 734 9475</a> (Office)</span>',
            buttons: [
                { label: '📧 Send Email', type: 'email' },
                { label: '💬 Chat on WhatsApp', type: 'whatsapp' },
                { label: '📝 Contact Form', type: 'link', url: 'contact.html' },
                { label: '🔙 Main Menu', action: 'home' }
            ]
        },

        /* ---- Contact ---- */
        contact: {
            text: '<strong>Contact Our Team</strong> 📞<br><br>' +
                '<span class="aq-contact-line">📧 <a href="mailto:sales@aquasafeuae.com">sales@aquasafeuae.com</a></span>' +
                '<span class="aq-contact-line">📱 <a href="https://wa.me/971565044257" target="_blank" rel="noopener">+971 56 504 4257</a> (WhatsApp)</span>' +
                '<span class="aq-contact-line">📞 <a href="tel:+97137349475">+971 3 734 9475</a> (Office)</span>' +
                '<span class="aq-contact-line">📍 Al Ain, Abu Dhabi, UAE</span><br>' +
                '<strong>Hours:</strong> Sun–Thu 9AM-6PM · Sat 10AM-4PM · Fri Closed',
            buttons: [
                { label: '📧 Send Email', type: 'email' },
                { label: '💬 Chat on WhatsApp', type: 'whatsapp' },
                { label: '📝 Contact Form', type: 'link', url: 'contact.html' },
                { label: '🔗 About AQUASAFE', type: 'link', url: 'about.html' },
                { label: '🔙 Main Menu', action: 'home' }
            ]
        }
    };

    /* ==========================================================
       BUILD DOM
       ========================================================== */
    function buildChatbot() {
        /* Toggle button */
        var toggle = document.createElement('button');
        toggle.className = 'aquabot-toggle';
        toggle.setAttribute('aria-label', 'Open Aqua Bot chat');
        toggle.setAttribute('title', 'Chat with Aqua Bot');
        toggle.innerHTML = BOT_FACE_HTML + CLOSE_X_SVG;

        /* Tooltip */
        var tooltip = document.createElement('div');
        tooltip.className = 'aquabot-tooltip';
        tooltip.textContent = TOOLTIPS[0];

        /* Chat window - NO .open class = hidden */
        var win = document.createElement('div');
        win.className = 'aquabot-window';
        win.setAttribute('role', 'dialog');
        win.setAttribute('aria-label', 'Aqua Bot Chat');
        win.innerHTML =
            '<div class="aquabot-header">' +
                HEADER_AVATAR_HTML +
                '<div class="aquabot-header-info">' +
                    '<div class="aquabot-header-name">Aqua Bot 🔧</div>' +
                    '<div class="aquabot-header-company">AQUASAFE Building Material LLC</div>' +
                    '<div class="aquabot-header-status">Online</div>' +
                '</div>' +
                '<button class="aquabot-close" aria-label="Close chat">&times;</button>' +
            '</div>' +
            '<div class="aquabot-messages"></div>' +
            '<div class="aquabot-footer">Powered by AQUASAFE</div>';

        document.body.appendChild(toggle);
        document.body.appendChild(tooltip);
        document.body.appendChild(win);

        return { toggle: toggle, tooltip: tooltip, win: win };
    }

    /* ==========================================================
       HELPERS
       ========================================================== */
    function area() {
        return document.querySelector('.aquabot-messages');
    }

    function scrollBot() {
        var el = area();
        if (el) requestAnimationFrame(function () { el.scrollTop = el.scrollHeight; });
    }

    function makeBubble(html, isUser) {
        var d = document.createElement('div');
        d.className = 'aquabot-msg' + (isUser ? ' user' : '');
        d.innerHTML = (isUser ? '' : MSG_AVATAR_HTML) +
            '<div class="aquabot-msg-bubble">' + html + '</div>';
        return d;
    }

    function showTyping() {
        var m = area();
        var t = document.createElement('div');
        t.className = 'aquabot-typing';
        t.innerHTML = MSG_AVATAR_HTML +
            '<div class="aquabot-typing-dots"><span></span><span></span><span></span></div>';
        m.appendChild(t);
        scrollBot();
        return t;
    }

    function removeEl(el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
    }

    function disableButtons() {
        var btns = area().querySelectorAll('.aquabot-action-btn:not([disabled])');
        for (var i = 0; i < btns.length; i++) btns[i].disabled = true;
    }

    function addTagline() {
        var m = area();
        var t = document.createElement('div');
        t.className = 'aquabot-tagline';
        t.textContent = TAGLINE;
        m.appendChild(t);
        scrollBot();
    }

    /* Track conversation depth */
    var conversationDepth = 0;

    /* ==========================================================
       BUILD ACTION BUTTONS
       ========================================================== */
    function buildButtons(buttons) {
        var wrap = document.createElement('div');
        wrap.className = 'aquabot-actions';

        for (var i = 0; i < buttons.length; i++) {
            (function (btn) {
                var b = document.createElement('button');
                b.className = 'aquabot-action-btn';
                b.textContent = btn.label;

                if (btn.type === 'whatsapp') {
                    b.classList.add('whatsapp');
                    b.addEventListener('click', function () {
                        window.open('https://wa.me/971565044257', '_blank');
                    });
                } else if (btn.type === 'email') {
                    b.classList.add('email');
                    b.addEventListener('click', function () {
                        window.location.href = 'mailto:sales@aquasafeuae.com';
                    });
                } else if (btn.type === 'link') {
                    b.classList.add('link');
                    b.addEventListener('click', function () {
                        window.open(btn.url, '_blank');
                    });
                } else if (btn.action === 'home') {
                    b.addEventListener('click', function () { goHome(); });
                } else if (btn.action) {
                    b.addEventListener('click', function () {
                        handleAction(btn.action, btn.label);
                    });
                }

                wrap.appendChild(b);
            })(buttons[i]);
        }

        return wrap;
    }

    /* ==========================================================
       CORE FLOW
       ========================================================== */
    function showWelcome() {
        var m = area();
        m.innerHTML = '';
        conversationDepth = 0;

        m.appendChild(makeBubble(WELCOME_MSG, false));

        var btns = [];
        for (var i = 0; i < PRIMARY_MENU.length; i++) {
            btns.push({ label: PRIMARY_MENU[i].label, action: PRIMARY_MENU[i].action });
        }
        m.appendChild(buildButtons(btns));
        scrollBot();
    }

    function goHome() {
        var m = area();
        conversationDepth = 0;

        m.appendChild(makeBubble('🏠 Main Menu', true));
        scrollBot();

        var typing = showTyping();
        setTimeout(function () {
            removeEl(typing);
            m.appendChild(makeBubble('Sure! How else can I help you today? 😊', false));

            var btns = [];
            for (var i = 0; i < PRIMARY_MENU.length; i++) {
                btns.push({ label: PRIMARY_MENU[i].label, action: PRIMARY_MENU[i].action });
            }
            m.appendChild(buildButtons(btns));
            addTagline();
            scrollBot();
        }, 700);
    }

    function handleAction(key, label) {
        /* Legacy action alias – any old Ariston reference routes to Rheem */
        if (key === 'brand_ariston') {
            key = 'brand_rheem';
        }

        var data = RESPONSES[key];
        if (!data) return;

        var m = area();
        disableButtons();
        conversationDepth++;

        m.appendChild(makeBubble(label, true));
        scrollBot();

        var typing = showTyping();

        setTimeout(function () {
            removeEl(typing);
            m.appendChild(makeBubble(data.text, false));

            if (data.buttons && data.buttons.length) {
                m.appendChild(buildButtons(data.buttons));
            }

            addTagline();

            /* Back to main if no explicit home button */
            var hasHome = false;
            if (data.buttons) {
                for (var i = 0; i < data.buttons.length; i++) {
                    if (data.buttons[i].action === 'home') { hasHome = true; break; }
                }
            }

            if (!hasHome) {
                var back = document.createElement('button');
                back.className = 'aquabot-back-btn';
                back.innerHTML = '← Back to Main Menu';
                back.addEventListener('click', function () { goHome(); });
                m.appendChild(back);
            }

            scrollBot();
        }, 900);
    }

    /* ==========================================================
       LEAVE CONVERSATION DIALOG
       ========================================================== */
    function showLeaveDialog(win, onConfirm, onCancel) {
        var overlay = document.createElement('div');
        overlay.className = 'aquabot-leave-overlay';
        overlay.innerHTML =
            '<div class="aquabot-leave-box">' +
                '<p>Leave this conversation?</p>' +
                '<p class="aq-leave-sub">Your chat history will be cleared.</p>' +
                '<div class="aquabot-leave-btns">' +
                    '<button class="aq-leave-yes">Yes, close</button>' +
                    '<button class="aq-leave-no">Continue chat</button>' +
                '</div>' +
            '</div>';

        win.appendChild(overlay);

        overlay.querySelector('.aq-leave-yes').addEventListener('click', function () {
            removeEl(overlay);
            if (onConfirm) onConfirm();
        });

        overlay.querySelector('.aq-leave-no').addEventListener('click', function () {
            removeEl(overlay);
            if (onCancel) onCancel();
        });
    }

    /* ==========================================================
       INIT
       ========================================================== */
    function init() {
        var els = buildChatbot();
        var toggle = els.toggle;
        var tooltip = els.tooltip;
        var win = els.win;
        var closeBtn = win.querySelector('.aquabot-close');

        var isOpen = false;
        var welcomeShown = false;
        var tooltipIdx = 0;

        function openChat() {
            isOpen = true;
            toggle.classList.add('active');
            win.classList.add('open');
            toggle.setAttribute('aria-label', 'Close Aqua Bot chat');
            tooltip.classList.remove('visible');

            if (!welcomeShown) {
                welcomeShown = true;
                /* Small delay so the window renders first */
                setTimeout(showWelcome, 50);
            }
            setTimeout(scrollBot, 100);
        }

        function closeChat() {
            isOpen = false;
            toggle.classList.remove('active');
            win.classList.remove('open');
            toggle.setAttribute('aria-label', 'Open Aqua Bot chat');
        }

        function resetAndClose() {
            closeChat();
            welcomeShown = false;
            conversationDepth = 0;
            var m = area();
            if (m) m.innerHTML = '';
        }

        function tryClose() {
            /* If user is mid-conversation (depth > 0), ask to confirm */
            if (conversationDepth > 0) {
                showLeaveDialog(win, resetAndClose, function () { /* cancelled, do nothing */ });
            } else {
                closeChat();
            }
        }

        function toggleChat() {
            if (isOpen) {
                tryClose();
            } else {
                openChat();
            }
        }

        /* --- Tooltip rotation --- */
        setTimeout(function () {
            if (!isOpen) tooltip.classList.add('visible');
        }, 2000);

        setInterval(function () {
            if (isOpen) return;
            tooltip.classList.remove('visible');
            setTimeout(function () {
                tooltipIdx = (tooltipIdx + 1) % TOOLTIPS.length;
                tooltip.textContent = TOOLTIPS[tooltipIdx];
                if (!isOpen) tooltip.classList.add('visible');
            }, 400);
        }, 3500);

        /* --- Events --- */
        toggle.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', function () { tryClose(); });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen) tryClose();
        });

        /* --- Nuke any stuck localStorage from old versions --- */
        try { localStorage.removeItem('aquabot_open'); } catch (e) {}
    }

    /* DOM Ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
