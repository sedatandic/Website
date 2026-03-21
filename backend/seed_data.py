import datetime

def seed_database(db):
    """Seed insights and jobs collections if empty."""
    
    # ── Seed Insights ──
    if db.insights.count_documents({}) == 0:
        insights = [
            {
                "slug": "black-sea-wheat-update-q1-2025",
                "title": "Black Sea Wheat Update: Q1 2025 Outlook",
                "excerpt": "Export dynamics from the Black Sea region continue to shape global wheat markets. We examine key supply indicators and pricing trends.",
                "content": """The Black Sea region remains the world's most critical wheat export corridor. As we enter Q1 2025, several factors are shaping the outlook:\n\n**Supply Fundamentals**\nUkraine and Russia continue to dominate global wheat exports, accounting for approximately 30% of world trade. The 2024/25 crop estimates suggest production levels broadly in line with last year, though quality variations remain a concern.\n\n**Pricing Dynamics**\nFOB prices from Black Sea ports have remained competitive relative to European and North American origins. Basis levels have narrowed as logistics bottlenecks eased following infrastructure investments at key terminals.\n\n**Freight Considerations**\nHandysize and Panamax rates on Black Sea routes have shown seasonal softening, creating opportunities for CIF buyers in North Africa and the Middle East.\n\n**Policy Landscape**\nExport quotas and duty mechanisms continue to influence timing of shipments. Traders should monitor announcements from both Moscow and Kyiv regarding any changes to existing frameworks.\n\n**Our View**\nWe expect continued price competitiveness from the region through Q1, with potential upside risk if weather conditions impact Southern Hemisphere crops.""",
                "category": "Grains",
                "date": datetime.datetime(2025, 1, 15),
                "read_time": "5 min read",
                "image": "https://images.pexels.com/photos/6489275/pexels-photo-6489275.jpeg?auto=compress&cs=tinysrgb&w=800"
            },
            {
                "slug": "freight-market-snapshot-dec-2024",
                "title": "Freight Market Snapshot: December 2024",
                "excerpt": "A review of dry bulk freight rates and their implications for agricultural commodity flows heading into the new year.",
                "content": """Dry bulk freight markets experienced notable volatility in Q4 2024, with implications across the agricultural commodity supply chain.\n\n**Handysize Segment**\nRates for grain-suitable vessels (28,000–38,000 DWT) averaged around $12,500/day in December, down 8% from October peaks. This decline reflects seasonal patterns and a modest fleet supply increase.\n\n**Panamax/Kamsarmax**\nLarger vessel rates held firmer, supported by strong coal and iron ore demand from Asia. Agricultural charterers face competition for tonnage on key routes.\n\n**Key Route Analysis**\n- Black Sea to North Africa: TC rates softened, benefiting grain importers.\n- South America to China: Rates remain elevated due to soybean shipment season overlap.\n- Australia to Southeast Asia: Stable, with wheat exports supporting demand.\n\n**Outlook**\nWe anticipate a gradual recovery in rates through Q1 2025 as South American soybean exports peak. Charterers should consider forward fixing where possible.""",
                "category": "Logistics",
                "date": datetime.datetime(2024, 12, 20),
                "read_time": "4 min read",
                "image": "https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=800"
            },
            {
                "slug": "pulse-market-india-export-ban",
                "title": "India Pulse Export Policies: Impact on Global Supply",
                "excerpt": "Changes in India's pulse export policies are reshaping trade flows. We assess the impact on lentil and chickpea markets.",
                "content": """India's evolving approach to pulse exports continues to be a major factor in global supply dynamics.\n\n**Background**\nAs the world's largest pulse consumer and a significant producer, India's trade policies have outsized effects on global availability and pricing of lentils, chickpeas, and dry peas.\n\n**Recent Developments**\nRecent adjustments to minimum export prices and stock limits have created both challenges and opportunities for international traders. The relaxation of certain restrictions has opened windows for Canadian and Australian origin pulses.\n\n**Market Impact**\n- Lentil prices in key FOB origins have seen 5-8% increases since the policy shift.\n- Chickpea trade flows are redirecting toward alternative destinations in the Middle East and Europe.\n- Dry pea markets remain relatively insulated due to strong feed demand.\n\n**Implications for Buyers**\nIndustrial users should consider diversifying their origin portfolio and locking in forward contracts where possible. We are seeing increased interest in East African pulse origins as a supplementary source.""",
                "category": "Pulses",
                "date": datetime.datetime(2025, 2, 5),
                "read_time": "4 min read",
                "image": "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=800"
            },
            {
                "slug": "soybean-crush-margins-south-america",
                "title": "South American Soybean Crush Margins Under Pressure",
                "excerpt": "A deep dive into crush margins in Brazil and Argentina, and what it means for global oilseed and meal trade.",
                "content": """Crush margins in South America's two largest soybean processors are under pressure heading into the 2025 harvest season.\n\n**Brazil**\nRecord production expectations of 165-170 million metric tons are weighing on basis levels. However, strong biodiesel mandates provide structural support for domestic crush demand.\n\n**Argentina**\nThe recovery in Argentine production following last year's drought has improved crush facility utilization rates. However, currency controls and differential export taxes continue to distort margins.\n\n**Global Implications**\n- Soymeal export competitiveness from Argentina has improved, putting pressure on US Gulf meal prices.\n- Soyoil markets face competition from palm oil, which has regained price competitiveness.\n\n**Trading Opportunities**\nWe see value in basis trades between South American and Black Sea sunflower meal, particularly for Mediterranean buyers.""",
                "category": "Oilseeds",
                "date": datetime.datetime(2025, 1, 28),
                "read_time": "5 min read",
                "image": "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=800"
            },
            {
                "slug": "coffee-robusta-vietnam-update",
                "title": "Vietnamese Robusta: Production Concerns and Price Rally",
                "excerpt": "Weather-related production concerns in Vietnam are supporting Robusta coffee prices at multi-year highs.",
                "content": """Robusta coffee prices have surged to levels not seen in over a decade, driven primarily by supply concerns from Vietnam, the world's largest Robusta producer.\n\n**Production Outlook**\nUnfavorable weather patterns, including delayed rains in key growing provinces, have prompted analysts to lower 2024/25 crop estimates to 26-27 million bags, down from the five-year average of 29 million bags.\n\n**Price Action**\nLondon Robusta futures have broken through the $3,000/ton level, supported by tight physical supplies and aggressive short-covering by speculative funds.\n\n**Impact on Blenders**\nRoasters who rely on Robusta for blend components face margin pressure. Some are exploring substitution with lower-grade Arabicas from Brazil, though availability is limited.\n\n**Our Recommendation**\nBuyers should consider securing forward coverage for Q2-Q3 2025 requirements. We are positioned to offer Vietnamese and Indonesian origins with flexible pricing structures.""",
                "category": "Coffee",
                "date": datetime.datetime(2025, 2, 12),
                "read_time": "4 min read",
                "image": "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800"
            },
            {
                "slug": "sugar-market-raw-refined-spread",
                "title": "Raw-Refined Sugar Spread: Trading the Premium",
                "excerpt": "The raw-refined sugar spread has widened significantly, creating opportunities for physical traders and refiners.",
                "content": """The spread between raw and refined sugar prices has reached levels that warrant attention from both physical traders and risk managers.\n\n**Current Dynamics**\nThe white premium (difference between London No. 5 white sugar and New York No. 11 raw sugar) has expanded to over $120/ton, well above the historical average of $70-80/ton.\n\n**Drivers**\n- Refining capacity constraints in the Middle East and North Africa.\n- Strong demand for refined sugar from food manufacturers in Asia.\n- Limited toll refining availability as existing refineries prioritize term commitments.\n\n**Trading Implications**\nThis environment favors origin refiners in Brazil and Thailand who can capture the premium. For destination buyers, securing refined sugar supply from non-traditional origins (e.g., India, UAE) may offer cost advantages.\n\n**Risk Considerations**\nTraders should be mindful of the correlation between the white premium and freight rates, as shipping costs can erode margin on physical arbitrage.""",
                "category": "Sugar",
                "date": datetime.datetime(2025, 2, 1),
                "read_time": "5 min read",
                "image": "https://images.pexels.com/photos/2523650/pexels-photo-2523650.jpeg?auto=compress&cs=tinysrgb&w=800"
            }
        ]
        db.insights.insert_many(insights)
        print("Seeded insights collection")

    # ── Seed Jobs ──
    if db.jobs.count_documents({}) == 0:
        jobs = [
            {
                "slug": "senior-grains-trader",
                "title": "Senior Grains Trader",
                "location": "Geneva, Switzerland",
                "department": "Trading",
                "type": "Full-time",
                "summary": "Lead grain trading activities across Black Sea and European origins, managing a book of wheat, corn, and barley.",
                "description": """We are looking for an experienced grains trader to join our Geneva trading desk. The successful candidate will manage and grow a portfolio of grain trading activities, with a focus on Black Sea and European origins.\n\n**Key Responsibilities:**\n- Manage a P&L-responsible grain trading book (wheat, corn, barley)\n- Develop and maintain relationships with suppliers, buyers, and logistics partners\n- Execute physical trades and manage associated hedging positions\n- Monitor market fundamentals and identify trading opportunities\n- Collaborate with logistics and risk management teams on execution\n- Contribute to market intelligence reports and client communications\n\n**What We Offer:**\n- Competitive compensation with performance-based incentives\n- Collaborative, entrepreneurial trading environment\n- Global exposure across multiple origins and destinations\n- Professional development and mentorship opportunities""",
                "requirements": [
                    "5+ years of physical grain trading experience",
                    "Strong understanding of Black Sea and European grain markets",
                    "Proven track record of profitable trading activity",
                    "Experience with futures hedging and basis trading",
                    "Fluency in English; Russian or Ukrainian language skills preferred",
                    "University degree in business, economics, or related field"
                ],
                "posted_at": datetime.datetime(2025, 1, 10)
            },
            {
                "slug": "logistics-coordinator-dubai",
                "title": "Logistics Coordinator",
                "location": "Dubai, UAE",
                "department": "Operations",
                "type": "Full-time",
                "summary": "Coordinate ocean freight, chartering, and documentation for agricultural commodity shipments across the Middle East and Africa.",
                "description": """Join our operations team in Dubai to manage the logistics execution of agricultural commodity shipments. You will be at the center of our supply chain, ensuring timely and cost-effective delivery.\n\n**Key Responsibilities:**\n- Coordinate vessel nominations, chartering, and freight negotiations\n- Manage shipping documentation (B/L, certificates, customs clearance)\n- Liaise with port agents, surveyors, and inspection companies\n- Track shipments from loading to discharge and report on status\n- Manage claims and disputes related to shipping and quality\n- Optimize freight costs and transit times\n\n**What We Offer:**\n- Dynamic, fast-paced work environment\n- Exposure to global commodity supply chains\n- Competitive salary and benefits package\n- Career growth opportunities in a growing company""",
                "requirements": [
                    "3+ years of experience in commodity logistics or shipping",
                    "Knowledge of Incoterms, charterparty terms, and L/C documentation",
                    "Strong organizational and communication skills",
                    "Proficiency in English; Arabic language skills are a plus",
                    "Experience with commodity ERP systems preferred",
                    "Bachelor's degree in logistics, supply chain, or related field"
                ],
                "posted_at": datetime.datetime(2025, 2, 1)
            },
            {
                "slug": "risk-analyst-singapore",
                "title": "Risk Analyst",
                "location": "Singapore",
                "department": "Risk Management",
                "type": "Full-time",
                "summary": "Monitor and analyze market, credit, and operational risks across the company's agricultural commodity trading portfolio.",
                "description": """We are seeking a detail-oriented risk analyst to strengthen our risk management capabilities from our Singapore office.\n\n**Key Responsibilities:**\n- Monitor daily position reports and P&L attribution\n- Analyze counterparty credit exposure and recommend limits\n- Track VaR and stress test scenarios for commodity portfolios\n- Support development of risk policies and procedures\n- Prepare risk reports for management and stakeholders\n- Collaborate with traders on hedging strategy optimization\n\n**What We Offer:**\n- Work at the intersection of markets, analytics, and strategy\n- Exposure to multiple commodity markets and geographies\n- Competitive compensation and benefits\n- Professional certification support (FRM, CFA)""",
                "requirements": [
                    "2-4 years of experience in commodity risk management or trading analytics",
                    "Strong quantitative and analytical skills",
                    "Proficiency in Excel, Python, or similar analytical tools",
                    "Understanding of derivatives pricing and hedging mechanics",
                    "Knowledge of agricultural commodity markets preferred",
                    "Bachelor's or Master's degree in finance, mathematics, or engineering"
                ],
                "posted_at": datetime.datetime(2025, 2, 10)
            },
            {
                "slug": "business-development-manager-nairobi",
                "title": "Business Development Manager",
                "location": "Nairobi, Kenya",
                "department": "Commercial",
                "type": "Full-time",
                "summary": "Develop and expand our customer base in East Africa for grains, pulses, and oilseed products.",
                "description": """An exciting opportunity to build our commercial presence in East Africa from our Nairobi office.\n\n**Key Responsibilities:**\n- Identify and develop new customer relationships in East Africa\n- Manage existing client accounts and optimize trade volumes\n- Coordinate with trading desks on pricing and product availability\n- Conduct market research and competitor analysis\n- Represent the company at industry events and trade fairs\n- Support contract negotiations and terms structuring\n\n**What We Offer:**\n- Opportunity to build a market from the ground up\n- Autonomy with strong corporate support\n- Competitive compensation with performance incentives\n- Travel opportunities across the region""",
                "requirements": [
                    "4+ years of business development experience in agricultural commodities",
                    "Established network in East African food and feed markets",
                    "Strong negotiation and relationship management skills",
                    "Understanding of import regulations and trade finance in the region",
                    "Fluency in English and Swahili",
                    "Bachelor's degree; MBA preferred"
                ],
                "posted_at": datetime.datetime(2025, 1, 25)
            }
        ]
        db.jobs.insert_many(jobs)
        print("Seeded jobs collection")
